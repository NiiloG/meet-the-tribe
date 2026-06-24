"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { useLocale } from "@/context/LocaleContext";

interface Props {
  communitySlug: string;
}

export default function BookingForm({ communitySlug }: Props) {
  const { t } = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    dates: "",
    guests: "2",
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("bookings").insert({
        community_slug: communitySlug,
        guest_name: form.name,
        guest_email: form.email,
        travel_dates: form.dates,
        num_guests: parseInt(form.guests),
        notes: form.notes,
        status: "pending",
      });
      if (error) throw error;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green/10 border border-green text-green rounded-xl p-6 text-center font-medium">
        {t.booking.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {(["name", "email", "dates", "guests", "notes"] as const).map((field) => {
        const label = t.booking[field];
        const isTextarea = field === "notes";
        const inputClass =
          "w-full border border-cream-dark rounded-xl px-4 py-3 text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-terracotta text-sm";

        return (
          <div key={field}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-light mb-1">
              {label}
            </label>
            {isTextarea ? (
              <textarea
                rows={3}
                className={inputClass}
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
              />
            ) : (
              <input
                type={field === "email" ? "email" : field === "guests" ? "number" : "text"}
                min={field === "guests" ? 1 : undefined}
                required={field !== "notes"}
                className={inputClass}
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
              />
            )}
          </div>
        );
      })}

      {status === "error" && (
        <p className="text-terracotta text-sm">{t.booking.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-terracotta hover:bg-terracotta-dark disabled:opacity-50 text-cream font-semibold py-3 rounded-full transition-colors"
      >
        {status === "loading" ? "…" : t.booking.submit}
      </button>
    </form>
  );
}
