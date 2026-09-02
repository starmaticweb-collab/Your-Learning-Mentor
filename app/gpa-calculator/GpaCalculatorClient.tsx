"use client";

import { useState, useRef } from "react";
import { fireConfetti } from "@/lib/confetti";
import { generateGpaReport } from "@/lib/generateGpaReport";
import { Plus, Trash2, Calculator, Download } from "lucide-react";
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

const GRADE_OPTIONS = [
  { label: "A+", value: "4.0_A+" },
  { label: "A", value: "4.0_A" },
  { label: "A-", value: "3.7_A-" },
  { label: "B+", value: "3.3_B+" },
  { label: "B", value: "3.0_B" },
  { label: "B-", value: "2.7_B-" },
  { label: "C+", value: "2.3_C+" },
  { label: "C", value: "2.0_C" },
  { label: "C-", value: "1.7_C-" },
  { label: "D+", value: "1.3_D+" },
  { label: "D", value: "1.0_D" },
  { label: "D-", value: "0.7_D-" },
  { label: "F", value: "0.0_F" },
];

const parseGradeValue = (val: string) => parseFloat(val.split("_")[0]);
const parseGradeLabel = (val: string) => val.split("_")[1];

interface Course {
  id: number;
  grade: string;
  credits: string;
}

export default function GpaCalculatorClient() {
  const [courses, setCourses] = useState<Course[]>([{ id: 1, grade: "", credits: "" }]);
  const [result, setResult] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<
    { course: number; grade: string; credits: number; points: number }[]
  >([]);
  const resultRef = useRef<HTMLDivElement>(null);

  let nextId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;

  const addCourse = () => {
    setCourses((prev) => [...prev, { id: nextId, grade: "", credits: "" }]);
  };

  const removeCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: number, field: "grade" | "credits", value: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculate = () => {
    const valid = courses
      .map((c, i) => ({
        course: i + 1,
        gradeVal: c.grade ? parseGradeValue(c.grade) : NaN,
        gradeLabel: c.grade ? parseGradeLabel(c.grade) : "",
        credits: parseFloat(c.credits),
      }))
      .filter((c) => !isNaN(c.gradeVal) && !isNaN(c.credits) && c.credits > 0);

    if (valid.length === 0) {
      setResult(0);
      setBreakdown([]);
      return;
    }

    const totalPoints = valid.reduce((sum, c) => sum + c.gradeVal * c.credits, 0);
    const totalCredits = valid.reduce((sum, c) => sum + c.credits, 0);
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    setBreakdown(
      valid.map((c) => ({
        course: c.course,
        grade: c.gradeLabel,
        credits: c.credits,
        points: parseFloat((c.gradeVal * c.credits).toFixed(2)),
      }))
    );
    const finalGpa = parseFloat(gpa.toFixed(2));
    setResult(finalGpa);
    if (finalGpa >= 3.5) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setCourses([{ id: 1, grade: "", credits: "" }]);
    setResult(null);
    setBreakdown([]);
  };

  return (
    <>
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
                  <label className="text-sm font-medium mb-1.5 block">Credit Hours</label>
                  <Input
                    type="number"
                    step="1"
                    min="1"
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
              Your GPA
            </p>
            <p className="mt-2 text-5xl font-bold text-accent">{result.toFixed(2)}</p>

            {breakdown.length > 0 && (
              <div className="mt-6 text-left">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider font-heading">
                  Calculation Breakdown
                </h4>
                <div className="space-y-3">
                  {breakdown.map((row) => (
                    <div key={row.course} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold mb-1">Course {row.course}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>Grade: <strong className="text-foreground">{row.grade}</strong></span>
                        <span>Credits: <strong className="text-foreground">{row.credits}</strong></span>
                        <span>Quality Pts: <strong className="text-foreground">{row.points}</strong></span>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-lg bg-muted/50 p-3 text-sm font-medium">
                    Total Credits: {breakdown.reduce((s, r) => s + r.credits, 0)} · Total Quality Points:{" "}
                    {breakdown.reduce((s, r) => s + r.points, 0).toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateGpaReport(result, breakdown)}
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

      {/* Grading Scale Reference */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">US 4.0 Grading Scale</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {GRADE_OPTIONS.map((g) => (
              <div key={g.value} className="flex justify-between rounded-lg border px-3 py-2">
                <span className="font-medium">{g.label}</span>
                <span className="text-muted-foreground">{parseGradeValue(g.value).toFixed(1)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to use */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">How to Use This Calculator</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> Select the letter grade you received for each course.</p>
            <p><strong className="text-foreground">Step 2:</strong> Enter the credit hours for that course.</p>
            <p><strong className="text-foreground">Step 3:</strong> Click "Add Course" to add more courses.</p>
            <p><strong className="text-foreground">Step 4:</strong> Click "Calculate GPA" to get your result.</p>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3">
            <p className="text-sm font-medium">Formula: GPA = Total Quality Points / Total Credit Hours</p>
            <p className="text-xs text-muted-foreground mt-1">Quality Points = Grade Value × Credit Hours</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
