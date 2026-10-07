"use client";

import { useId, useMemo, useRef, useState } from "react";
import { siteConfig, timings } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Values = {
  patient: string;
  age: string;
  address: string;
  timing: string;
  problem: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { patient: "", age: "", address: "", timing: timings[0], problem: "" };

export function buildWhatsAppMessage(v: Values) {
  return [
    "Hello, I need a doctor home visit.",
    "",
    `Symptoms: ${v.problem.trim()}`,
    `Age: ${v.age.trim()}`,
    `Location: ${v.address.trim()}`,
    `Patient: ${v.patient.trim()}`,
    `When: ${v.timing}`,
  ].join("\n");
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.patient.trim() || v.patient.trim().length < 2) e.patient = "Please enter the patient's name.";
  const age = Number(v.age.trim());
  if (!v.age.trim()) e.age = "Please enter the patient's age.";
  else if (!Number.isFinite(age) || age <= 0 || age > 110 || !/^\d{1,3}$/.test(v.age.trim()))
    e.age = "Please enter an age between 0 and 110.";
  if (!v.address.trim() || v.address.trim().length < 3) e.address = "Please enter the area or address.";
  if (!v.problem.trim() || v.problem.trim().length < 5) e.problem = "Please tell us briefly what the problem is.";
  return e;
}

/**
 * Booking request form. Nothing is submitted to a server and nothing is stored:
 * it composes a WhatsApp message and hands it to the user to send.
 */
export function BookingForm({
  variant = "card",
  context,
}: {
  variant?: "card" | "page";
  context?: string;
}) {
  const uid = useId();
  const [values, setValues] = useState<Values>({ ...empty, problem: context ?? "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "opening" | "sent">("idle");
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  const set = (key: keyof Values) => (raw: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: raw };
      if (touched[key]) setErrors(validate(next));
      return next;
    });
  };

  const blur = (key: keyof Values) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const preview = useMemo(() => buildWhatsAppMessage({ ...values, patient: values.patient || "[name]" }), [values]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ patient: true, age: true, address: true, problem: true });
    const keys = Object.keys(found) as (keyof Values)[];
    if (keys.length) {
      const first = document.getElementById(`${uid}-${keys[0]}`);
      first?.focus();
      first?.scrollIntoView({ block: "center" });
      return;
    }
    const url = `${siteConfig.phone.whatsapp}?text=${encodeURIComponent(preview)}`;
    setStatus("opening");
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setStatus("sent"), 450);
  };

  const errFor = (k: keyof Values) => (touched[k] ? errors[k] : undefined);

  const labelCls = "mb-1.5 block text-[0.92rem] font-semibold text-brand-deep";
  const fieldCls = (k: keyof Values) => cn("field", errFor(k) && "field-error");

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-line bg-surface",
        variant === "card" ? "shadow-soft" : "shadow-soft",
      )}
      aria-labelledby={`${uid}-title`}
    >
      <div className="h-1.5 w-full bg-brand" aria-hidden="true" />
      <div className="p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={`${uid}-title`} className={variant === "card" ? "text-[1.42rem] font-bold" : "text-[1.6rem] font-bold"}>
              Request a visit
            </h2>
            <p className="mt-1 text-[0.93rem] text-muted">Fill this in and send it to us on WhatsApp.</p>
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-brand sm:inline-flex">
            <Icon name="rupee" size={13} /> {siteConfig.price.amount}
          </span>
        </div>

        {status === "sent" ? (
          <div className="mt-6 rounded-[16px] border border-brand/25 bg-brand-tint/70 p-5">
            <p className="flex items-center gap-2 font-display text-[1.1rem] font-bold text-brand-deep">
              <Icon name="check" size={20} className="text-brand" /> Your request is ready in WhatsApp
            </p>
            <p className="mt-2 text-[0.94rem] leading-relaxed text-brand-deep/80">
              If WhatsApp did not open, use the button below. Nothing you typed is saved on this page — we read your
              message only when you press send in WhatsApp.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={`${siteConfig.phone.whatsapp}?text=${encodeURIComponent(preview)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-wa px-4 text-[0.95rem] font-semibold text-white"
              >
                <Icon name="whatsapp" size={18} /> Open WhatsApp again
              </a>
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 text-[0.95rem] font-semibold text-brand-deep"
              >
                <Icon name="phone" size={18} /> Call instead
              </a>
              <button
                type="button"
                onClick={() => {
                  setValues({ ...empty });
                  setErrors({});
                  setTouched({});
                  setStatus("idle");
                }}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl px-3 text-[0.95rem] font-semibold text-brand underline-offset-4 hover:underline"
              >
                Request another visit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
            <div>
              <label className={labelCls} htmlFor={`${uid}-patient`}>
                Patient name <span className="text-emerg">*</span>
              </label>
              <input
                id={`${uid}-patient`}
                name="patient"
                className={fieldCls("patient")}
                autoComplete="name"
                inputMode="text"
                placeholder="Who is the doctor visiting?"
                value={values.patient}
                onChange={(e) => set("patient")(e.target.value)}
                onBlur={blur("patient")}
                aria-invalid={!!errFor("patient")}
                aria-describedby={errFor("patient") ? `${uid}-patient-err` : undefined}
              />
              <FieldError message={errFor("patient")} id={`${uid}-patient-err`} />
            </div>

            <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
              <div>
                <label className={labelCls} htmlFor={`${uid}-age`}>
                  Age <span className="text-emerg">*</span>
                </label>
                <input
                  id={`${uid}-age`}
                  name="age"
                  className={fieldCls("age")}
                  inputMode="numeric"
                  pattern="[0-9]{1,3}"
                  maxLength={3}
                  placeholder="Years"
                  value={values.age}
                  onChange={(e) => set("age")(e.target.value.replace(/[^\d]/g, ""))}
                  onBlur={blur("age")}
                  aria-invalid={!!errFor("age")}
                  aria-describedby={errFor("age") ? `${uid}-age-err` : undefined}
                />
                <FieldError message={errFor("age")} id={`${uid}-age-err`} />
              </div>
              <div>
                <label className={labelCls} htmlFor={`${uid}-address`}>
                  Area / address <span className="text-emerg">*</span>
                </label>
                <input
                  id={`${uid}-address`}
                  name="address"
                  className={fieldCls("address")}
                  autoComplete="street-address"
                  placeholder="Locality, sector or area, Delhi NCR"
                  value={values.address}
                  onChange={(e) => set("address")(e.target.value)}
                  onBlur={blur("address")}
                  aria-invalid={!!errFor("address")}
                  aria-describedby={errFor("address") ? `${uid}-address-err` : `${uid}-address-hint`}
                />
                <FieldError message={errFor("address")} id={`${uid}-address-err`} />
                {!errFor("address") && (
                  <p id={`${uid}-address-hint`} className="mt-1.5 text-[0.82rem] text-muted">
                    City and locality is enough for now — the doctor can call for directions.
                  </p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className={labelCls}>When do you need the doctor?</legend>
              <div className="grid grid-cols-3 gap-2">
                {timings.map((t) => {
                  const active = values.timing === t;
                  return (
                    <label
                      key={t}
                      className={cn(
                        "flex min-h-[46px] cursor-pointer items-center justify-center rounded-xl border px-2 py-2 text-center text-[0.86rem] font-semibold transition-colors",
                        active
                          ? "border-brand bg-brand text-white shadow-[0_8px_20px_-14px_rgba(11,111,107,0.9)]"
                          : "border-line bg-surface text-brand-deep hover:border-brand hover:bg-brand-tint",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${uid}-timing`}
                        value={t}
                        checked={active}
                        onChange={() => set("timing")(t)}
                        className="sr-only"
                      />
                      {t}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label className={labelCls} htmlFor={`${uid}-problem`}>
                What is the problem? <span className="text-emerg">*</span>
              </label>
              <textarea
                id={`${uid}-problem`}
                name="problem"
                rows={3}
                className={cn(fieldCls("problem"), "resize-y")}
                placeholder="Fever since last night, cough, weakness — anything you would say on the phone."
                value={values.problem}
                onChange={(e) => set("problem")(e.target.value)}
                onBlur={blur("problem")}
                aria-invalid={!!errFor("problem")}
                aria-describedby={errFor("problem") ? `${uid}-problem-err` : undefined}
              />
              <FieldError message={errFor("problem")} id={`${uid}-problem-err`} />
            </div>

            <button
              type="submit"
              className={cn(
                "inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-wa px-5 text-[1.02rem] font-semibold text-white transition-all",
                status === "opening" ? "translate-y-px bg-wa-dark" : "hover:bg-wa-dark",
              )}
              disabled={status === "opening"}
            >
              {status === "opening" ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden="true"
                  />
                  Opening WhatsApp…
                </>
              ) : (
                <>
                  <Icon name="whatsapp" size={20} /> Send on WhatsApp
                </>
              )}
            </button>

            <p ref={liveRef} role="status" aria-live="polite" className="sr-only">
              {status === "opening" ? "Opening WhatsApp with your message." : ""}
            </p>

            <div className="rounded-[14px] bg-paper p-3.5 text-[0.84rem] leading-relaxed text-muted">
              <span className="font-semibold text-brand-deep">How this works:</span> this opens WhatsApp with your
              details filled in — you press send. Nothing is stored on this page.
              <span className="mt-1 block">Prefer to talk? Call {siteConfig.phone.display}.</span>
            </div>

            <details className="group rounded-[14px] border border-line px-3.5 py-2.5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[0.86rem] font-semibold text-brand-deep">
                Preview the message
                <Icon name="chevronDown" size={17} className="text-brand transition-transform group-open:rotate-180" />
              </summary>
              <pre className="mt-2 whitespace-pre-wrap rounded-[10px] bg-paper p-3 font-sans text-[0.83rem] leading-relaxed text-muted">
                {preview}
              </pre>
            </details>
          </form>
        )}
      </div>
    </section>
  );
}

function FieldError({ message, id }: { message?: string; id: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[0.85rem] font-medium text-emerg">
      <Icon name="alert" size={15} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}
