"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { fireConfetti } from "@/lib/confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Scale = "4.0" | "5.0" | "10.0";

const scaleOptions: { value: Scale; label: string; formula: string; max: number }[] = [
  { value: "4.0", label: "4.0 Scale (USA, Canada, Most Countries)", formula: "Percentage = (GPA / 4.0) × 100", max: 4 },
  { value: "5.0", label: "5.0 Scale (Germany, Some European Countries)", formula: "Percentage = (GPA / 5.0) × 100", max: 5 },
  { value: "10.0", label: "10.0 Scale (India, Nepal, Asian Countries)", formula: "Percentage = GPA × 9.5", max: 10 },
];

const conversionTable = [
  { gpa: 4.0, pct: "100%", grade: "A+", perf: "Outstanding" },
  { gpa: 3.9, pct: "97.5%", grade: "A+", perf: "Excellent" },
  { gpa: 3.7, pct: "92.5%", grade: "A", perf: "Excellent" },
  { gpa: 3.5, pct: "87.5%", grade: "A-", perf: "Very Good" },
  { gpa: 3.3, pct: "82.5%", grade: "B+", perf: "Good" },
  { gpa: 3.0, pct: "75%", grade: "B", perf: "Good" },
  { gpa: 2.7, pct: "67.5%", grade: "B-", perf: "Above Average" },
  { gpa: 2.5, pct: "62.5%", grade: "C+", perf: "Average" },
  { gpa: 2.3, pct: "57.5%", grade: "C", perf: "Average" },
  { gpa: 2.0, pct: "50%", grade: "C-", perf: "Pass" },
];

export default function GpaToPercentageClient() {
  const [scale, setScale] = useState<Scale>("4.0");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const activeScale = scaleOptions.find((s) => s.value === scale)!;

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val) || val < 0 || val > activeScale.max) return;

    let pct: number;
    if (scale === "10.0") {
      pct = val * 9.5;
    } else {
      pct = (val / activeScale.max) * 100;
    }
    setResult(`${pct.toFixed(2)}%`);
    if (pct >= 40) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Your GPA Scale</label>
            <Select value={scale} onValueChange={(v: Scale) => { setScale(v); setResult(null); setValue(""); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scaleOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-muted p-3 text-center text-sm font-medium">
            Formula: {activeScale.formula}
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Enter Your GPA</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              max={activeScale.max}
              placeholder={`e.g., ${activeScale.max === 4 ? "3.5" : activeScale.max === 5 ? "4.2" : "8.5"}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <Button onClick={convert} className="w-full rounded-full">
            Convert to Percentage
          </Button>

          {result && (
            <div ref={resultRef} className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium font-heading">Your Percentage</p>
              <p className="mt-2 text-5xl font-bold text-accent">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Understanding section */}
      <Card className="mt-10">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">Understanding GPA to Percentage Conversion</h2>
          <p className="text-sm text-muted-foreground">
            <strong>GPA (Grade Point Average)</strong> is a standardized measure of academic performance used primarily in the United States, Canada, and many international universities. <strong>Percentage</strong> is the traditional grading system used in India and many other countries, representing marks out of 100.
          </p>
          <p className="text-sm text-muted-foreground">
            Converting GPA to percentage is essential for Indian students when applying to domestic universities, government jobs, or situations where percentage scores are required instead of GPA. You can also use our <Link href="/cgpa-calculator" className="font-medium text-accent underline underline-offset-4 hover:text-accent/80">CGPA Calculator</Link> to calculate your cumulative GPA across multiple semesters.
          </p>
        </CardContent>
      </Card>

      {/* Formulas */}
      <Card className="mt-6">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">GPA to Percentage Conversion Formulas</h2>
          <p className="text-sm text-muted-foreground">The conversion formula depends on which GPA scale you're using:</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm">4.0 GPA Scale (Most Common)</h3>
              <div className="rounded-lg bg-muted p-3 mt-1 font-mono text-sm font-bold">Percentage = (GPA / 4.0) × 100</div>
              <p className="text-sm text-muted-foreground mt-1"><strong>Example:</strong> 3.5 GPA → (3.5 / 4.0) × 100 = <strong>87.5%</strong></p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">5.0 GPA Scale</h3>
              <div className="rounded-lg bg-muted p-3 mt-1 font-mono text-sm font-bold">Percentage = (GPA / 5.0) × 100</div>
              <p className="text-sm text-muted-foreground mt-1"><strong>Example:</strong> 4.2 GPA → (4.2 / 5.0) × 100 = <strong>84%</strong></p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">10.0 GPA Scale (India)</h3>
              <div className="rounded-lg bg-muted p-3 mt-1 font-mono text-sm font-bold">Percentage = GPA × 9.5</div>
              <p className="text-sm text-muted-foreground mt-1"><strong>Example:</strong> 8.5 GPA → 8.5 × 9.5 = <strong>80.75%</strong></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Table */}
      <Card className="mt-6">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">GPA to Percentage Conversion Table (4.0 Scale)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">GPA</th>
                  <th className="py-2 text-left font-semibold">Percentage</th>
                  <th className="py-2 text-left font-semibold">Letter Grade</th>
                  <th className="py-2 text-left font-semibold">Performance</th>
                </tr>
              </thead>
              <tbody>
                {conversionTable.map((row) => (
                  <tr key={row.gpa} className="border-b last:border-0">
                    <td className="py-2">{row.gpa.toFixed(1)}</td>
                    <td className="py-2">{row.pct}</td>
                    <td className="py-2">{row.grade}</td>
                    <td className="py-2">{row.perf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Why Convert */}
      <Card className="mt-6">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">Why Convert GPA to Percentage?</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><strong>Indian University Applications:</strong> Most Indian universities require percentage scores for admission to postgraduate programs</li>
            <li><strong>Government Job Applications:</strong> UPSC, SSC, and state government jobs typically require percentage-based eligibility</li>
            <li><strong>Scholarship Applications:</strong> Many Indian scholarship programs specify minimum percentage requirements</li>
            <li><strong>Resume Building:</strong> Indian employers are more familiar with percentage-based academic scores</li>
            <li><strong>Entrance Exams:</strong> CAT, GATE, and other competitive exams may require percentage for eligibility</li>
          </ul>
        </CardContent>
      </Card>

      {/* What is a Good Percentage */}
      <Card className="mt-6">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">What is a Good Percentage?</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><strong>90–100% (3.6–4.0 GPA):</strong> Distinction — Excellent for top universities and competitive programs</li>
            <li><strong>75–89% (3.0–3.5 GPA):</strong> First Class — Good for most universities and job opportunities</li>
            <li><strong>60–74% (2.4–2.9 GPA):</strong> Second Class — Meets minimum requirements for many programs</li>
            <li><strong>50–59% (2.0–2.3 GPA):</strong> Pass Class — Basic eligibility for most opportunities</li>
            <li><strong>Below 50% (Below 2.0 GPA):</strong> Fail — Does not meet minimum academic standards</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            <strong>Important Note:</strong> A 3.0 GPA (75%) is considered the minimum for most competitive Indian programs and government jobs. Many top institutions require 80%+ (3.2+ GPA) for admission.
          </p>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mt-6">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-lg font-bold font-heading">Frequently Asked Questions</h2>

          {[
            { q: "What percentage is 3.5 GPA?", a: "On a 4.0 scale, 3.5 GPA equals 87.5%. This is calculated as (3.5 / 4.0) × 100 = 87.5%." },
            { q: "What percentage is 3.0 GPA?", a: "On a 4.0 scale, 3.0 GPA equals 75%. This is the standard minimum for many competitive programs in India." },
            { q: "Is 3.7 GPA good in India?", a: "Yes, 3.7 GPA (approximately 92.5%) is excellent in India and competitive for top universities, scholarships, and job opportunities." },
            { q: "Can I use this conversion for job applications?", a: "Yes, most employers accept self-reported conversions. However, you should be prepared to provide your original transcript showing the GPA if requested." },
            { q: "What if my university uses a different scale?", a: "If your university uses a unique grading scale, contact your registrar's office for the official conversion formula. Some institutions provide conversion certificates." },
          ].map((faq) => (
            <div key={faq.q} className="border-t pt-4 first:border-0 first:pt-0">
              <h3 className="font-semibold text-sm">{faq.q}</h3>
              <p className="text-sm text-muted-foreground mt-1">{faq.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
