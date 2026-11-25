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

function buildPopup(point: MapPoint): HTMLElement {
  const root = document.createElement("div");
  root.style.minWidth = "180px";

  const title = document.createElement("a");
  title.href = point.href;
  title.textContent = point.title;
  title.style.cssText = "font-weight:800;color:#0B3D6B;text-decoration:underline";
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
  const layersRef = useRef<Map<MapPointKind, L.LayerGroup>>(new Map());

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
    const layers = layersRef.current;

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

    return () => {
      el.removeEventListener("click", onClick);
      map.remove();
      mapRef.current = null;
      layers.clear();
    };
  }, [router]);

  // Sync pins whenever the points or toggles change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const layers = layersRef.current;
    layers.forEach((group) => group.remove());
    layers.clear();

    const bounds: L.LatLngTuple[] = [];
    for (const point of points) {
      if (!visibleKinds.includes(point.kind)) continue;
      let group = layers.get(point.kind);
      if (!group) {
        group = L.layerGroup().addTo(map);
        layers.set(point.kind, group);
      }
      L.marker([point.lat, point.lng], {
        icon: pinIcon(point.kind),
        title: point.title,
        alt: point.title,
        keyboard: true,
      })
        .bindPopup(buildPopup(point), { maxWidth: 260 })
        .addTo(group);
      bounds.push([point.lat, point.lng]);
    }

    if (bounds.length === 1) {
      map.setView(bounds[0], 11);
    } else if (bounds.length > 1) {
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
