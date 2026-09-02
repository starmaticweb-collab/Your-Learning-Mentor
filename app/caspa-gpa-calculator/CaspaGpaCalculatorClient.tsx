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

// CASPA official grade conversion scale
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

const SUBJECT_OPTIONS = [
  "Overall",
  "Science (BCP)",
  "Biology",
  "Chemistry",
  "Physics",
  "Math",
  "Non-Science",
  "Other",
];

const parseGradeValue = (val: string) => parseFloat(val.split("_")[0]);
const parseGradeLabel = (val: string) => val.split("_")[1];

interface Course {
  id: number;
  name: string;
  subject: string;
  grade: string;
  credits: string;
}

const round3 = (n: number) => Math.round(n * 1000) / 1000;

export default function CaspaGpaCalculatorClient() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", subject: "Overall", grade: "", credits: "" },
    { id: 2, name: "", subject: "Overall", grade: "", credits: "" },
    { id: 3, name: "", subject: "Overall", grade: "", credits: "" },
  ]);
  const [showNames, setShowNames] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [result, setResult] = useState<{
    overallGpa: number;
    scienceGpa: number | null;
    nonScienceGpa: number | null;
    totalCredits: number;
    totalPoints: number;
    breakdown: { course: number; name: string; subject: string; grade: string; credits: number; points: number }[];
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const nextId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;

  const addCourse = () => {
    if (courses.length >= 50) return;
    setCourses((prev) => [...prev, { id: nextId, name: "", subject: "Overall", grade: "", credits: "" }]);
  };

  const removeCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof Omit<Course, "id">, value: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculate = () => {
    const valid = courses
      .map((c, i) => ({
        course: i + 1,
        name: c.name,
        subject: c.subject || "Overall",
        gradeVal: c.grade ? parseGradeValue(c.grade) : NaN,
        gradeLabel: c.grade ? parseGradeLabel(c.grade) : "",
        credits: parseFloat(c.credits),
      }))
      .filter((c) => !isNaN(c.gradeVal) && !isNaN(c.credits) && c.credits > 0);

    if (valid.length === 0) {
      setResult({ overallGpa: 0, scienceGpa: null, nonScienceGpa: null, totalCredits: 0, totalPoints: 0, breakdown: [] });
      return;
    }

    const totalPts = valid.reduce((s, c) => s + c.gradeVal * c.credits, 0);
    const totalCr = valid.reduce((s, c) => s + c.credits, 0);
    const overallGpa = round3(totalPts / totalCr);

    const science = valid.filter((c) =>
      ["Science (BCP)", "Biology", "Chemistry", "Physics", "Math"].includes(c.subject)
    );
    const nonScience = valid.filter((c) => c.subject === "Non-Science");

    const scienceGpa = science.length
      ? round3(science.reduce((s, c) => s + c.gradeVal * c.credits, 0) / science.reduce((s, c) => s + c.credits, 0))
      : null;
    const nonScienceGpa = nonScience.length
      ? round3(nonScience.reduce((s, c) => s + c.gradeVal * c.credits, 0) / nonScience.reduce((s, c) => s + c.credits, 0))
      : null;

    setResult({
      overallGpa,
      scienceGpa,
      nonScienceGpa,
      totalCredits: totalCr,
      totalPoints: parseFloat(totalPts.toFixed(2)),
      breakdown: valid.map((c) => ({
        course: c.course,
        name: c.name,
        subject: c.subject,
        grade: c.gradeLabel,
        credits: c.credits,
        points: parseFloat((c.gradeVal * c.credits).toFixed(2)),
      })),
    });

    if (overallGpa >= 3.5) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setCourses([
      { id: 1, name: "", subject: "Overall", grade: "", credits: "" },
      { id: 2, name: "", subject: "Overall", grade: "", credits: "" },
      { id: 3, name: "", subject: "Overall", grade: "", credits: "" },
    ]);
    setResult(null);
  };

  return (
    <>
      {/* Toggles */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            id="show-names"
            type="checkbox"
            checked={showNames}
            onChange={(e) => setShowNames(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <label htmlFor="show-names" className="text-sm">Show course names</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="show-subjects"
            type="checkbox"
            checked={showSubjects}
            onChange={(e) => setShowSubjects(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <label htmlFor="show-subjects" className="text-sm">Tag subject (for Science GPA)</label>
        </div>
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
                    placeholder="e.g. BIOL 1010 General Biology"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                  />
                </div>
              )}
              {showSubjects && (
                <div className="mb-3">
                  <label className="text-sm font-medium mb-1.5 block">Subject</label>
                  <Select
                    value={course.subject}
                    onValueChange={(val) => updateCourse(course.id, "subject", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECT_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                        <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Attempted Credits</label>
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
              Overall CASPA GPA
            </p>
            <p className="mt-2 text-5xl font-bold text-accent">{result.overallGpa.toFixed(2)}</p>

            {(result.scienceGpa !== null || result.nonScienceGpa !== null) && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.scienceGpa !== null && (
                  <div className="rounded-lg border p-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-heading">Science GPA (BCPM)</p>
                    <p className="mt-1 text-3xl font-bold">{result.scienceGpa.toFixed(2)}</p>
                  </div>
                )}
                {result.nonScienceGpa !== null && (
                  <div className="rounded-lg border p-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-heading">Non-Science GPA</p>
                    <p className="mt-1 text-3xl font-bold">{result.nonScienceGpa.toFixed(2)}</p>
                  </div>
                )}
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
                        {showSubjects && row.subject && row.subject !== "Overall" && (
                          <span className="ml-2 text-xs font-normal text-muted-foreground">[{row.subject}]</span>
                        )}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>Grade: <strong className="text-foreground">{row.grade}</strong></span>
                        <span>Credits: <strong className="text-foreground">{row.credits}</strong></span>
                        <span>Quality Pts: <strong className="text-foreground">{row.points}</strong></span>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-lg bg-muted/50 p-3 text-sm font-medium">
                    Total Attempted Credits: {result.totalCredits} · Total Quality Points: {result.totalPoints.toFixed(2)}
                  </div>
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

      {/* Grading Scale */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">CASPA Grade Conversion Scale</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {GRADE_OPTIONS.map((g) => (
              <div key={g.value} className="flex justify-between rounded-lg border px-3 py-2">
                <span className="font-medium">{g.label}</span>
                <span className="text-muted-foreground">{parseGradeValue(g.value).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            CASPA standardizes every transcript to this 4.00 scale, regardless of how your school reports grades. Plus/minus grades are always counted, even if your school did not use them.
          </p>
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">How to Use This CASPA GPA Calculator</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> For every course on your transcript, select the letter grade and enter the attempted credits. Include withdrawn/failed/repeated courses — CASPA counts every attempt.</p>
            <p><strong className="text-foreground">Step 2:</strong> Tick "Tag subject" to mark each course as Biology, Chemistry, Physics, Math, or Non-Science so the tool can calculate your Science (BCPM) GPA.</p>
            <p><strong className="text-foreground">Step 3:</strong> Click "Add Course" to add more rows (up to 50).</p>
            <p><strong className="text-foreground">Step 4:</strong> Click "Calculate GPA" to see Overall, Science, and Non-Science GPAs the way CASPA will report them to PA programs.</p>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3 space-y-1">
            <p className="text-sm font-medium">Quality Points = Converted Grade Value × Attempted Credits</p>
            <p className="text-sm font-medium">GPA = Total Quality Points / Total Attempted Credits</p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <h3 className="text-sm font-semibold mb-2">Worked Example</h3>
            <table className="w-full text-xs border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-2 border-b">Course</th>
                  <th className="text-left p-2 border-b">Grade</th>
                  <th className="text-left p-2 border-b">Value</th>
                  <th className="text-left p-2 border-b">Credits</th>
                  <th className="text-left p-2 border-b">Quality Pts</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border-b">MATH 1100</td><td className="p-2 border-b">A</td><td className="p-2 border-b">4</td><td className="p-2 border-b">4</td><td className="p-2 border-b">16</td></tr>
                <tr><td className="p-2 border-b">ENGL 1310</td><td className="p-2 border-b">B</td><td className="p-2 border-b">3</td><td className="p-2 border-b">3</td><td className="p-2 border-b">9</td></tr>
                <tr><td className="p-2 border-b">GEOL 1610</td><td className="p-2 border-b">C</td><td className="p-2 border-b">2</td><td className="p-2 border-b">4</td><td className="p-2 border-b">8</td></tr>
                <tr><td className="p-2 border-b">PHED 1000</td><td className="p-2 border-b">D</td><td className="p-2 border-b">1</td><td className="p-2 border-b">3</td><td className="p-2 border-b">3</td></tr>
                <tr><td className="p-2 border-b">PSCI 1040</td><td className="p-2 border-b">F</td><td className="p-2 border-b">0</td><td className="p-2 border-b">3</td><td className="p-2 border-b">0</td></tr>
                <tr className="font-semibold bg-muted/30"><td className="p-2">Total</td><td className="p-2"></td><td className="p-2"></td><td className="p-2">17</td><td className="p-2">36</td></tr>
              </tbody>
            </table>
            <p className="mt-2 text-xs text-muted-foreground">GPA = 36 / 17 = <strong className="text-foreground">2.12</strong></p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">About the CASPA GPA Calculator</h2>
          <p className="text-sm text-muted-foreground">
            The Centralized Application Service for Physician Assistants (CASPA) re-calculates the GPA on every applicant's transcript using its own standardized 4.00 scale. That means your CASPA GPA can differ noticeably from the GPA printed on your transcript — repeats are <em>not</em> replaced, plus/minus grades are always applied, and withdrawals with a grade penalty are included.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            This calculator mirrors that methodology so you can preview your verified Overall, Science (BCPM), and Non-Science GPAs before you submit your application to PA school.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Looking for other tools? Try the{" "}
            <a href="/cgpa-calculator" className="underline">CGPA Calculator</a>,{" "}
            <a href="/gpa-calculator" className="underline">GPA Calculator</a>, or{" "}
            <a href="/target-gpa-calculator" className="underline">Target GPA Calculator</a>.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
