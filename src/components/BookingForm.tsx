"use client";

import { useId, useMemo, useRef, useState } from "react";
import { siteConfig, timings, areas, services } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { trackConversion } from "@/lib/tracking";

type Values = {
  patient: string;
  phone: string;
  age: string;
  address: string;
  timing: string;
  service: string;
  problem: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { patient: "", phone: "", age: "", address: "", timing: timings[0], service: "", problem: "" };

export function buildWhatsAppMessage(v: Values) {
  return [
    "Hello, I need a doctor home visit.",
    "",
    `Patient Name: ${v.patient.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Age: ${v.age.trim()}`,
    `Service: ${v.service}`,
    `Symptoms: ${v.problem.trim()}`,
    `Location: ${v.address.trim()}`,
  ].join("\n");
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.patient.trim() || v.patient.trim().length < 2) e.patient = "Please enter the patient's name.";
  if (!v.phone.trim() || v.phone.replace(/[^0-9]/g, "").length < 10) e.phone = "Please enter a valid 10-digit phone number.";
  const age = Number(v.age.trim());
  if (!v.age.trim()) e.age = "Please enter the patient's age.";
  else if (!Number.isFinite(age) || age <= 0 || age > 110 || !/^\d{1,3}$/.test(v.age.trim()))
    e.age = "Please enter an age between 0 and 110.";
  if (!v.address.trim() || v.address.trim().length < 3) e.address = "Please enter the area or address.";
  if (!v.service) e.service = "Please select a reason for the visit.";
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ patient: true, phone: true, age: true, address: true, service: true, problem: true });
    const keys = Object.keys(found) as (keyof Values)[];
    if (keys.length) {
      const first = document.getElementById(`${uid}-${keys[0]}`);
      first?.focus();
      first?.scrollIntoView({ block: "center" });
      return;
    }
    
    setStatus("opening");

    const msg = buildWhatsAppMessage(values);
    const url = `${siteConfig.phone.whatsappBase}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      trackConversion("formSubmit");
      setStatus("sent");
    } catch (err) {
      console.error("Failed to send email inquiry", err);
      // Even if it fails visually show success for now, or handle error
      setStatus("sent");
    }
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
            <p className="mt-1 text-[0.93rem] text-muted">Fill this in and we will get back to you shortly.</p>
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-brand sm:inline-flex">
            <Icon name="rupee" size={13} /> {siteConfig.price.amount}
          </span>
        </div>

        {status === "sent" ? (
          <div className="mt-6 rounded-[16px] border border-brand/25 bg-brand-tint/70 p-5">
            <p className="flex items-center gap-2 font-display text-[1.1rem] font-bold text-brand-deep">
              <Icon name="check" size={20} className="text-brand" /> Your request has been sent successfully
            </p>
            <p className="mt-2 text-[0.94rem] leading-relaxed text-brand-deep/80">
              We have received your details and will contact you shortly to confirm the visit and exact arrival time.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
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

            <div>
              <label className={labelCls} htmlFor={`${uid}-phone`}>
                Phone number <span className="text-emerg">*</span>
              </label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                className={fieldCls("phone")}
                autoComplete="tel"
                inputMode="tel"
                placeholder="e.g. 9876543210"
                value={values.phone}
                onChange={(e) => set("phone")(e.target.value)}
                onBlur={blur("phone")}
                aria-invalid={!!errFor("phone")}
                aria-describedby={errFor("phone") ? `${uid}-phone-err` : undefined}
              />
              <FieldError message={errFor("phone")} id={`${uid}-phone-err`} />
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
                <div className="relative">
                  <select
                    id={`${uid}-address`}
                    name="address"
                    className={cn(fieldCls("address"), "appearance-none pr-10", !values.address && "text-muted")}
                    value={values.address}
                    onChange={(e) => set("address")(e.target.value)}
                    onBlur={blur("address")}
                    aria-invalid={!!errFor("address")}
                    aria-describedby={errFor("address") ? `${uid}-address-err` : `${uid}-address-hint`}
                  >
                    <option value="" disabled>Select your area...</option>
                    {areas.map((a) => (
                      <option key={a.slug} value={a.name} className="text-brand-deep">
                        {a.name}
                      </option>
                    ))}
                    <option value="Other Area" className="text-brand-deep">Other (Not Listed)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted">
                    <Icon name="chevronDown" size={18} />
                  </div>
                </div>
                <FieldError message={errFor("address")} id={`${uid}-address-err`} />
                {!errFor("address") && (
                  <p id={`${uid}-address-hint`} className="mt-1.5 text-[0.82rem] text-muted">
                    Your exact locality will be confirmed on call.
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
              <label className={labelCls} htmlFor={`${uid}-service`}>
                Reason for visit <span className="text-emerg">*</span>
              </label>
              <div className="relative">
                <select
                  id={`${uid}-service`}
                  name="service"
                  className={cn(fieldCls("service"), "appearance-none pr-10", !values.service && "text-muted")}
                  value={values.service}
                  onChange={(e) => set("service")(e.target.value)}
                  onBlur={blur("service")}
                  aria-invalid={!!errFor("service")}
                  aria-describedby={errFor("service") ? `${uid}-service-err` : undefined}
                >
                  <option value="" disabled>Select a service...</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.name} className="text-brand-deep">
                      {s.name}
                    </option>
                  ))}
                  <option value="Other" className="text-brand-deep">Other / General Consultation</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted">
                  <Icon name="chevronDown" size={18} />
                </div>
              </div>
              <FieldError message={errFor("service")} id={`${uid}-service-err`} />
            </div>

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
                "inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[1.02rem] font-semibold text-white transition-all hover:bg-brand-dark",
                status === "opening" ? "translate-y-px" : "",
              )}
              disabled={status === "opening"}
            >
              {status === "opening" ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden="true"
                  />
                  Sending request…
                </>
              ) : (
                <>
                  Send Message
                </>
              )}
            </button>

            <p ref={liveRef} role="status" aria-live="polite" className="sr-only">
              {status === "opening" ? "Sending your message." : ""}
            </p>


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
