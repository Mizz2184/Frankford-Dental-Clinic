"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";

const { booking } = site;
type Service = (typeof booking.services)[number];

type Form = {
  service: string;
  patient: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Form, string>>;

const empty: Form = { service: "", patient: "", date: "", time: "", name: "", email: "", phone: "", notes: "", consent: false };

const swatch: Record<Service["color"], string> = {
  sage: "bg-sage",
  lavender: "bg-lavender",
  sky: "bg-sky",
  beige: "bg-beige",
};

// ---------- date helpers (local time, no library) ----------
const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const longDate = (key: string) =>
  fromKey(key).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
const to12h = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? "AM" : "PM"}`;
};

/** Bookable days: starting tomorrow, skipping closed weekdays. */
function upcomingDays() {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (days.length < booking.daysAhead) {
    cursor.setDate(cursor.getDate() + 1);
    if (!(booking.closedWeekdays as number[]).includes(cursor.getDay())) days.push(new Date(cursor));
  }
  return days;
}

function validate(step: number, form: Form): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!form.service) e.service = "Choose a reason for your visit.";
    if (!form.patient) e.patient = "Let us know if you've visited before.";
  }
  if (step === 1) {
    if (!form.date) e.date = "Pick a day.";
    if (!form.time) e.time = "Pick a time.";
  }
  if (step === 2) {
    if (form.name.trim().length < 2) e.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a phone number we can reach you on.";
  }
  if (step === 3 && !form.consent) e.consent = "Please confirm to book.";
  return e;
}

/** Downloadable calendar entry for the confirmed slot. */
function icsFile(form: Form, service: Service) {
  const start = fromKey(form.date);
  const [h, m] = form.time.split(":").map(Number);
  start.setHours(h, m);
  const end = new Date(start.getTime() + service.duration * 60_000);
  const stamp = (d: Date) => `${toKey(d).replaceAll("-", "")}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Frankford Avenue Dental Group//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@frankforddentistry.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${site.brand.name} — ${service.title}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
}

// ---------- small UI pieces ----------
const primaryBtn =
  "group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-[22px] text-sm font-medium text-white transition-colors hover:bg-ink-soft disabled:opacity-60";
const ghostBtn =
  "inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink transition-colors hover:bg-[#f1efeb]";
const choice =
  "cursor-pointer rounded-card border border-ink/10 bg-white/60 transition-colors hover:border-ink/30 has-[:checked]:border-ink has-[:checked]:bg-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs text-[#b4411b]">
      {message}
    </p>
  );
}

function Group({ legend, error, errorId, children }: { legend: string; error?: string; errorId: string; children: ReactNode }) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="min-w-0">
      <legend className="mb-3 text-[13px] font-medium">{legend}</legend>
      {children}
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

function TextField({
  id,
  label,
  error,
  className = "",
  ...input
}: { id: keyof Form; label: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={`bk-${id}`} className="mb-2 block text-[13px] font-medium">
        {label}
      </label>
      <input
        id={`bk-${id}`}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `bk-${id}-error` : undefined}
        className="h-12 w-full rounded-img border border-ink/15 bg-white px-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-ink aria-[invalid=true]:border-[#b4411b]"
        {...input}
      />
      <FieldError id={`bk-${id}-error`} message={error} />
    </div>
  );
}

// ---------- dialog ----------
export function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [calendarUrl, setCalendarUrl] = useState("");

  const panel = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const days = useMemo(() => (open ? upcomingDays() : []), [open]);
  const service = booking.services.find((s) => s.id === form.service);
  const isLastStep = step === booking.steps.length - 1;

  const reset = () => {
    setStep(0);
    setForm(empty);
    setErrors({});
    setStatus("idle");
  };

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === "#book") history.replaceState(null, "", window.location.pathname + window.location.search);
    opener.current?.focus({ preventScroll: true });
  }, []);

  // Any link to "#book" anywhere on the page opens the flow (also a direct visit to /#book).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a[href="#book"]');
      if (!link) return;
      event.preventDefault();
      opener.current = link as HTMLElement;
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    const timer = setTimeout(() => {
      if (window.location.hash === "#book") setOpen(true);
    });
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer);
    };
  }, []);

  // While open: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return close();
      if (event.key !== "Tab" || !panel.current) return;
      const focusables = [...panel.current.querySelectorAll<HTMLElement>("button, a[href], input, textarea")].filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Move focus to the step heading whenever the step (or result) changes.
  useEffect(() => {
    if (open) heading.current?.focus({ preventScroll: true });
  }, [open, step, status]);

  useEffect(() => () => void (calendarUrl && URL.revokeObjectURL(calendarUrl)), [calendarUrl]);

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const focusFirstError = (found: Errors) => {
    const key = Object.keys(found)[0];
    panel.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  };

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const submit = async () => {
    const found = validate(step, form);
    setErrors(found);
    if (Object.keys(found).length) return focusFirstError(found);
    if (!isLastStep) return goTo(step + 1);

    setStatus("sending");
    const payload = {
      ...form,
      service: service?.title,
      duration: service?.duration,
      dateLabel: longDate(form.date),
      timeLabel: to12h(form.time),
    };
    try {
      if (booking.endpoint) {
        const res = await fetch(booking.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      if (service) setCalendarUrl(icsFile(form, service));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const summary = [
    { label: "Reason", value: service ? service.title : "" },
    { label: "Patient", value: form.patient },
    { label: "Date", value: form.date ? longDate(form.date) : "" },
    { label: "Time", value: form.time ? to12h(form.time) : "" },
  ];

  const steps = [
    // 0 — Treatment
    <div key="service" className="space-y-8">
      <Group legend="What is the reason for your visit?" error={errors.service} errorId="bk-service-error">
        <div className="grid gap-3 sm:grid-cols-2">
          {booking.services.map((s) => (
            <label key={s.id} className={`${choice} flex items-start gap-3 p-4`}>
              <input
                type="radio"
                name="service"
                value={s.id}
                checked={form.service === s.id}
                onChange={() => update("service", s.id)}
                className="sr-only"
              />
              <span aria-hidden className={`mt-0.5 size-8 shrink-0 rounded-full ${swatch[s.color]}`} />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{s.title}</span>
                <span className="mt-1 block text-xs leading-[1.5] text-body">{s.description}</span>
              </span>
            </label>
          ))}
        </div>
      </Group>
      <Group legend="Have you visited us before?" error={errors.patient} errorId="bk-patient-error">
        <div className="flex flex-wrap gap-3">
          {booking.patientTypes.map((p) => (
            <label key={p} className={`${choice} rounded-full px-5 py-3 text-sm`}>
              <input
                type="radio"
                name="patient"
                value={p}
                checked={form.patient === p}
                onChange={() => update("patient", p)}
                className="sr-only"
              />
              {p}
            </label>
          ))}
        </div>
      </Group>
    </div>,

    // 1 — Date & time
    <div key="when" className="space-y-8">
      <Group legend="Choose a day" error={errors.date} errorId="bk-date-error">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {days.map((d) => {
            const key = toKey(d);
            return (
              <label key={key} className={`${choice} flex w-[68px] shrink-0 flex-col items-center py-3`}>
                <input
                  type="radio"
                  name="date"
                  value={key}
                  checked={form.date === key}
                  onChange={() => update("date", key)}
                  className="sr-only"
                />
                <span className="text-[11px] text-body uppercase">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                <span className="mt-1 text-xl leading-none font-medium tracking-[-0.02em]">{d.getDate()}</span>
                <span className="mt-1 text-[11px] text-body">{d.toLocaleDateString("en-US", { month: "short" })}</span>
              </label>
            );
          })}
        </div>
      </Group>
      <Group legend="Choose a time" error={errors.time} errorId="bk-time-error">
        <div className="space-y-5">
          {Object.entries(booking.times).map(([period, slots]) => (
            <div key={period}>
              <p className="mb-2 text-xs text-body">{period}</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((t) => (
                  <label key={t} className={`${choice} rounded-full py-2.5 text-center text-[13px]`}>
                    <input
                      type="radio"
                      name="time"
                      value={t}
                      checked={form.time === t}
                      onChange={() => update("time", t)}
                      className="sr-only"
                    />
                    {to12h(t)}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Group>
    </div>,

    // 2 — Details
    <div key="details" className="grid gap-5 sm:grid-cols-2">
      <TextField
        id="name"
        label="Full name"
        autoComplete="name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
        className="sm:col-span-2"
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <TextField
        id="phone"
        label="Phone"
        type="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
      />
      <div className="sm:col-span-2">
        <label htmlFor="bk-notes" className="mb-2 block text-[13px] font-medium">
          Anything we should know? <span className="font-normal text-body">(optional)</span>
        </label>
        <textarea
          id="bk-notes"
          name="notes"
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Tooth sensitivity, anxiety, insurance provider…"
          className="w-full resize-none rounded-img border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-ink"
        />
      </div>
    </div>,

    // 3 — Review
    <div key="review" className="space-y-6">
      <dl className="divide-y divide-ink/10 rounded-card bg-white">
        {[
          ...summary,
          { label: "Name", value: form.name },
          { label: "Email", value: form.email },
          { label: "Phone", value: form.phone },
          ...(form.notes ? [{ label: "Notes", value: form.notes }] : []),
        ].map((row, i) => (
          <div key={row.label} className="flex items-start justify-between gap-6 px-5 py-3.5">
            <dt className="text-xs text-body">{row.label}</dt>
            <dd className="flex items-center gap-3 text-right text-sm">
              <span className="break-words">{row.value}</span>
              {i < 4 && (
                <button
                  type="button"
                  onClick={() => goTo(i < 2 ? 0 : 1)}
                  className="shrink-0 text-xs text-body underline underline-offset-2 hover:text-ink"
                >
                  Edit<span className="sr-only"> {row.label.toLowerCase()}</span>
                </button>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5]">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "bk-consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 accent-ink"
          />
          {booking.consent}
        </label>
        <FieldError id="bk-consent-error" message={errors.consent} />
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-img bg-[#fbe9e2] px-4 py-3 text-[13px] text-[#8a3214]">
          We couldn&apos;t send your booking. Please try again, or call us on {site.brand.phone.href.replace("tel:", "")}.
        </p>
      )}
    </div>,
  ];

  return (
    <AnimatePresence onExitComplete={reset}>
      {open && (
        <motion.div
          key="booking"
          className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/45 backdrop-blur-sm md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-heading"
            className="relative flex h-full w-full flex-col overflow-hidden bg-cream md:h-[min(760px,calc(100vh-48px))] md:max-w-[960px] md:flex-row md:rounded-panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Side panel: title, progress, live summary */}
            <aside className="hidden w-[300px] shrink-0 flex-col bg-sage p-8 md:flex">
              <p className="text-lg font-semibold tracking-[-0.02em]">{site.brand.name}</p>
              <p className="mt-10 text-[32px] leading-[1.08] font-medium tracking-[-0.03em]">
                {booking.title[0]}
                <br />
                {booking.title[1]}
              </p>
              <p className="mt-4 text-[13px] leading-[1.6] text-ink/70">{booking.intro}</p>
              <ol className="mt-10 space-y-3">
                {booking.steps.map((label, i) => {
                  const done = status === "done" || i < step;
                  const current = status !== "done" && i === step;
                  return (
                    <li
                      key={label}
                      aria-current={current ? "step" : undefined}
                      className={`flex items-center gap-3 text-sm ${current ? "font-medium" : done ? "" : "text-ink/50"}`}
                    >
                      <span
                        className={`grid size-7 place-items-center rounded-full text-xs ${
                          done ? "bg-ink text-white" : current ? "bg-white text-ink" : "border border-ink/20"
                        }`}
                      >
                        {done ? <Check aria-hidden size={13} strokeWidth={2} /> : i + 1}
                      </span>
                      {label}
                    </li>
                  );
                })}
              </ol>
              {service && (
                <div className="mt-auto rounded-card bg-white/60 p-4 text-[13px] leading-[1.6]">
                  <p className="font-medium">{service.title}</p>
                  {form.date && (
                    <p className="text-ink/70">
                      {longDate(form.date)}
                      {form.time && ` · ${to12h(form.time)}`}
                    </p>
                  )}
                </div>
              )}
            </aside>

            {/* Main column */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <header className="flex items-center justify-between gap-4 px-6 pt-6 md:px-10 md:pt-8">
                <p className="text-xs text-body" aria-live="polite">
                  {status === "done" ? "Booking confirmed" : `Step ${step + 1} of ${booking.steps.length}`}
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close booking"
                  className="grid size-10 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-[#f1efeb]"
                >
                  <X aria-hidden size={18} strokeWidth={1.75} />
                </button>
              </header>
              {/* Mobile progress bar */}
              {status !== "done" && (
                <div aria-hidden className="mx-6 mt-4 h-1 overflow-hidden rounded-full bg-ink/10 md:hidden">
                  <div
                    className="h-full rounded-full bg-ink transition-[width] duration-300"
                    style={{ width: `${((step + 1) / booking.steps.length) * 100}%` }}
                  />
                </div>
              )}

              {status === "done" && service ? (
                <div className="flex flex-1 flex-col items-start justify-center overflow-y-auto px-6 py-10 md:px-10">
                  <span className="grid size-14 place-items-center rounded-full bg-sage">
                    <Check aria-hidden size={24} strokeWidth={1.75} />
                  </span>
                  <h2 ref={heading} id="booking-heading" tabIndex={-1} className="h2 mt-6 outline-none">
                    {booking.success.title}
                  </h2>
                  <p className="mt-4 max-w-[420px] text-sm leading-[1.6] text-body">
                    {booking.success.text} We&apos;ll send it to <span className="text-ink">{form.email}</span>.
                  </p>
                  <div className="mt-8 w-full max-w-[420px] rounded-card bg-white p-5 text-sm leading-[1.7]">
                    <p className="font-medium">{service.title}</p>
                    <p className="text-body">
                      {longDate(form.date)} at {to12h(form.time)}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={calendarUrl} download="frankford-dental-appointment.ics" className={ghostBtn}>
                      <CalendarPlus aria-hidden size={16} strokeWidth={1.75} /> Add to calendar
                    </a>
                    <button type="button" onClick={close} className={primaryBtn}>
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    void submit();
                  }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-8 md:px-10">
                    <h2
                      ref={heading}
                      id="booking-heading"
                      tabIndex={-1}
                      className="text-[28px] leading-[1.1] font-medium tracking-[-0.03em] outline-none md:text-[32px]"
                    >
                      {booking.steps[step]}
                    </h2>
                    {/* Keyed so each step slides in from the direction of travel. */}
                    <motion.div
                      key={step}
                      className="mt-6"
                      initial={{ opacity: 0, x: direction * 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {steps[step]}
                    </motion.div>
                  </div>

                  <footer className="flex items-center justify-between gap-3 border-t border-ink/10 bg-cream px-6 py-4 md:px-10">
                    {step > 0 ? (
                      <button type="button" onClick={() => goTo(step - 1)} className={ghostBtn}>
                        <ArrowLeft aria-hidden size={15} strokeWidth={1.75} /> Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <button type="submit" disabled={status === "sending"} className={primaryBtn}>
                      {status === "sending" ? "Booking…" : isLastStep ? "Confirm booking" : "Continue"}
                      <ArrowRight
                        aria-hidden
                        size={15}
                        strokeWidth={1.75}
                        className="transition-transform duration-200 motion-safe:group-hover:translate-x-[3px]"
                      />
                    </button>
                  </footer>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
