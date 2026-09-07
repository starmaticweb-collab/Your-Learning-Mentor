"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { resolveTutorPhotoUrl } from "@/lib/tutorPhoto";
import { z } from "zod";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ShieldCheck, Phone, Mail, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatFees, modeLabel } from "@/lib/tutorTaxonomy";

type Tutor = {
  id: string;
  slug: string;
  name: string;
  subjects: string[];
  grade_levels: string[] | null;
  boards: string[] | null;
  mode: string;
  country: string | null;
  state: string | null;
  city: string | null;
  area: string | null;
  experience_years: string | null;
  fee_min: number | null;
  fee_max: number | null;
  qualification: string | null;
  languages: string[] | null;
  availability: string | null;
  photo_url: string | null;
  intro: string | null;
};

const initials = (name: string) =>
  name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

const leadSchema = z.object({
  student_name: z.string().trim().min(1).max(120),
  student_email: z.string().trim().email().max(255),
});

type TutorContact = { phone: string | null; email: string | null };

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
    {children}
  </h2>
);

const MetaRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-border/60 last:border-0">
    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">
      {label}
    </span>
    <span className="text-sm text-foreground text-right">{value}</span>
  </div>
);

export default function TutorProfileClient({ slug }: { slug: string }) {
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState<TutorContact | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    setContact(null);
    supabase
      .from("tutors_public")
      .select(
        "id,slug,name,subjects,grade_levels,boards,mode,country,state,city,area,experience_years,fee_min,fee_max,qualification,languages,availability,photo_url,intro"
      )
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setTutor((data as Tutor) ?? null);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tutor) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const parsed = leadSchema.safeParse({
      student_name: String(data.get("student_name") ?? ""),
      student_email: String(data.get("student_email") ?? ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { data: result, error } = await supabase.rpc("submit_tutor_lead", {
      _tutor_id: tutor.id,
      _student_name: parsed.data.student_name,
      _student_email: parsed.data.student_email,
    });
    setSubmitting(false);
    if (error || !result || (Array.isArray(result) && result.length === 0)) {
      toast.error("Couldn't reveal contact details. Please try again.");
      return;
    }
    const row = Array.isArray(result) ? result[0] : result;
    setContact({
      phone: (row as TutorContact).phone ?? null,
      email: (row as TutorContact).email ?? null,
    });
    form.reset();

    // Trigger instant email notification to admin in the background
    fetch("/api/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "tutor_lead",
        student_name: parsed.data.student_name,
        student_email: parsed.data.student_email,
        tutor_name: tutor.name,
        tutor_slug: tutor.slug,
        subjects: tutor.subjects,
        mode: tutor.mode,
        city: tutor.city,
        area: tutor.area,
      }),
    }).catch((err) => console.error("Lead email alert error:", err));
  };

  if (loading) return <PageLoader />;

  if (!tutor) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold">Tutor not found</h1>
        <p className="mt-3 text-muted-foreground">
          This profile may have been removed or is awaiting approval.
        </p>
        <Button asChild className="mt-6">
          <Link href="/find-a-tutor">Browse all tutors</Link>
        </Button>
      </div>
    );
  }

  const fee = formatFees(tutor.fee_min, tutor.fee_max);
  const locationLine = [tutor.area, tutor.city, tutor.state].filter(Boolean).join(", ");
  const firstName = tutor.name.split(" ")[0];

  const stats: { label: string; value: string }[] = [];
  if (tutor.experience_years) stats.push({ label: "Experience", value: `${tutor.experience_years} yrs` });
  if (fee) stats.push({ label: "Rate", value: fee.replace("/hr", "") + (fee.includes("/hr") ? "/hr" : "") });
  stats.push({ label: "Mode", value: modeLabel(tutor.mode) });

  return (
    <>
      <Sonner />
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:items-start">
          {/* LEFT COLUMN — Identity + Contact */}
          <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24">
            <section className="bg-card rounded-3xl p-7 sm:p-8 shadow-sm border border-border flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-background shadow-md bg-muted flex items-center justify-center text-3xl font-semibold text-muted-foreground">
                  {resolveTutorPhotoUrl(tutor.photo_url) ? (
                    <Image
                      src={resolveTutorPhotoUrl(tutor.photo_url)!}
                      alt={`${tutor.name} — tutor photo`}
                      className="h-full w-full object-cover"
                      width={128}
                      height={128}
                      priority
                    />
                  ) : (
                    initials(tutor.name)
                  )}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1 shadow-sm font-heading">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </div>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-2">
                {tutor.name}
              </h1>
              {locationLine && (
                <p className="text-sm text-muted-foreground mt-1">{locationLine}</p>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {(tutor.subjects ?? []).slice(0, 6).map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-muted text-foreground/80 text-[11px] font-semibold uppercase tracking-tight rounded-lg"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {stats.length > 0 && (
                <div className="grid grid-cols-3 w-full mt-7 pt-6 border-t border-border/60">
                  {stats.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex flex-col items-center text-center px-2 ${i === 1 && stats.length === 3 ? "border-x border-border/60" : ""}`}
                    >
                      <span className="text-foreground font-bold text-sm sm:text-base">{s.value}</span>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-tighter mt-0.5 font-heading">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {tutor.intro && (
              <section className="bg-card rounded-3xl p-7 sm:p-8 shadow-sm border border-border">
                <SectionLabel>About {firstName}</SectionLabel>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/80 whitespace-pre-line">
                  {tutor.intro}
                </p>
              </section>
            )}

            <section className="bg-card rounded-3xl p-7 sm:p-8 shadow-sm border border-border">
              <SectionLabel>Teaching Details</SectionLabel>
              <div className="mt-3">
                {tutor.qualification && (
                  <MetaRow label="Qualification" value={tutor.qualification} />
                )}
                {(tutor.boards?.length ?? 0) > 0 && (
                  <MetaRow label="Boards" value={(tutor.boards ?? []).join(", ")} />
                )}
                {(tutor.grade_levels?.length ?? 0) > 0 && (
                  <MetaRow label="Grades" value={(tutor.grade_levels ?? []).join(", ")} />
                )}
                {(tutor.languages?.length ?? 0) > 0 && (
                  <MetaRow label="Languages" value={(tutor.languages ?? []).join(", ")} />
                )}
                {tutor.availability && (
                  <MetaRow label="Availability" value={tutor.availability} />
                )}
              </div>
            </section>

            <section
              id="contact"
              className="bg-card rounded-3xl p-7 sm:p-10 shadow-sm border border-border scroll-mt-24"
            >
              <div className="mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Request Contact
                </h2>
                <p className="text-xs text-muted-foreground mt-1.5 inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Enter your details to instantly view {firstName}'s contact info.
                </p>
              </div>

              {contact ? (
                <div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground font-heading">
                    Contact details
                  </p>
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-sm font-medium hover:underline"
                    >
                      <Phone className="h-4 w-4" /> {contact.phone}
                    </a>
                  )}
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-sm font-medium hover:underline break-all"
                    >
                      <Mail className="h-4 w-4 shrink-0" /> {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a
                      href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium hover:underline"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp: {contact.phone}
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="student_name"
                      className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 font-heading"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="student_name"
                      name="student_name"
                      required
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Enter your name"
                      className="h-12 rounded-2xl bg-muted/50 border-transparent px-5 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="student_email"
                      className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 font-heading"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="student_email"
                      name="student_email"
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="email"
                      placeholder="email@address.com"
                      className="h-12 rounded-2xl bg-muted/50 border-transparent px-5 text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="sm:col-span-2 w-full h-12 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-sm uppercase tracking-widest shadow-lg shadow-accent/20 font-heading"
                  >
                    {submitting ? "Revealing..." : "Reveal Info"}
                  </Button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-border/60 flex justify-center">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] font-heading">
                  yourlearningmentor.com
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
