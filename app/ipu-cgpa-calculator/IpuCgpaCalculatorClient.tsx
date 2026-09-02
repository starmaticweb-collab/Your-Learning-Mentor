"use client";

import { useState, useRef } from "react";
import { fireConfetti } from "@/lib/confetti";
import { Plus, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// IPU (GGSIPU) Ordinance 11 grading scale
const GRADE_TABLE: { min: number; max: number; grade: string; point: number }[] = [
  { min: 90, max: 100, grade: "O", point: 10 },
  { min: 75, max: 89.99, grade: "A+", point: 9 },
  { min: 65, max: 74.99, grade: "A", point: 8 },
  { min: 55, max: 64.99, grade: "B+", point: 7 },
  { min: 50, max: 54.99, grade: "B", point: 6 },
  { min: 45, max: 49.99, grade: "C", point: 5 },
  { min: 40, max: 44.99, grade: "P", point: 4 },
  { min: 0, max: 39.99, grade: "F", point: 0 },
];

const marksToGrade = (marks: number) => {
  for (const row of GRADE_TABLE) {
    if (marks >= row.min && marks <= row.max) return row;
  }
  return GRADE_TABLE[GRADE_TABLE.length - 1];
};

const round2 = (n: number) => Math.round(n * 100) / 100;

type Mode = "marks" | "grade";

interface Subject {
  id: number;
  name: string;
  marks: string;
  gradePoint: string; // used in 'grade' mode
  credits: string;
}

const divisionFor = (cgpa: number) => {
  if (cgpa === 10) return "Exemplary Performance";
  if (cgpa >= 6.5) return "First Division";
  if (cgpa >= 5) return "Second Division";
  if (cgpa >= 4) return "Third Division";
  return "Below Passing";
};

export default function IpuCgpaCalculatorClient() {
  const [mode, setMode] = useState<Mode>("marks");
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "", marks: "", gradePoint: "", credits: "4" },
    { id: 2, name: "", marks: "", gradePoint: "", credits: "4" },
    { id: 3, name: "", marks: "", gradePoint: "", credits: "4" },
    { id: 4, name: "", marks: "", gradePoint: "", credits: "4" },
  ]);
  const [showNames, setShowNames] = useState(false);
  const [result, setResult] = useState<{
    cgpa: number;
    percentage: number;
    totalCredits: number;
    totalPoints: number;
    division: string;
    rows: { idx: number; name: string; grade: string; point: number; credits: number; product: number }[];
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const nextId = subjects.length ? Math.max(...subjects.map((s) => s.id)) + 1 : 1;

  const addSubject = () => {
    if (subjects.length >= 30) return;
    setSubjects((p) => [...p, { id: nextId, name: "", marks: "", gradePoint: "", credits: "4" }]);
  };
  const removeSubject = (id: number) => setSubjects((p) => p.filter((s) => s.id !== id));
  const updateSubject = (id: number, field: keyof Omit<Subject, "id">, value: string) =>
    setSubjects((p) => p.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const calculate = () => {
    const rows: { idx: number; name: string; grade: string; point: number; credits: number; product: number }[] = [];
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((s, i) => {
      const credits = parseFloat(s.credits);
      if (isNaN(credits) || credits <= 0) return;

      let point = 0;
      let grade = "";
      if (mode === "marks") {
        const marks = parseFloat(s.marks);
        if (isNaN(marks) || marks < 0 || marks > 100) return;
        const g = marksToGrade(marks);
        point = g.point;
        grade = g.grade;
      } else {
        const gp = parseFloat(s.gradePoint);
        if (isNaN(gp) || gp < 0 || gp > 10) return;
        point = gp;
        grade = GRADE_TABLE.find((g) => g.point === gp)?.grade ?? "—";
      }

      const product = point * credits;
      totalCredits += credits;
      totalPoints += product;
      rows.push({ idx: i + 1, name: s.name, grade, point, credits, product });
    });

    if (totalCredits === 0) {
      setResult(null);
      return;
    }

    const cgpa = round2(totalPoints / totalCredits);
    const percentage = round2(cgpa * 10);
    setResult({ cgpa, percentage, totalCredits, totalPoints: round2(totalPoints), division: divisionFor(cgpa), rows });
    if (cgpa >= 8) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setSubjects([
      { id: 1, name: "", marks: "", gradePoint: "", credits: "4" },
      { id: 2, name: "", marks: "", gradePoint: "", credits: "4" },
      { id: 3, name: "", marks: "", gradePoint: "", credits: "4" },
      { id: 4, name: "", marks: "", gradePoint: "", credits: "4" },
    ]);
    setResult(null);
  };

  return (
    <>
      {/* Mode toggle */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-heading">
            Input Mode
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={mode === "marks" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setMode("marks")}
            >
              Enter Marks (0-100)
            </Button>
            <Button
              variant={mode === "grade" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setMode("grade")}
            >
              Enter Grade Points
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {mode === "marks"
              ? "We auto-convert your marks to IPU grade points using Ordinance 11."
              : "Enter grade points (0, 4, 5, 6, 7, 8, 9, 10) directly from your marksheet."}
          </p>
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
                    placeholder="e.g. Engineering Mathematics"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {mode === "marks" ? (
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Marks (0-100)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      placeholder="e.g. 78"
                      value={subject.marks}
                      onChange={(e) => updateSubject(subject.id, "marks", e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Grade Point</label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="1"
                      placeholder="e.g. 9"
                      value={subject.gradePoint}
                      onChange={(e) => updateSubject(subject.id, "gradePoint", e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Credits</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="e.g. 4"
                    value={subject.credits}
                    onChange={(e) => updateSubject(subject.id, "credits", e.target.value)}
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
          onClick={addSubject}
          className="rounded-full flex-1 hover:bg-muted focus:bg-muted active:bg-muted"
        >
          <Plus size={16} className="mr-1" />
          Add Subject
        </Button>
        <Button onClick={calculate} className="rounded-full flex-1">
          <Calculator size={16} className="mr-1" />
          Calculate CGPA
        </Button>
      </div>

      {/* Result */}
      {result !== null && (
        <Card ref={resultRef} className="mt-8 border-accent/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">
              Your IPU CGPA
            </p>
            <p className="mt-2 text-5xl font-bold text-accent">{result.cgpa.toFixed(2)}</p>
            <p className="mt-1 text-xs text-muted-foreground">on the 10-point IPU scale</p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-left">
              <div className="rounded-lg border p-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-heading">Percentage</p>
                <p className="mt-1 text-xl font-bold">{result.percentage.toFixed(2)}%</p>
                <p className="text-xs text-muted-foreground">CGPA × 10</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-heading">Division</p>
                <p className="mt-1 text-xl font-bold">{result.division}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-heading">Total Credits</p>
                <p className="mt-1 text-xl font-bold">{result.totalCredits}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-heading">Total Credit Points</p>
                <p className="mt-1 text-xl font-bold">{result.totalPoints}</p>
              </div>
            </div>

            <div className="mt-6 text-left">
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider font-heading">
                Subject Breakdown
              </h4>
              <div className="space-y-3">
                {result.rows.map((row) => (
                  <div key={row.idx} className="rounded-lg border p-3">
                    <p className="text-sm font-semibold mb-1">
                      {row.name ? row.name : `Subject ${row.idx}`} · Grade {row.grade}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>Grade Point: <strong className="text-foreground">{row.point}</strong></span>
                      <span>Credits: <strong className="text-foreground">{row.credits}</strong></span>
                      <span>C × G: <strong className="text-foreground">{row.product}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
          <h2 className="text-lg font-bold mb-4 font-heading">IPU Grading Scale (Ordinance 11)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Marks</th>
                  <th className="py-2 text-left font-semibold">Grade</th>
                  <th className="py-2 text-right font-semibold">Grade Point</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2">90 – 100</td><td>O</td><td className="text-right text-muted-foreground">10</td></tr>
                <tr className="border-b"><td className="py-2">75 – 89</td><td>A+</td><td className="text-right text-muted-foreground">9</td></tr>
                <tr className="border-b"><td className="py-2">65 – 74</td><td>A</td><td className="text-right text-muted-foreground">8</td></tr>
                <tr className="border-b"><td className="py-2">55 – 64</td><td>B+</td><td className="text-right text-muted-foreground">7</td></tr>
                <tr className="border-b"><td className="py-2">50 – 54</td><td>B</td><td className="text-right text-muted-foreground">6</td></tr>
                <tr className="border-b"><td className="py-2">45 – 49</td><td>C</td><td className="text-right text-muted-foreground">5</td></tr>
                <tr className="border-b"><td className="py-2">40 – 44</td><td>P</td><td className="text-right text-muted-foreground">4</td></tr>
                <tr><td className="py-2">Below 40 / Absent</td><td>F</td><td className="text-right text-muted-foreground">0</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Grade P (4 points) is the course passing grade unless specified otherwise by the programme syllabus.
          </p>
        </CardContent>
      </Card>

      {/* Division Bands */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">CGPA Division Bands</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">CGPA 10:</strong> Exemplary Performance (every course passed in the first attempt, no academic break).</p>
            <p><strong className="text-foreground">CGPA 6.50 and above:</strong> First Division.</p>
            <p><strong className="text-foreground">CGPA 5.00 – 6.49:</strong> Second Division.</p>
            <p><strong className="text-foreground">CGPA 4.00 – 4.99:</strong> Third Division.</p>
          </div>
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">How to Use This Calculator</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> Choose whether to enter raw marks (0-100) or the grade points printed on your marksheet.</p>
            <p><strong className="text-foreground">Step 2:</strong> For each subject, fill in the value and the credits assigned to that course.</p>
            <p><strong className="text-foreground">Step 3:</strong> Add more subjects from every semester you want included in the cumulative result.</p>
            <p><strong className="text-foreground">Step 4:</strong> Click <em>Calculate CGPA</em> to see your CGPA, percentage equivalent and division.</p>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3 space-y-1">
            <p className="text-sm font-medium">CGPA = Σ (Credits × Grade Points) / Σ Credits</p>
            <p className="text-sm font-medium">Percentage = CGPA × 10</p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">About the IPU CGPA Calculator</h2>
          <p className="text-sm text-muted-foreground">
            Guru Gobind Singh Indraprastha University (GGSIPU) follows the credit-based grading system defined in University Ordinance 11. Each course you take is assigned a credit weight and a letter grade with an equivalent grade point. The CGPA is the credit-weighted average of those grade points across every semester you include.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            This tool implements the exact Ordinance 11 mapping, so the CGPA it returns matches what IPU would print on your transcript. The percentage equivalent uses the official conversion rule of <strong>CGPA × 10</strong>.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Need more conversions? Try the{" "}
            <a href="/cgpa-calculator" className="underline">CGPA Calculator</a> or the{" "}
            <a href="/gpa-to-percentage-converter" className="underline">GPA to Percentage Converter</a>.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Source: GGSIPU University Ordinance 11. This calculator is independent and not affiliated with GGSIPU.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
