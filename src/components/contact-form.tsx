"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

// Set NEXT_PUBLIC_FORM_ENDPOINT (Formspree, WebForms.to, Getform…) to receive messages by email.
// Without it, the form hands the message to WhatsApp so it still reaches the pharmacy.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot: bots fill hidden fields

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!ENDPOINT) {
      const text = `مرحبًا، أنا ${name} (${phone}).\n${message}`;
      window.open(whatsappLink(text), "_blank", "noopener");
      setState("sent");
      form.reset();
      return;
    }

    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const input =
    "w-full rounded-[2px] border border-line bg-surface px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">الاسم</span>
          <input name="name" required autoComplete="name" className={input} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">رقم الموبايل</span>
          <input
            name="phone"
            type="tel"
            required
            dir="ltr"
            inputMode="tel"
            pattern="[0-9+ ]{8,16}"
            autoComplete="tel"
            placeholder="01xxxxxxxxx"
            className={`${input} text-right`}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">رسالتك</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="اسم الدواء، سؤال للصيدلي، أو طلب توصيل…"
          className={input}
        />
      </label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[var(--brand)]" />
        <span>أوافق على استخدام بياناتي للرد على رسالتي فقط، ولن تُشارك مع أي جهة أخرى.</span>
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex h-12 w-full items-center justify-center rounded-[2px] bg-brand px-6 font-semibold text-paper transition hover:bg-brand-strong disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "جارٍ الإرسال…" : "أرسل الرسالة"}
      </button>
      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {state === "sent" && <span className="text-brand-strong">وصلتنا رسالتك، هنرد عليك خلال دقائق في ساعات العمل.</span>}
        {state === "error" && <span className="text-brand-strong">حصلت مشكلة في الإرسال. جرّب مرة تانية أو كلمنا على واتساب.</span>}
      </p>
    </form>
  );
}
