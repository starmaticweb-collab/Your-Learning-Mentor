"use client";

import { useEffect, useMemo, useState, KeyboardEvent, useRef } from "react";
import Link from "next/link";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { X, Upload, CheckCircle } from "lucide-react";
import {
  BOARDS,
  EXPERIENCE_BUCKETS,
  GRADE_LEVELS,
  LANGUAGES,
  POPULAR_SUBJECTS,
  slugify,
} from "@/lib/tutorTaxonomy";
import { uploadTutorPhoto } from "@/lib/tutorPhoto";

const schema = z.object({
  full_name: z.string().trim().min(2).max(120),
  profile_url: z
    .string()
    .trim()
    .min(3, "Profile URL must be at least 3 characters")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only"),
  contact_number: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().trim().email().max(255),
  qualification: z.string().trim().min(2).max(200),
  subjects: z.array(z.string().trim().min(1)).min(1, "Add at least one subject").max(20),
  grade_levels: z.array(z.string()).min(1, "Pick at least one grade level"),
  boards: z.array(z.string()).min(1, "Pick at least one board"),
  mode: z.enum(["online", "offline", "both"]),
  country: z.string().trim().min(2).max(60),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  city: z.string().trim().min(2).max(80),
  area: z.string().trim().max(80).optional().or(z.literal("")),
  fee_min: z.coerce.number().int().min(1, "Minimum fee is required").max(100000),
  fee_max: z
    .union([z.coerce.number().int().min(0).max(100000), z.literal("")])
    .optional(),
  experience_years: z.string().min(1, "Pick your experience"),
  languages: z.array(z.string()).min(1, "Pick at least one language"),
  availability: z
    .string()
    .trim()
    .min(3, "Describe your availability")
    .max(200),
  photo_path: z
    .string()
    .min(1, "Please upload a profile photo"),
  introduction: z
    .string()
    .trim()
    .min(100, "Introduction should be at least 100 characters")
    .max(2000),
}).refine(
  (d) => d.fee_max === undefined || d.fee_max === "" || Number(d.fee_max) >= d.fee_min,
  { path: ["fee_max"], message: "Max fee must be greater than or equal to min fee" }
);

type FormValues = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = {
  full_name: "",
  profile_url: "",
  contact_number: "",
  email: "",
  qualification: "",
  subjects: [],
  grade_levels: [],
  boards: [],
  mode: "online",
  country: "India",
  state: "",
  city: "",
  area: "",
  fee_min: 0,
  fee_max: "",
  experience_years: "",
  languages: [],
  availability: "",
  photo_path: "",
  introduction: "",
};

export default function BecomeATutorClient() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subjectInput, setSubjectInput] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");

  const fieldAnchorId = (k: keyof FormValues): string => {
    const idMap: Partial<Record<keyof FormValues, string>> = {
      photo_path: "photo_file",
    };
    if (idMap[k]) return idMap[k] as string;
    if (["subjects", "grade_levels", "boards", "languages"].includes(k as string)) {
      return `field-${String(k)}`;
    }
    return String(k);
  };

  const scrollToField = (k: keyof FormValues) => {
    const el = document.getElementById(fieldAnchorId(k));
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    if (typeof (el as HTMLElement).focus === "function") {
      setTimeout(() => {
        try { (el as HTMLElement).focus({ preventScroll: true }); } catch { /* ignore */ }
      }, 250);
    }
  };

  useEffect(() => {
    const slug = values.profile_url.trim();
    if (!slug) { setSlugStatus("idle"); return; }
    if (!/^[a-z0-9-]+$/.test(slug) || slug.length < 3) {
      setSlugStatus("invalid");
      return;
    }
    setSlugStatus("checking");
    const t = setTimeout(async () => {
      try {
        const { data, error } = await supabase.rpc("check_tutor_slug_available" as never, { _slug: slug } as never);
        if (error) { setSlugStatus("idle"); return; }
        const available = Boolean(data);
        setSlugStatus(available ? "available" : "taken");
        if (!available) {
          setErrors((e) => ({ ...e, profile_url: "This profile URL is already taken" }));
        } else {
          setErrors((e) => ({ ...e, profile_url: undefined }));
        }
      } catch {
        setSlugStatus("idle");
      }
    }, 450);
    return () => clearTimeout(t);
  }, [values.profile_url]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/image\/(jpeg|png)/.test(file.type)) {
      toast.error("Please choose a JPG or PNG image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5 MB or smaller");
      return;
    }
    setUploadingPhoto(true);
    try {
      const path = await uploadTutorPhoto(file);
      setField("photo_path", path);
      setPhotoPreview(URL.createObjectURL(file));
      toast.success("Photo uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };

  const setField = <K extends keyof FormValues>(k: K, v: FormValues[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const toggleInArray = (k: "grade_levels" | "boards" | "languages", v: string) => {
    setValues((s) => {
      const arr = s[k] as string[];
      return { ...s, [k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] };
    });
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const addSubject = (raw: string) => {
    const s = raw.trim();
    if (!s) return;
    if (values.subjects.includes(s)) {
      setSubjectInput("");
      return;
    }
    setValues((v) => ({ ...v, subjects: [...v.subjects, s] }));
    setErrors((e) => ({ ...e, subjects: undefined }));
    setSubjectInput("");
  };

  const removeSubject = (s: string) =>
    setValues((v) => ({ ...v, subjects: v.subjects.filter((x) => x !== s) }));

  const onSubjectKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSubject(subjectInput);
    } else if (e.key === "Backspace" && !subjectInput && values.subjects.length) {
      removeSubject(values.subjects[values.subjects.length - 1]);
    }
  };

  const subjectSuggestions = useMemo(() => {
    const q = subjectInput.trim().toLowerCase();
    if (!q) return [];
    return POPULAR_SUBJECTS.filter(
      (s) => s.toLowerCase().includes(q) && !values.subjects.includes(s)
    ).slice(0, 6);
  }, [subjectInput, values.subjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    const fe: FieldErrors = {};
    if (!parsed.success) {
      parsed.error.issues.forEach((err: z.ZodIssue) => {
        const k = err.path[0] as keyof FormValues;
        if (k && !fe[k]) fe[k] = err.message;
      });
    }
    if (slugStatus === "taken") {
      fe.profile_url = fe.profile_url ?? "This profile URL is already taken";
    }
    if (Object.keys(fe).length > 0) {
      setErrors(fe);
      toast.error("Please fix the highlighted fields");
      const order: (keyof FormValues)[] = [
        "full_name","contact_number","email","profile_url","photo_path","introduction",
        "subjects","grade_levels","boards",
        "mode","country","state","city","area",
        "fee_min","fee_max",
        "qualification","experience_years","languages","availability",
      ];
      const firstKey = order.find((k) => fe[k]);
      if (firstKey) scrollToField(firstKey);
      return;
    }
    setSubmitting(true);
    try {
      const d = (parsed as { success: true; data: FormValues }).data;
      const { error } = await supabase.rpc("submit_tutor_application" as never, {
        _slug: d.profile_url,
        _name: d.full_name,
        _phone: d.contact_number,
        _email: d.email,
        _qualification: d.qualification,
        _subjects: d.subjects,
        _grade_levels: d.grade_levels,
        _boards: d.boards,
        _mode: d.mode,
        _country: d.country,
        _state: d.state || "",
        _city: d.city,
        _area: d.area || "",
        _fee_min: d.fee_min,
        _fee_max: d.fee_max === "" || d.fee_max === undefined ? null : Number(d.fee_max),
        _experience_years: d.experience_years,
        _languages: d.languages,
        _availability: d.availability,
        _photo_url: d.photo_path,
        _intro: d.introduction,
      } as never);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const Err = ({ k }: { k: keyof FormValues }) =>
    errors[k] ? <p className="text-sm text-destructive mt-1">{errors[k]}</p> : null;

  const CheckGroup = ({
    field,
    options,
    cols = 3,
  }: {
    field: "grade_levels" | "boards" | "languages";
    options: readonly string[];
    cols?: 2 | 3;
  }) => (
    <div
      className={`grid gap-2 ${cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3"}`}
    >
      {options.map((o) => {
        const id = `${field}-${o}`;
        const checked = (values[field] as string[]).includes(o);
        return (
          <label
            key={o}
            htmlFor={id}
            className={`flex items-center gap-2 rounded-md border p-2.5 text-sm cursor-pointer ${
              checked ? "border-foreground bg-muted/50" : "border-input"
            }`}
          >
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={() => toggleInArray(field, o)}
            />
            <span>{o}</span>
          </label>
        );
      })}
    </div>
  );

  if (submitted) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <Card className="p-8">
          <CardContent className="space-y-4 pt-6">
            <CheckCircle className="mx-auto h-16 w-16 text-accent" />
            <h1 className="font-heading text-3xl font-bold">Application Received!</h1>
            <p className="text-muted-foreground">
              Thank you, <strong>{values.full_name}</strong>. Your profile is under review by our admin team. Once approved, your profile will be live at:
            </p>
            <p className="font-mono text-sm font-semibold bg-muted py-2 rounded-lg">
              yourlearningmentor.com/tutor/{values.profile_url}
            </p>
            <Button asChild className="mt-4">
              <Link href="/find-a-tutor">Browse existing tutors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">Become a Tutor</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Join our network of independent tutors. List your subjects, experience, and rates to connect directly with students.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Tutor Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal info */}
            <section className="space-y-4">
              <h2 className="font-semibold text-lg font-heading">Personal Information</h2>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={values.full_name}
                  onChange={(e) => {
                    setField("full_name", e.target.value);
                    if (!values.profile_url) {
                      setField("profile_url", slugify(e.target.value));
                    }
                  }}
                  placeholder="e.g. Anjali Sharma"
                />
                <Err k="full_name" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_number">Mobile / WhatsApp Number (10 digits)</Label>
                  <Input
                    id="contact_number"
                    value={values.contact_number}
                    onChange={(e) => setField("contact_number", e.target.value)}
                    placeholder="9876543210"
                  />
                  <Err k="contact_number" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="anjali@example.com"
                  />
                  <Err k="email" />
                </div>
              </div>
              <div>
                <Label htmlFor="profile_url">Desired Profile URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    yourlearningmentor.com/tutor/
                  </span>
                  <Input
                    id="profile_url"
                    value={values.profile_url}
                    onChange={(e) => setField("profile_url", e.target.value.toLowerCase())}
                    placeholder="anjali-sharma"
                  />
                </div>
                {slugStatus === "checking" && <p className="text-xs text-muted-foreground mt-1">Checking URL availability...</p>}
                {slugStatus === "available" && <p className="text-xs text-emerald-600 font-medium mt-1">✓ URL is available</p>}
                <Err k="profile_url" />
              </div>
              <div>
                <Label htmlFor="photo_file">Profile Photo (JPG or PNG, max 5MB)</Label>
                <div className="mt-1 flex items-center gap-4">
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover border"
                    />
                  )}
                  <Input
                    id="photo_file"
                    ref={photoInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoChange}
                    disabled={uploadingPhoto}
                  />
                </div>
                <Err k="photo_path" />
              </div>
            </section>

            {/* Teaching Profile */}
            <section className="space-y-4">
              <h2 className="font-semibold text-lg font-heading">Teaching Profile</h2>
              <div>
                <Label htmlFor="introduction">Introduction / About You (at least 100 characters)</Label>
                <Textarea
                  id="introduction"
                  rows={4}
                  value={values.introduction}
                  onChange={(e) => setField("introduction", e.target.value)}
                  placeholder="Tell students about your teaching experience, methodology, background, and achievements..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {values.introduction.length}/2000 characters
                </p>
                <Err k="introduction" />
              </div>

              <div id="field-subjects" tabIndex={-1}>
                <Label>Subjects You Teach</Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {values.subjects.map((s) => (
                    <Badge key={s} variant="secondary" className="gap-1 px-3 py-1">
                      {s}
                      <X size={12} className="cursor-pointer hover:text-destructive" onClick={() => removeSubject(s)} />
                    </Badge>
                  ))}
                </div>
                <Input
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyDown={onSubjectKey}
                  placeholder="Type subject and press Enter or comma..."
                />
                {subjectSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {subjectSuggestions.map((s) => (
                      <Button
                        key={s}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => addSubject(s)}
                      >
                        + {s}
                      </Button>
                    ))}
                  </div>
                )}
                <Err k="subjects" />
              </div>

              <div id="field-grade_levels" tabIndex={-1}>
                <Label>Grade Levels</Label>
                <CheckGroup field="grade_levels" options={GRADE_LEVELS} />
                <Err k="grade_levels" />
              </div>

              <div id="field-boards" tabIndex={-1}>
                <Label>Boards Covered</Label>
                <CheckGroup field="boards" options={BOARDS} />
                <Err k="boards" />
              </div>
            </section>

            {/* Where & how */}
            <section className="space-y-4">
              <h2 className="font-semibold text-lg font-heading">Where & How</h2>
              <div>
                <Label htmlFor="mode">Teaching Mode</Label>
                <Select
                  value={values.mode}
                  onValueChange={(v) => setField("mode", v as FormValues["mode"])}
                >
                  <SelectTrigger id="mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Home Tutor</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={values.country}
                    onChange={(e) => setField("country", e.target.value)}
                  />
                  <Err k="country" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={values.state ?? ""}
                    onChange={(e) => setField("state", e.target.value)}
                    placeholder="e.g. Maharashtra"
                  />
                  <Err k="state" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={values.city}
                    onChange={(e) => setField("city", e.target.value)}
                    placeholder="e.g. Pune"
                  />
                  <Err k="city" />
                </div>
                <div>
                  <Label htmlFor="area">Area / Locality</Label>
                  <Input
                    id="area"
                    value={values.area ?? ""}
                    onChange={(e) => setField("area", e.target.value)}
                    placeholder="e.g. PCMC, Kothrud"
                  />
                  <Err k="area" />
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="space-y-4">
              <h2 className="font-semibold text-lg font-heading">Pricing</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fee_min">Minimum Fee (₹/hour)</Label>
                  <Input
                    id="fee_min"
                    type="number"
                    min={0}
                    value={values.fee_min || ""}
                    onChange={(e) => setField("fee_min", Number(e.target.value) as never)}
                  />
                  <Err k="fee_min" />
                </div>
                <div>
                  <Label htmlFor="fee_max">Maximum Fee (₹/hour) <span className="text-muted-foreground font-normal">— optional</span></Label>
                  <Input
                    id="fee_max"
                    type="number"
                    min={0}
                    value={values.fee_max === "" || values.fee_max === undefined ? "" : values.fee_max}
                    onChange={(e) =>
                      setField("fee_max", (e.target.value === "" ? "" : Number(e.target.value)) as never)
                    }
                  />
                  <Err k="fee_max" />
                </div>
              </div>
            </section>

            {/* Credentials */}
            <section className="space-y-4">
              <h2 className="font-semibold text-lg font-heading">Credentials</h2>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={values.qualification}
                  onChange={(e) => setField("qualification", e.target.value)}
                  placeholder="e.g. B.Ed, M.A. English, B.Tech"
                />
                <Err k="qualification" />
              </div>
              <div>
                <Label htmlFor="experience_years">Years of Experience</Label>
                <Select
                  value={values.experience_years}
                  onValueChange={(v) => setField("experience_years", v)}
                >
                  <SelectTrigger id="experience_years">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_BUCKETS.map((b) => (
                      <SelectItem key={b.value} value={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Err k="experience_years" />
              </div>
              <div id="field-languages" tabIndex={-1}>
                <Label>Languages You Teach In</Label>
                <CheckGroup field="languages" options={LANGUAGES} />
                <Err k="languages" />
              </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  value={values.availability}
                  onChange={(e) => setField("availability", e.target.value)}
                  placeholder="e.g. Weekday evenings & weekends, 5–9 PM IST"
                />
                <Err k="availability" />
              </div>
            </section>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
