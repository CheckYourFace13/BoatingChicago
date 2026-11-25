"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapPoint, MapPointKind } from "@/lib/map-points";

const KIND_COLOR: Record<MapPointKind, string> = {
  marina: "#FF6B4A", // coral
  "launch-area": "#0B3D6B", // lake-blue
};

const MAX_POPUP_LINKS = 8;

function pinIcon(kind: MapPointKind): L.DivIcon {
  const color = KIND_COLOR[kind];
  // Static markup only (no user/data strings) — safe as HTML.
  const shape =
    kind === "marina"
      ? `<span style="display:block;width:20px;height:20px;border-radius:9999px;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45)"></span>`
      : `<span style="display:block;width:18px;height:18px;border-radius:4px;transform:rotate(45deg);background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45)"></span>`;
  return L.divIcon({
    html: shape,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}

function clusterIcon(count: number): L.DivIcon {
  const size = count > 9 ? 36 : 30;
  return L.divIcon({
    html: `<span style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:9999px;background:#0B3D6B;color:#fff;font:700 12px/1 system-ui,sans-serif;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45)">${count}</span>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function buildPopup(point: MapPoint): HTMLElement {
  const root = document.createElement("div");
  root.style.minWidth = "180px";

  const title = document.createElement("a");
  title.href = point.href;
  title.textContent = point.title;
  title.style.cssText =
    "font-weight:800;color:#0B3D6B;text-decoration:underline";
  root.appendChild(title);

  const sub = document.createElement("div");
  sub.textContent = point.subtitle;
  sub.style.cssText = "font-size:12px;color:#4b5563;margin:2px 0 6px";
  root.appendChild(sub);

  if (point.links.length > 0) {
    const list = document.createElement("ul");
    list.style.cssText = "margin:0;padding:0 0 0 16px;font-size:13px";
    for (const link of point.links.slice(0, MAX_POPUP_LINKS)) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      a.style.cssText = "color:#0B3D6B";
      li.appendChild(a);
      list.appendChild(li);
    }
    root.appendChild(list);
    if (point.links.length > MAX_POPUP_LINKS) {
      const more = document.createElement("div");
      more.style.cssText = "font-size:12px;margin-top:4px";
      const a = document.createElement("a");
      a.href = point.href;
      a.textContent = `+${point.links.length - MAX_POPUP_LINKS} more — see destination`;
      a.style.cssText = "color:#0B3D6B";
      more.appendChild(a);
      root.appendChild(more);
    }
  }
  return root;
}

function buildClusterPopup(points: MapPoint[]): HTMLElement {
  const root = document.createElement("div");
  root.style.minWidth = "200px";
  const heading = document.createElement("div");
  heading.textContent = `${points.length} locations in this area`;
  heading.style.cssText =
    "font-weight:800;color:#0B3D6B;margin-bottom:6px;font-size:13px";
  root.appendChild(heading);
  const list = document.createElement("ul");
  list.style.cssText = "margin:0;padding:0 0 0 16px;font-size:13px";
  for (const point of points.slice(0, 12)) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = point.href;
    a.textContent = point.title;
    a.style.cssText = "color:#0B3D6B";
    li.appendChild(a);
    list.appendChild(li);
  }
  root.appendChild(list);
  if (points.length > 12) {
    const more = document.createElement("div");
    more.textContent = `+${points.length - 12} more — zoom in`;
    more.style.cssText = "font-size:12px;margin-top:4px;color:#4b5563";
    root.appendChild(more);
  }
  return root;
}

/**
 * Simple grid clustering for zoomed-out views. At higher zooms every pin
 * renders individually so destination coords stay accurate.
 */
function clusterPoints(
  points: MapPoint[],
  zoom: number,
): { singles: MapPoint[]; clusters: { lat: number; lng: number; points: MapPoint[] }[] } {
  if (zoom >= 9 || points.length <= 8) {
    return { singles: points, clusters: [] };
  }
  // Coarser grid when zoomed out (~0.5° at z6–7, ~0.25° at z8).
  const cell = zoom <= 7 ? 0.55 : 0.28;
  const buckets = new Map<string, MapPoint[]>();
  for (const point of points) {
    const key = `${Math.floor(point.lat / cell)}:${Math.floor(point.lng / cell)}`;
    const list = buckets.get(key) ?? [];
    list.push(point);
    buckets.set(key, list);
  }
  const singles: MapPoint[] = [];
  const clusters: { lat: number; lng: number; points: MapPoint[] }[] = [];
  for (const group of buckets.values()) {
    if (group.length === 1) {
      singles.push(group[0]);
      continue;
    }
    const lat = group.reduce((s, p) => s + p.lat, 0) / group.length;
    const lng = group.reduce((s, p) => s + p.lng, 0) / group.length;
    clusters.push({ lat, lng, points: group });
  }
  return { singles, clusters };
}

export default function LaunchMapCanvas({
  points,
  visibleKinds,
  label,
}: {
  points: MapPoint[];
  visibleKinds: MapPointKind[];
  label: string;
}) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const pointsRef = useRef(points);
  const kindsRef = useRef(visibleKinds);
  pointsRef.current = points;
  kindsRef.current = visibleKinds;

  function renderPins(map: L.Map) {
    layersRef.current?.clearLayers();
    const layer = layersRef.current;
    if (!layer) return;

    const visible = pointsRef.current.filter((p) =>
      kindsRef.current.includes(p.kind),
    );
    const { singles, clusters } = clusterPoints(visible, map.getZoom());
    const bounds: L.LatLngTuple[] = [];

    for (const point of singles) {
      L.marker([point.lat, point.lng], {
        icon: pinIcon(point.kind),
        title: point.title,
        alt: point.title,
        keyboard: true,
      })
        .bindPopup(buildPopup(point), { maxWidth: 260 })
        .addTo(layer);
      bounds.push([point.lat, point.lng]);
    }

    for (const cluster of clusters) {
      L.marker([cluster.lat, cluster.lng], {
        icon: clusterIcon(cluster.points.length),
        title: `${cluster.points.length} locations`,
        alt: `${cluster.points.length} locations`,
        keyboard: true,
      })
        .bindPopup(buildClusterPopup(cluster.points), { maxWidth: 280 })
        .on("dblclick", () => {
          map.setView([cluster.lat, cluster.lng], Math.min(map.getZoom() + 2, 12));
        })
        .addTo(layer);
      bounds.push([cluster.lat, cluster.lng]);
    }

    return bounds;
  }

  // Create the map once.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomSnap: 0.5,
      worldCopyJump: false,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.setView([42.0, -87.8], 8);
    // Wheel zoom only after the user clicks into the map (keeps page scroll).
    map.on("click", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());
    mapRef.current = map;
    layersRef.current = L.layerGroup().addTo(map);

    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("/")) {
        event.preventDefault();
        router.push(href);
      }
    }
    el.addEventListener("click", onClick);

    const onZoom = () => {
      renderPins(map);
    };
    map.on("zoomend", onZoom);

    return () => {
      map.off("zoomend", onZoom);
      el.removeEventListener("click", onClick);
      map.remove();
      mapRef.current = null;
      layersRef.current = null;
    };
  }, [router]);

  // Sync pins whenever the points or toggles change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const bounds = renderPins(map);
    if (!bounds || bounds.length === 0) return;
    if (bounds.length === 1) {
      map.setView(bounds[0], 11);
    } else {
      map.fitBounds(L.latLngBounds(bounds), { padding: [28, 28], maxZoom: 11 });
    }
  }, [points, visibleKinds]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={label}
      className="h-full w-full"
    />
  );
}
