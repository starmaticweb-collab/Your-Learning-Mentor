"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { resolveTutorPhotoUrl } from "@/lib/tutorPhoto";
import PageLoader from "@/components/PageLoader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  BOARDS,
  GRADE_LEVELS,
  formatFees,
  modeLabel,
  slugify,
  unslug,
} from "@/lib/tutorTaxonomy";

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
  photo_url: string | null;
  intro: string | null;
};

const ANY = "__any__";

type Filters = {
  mode?: "online" | "offline" | "both";
  city?: string;
  area?: string;
  subject?: string;
  board?: string;
  grade?: string;
};

export default function FindATutorClient({ rest = "" }: { rest?: string }) {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [subject, setSubject] = useState<string>(ANY);
  const [mode, setMode] = useState<string>(ANY);
  const [city, setCity] = useState<string>(ANY);
  const [board, setBoard] = useState<string>(ANY);
  const [grade, setGrade] = useState<string>(ANY);

  useEffect(() => {
    let active = true;
    supabase
      .from("tutors_public")
      .select(
        "id,slug,name,subjects,grade_levels,boards,mode,country,state,city,area,experience_years,fee_min,fee_max,photo_url,intro"
      )
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!active) return;
        setTutors(((data ?? []) as Tutor[]));
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const allSubjects = useMemo(
    () =>
      Array.from(
        new Set(
          tutors
            .flatMap((t) => t.subjects || [])
            .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
        )
      ).sort(),
    [tutors]
  );
  const allCities = useMemo(
    () =>
      Array.from(
        new Set(
          tutors
            .map((t) => t.city)
            .filter((c): c is string => typeof c === "string" && c.trim().length > 0)
        )
      ).sort(),
    [tutors]
  );
  const allAreas = useMemo(
    () =>
      Array.from(
        new Set(
          tutors
            .map((t) => t.area)
            .filter((a): a is string => typeof a === "string" && a.trim().length > 0)
        )
      ).sort(),
    [tutors]
  );

  const urlFilters: Filters = useMemo(() => {
    const segs = rest.split("/").filter(Boolean).map((s) => s.toLowerCase());
    const f: Filters = {};
    const subjectSlugs = new Set(allSubjects.map((s) => slugify(s)));
    const citySlugs = new Set(allCities.map((s) => slugify(s)));
    const areaSlugs = new Set(allAreas.map((s) => slugify(s)));
    const boardSlugs = new Set(BOARDS.map((s) => slugify(s)));
    const gradeSlugs = new Set(GRADE_LEVELS.map((s) => slugify(s)));

    for (const seg of segs) {
      if (seg === "online" || seg === "offline" || seg === "both") {
        f.mode = seg as Filters["mode"];
      } else if (!f.city && citySlugs.has(seg)) {
        f.city = seg;
      } else if (!f.area && areaSlugs.has(seg)) {
        f.area = seg;
      } else if (!f.subject && subjectSlugs.has(seg)) {
        f.subject = seg;
      } else if (!f.board && boardSlugs.has(seg)) {
        f.board = seg;
      } else if (!f.grade && gradeSlugs.has(seg)) {
        f.grade = seg;
      }
    }
    return f;
  }, [rest, allSubjects, allCities, allAreas]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const findOriginal = (set: string[], slug: string) =>
      set.find((s) => slugify(s) === slug);

    return tutors.filter((t) => {
      if (urlFilters.mode && t.mode !== urlFilters.mode && urlFilters.mode !== "both") {
        if (!(urlFilters.mode === "online" && t.mode === "both")) return false;
      }
      if (urlFilters.city && slugify(t.city ?? "") !== urlFilters.city) return false;
      if (urlFilters.area && slugify(t.area ?? "") !== urlFilters.area) return false;
      if (urlFilters.subject) {
        const orig = findOriginal(allSubjects, urlFilters.subject);
        if (!orig || !(t.subjects ?? []).includes(orig)) return false;
      }
      if (urlFilters.board) {
        const orig = (BOARDS as readonly string[]).find((b) => slugify(b) === urlFilters.board);
        if (!orig || !(t.boards ?? []).includes(orig)) return false;
      }
      if (urlFilters.grade) {
        const orig = (GRADE_LEVELS as readonly string[]).find((g) => slugify(g) === urlFilters.grade);
        if (!orig || !(t.grade_levels ?? []).includes(orig)) return false;
      }

      if (subject !== ANY && !(t.subjects ?? []).includes(subject)) return false;
      if (mode !== ANY && t.mode !== mode) return false;
      if (city !== ANY && t.city !== city) return false;
      if (board !== ANY && !(t.boards ?? []).includes(board)) return false;
      if (grade !== ANY && !(t.grade_levels ?? []).includes(grade)) return false;
      if (!needle) return true;
      const hay = [t.name ?? "", t.city ?? "", t.area ?? "", (t.subjects ?? []).join(" "), t.intro ?? ""]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [tutors, q, subject, mode, city, board, grade, urlFilters, allSubjects]);


  const reset = () => {
    setQ("");
    setSubject(ANY);
    setMode(ANY);
    setCity(ANY);
    setBoard(ANY);
    setGrade(ANY);
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const seo = useMemo(() => {
    const cityName = urlFilters.city ? unslug(urlFilters.city) : null;
    const areaName = urlFilters.area ? unslug(urlFilters.area) : null;
    const subjectName = urlFilters.subject ? unslug(urlFilters.subject) : null;
    const boardName = urlFilters.board
      ? (BOARDS as readonly string[]).find((b) => slugify(b) === urlFilters.board) ?? null
      : null;
    const gradeName = urlFilters.grade
      ? (GRADE_LEVELS as readonly string[]).find((g) => slugify(g) === urlFilters.grade) ?? null
      : null;
    const isOnline = urlFilters.mode === "online";

    let h1 = "Find a Tutor";
    let title = "Find a Tutor";
    let desc = "Browse independent home and online tutors. Connect directly with verified tutors across India.";

    if (isOnline && subjectName && boardName) {
      h1 = `Online ${subjectName} Tutors for ${boardName}`;
      title = `Online ${subjectName} Tutors — ${boardName}`;
      desc = `Find online ${subjectName} tutors teaching the ${boardName} curriculum. Direct contact, transparent fees.`;
    } else if (isOnline && subjectName) {
      h1 = `Online ${subjectName} Tutors`;
      title = `Online ${subjectName} Tutors in India`;
      desc = `Connect directly with online ${subjectName} tutors across India. Browse profiles, fees and experience.`;
    } else if (isOnline) {
      h1 = "Online Tutors";
      title = "Online Tutors in India";
      desc = "Browse online tutors across subjects and grades. Direct contact, no middlemen.";
    } else if (cityName && subjectName && boardName) {
      h1 = `${boardName} ${subjectName} Tutors in ${cityName}`;
      title = `${boardName} ${subjectName} Tutors in ${cityName}`;
      desc = `Find ${boardName} ${subjectName} tutors in ${cityName}. Browse verified profiles and reach out directly.`;
    } else if (cityName && subjectName && gradeName) {
      h1 = `${subjectName} Tutors in ${cityName} for ${gradeName}`;
      title = `${subjectName} Tutors in ${cityName} — ${gradeName}`;
      desc = `Find ${subjectName} tutors in ${cityName} teaching ${gradeName}. Direct contact, transparent fees.`;
    } else if (cityName && subjectName) {
      h1 = `${subjectName} Tutors in ${cityName}`;
      title = `${subjectName} Tutors in ${cityName} — CBSE, ICSE, SSC`;
      desc = `Find ${subjectName} tutors in ${cityName} across boards and grades. Direct contact with verified tutors.`;
    } else if (cityName && areaName) {
      h1 = `Tutors in ${areaName}, ${cityName}`;
      title = `Tutors in ${areaName}, ${cityName} — Home Tutors Near You`;
      desc = `Find home tutors in ${areaName}, ${cityName}. Browse profiles and contact tutors directly.`;
    } else if (cityName) {
      h1 = `Tutors in ${cityName}`;
      title = `Tutors in ${cityName} — Find Home & Online Tutors`;
      desc = `Browse home and online tutors in ${cityName}. Direct contact, transparent fees, verified profiles.`;
    }

    return { h1, title, desc };
  }, [urlFilters]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">{seo.h1}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{seo.desc}</p>

        <Card className="mt-8">
          <CardContent className="p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="q">Search</Label>
                <Input
                  id="q"
                  placeholder="Name, subject, city..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any subject</SelectItem>
                    {allSubjects.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mode</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any mode</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Home Tutor</SelectItem>
                    <SelectItem value="both">Online & Home Tutor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any city</SelectItem>
                    {allCities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Board</Label>
                <Select value={board} onValueChange={setBoard}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any board</SelectItem>
                    {BOARDS.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grade</Label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any grade</SelectItem>
                    {GRADE_LEVELS.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filtered.length} of {tutors.length} tutors</span>
              <Button variant="outline" size="sm" onClick={reset}>Reset filters</Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="mt-10"><PageLoader /></div>
        ) : filtered.length === 0 ? (
          <Card className="mt-10">
            <CardContent className="p-10 text-center">
              <p className="text-lg font-semibold">No tutors match your filters.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try clearing filters or check back soon.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {filtered.map((t) => {
              const fee = formatFees(t.fee_min, t.fee_max);
              return (
                <Card key={t.id} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted text-base font-semibold">
                        {resolveTutorPhotoUrl(t.photo_url) ? (
                          <Image
                            src={resolveTutorPhotoUrl(t.photo_url)!}
                            alt={t.name}
                            className="h-14 w-14 rounded-full object-cover"
                            width={56}
                            height={56}
                          />
                        ) : (
                          initials(t.name)
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-lg font-semibold font-heading">{t.name}</h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">{(t.subjects ?? []).join(", ")}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {modeLabel(t.mode)}
                          {t.area ? ` · ${t.area}` : ""}
                          {t.city ? ` · ${t.city}` : ""}
                          {(t.grade_levels?.length ?? 0) > 0 ? ` · ${(t.grade_levels ?? []).join(", ")}` : ""}
                        </p>
                        {(t.boards?.length ?? 0) > 0 && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Boards: {(t.boards ?? []).join(", ")}
                          </p>
                        )}
                      </div>
                    </div>

                    {t.intro && (
                      <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{t.intro}</p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                      <div className="text-muted-foreground">
                        {t.experience_years && <span>{t.experience_years} yrs</span>}
                        {t.experience_years && fee && <span> · </span>}
                        {fee && <span className="font-medium text-foreground">{fee}</span>}
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/tutor/${t.slug}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
