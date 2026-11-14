"use client";

import { useEffect, useState } from "react";
import { HOURS } from "@/lib/site";

// Pharmacy hours are in Cairo time, whatever the visitor's timezone is.
function cairoNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

function useCairoClock() {
  const [now, setNow] = useState<{ day: number; minutes: number } | null>(null);
  useEffect(() => {
    const tick = () => setNow(cairoNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function status(now: { day: number; minutes: number }) {
  const today = HOURS.find((h) => h.day === now.day);
  if (today && now.minutes >= toMin(today.open) && now.minutes < toMin(today.close)) {
    return { open: true, text: "مفتوح الآن حتى منتصف الليل" };
  }
  if (today && now.minutes < toMin(today.open)) {
    return { open: false, text: `مغلق الآن — نفتح اليوم ${today.open.replace(":00", "")}` };
  }
  const tomorrow = HOURS.find((h) => h.day === (now.day + 1) % 7);
  return { open: false, text: `مغلق الآن — نفتح غدًا ${tomorrow?.open.replace(":00", "") ?? ""}` };
}

export function OpenBadge() {
  const now = useCairoClock();
  if (!now) {
    return (
      <span className="inline-flex h-8 items-center rounded-full bg-surface/70 px-3 text-sm text-muted ring-1 ring-line">
        يوميًا حتى منتصف الليل
      </span>
    );
  }
  const s = status(now);
  return (
    <span
      className={`inline-flex h-8 items-center gap-2 rounded-full px-3 text-sm font-medium ring-1 ${
        s.open ? "bg-brand-soft text-brand-strong ring-brand/25" : "bg-paper-2 text-ink-2 ring-line"
      }`}
    >
      <span className={`size-2 rounded-full ${s.open ? "bg-brand animate-pulse" : "bg-muted"}`} />
      {s.text}
    </span>
  );
}

function fmt(t: string) {
  if (t === "24:00") return "12 منتصف الليل";
  const h = Number(t.slice(0, 2));
  if (h === 12) return "12 ظهرًا";
  return h < 12 ? `${h} صباحًا` : `${h - 12} مساءً`;
}

export function HoursTable() {
  const now = useCairoClock();
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl bg-surface ring-1 ring-line">
      {HOURS.map((h) => {
        const isToday = now?.day === h.day;
        return (
          <li
            key={h.day}
            className={`flex items-center justify-between px-5 py-3.5 ${isToday ? "bg-brand-soft" : ""}`}
            aria-current={isToday ? "date" : undefined}
          >
            <span className={`font-medium ${isToday ? "text-brand-strong" : ""}`}>
              {h.name}
              {isToday && <span className="ms-2 text-xs font-normal text-brand">(اليوم)</span>}
            </span>
            <span className="tabular-nums text-ink-2">
              {fmt(h.open)} – {fmt(h.close)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
