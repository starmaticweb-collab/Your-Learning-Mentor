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

// Drexel University grading scale (no D-)
const GRADE_OPTIONS = [
  { label: "A+", value: "4.00_A+" },
  { label: "A", value: "4.00_A" },
  { label: "A-", value: "3.67_A-" },
  { label: "B+", value: "3.33_B+" },
  { label: "B", value: "3.00_B" },
  { label: "B-", value: "2.67_B-" },
  { label: "C+", value: "2.33_C+" },
  { label: "C", value: "2.00_C" },
  { label: "C-", value: "1.67_C-" },
  { label: "D+", value: "1.33_D+" },
  { label: "D", value: "1.00_D" },
  { label: "F", value: "0.00_F" },
];

const parseGradeValue = (val: string) => parseFloat(val.split("_")[0]);
const parseGradeLabel = (val: string) => val.split("_")[1];

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

const truncate2 = (n: number) => Math.trunc(n * 100) / 100;

export default function DrexelGpaCalculatorClient() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", grade: "", credits: "" },
    { id: 2, name: "", grade: "", credits: "" },
    { id: 3, name: "", grade: "", credits: "" },
  ]);
  const [showNames, setShowNames] = useState(false);
  const [priorGpa, setPriorGpa] = useState("");
  const [priorCredits, setPriorCredits] = useState("");
  const [result, setResult] = useState<{
    sgpa: number;
    cgpa: number | null;
    totalCredits: number;
    totalPoints: number;
    breakdown: { course: number; name: string; grade: string; credits: number; points: number }[];
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const nextId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;

  const addCourse = () => {
    if (courses.length >= 50) return;
    setCourses((prev) => [...prev, { id: nextId, name: "", grade: "", credits: "" }]);
  };

  const removeCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: number, field: "name" | "grade" | "credits", value: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculate = () => {
    const valid = courses
      .map((c, i) => ({
        course: i + 1,
        name: c.name,
        gradeVal: c.grade ? parseGradeValue(c.grade) : NaN,
        gradeLabel: c.grade ? parseGradeLabel(c.grade) : "",
        credits: parseFloat(c.credits),
      }))
      .filter((c) => !isNaN(c.gradeVal) && !isNaN(c.credits) && c.credits > 0);

    if (valid.length === 0) {
      setResult({ sgpa: 0, cgpa: null, totalCredits: 0, totalPoints: 0, breakdown: [] });
      return;
    }

    const semPoints = valid.reduce((s, c) => s + c.gradeVal * c.credits, 0);
    const semCredits = valid.reduce((s, c) => s + c.credits, 0);
    const sgpa = truncate2(semPoints / semCredits);

    let cgpa: number | null = null;
    const pGpa = parseFloat(priorGpa);
    const pCredits = parseFloat(priorCredits);
    if (!isNaN(pGpa) && !isNaN(pCredits) && pCredits > 0) {
      const totalPts = pGpa * pCredits + semPoints;
      const totalCr = pCredits + semCredits;
      cgpa = truncate2(totalPts / totalCr);
    }

    setResult({
      sgpa,
      cgpa,
      totalCredits: semCredits,
      totalPoints: parseFloat(semPoints.toFixed(2)),
      breakdown: valid.map((c) => ({
        course: c.course,
        name: c.name,
        grade: c.gradeLabel,
        credits: c.credits,
        points: parseFloat((c.gradeVal * c.credits).toFixed(2)),
      })),
    });

    if ((cgpa ?? sgpa) >= 3.5) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setCourses([
      { id: 1, name: "", grade: "", credits: "" },
      { id: 2, name: "", grade: "", credits: "" },
      { id: 3, name: "", grade: "", credits: "" },
    ]);
    setPriorGpa("");
    setPriorCredits("");
    setResult(null);
  };

  return (
    <>
      {/* Prior CGPA */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-heading">
            Prior Cumulative GPA (optional)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Cumulative GPA</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="4"
                placeholder="3.50"
                value={priorGpa}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val) {
                    const n = parseFloat(val);
                    if (!isNaN(n) && n > 4) val = "4";
                    if (!isNaN(n) && n < 0) val = "0";
                  }
                  setPriorGpa(val);
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Credits Earned</label>
              <Input
                type="number"
                step="1"
                min="0"
                placeholder="45"
                value={priorCredits}
                onChange={(e) => setPriorCredits(e.target.value)}
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Leave blank to calculate only this semester's GPA.
          </p>
        </CardContent>
      </Card>

      {/* Show course names toggle */}
      <div className="mb-4 flex items-center gap-2">
        <input
          id="show-names"
          type="checkbox"
          checked={showNames}
          onChange={(e) => setShowNames(e.target.checked)}
          className="h-4 w-4 rounded border-input"
        />
        <label htmlFor="show-names" className="text-sm">
          Show course description fields
        </label>
      </div>

      {/* Course inputs */}
      <div className="space-y-4">
        {courses.map((course, index) => (
          <Card key={course.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Course {index + 1}
                </h3>
                {courses.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCourse(course.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </Button>
                )}
              </div>
              {showNames && (
                <div className="mb-3">
                  <label className="text-sm font-medium mb-1.5 block">Course Name</label>
                  <Input
                    type="text"
                    placeholder="e.g. CS 171 Intro to Computing"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Grade</label>
                  <Select
                    value={course.grade}
                    onValueChange={(val) => updateCourse(course.id, "grade", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADE_OPTIONS.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
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
                    min="0"
                    placeholder="3"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                  />
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
          onClick={addCourse}
          className="rounded-full flex-1 hover:bg-muted focus:bg-muted active:bg-muted"
        >
          <Plus size={16} className="mr-1" />
          Add Course
        </Button>
        <Button onClick={calculate} className="rounded-full flex-1">
          <Calculator size={16} className="mr-1" />
          Calculate GPA
        </Button>
      </div>

      {/* Result */}
      {result !== null && (
        <Card ref={resultRef} className="mt-8 border-accent/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">
              Semester GPA
            </p>
            <p className="mt-2 text-5xl font-bold text-accent">{result.sgpa.toFixed(2)}</p>

            {result.cgpa !== null && (
              <div className="mt-6">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">
                  New Cumulative GPA
                </p>
                <p className="mt-2 text-4xl font-bold">{result.cgpa.toFixed(2)}</p>
              </div>
            )}

            {result.breakdown.length > 0 && (
              <div className="mt-6 text-left">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider font-heading">
                  Calculation Breakdown
                </h4>
                <div className="space-y-3">
                  {result.breakdown.map((row) => (
                    <div key={row.course} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold mb-1">
                        {row.name ? row.name : `Course ${row.course}`}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>Grade: <strong className="text-foreground">{row.grade}</strong></span>
                        <span>Credits: <strong className="text-foreground">{row.credits}</strong></span>
                        <span>Quality Pts: <strong className="text-foreground">{row.points}</strong></span>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-lg bg-muted/50 p-3 text-sm font-medium">
                    Total Credits: {result.totalCredits} · Weighted Grade Sum: {result.totalPoints.toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={reset}
                className="text-muted-foreground"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grading Scale */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">Drexel Grading Scale</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {GRADE_OPTIONS.map((g) => (
              <div key={g.value} className="flex justify-between rounded-lg border px-3 py-2">
                <span className="font-medium">{g.label}</span>
                <span className="text-muted-foreground">{parseGradeValue(g.value).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Based on the official Drexel University 4.00 grading scale. GPA is truncated to two decimals, not rounded.
          </p>
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">How to Use This Calculator</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> (Optional) Enter your prior cumulative GPA and the credits you have earned so far.</p>
            <p><strong className="text-foreground">Step 2:</strong> For each course this semester, select the letter grade and enter the credit hours.</p>
            <p><strong className="text-foreground">Step 3:</strong> Tick "Show course description fields" to label each course by name.</p>
            <p><strong className="text-foreground">Step 4:</strong> Click "Add Course" for additional courses (up to 50).</p>
            <p><strong className="text-foreground">Step 5:</strong> Click "Calculate GPA" to see your Semester GPA and updated Cumulative GPA.</p>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3 space-y-1">
            <p className="text-sm font-medium">Semester GPA = Sum(Grade × Credits) / Total Credits</p>
            <p className="text-sm font-medium">Cumulative GPA = (Prior GPA × Prior Credits + Semester Points) / (Prior + Semester Credits)</p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">About the Drexel GPA Calculator</h3>
          <p className="text-sm text-muted-foreground">
            Drexel University uses a 4.00 GPA scale where A and A+ are both worth 4.00 quality points, and there is no D- grade. This calculator follows Drexel's official conversion so you can quickly project your semester GPA, then roll it into your existing cumulative GPA. Results are truncated to two decimal places to match Drexel's published method.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Need a generic version? Try the{" "}
            <a href="/cgpa-calculator" className="underline">CGPA Calculator</a> or the{" "}
            <a href="/gpa-calculator" className="underline">GPA Calculator</a>.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
