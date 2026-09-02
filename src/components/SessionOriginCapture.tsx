"use client";

import { useEffect } from "react";
import { captureSessionOrigin } from "@/lib/session-origin";

/** Captures first-touch landing/referrer/UTMs once per session (no PII). */
export function SessionOriginCapture() {
  useEffect(() => {
    captureSessionOrigin();
  }, []);

  return null;
}
