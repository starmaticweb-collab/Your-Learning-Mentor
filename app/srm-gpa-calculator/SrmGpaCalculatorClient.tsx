"use client";

import { useState, useRef } from "react";
import Link from "next/link";
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

const grades = [
  { label: "O", value: 10 },
  { label: "A+", value: 9 },
  { label: "A", value: 8 },
  { label: "B+", value: 7 },
  { label: "B", value: 6 },
  { label: "C", value: 5 },
  { label: "P", value: 4 },
  { label: "F", value: 0 },
  { label: "Ab", value: 0 },
  { label: "I", value: 0 },
];

interface Course {
  id: number;
  credits: string;
  grade: string;
}

export default function SrmGpaCalculatorClient() {
  const [courses, setCourses] = useState<Course[]>(
    Array.from({ length: 6 }, (_, i) => ({ id: i + 1, credits: "", grade: "" }))
  );
  const [result, setResult] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<{ course: number; credits: number; gradeLabel: string; gradePoint: number; weighted: number }[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  let nextId = Math.max(...courses.map((c) => c.id), 0) + 1;

  const addCourse = () => {
    setCourses((prev) => [...prev, { id: nextId, credits: "", grade: "" }]);
  };

  const removeCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: number, field: "credits" | "grade", value: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculate = () => {
    const valid = courses
      .map((c, i) => {
        const credits = parseFloat(c.credits);
        const gradeObj = grades.find((g) => g.label === c.grade);
        return {
          course: i + 1,
          credits,
          gradeLabel: c.grade,
          gradePoint: gradeObj?.value ?? NaN,
          weighted: 0,
        };
      })
      .filter((c) => !isNaN(c.credits) && c.credits > 0 && !isNaN(c.gradePoint));

    if (valid.length === 0) {
      setResult(0);
      setBreakdown([]);
      return;
    }

    const items = valid.map((c) => ({ ...c, weighted: parseFloat((c.credits * c.gradePoint).toFixed(2)) }));
    const totalWeighted = items.reduce((s, c) => s + c.weighted, 0);
    const totalCredits = items.reduce((s, c) => s + c.credits, 0);
    const sgpa = totalCredits > 0 ? totalWeighted / totalCredits : 0;

    setBreakdown(items);
    const finalSgpa = parseFloat(sgpa.toFixed(2));
    setResult(finalSgpa);
    if (finalSgpa >= 4) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setCourses(Array.from({ length: 6 }, (_, i) => ({ id: i + 1, credits: "", grade: "" })));
    setResult(null);
    setBreakdown([]);
  };

  return (
    <>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <Card key={course.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Course #{index + 1}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Credits</label>
                  <Input
                    type="number"
                    step="1"
                    min="1"
                    placeholder="3"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Grade Earned</label>
                  <Select
                    value={course.grade}
                    onValueChange={(val) => updateCourse(course.id, "grade", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((g) => (
                        <SelectItem key={g.label} value={g.label}>
                          {g.label} ({g.value})
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

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={addCourse} className="rounded-full flex-1 hover:bg-muted">
          <Plus size={16} className="mr-1" />
          Add Course
        </Button>
        <Button onClick={calculate} className="rounded-full flex-1">
          <Calculator size={16} className="mr-1" />
          Calculate
        </Button>
      </div>

      {result !== null && (
        <Card ref={resultRef} className="mt-8 border-accent/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">Your SGPA</p>
            <p className="mt-2 text-5xl font-bold text-accent">{result.toFixed(2)}</p>

            {breakdown.length > 0 && (
              <div className="mt-6 text-left">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider font-heading">
                  Step-by-step Calculation
                </h4>
                <div className="space-y-3">
                  {breakdown.map((row) => (
                    <div key={row.course} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold mb-1">Course #{row.course}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>Credits: <strong className="text-foreground">{row.credits}</strong></span>
                        <span>Grade: <strong className="text-foreground">{row.gradeLabel} ({row.gradePoint})</strong></span>
                        <span>Credits × Grade: <strong className="text-foreground">{row.weighted}</strong></span>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-lg bg-muted/50 p-3 text-sm font-medium">
                    ∑Credits: {breakdown.reduce((s, r) => s + r.credits, 0)} · ∑(Credits × Grade): {breakdown.reduce((s, r) => s + r.weighted, 0).toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            <Button variant="ghost" size="sm" onClick={reset} className="mt-4 text-muted-foreground">
              Reset Calculator
            </Button>
          </CardContent>
        </Card>
      )}

      {/* About section */}
      <Card className="mt-10">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">About This Calculator</h2>
          <p className="text-sm text-muted-foreground">
            This SRM GPA calculator helps you calculate your SGPA (Semester Grade Point Average).
          </p>
          <p className="text-sm text-muted-foreground">
            Just enter the credits and grades achieved in each course in a semester and press the Calculate button. It will calculate and display accurate SGPA based on input credits and{" "}
            <a href="https://webstor.srmist.edu.in/web_assets/downloads/2020/cgpa-ug-pg-reg-2018.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline">
              grade points formulated by SRM University
            </a>.
          </p>
          <p className="text-sm text-muted-foreground">
            You can add more courses using the "Add course" button. It also displays real-time step-by-step SGPA calculation. To calculate your cumulative GPA across all semesters, use our <Link href="/cgpa-calculator" className="font-medium text-accent underline underline-offset-4 hover:text-accent/80">CGPA Calculator</Link>.
          </p>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm font-bold">
            SGPA = ∑CiGi / ∑Ci
          </div>
          <p className="text-sm text-muted-foreground">Ci = Credits for a course in a given semester.</p>
          <p className="text-sm text-muted-foreground">Gi = Grade points achieved in a course.</p>
          <p className="text-sm text-muted-foreground">
            We have tested this calculator several times using real marks of students. It has computed accurate SGPA each time.
          </p>
          <p className="text-xs text-muted-foreground italic border-t pt-4">
            <strong>Disclaimer:</strong> This is not the official website of SRM. The above GPA calculator is made independently by us as a contribution to SRM students. It will help them learn how SGPA is calculated and how grades impact it.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
