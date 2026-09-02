"use client";

import { useState, useRef } from "react";
import { fireConfetti } from "@/lib/confetti";
import { generateCgpaReport } from "@/lib/generateCgpaReport";
import { Plus, Trash2, Calculator, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Semester {
  id: number;
  gpa: string;
  credits: string;
}

interface Subject {
  id: number;
  grade: string;
  credits: string;
}

const GRADE_TO_POINT: Record<string, number> = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  P: 4,
  F: 0,
};
const GRADE_OPTIONS = Object.keys(GRADE_TO_POINT);

export default function CgpaCalculatorClient() {
  // --- Semester mode state ---
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, gpa: "", credits: "" },
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<
    { semester: number; gpa: number; credits: number; weighted: number }[]
  >([]);
  const resultRef = useRef<HTMLDivElement>(null);

  // --- Subject mode state ---
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, grade: "O", credits: "4" },
    { id: 2, grade: "A+", credits: "4" },
    { id: 3, grade: "A", credits: "3" },
  ]);
  const [prevCgpa, setPrevCgpa] = useState("");
  const [prevCredits, setPrevCredits] = useState("");
  const [subjectResult, setSubjectResult] = useState<{
    semGpa: number;
    cgpa: number;
    totalCredits: number;
    totalPoints: number;
  } | null>(null);
  const subjectResultRef = useRef<HTMLDivElement>(null);

  let nextSemId = semesters.length > 0 ? Math.max(...semesters.map((s) => s.id)) + 1 : 1;
  let nextSubId = subjects.length > 0 ? Math.max(...subjects.map((s) => s.id)) + 1 : 1;

  // --- Semester handlers ---
  const addSemester = () =>
    setSemesters((p) => [...p, { id: nextSemId, gpa: "", credits: "" }]);
  const removeSemester = (id: number) =>
    setSemesters((p) => p.filter((s) => s.id !== id));
  const updateSemester = (id: number, field: "gpa" | "credits", value: string) =>
    setSemesters((p) => p.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const calculate = () => {
    const valid = semesters
      .map((s, i) => ({
        semester: i + 1,
        gpa: parseFloat(s.gpa),
        credits: parseFloat(s.credits),
      }))
      .filter((s) => !isNaN(s.gpa) && !isNaN(s.credits) && s.credits > 0);

    if (valid.length === 0) {
      setResult(0);
      setBreakdown([]);
      return;
    }

    const totalWeighted = valid.reduce((sum, s) => sum + s.gpa * s.credits, 0);
    const totalCredits = valid.reduce((sum, s) => sum + s.credits, 0);
    const cgpa = totalCredits > 0 ? totalWeighted / totalCredits : 0;

    setBreakdown(
      valid.map((s) => ({ ...s, weighted: parseFloat((s.gpa * s.credits).toFixed(2)) })),
    );
    const finalCgpa = parseFloat(cgpa.toFixed(2));
    setResult(finalCgpa);
    if (finalCgpa >= 4) fireConfetti();
    setTimeout(
      () => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      100,
    );
  };

  const reset = () => {
    setSemesters([{ id: 1, gpa: "", credits: "" }]);
    setResult(null);
    setBreakdown([]);
  };

  // --- Subject handlers ---
  const addSubject = () =>
    setSubjects((p) => [...p, { id: nextSubId, grade: "O", credits: "3" }]);
  const removeSubject = (id: number) =>
    setSubjects((p) => p.filter((s) => s.id !== id));
  const updateSubject = (id: number, field: "grade" | "credits", value: string) =>
    setSubjects((p) => p.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const calculateSubjects = () => {
    const valid = subjects
      .map((s) => ({
        point: GRADE_TO_POINT[s.grade] ?? 0,
        credits: parseFloat(s.credits),
      }))
      .filter((s) => !isNaN(s.credits) && s.credits > 0);

    if (valid.length === 0) {
      setSubjectResult(null);
      return;
    }

    const semCredits = valid.reduce((sum, s) => sum + s.credits, 0);
    const semPoints = valid.reduce((sum, s) => sum + s.point * s.credits, 0);
    const semGpa = semPoints / semCredits;

    const pCgpa = parseFloat(prevCgpa);
    const pCred = parseFloat(prevCredits);
    const hasPrev = !isNaN(pCgpa) && !isNaN(pCred) && pCred > 0;

    const totalCredits = semCredits + (hasPrev ? pCred : 0);
    const totalPoints = semPoints + (hasPrev ? pCgpa * pCred : 0);
    const cgpa = totalPoints / totalCredits;

    setSubjectResult({
      semGpa: parseFloat(semGpa.toFixed(2)),
      cgpa: parseFloat(cgpa.toFixed(2)),
      totalCredits: parseFloat(totalCredits.toFixed(2)),
      totalPoints: parseFloat(totalPoints.toFixed(2)),
    });

    if (cgpa >= 9) fireConfetti();
    setTimeout(
      () =>
        subjectResultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      100,
    );
  };

  const resetSubjects = () => {
    setSubjects([{ id: 1, grade: "O", credits: "3" }]);
    setPrevCgpa("");
    setPrevCredits("");
    setSubjectResult(null);
  };

  return (
    <>
      <Tabs defaultValue="subject" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="subject">By Subject Grades</TabsTrigger>
          <TabsTrigger value="semester">By Semester GPA</TabsTrigger>
        </TabsList>

        {/* ===== SUBJECT MODE ===== */}
        <TabsContent value="subject" className="mt-0">
          <Card className="mb-4">
            <CardContent className="p-5">
              <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Previous CGPA (optional)
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Previous CGPA</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="0.00"
                    value={prevCgpa}
                    onChange={(e) => setPrevCgpa(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Previous Credits</label>
                  <Input
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="0"
                    value={prevCredits}
                    onChange={(e) => setPrevCredits(e.target.value)}
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Leave blank if this is your first semester or you only want this semester's GPA.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <Card key={subject.id}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Subject {index + 1}
                    </div>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Grade</label>
                      <Select
                        value={subject.grade}
                        onValueChange={(v) => updateSubject(subject.id, "grade", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADE_OPTIONS.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g} ({GRADE_TO_POINT[g]})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Credits</label>
                      <Input
                        type="number"
                        step="0.5"
                        min="0.5"
                        placeholder="4"
                        value={subject.credits}
                        onChange={(e) =>
                          updateSubject(subject.id, "credits", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={addSubject}
              className="rounded-full flex-1 hover:bg-muted focus:bg-muted active:bg-muted"
            >
              <Plus size={16} className="mr-1" />
              Add Subject
            </Button>
            <Button onClick={calculateSubjects} className="rounded-full flex-1">
              <Calculator size={16} className="mr-1" />
              Calculate CGPA
            </Button>
          </div>

          {subjectResult && (
            <Card ref={subjectResultRef} className="mt-8 border-accent/30">
              <CardContent className="p-6 text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Semester GPA
                    </h3>
                    <p className="mt-1 text-3xl font-bold">
                      {subjectResult.semGpa.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-accent/40 p-4 bg-accent/5">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Cumulative CGPA
                    </h3>
                    <p className="mt-1 text-3xl font-bold text-accent">
                      {subjectResult.cgpa.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm">
                  Total Credits: <strong>{subjectResult.totalCredits}</strong> · Total
                  Grade Points: <strong>{subjectResult.totalPoints}</strong>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetSubjects}
                    className="text-muted-foreground"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Grade Reference Table</h3>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Marks</th>
                    <th className="px-3 py-2 text-left font-medium">Grade</th>
                    <th className="px-3 py-2 text-left font-medium">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["90–100", "O", 10],
                    ["80–89", "A+", 9],
                    ["70–79", "A", 8],
                    ["60–69", "B+", 7],
                    ["50–59", "B", 6],
                    ["40–49", "C", 5],
                    ["35–39", "P", 4],
                    ["Below 35", "F", 0],
                  ].map(([m, g, p]) => (
                    <tr key={g as string} className="border-t">
                      <td className="px-3 py-2">{m}</td>
                      <td className="px-3 py-2 font-medium">{g}</td>
                      <td className="px-3 py-2">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* ===== SEMESTER MODE ===== */}
        <TabsContent value="semester" className="mt-0">
          <div className="space-y-4">
            {semesters.map((semester, index) => (
              <Card key={semester.id}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Semester {index + 1}
                    </div>
                    {semesters.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSemester(semester.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">GPA / SGPA</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        placeholder="8.5"
                        value={semester.gpa}
                        onChange={(e) => updateSemester(semester.id, "gpa", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Total Credits</label>
                      <Input
                        type="number"
                        step="1"
                        min="1"
                        placeholder="80"
                        value={semester.credits}
                        onChange={(e) =>
                          updateSemester(semester.id, "credits", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={addSemester}
              className="rounded-full flex-1 hover:bg-muted focus:bg-muted active:bg-muted"
            >
              <Plus size={16} className="mr-1" />
              Add Semester
            </Button>
            <Button onClick={calculate} className="rounded-full flex-1">
              <Calculator size={16} className="mr-1" />
              Calculate CGPA
            </Button>
          </div>

          {result !== null && (
            <Card ref={resultRef} className="mt-8 border-accent/30">
              <CardContent className="p-6 text-center">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Your CGPA
                </h2>
                <p className="mt-2 text-5xl font-bold text-accent">{result.toFixed(2)}</p>

                {breakdown.length > 0 && (
                  <div className="mt-6 text-left">
                    <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                      Calculation Breakdown
                    </h3>
                    <div className="space-y-3">
                      {breakdown.map((row) => (
                        <div key={row.semester} className="rounded-lg border p-3">
                          <p className="text-sm font-semibold mb-1">
                            Semester {row.semester}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span>
                              GPA: <strong className="text-foreground">{row.gpa}</strong>
                            </span>
                            <span>
                              Credits:{" "}
                              <strong className="text-foreground">{row.credits}</strong>
                            </span>
                            <span>
                              Weighted:{" "}
                              <strong className="text-foreground">{row.weighted}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="rounded-lg bg-muted/50 p-3 text-sm font-medium">
                        Total Credits: {breakdown.reduce((s, r) => s + r.credits, 0)} ·
                        Total Weighted:{" "}
                        {breakdown.reduce((s, r) => s + r.weighted, 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateCgpaReport(result, breakdown)}
                    className="rounded-full w-full sm:w-auto"
                  >
                    <Download size={14} className="mr-1" />
                    Download PDF
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={reset}
                    className="text-muted-foreground w-full sm:w-auto"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* How to use */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">How to Use This Calculator</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-1">By Subject Grades</p>
              <p>
                Pick the letter grade (O, A+, A, B+, B, C, P, F) and enter the credit hours
                for each subject. Optionally enter your previous CGPA and total credits to
                get an updated cumulative CGPA.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">By Semester GPA</p>
              <p>
                Already know your semester GPA/SGPA? Enter each semester's GPA and credits
                to get your overall CGPA, plus a downloadable PDF report.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3 space-y-1">
            <p className="text-sm font-medium">
              Subject formula: GPA = Σ (Grade Point × Credits) / Σ Credits
            </p>
            <p className="text-sm font-medium">
              Semester formula: CGPA = Σ (GPA × Credits) / Σ Credits
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
