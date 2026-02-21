"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const VISIT_SESSION_KEY = "vk_visit_sid";
const VISIT_RECORDED_KEY = "vk_visit_recorded";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem(VISIT_SESSION_KEY);
  if (!sid) {
    sid = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem(VISIT_SESSION_KEY, sid);
  }
  return sid;
}

export function VisitRecorder() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(VISIT_RECORDED_KEY)) return;

    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    fetch(`${API_URL}/visit/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, path: pathname }),
      keepalive: true,
    })
      .then(() => {
        sessionStorage.setItem(VISIT_RECORDED_KEY, "1");
      })
      .catch(() => {});
  }, [pathname]);

  return null;
}
