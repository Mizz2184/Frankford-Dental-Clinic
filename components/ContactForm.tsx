"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

const field =
  "w-full border-b border-white/30 bg-transparent py-3 text-[13px] text-white outline-none transition-colors placeholder:text-white/70 focus:border-white aria-[invalid=true]:border-[#ff9b7a]";

/**
 * Footer contact form. Posts JSON to `endpoint` when one is set (e.g. Formspree);
 * otherwise it just confirms on screen. A hidden honeypot field filters simple bots.
 */
export function ContactForm({ endpoint, success, className = "" }: { endpoint: string; success: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [invalid, setInvalid] = useState<string[]>([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.company) return; // honeypot filled → bot

    const missing = [
      !data.name?.trim() && "name",
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email?.trim() ?? "") && "email",
      !data.message?.trim() && "message",
    ].filter(Boolean) as string[];
    setInvalid(missing);
    if (missing.length) {
      form.querySelector<HTMLElement>(`[name="${missing[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      if (endpoint) {
        const { company: _honeypot, ...payload } = data;
        void _honeypot;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 500));
      }
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const bad = (name: string) => invalid.includes(name);

  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      <div className="grid gap-x-6 sm:grid-cols-2">
        <label className="sr-only" htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" autoComplete="name" placeholder="Name *" aria-invalid={bad("name")} className={field} />
        <label className="sr-only" htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Email *" aria-invalid={bad("email")} className={field} />
        <label className="sr-only" htmlFor="contact-phone">Phone</label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={`${field} sm:col-span-2`} />
        <label className="sr-only" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={2}
          placeholder="Message *"
          aria-invalid={bad("message")}
          className={`${field} resize-none sm:col-span-2`}
        />
        {/* Honeypot: hidden from people, often filled by bots. */}
        <div aria-hidden className="absolute -left-[9999px]">
          <input name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-[22px] text-sm font-medium text-ink transition-colors hover:bg-[#f1efeb] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowRight
            aria-hidden
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-200 motion-safe:group-hover:translate-x-[3px]"
          />
        </button>
        <p role="status" className="text-xs text-white/70">
          {status === "done" && success}
          {status === "error" && "Sorry, that didn't send. Please call us instead."}
          {status === "idle" && invalid.length > 0 && "Please fill in the highlighted fields."}
        </p>
      </div>
    </form>
  );
}
