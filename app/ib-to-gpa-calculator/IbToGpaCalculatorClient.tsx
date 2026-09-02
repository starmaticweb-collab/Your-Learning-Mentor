"use client";

import { useState, useRef } from "react";
import { fireConfetti } from "@/lib/confetti";
import { Plus, Trash2, Calculator } from "lucide-react";
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

// IB score (1-7) → GPA conversion
// Unweighted scale (used by most US universities)
const UNWEIGHTED: Record<number, number> = {
  7: 4.0,
  6: 3.7,
  5: 3.3,
  4: 3.0,
  3: 2.7,
  2: 2.3,
  1: 2.0,
};

// Weighted scale that rewards HL courses
const WEIGHTED: Record<"SL" | "HL", Record<number, number>> = {
  SL: { 7: 4.0, 6: 3.67, 5: 3.33, 4: 3.0, 3: 2.67, 2: 2.33, 1: 2.0 },
  HL: { 7: 4.33, 6: 4.0, 5: 3.67, 4: 3.33, 3: 3.0, 2: 2.67, 1: 2.33 },
};

const SCORE_OPTIONS = [7, 6, 5, 4, 3, 2, 1];

interface Subject {
  id: number;
  name: string;
  level: "SL" | "HL";
  score: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export default function IbToGpaCalculatorClient() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "", level: "HL", score: "" },
    { id: 2, name: "", level: "HL", score: "" },
    { id: 3, name: "", level: "HL", score: "" },
    { id: 4, name: "", level: "SL", score: "" },
    { id: 5, name: "", level: "SL", score: "" },
    { id: 6, name: "", level: "SL", score: "" },
  ]);
  const [showNames, setShowNames] = useState(false);
  const [casPoints, setCasPoints] = useState("");
  const [result, setResult] = useState<{
    unweighted: number;
    weighted: number;
    totalIb: number;
    casBonus: number;
    breakdown: { idx: number; name: string; level: "SL" | "HL"; score: number; unw: number; w: number }[];
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const nextId = subjects.length > 0 ? Math.max(...subjects.map((s) => s.id)) + 1 : 1;

  const addSubject = () => {
    if (subjects.length >= 12) return;
    setSubjects((prev) => [...prev, { id: nextId, name: "", level: "SL", score: "" }]);
  };

  const removeSubject = (id: number) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubject = (id: number, field: keyof Omit<Subject, "id">, value: string) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculate = () => {
    const valid = subjects
      .map((s, i) => ({
        idx: i + 1,
        name: s.name,
        level: s.level,
        score: parseInt(s.score, 10),
      }))
      .filter((s) => !isNaN(s.score) && s.score >= 1 && s.score <= 7);

    if (valid.length === 0) {
      setResult(null);
      return;
    }

    const unwSum = valid.reduce((sum, s) => sum + UNWEIGHTED[s.score], 0);
    const wSum = valid.reduce((sum, s) => sum + WEIGHTED[s.level][s.score], 0);
    const unwAvg = round2(unwSum / valid.length);
    const wAvg = round2(wSum / valid.length);

    const cas = parseInt(casPoints, 10);
    const casBonus = !isNaN(cas) && cas >= 1 && cas <= 3 ? cas * 0.05 : 0;
    const weighted = round2(Math.min(wAvg + casBonus, 4.33));

    setResult({
      unweighted: unwAvg,
      weighted,
      totalIb: valid.reduce((sum, s) => sum + s.score, 0) + (!isNaN(cas) && cas >= 1 && cas <= 3 ? cas : 0),
      casBonus,
      breakdown: valid.map((s) => ({
        idx: s.idx,
        name: s.name,
        level: s.level,
        score: s.score,
        unw: UNWEIGHTED[s.score],
        w: WEIGHTED[s.level][s.score],
      })),
    });

    if (unwAvg >= 3.7) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setSubjects([
      { id: 1, name: "", level: "HL", score: "" },
      { id: 2, name: "", level: "HL", score: "" },
      { id: 3, name: "", level: "HL", score: "" },
      { id: 4, name: "", level: "SL", score: "" },
      { id: 5, name: "", level: "SL", score: "" },
      { id: 6, name: "", level: "SL", score: "" },
    ]);
    setCasPoints("");
    setResult(null);
  };

  return (
    <>
      {/* CAS Points */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-heading">
            CAS Points (optional)
          </h2>
          <div>
            <label className="text-sm font-medium mb-1.5 block">CAS Points (1-3)</label>
            <Input
              type="number"
              step="1"
              min="0"
              max="3"
              placeholder="e.g. 2"
              value={casPoints}
              onChange={(e) => {
                let val = e.target.value;
                if (val) {
                  const n = parseInt(val, 10);
                  if (!isNaN(n) && n > 3) val = "3";
                  if (!isNaN(n) && n < 0) val = "0";
                }
                setCasPoints(val);
              }}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              IB awards up to 3 bonus points for Creativity, Activity, and Service. Each point adds 0.05 to the weighted GPA.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Show subject names toggle */}
      <div className="mb-4 flex items-center gap-2">
        <input
          id="show-names"
          type="checkbox"
          checked={showNames}
          onChange={(e) => setShowNames(e.target.checked)}
          className="h-4 w-4 rounded border-input"
        />
        <label htmlFor="show-names" className="text-sm">
          Show subject name fields
        </label>
      </div>

      {/* Subject inputs */}
      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <Card key={subject.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Subject {index + 1}
                </h3>
                {subjects.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSubject(subject.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </Button>
                )}
              </div>
              {showNames && (
                <div className="mb-3">
                  <label className="text-sm font-medium mb-1.5 block">Subject Name</label>
                  <Input
                    type="text"
                    placeholder="e.g. Mathematics AA"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Level</label>
                  <Select
                    value={subject.level}
                    onValueChange={(val) => updateSubject(subject.id, "level", val as "SL" | "HL")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SL">SL (Standard Level)</SelectItem>
                      <SelectItem value="HL">HL (Higher Level)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">IB Score (1-7)</label>
                  <Select
                    value={subject.score}
                    onValueChange={(val) => updateSubject(subject.id, "score", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCORE_OPTIONS.map((s) => (
                        <SelectItem key={s} value={String(s)}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          onClick={addSubject}
          className="rounded-full flex-1 hover:bg-muted focus:bg-muted active:bg-muted"
        >
          <Plus size={16} className="mr-1" />
          Add Subject
        </Button>
        <Button onClick={calculate} className="rounded-full flex-1">
          <Calculator size={16} className="mr-1" />
          Convert to GPA
        </Button>
      </div>

      {/* Result */}
      {result !== null && (
        <Card ref={resultRef} className="mt-8 border-accent/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">
              Unweighted GPA
            </p>
            <p className="mt-2 text-5xl font-bold text-accent">{result.unweighted.toFixed(2)}</p>
            <p className="mt-1 text-xs text-muted-foreground">on the standard US 4.0 scale</p>

            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">
                Weighted GPA (HL bonus{result.casBonus > 0 ? " + CAS" : ""})
              </p>
              <p className="mt-2 text-4xl font-bold">{result.weighted.toFixed(2)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                out of 4.33 · IB Total Points: {result.totalIb}
              </p>
            </div>

            {result.breakdown.length > 0 && (
              <div className="mt-6 text-left">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider font-heading">
                  Subject Breakdown
                </h4>
                <div className="space-y-3">
                  {result.breakdown.map((row) => (
                    <div key={row.idx} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold mb-1">
                        {row.name ? row.name : `Subject ${row.idx}`} · {row.level}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>IB Score: <strong className="text-foreground">{row.score}</strong></span>
                        <span>Unweighted: <strong className="text-foreground">{row.unw.toFixed(2)}</strong></span>
                        <span>Weighted: <strong className="text-foreground">{row.w.toFixed(2)}</strong></span>
                      </div>
                    </div>
                  ))}
                  {result.casBonus > 0 && (
                    <div className="rounded-lg bg-muted/50 p-3 text-sm font-medium">
                      CAS Bonus added to weighted GPA: +{result.casBonus.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-center">
              <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conversion Chart */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">IB Score to GPA Conversion Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">IB Score</th>
                  <th className="py-2 text-right font-semibold">Unweighted GPA</th>
                  <th className="py-2 text-right font-semibold">SL GPA</th>
                  <th className="py-2 text-right font-semibold">HL GPA</th>
                </tr>
              </thead>
              <tbody>
                {SCORE_OPTIONS.map((s) => (
                  <tr key={s} className="border-b last:border-0">
                    <td className="py-2 font-medium">{s}</td>
                    <td className="py-2 text-right text-muted-foreground">{UNWEIGHTED[s].toFixed(2)}</td>
                    <td className="py-2 text-right text-muted-foreground">{WEIGHTED.SL[s].toFixed(2)}</td>
                    <td className="py-2 text-right text-muted-foreground">{WEIGHTED.HL[s].toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Most US universities use the unweighted column. The weighted SL/HL columns reward the extra rigour of Higher Level courses, capped at 4.33.
          </p>
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">How to Use This Calculator</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> For each IB subject, choose SL or HL and select your score from 1 to 7.</p>
            <p><strong className="text-foreground">Step 2:</strong> (Optional) Enter your CAS bonus points (0-3) earned for Theory of Knowledge and the Extended Essay.</p>
            <p><strong className="text-foreground">Step 3:</strong> Tick "Show subject name fields" if you want to label each subject.</p>
            <p><strong className="text-foreground">Step 4:</strong> Add more subjects if needed (most IBDP students take 6).</p>
            <p><strong className="text-foreground">Step 5:</strong> Click "Convert to GPA" to see both unweighted and weighted GPA values.</p>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3 space-y-1">
            <p className="text-sm font-medium">Unweighted GPA = Average of converted IB scores using the standard 4.0 chart</p>
            <p className="text-sm font-medium">Weighted GPA = Average of SL/HL converted scores + (CAS × 0.05), capped at 4.33</p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">About the IB to GPA Calculator</h2>
          <p className="text-sm text-muted-foreground">
            The International Baccalaureate Diploma Programme (IBDP) grades each subject on a 1-7 scale, while most American universities use a 4.0 GPA scale. Because the two systems differ in rigour and structure, converting between them is not a single fixed formula. This tool uses the two most widely accepted conversion charts so you can present your IB results in a form admissions officers understand.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            The unweighted GPA is the most commonly used by US universities and treats SL and HL equally. The weighted GPA gives Higher Level subjects extra credit and adds your CAS bonus points, reflecting the additional academic challenge of a full IB Diploma.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Keep in mind that GPA is only one part of an application. Universities also review SAT/ACT scores, essays, recommendations, and extracurricular achievements. If you are still in the predicted-grades stage, work with your IB coordinator to make sure your predicted scores closely match your eventual final results.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Need a different conversion? Try the{" "}
            <a href="/gpa-to-percentage-converter" className="underline">GPA to Percentage Converter</a> or the{" "}
            <a href="/gpa-calculator" className="underline">GPA Calculator</a>.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
