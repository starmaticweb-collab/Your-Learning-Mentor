"use client";

import { useState, useRef } from "react";
import { fireConfetti } from "@/lib/confetti";
import { Plus, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Semester {
  id: number;
  sgpa: string;
  credits: string;
}

const gradeTable = [
  { grade: "O", points: 10, range: "90-100%", performance: "Outstanding" },
  { grade: "E", points: 9, range: "80-89%", performance: "Excellent" },
  { grade: "A", points: 8, range: "70-79%", performance: "Very Good" },
  { grade: "B", points: 7, range: "60-69%", performance: "Good" },
  { grade: "C", points: 6, range: "50-59%", performance: "Average" },
  { grade: "D", points: 5, range: "40-49%", performance: "Pass" },
  { grade: "F", points: 0, range: "Below 40%", performance: "Fail" },
];

export default function KiitCgpaCalculatorClient() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, sgpa: "", credits: "" },
    { id: 2, sgpa: "", credits: "" },
    { id: 3, sgpa: "", credits: "" },
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<{ semester: number; sgpa: number; credits: number; weighted: number }[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  let nextId = semesters.length > 0 ? Math.max(...semesters.map((s) => s.id)) + 1 : 1;

  const addSemester = () => {
    setSemesters((prev) => [...prev, { id: nextId, sgpa: "", credits: "" }]);
  };

  const removeSemester = (id: number) => {
    setSemesters((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSemester = (id: number, field: "sgpa" | "credits", value: string) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const calculate = () => {
    const validSemesters = semesters
      .map((s, i) => ({
        semester: i + 1,
        sgpa: parseFloat(s.sgpa),
        credits: parseFloat(s.credits),
      }))
      .filter((s) => !isNaN(s.sgpa) && !isNaN(s.credits) && s.credits > 0);

    if (validSemesters.length === 0) {
      setResult(0);
      setBreakdown([]);
      return;
    }

    const totalWeighted = validSemesters.reduce((sum, s) => sum + s.sgpa * s.credits, 0);
    const totalCredits = validSemesters.reduce((sum, s) => sum + s.credits, 0);
    const cgpa = totalCredits > 0 ? totalWeighted / totalCredits : 0;

    setBreakdown(
      validSemesters.map((s) => ({
        ...s,
        weighted: parseFloat((s.sgpa * s.credits).toFixed(2)),
      }))
    );
    const finalCgpa = parseFloat(cgpa.toFixed(2));
    setResult(finalCgpa);
    if (finalCgpa >= 4) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setSemesters([
      { id: 1, sgpa: "", credits: "" },
      { id: 2, sgpa: "", credits: "" },
      { id: 3, sgpa: "", credits: "" },
    ]);
    setResult(null);
    setBreakdown([]);
  };

  const percentage = result !== null ? (result * 9.5).toFixed(2) : null;

  return (
    <>
      <div className="space-y-4">
        {semesters.map((semester, index) => (
          <Card key={semester.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Semester {index + 1}
                </h3>
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
                  <label className="text-sm font-medium mb-1.5 block">SGPA</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g., 8.5"
                    value={semester.sgpa}
                    onChange={(e) => updateSemester(semester.id, "sgpa", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Credits</label>
                  <Input
                    type="number"
                    step="1"
                    min="1"
                    placeholder="e.g., 24"
                    value={semester.credits}
                    onChange={(e) => updateSemester(semester.id, "credits", e.target.value)}
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
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Your CGPA
            </p>
            <p className="mt-2 text-5xl font-bold text-accent">{result.toFixed(2)}</p>
            {percentage && (
              <p className="mt-2 text-sm text-muted-foreground">
                Approximate Percentage: <strong className="text-foreground">{percentage}%</strong>
              </p>
            )}

            {breakdown.length > 0 && (
              <div className="mt-6 text-left">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                  Calculation Breakdown
                </h4>
                <div className="space-y-3">
                  {breakdown.map((row) => (
                    <div key={row.semester} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold mb-1">Semester {row.semester}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>SGPA: <strong className="text-foreground">{row.sgpa}</strong></span>
                        <span>Credits: <strong className="text-foreground">{row.credits}</strong></span>
                        <span>Weighted: <strong className="text-foreground">{row.weighted}</strong></span>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-lg bg-muted/50 p-3 text-sm font-medium">
                    Total Credits: {breakdown.reduce((s, r) => s + r.credits, 0)} · Total Weighted: {breakdown.reduce((s, r) => s + r.weighted, 0).toFixed(2)}
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

      {/* About KIIT CGPA */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 font-heading">About KIIT CGPA Calculation</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Kalinga Institute of Industrial Technology (KIIT)</strong> uses a credit-based grading system. Your CGPA is calculated using the weighted average of your SGPA (Semester Grade Point Average) across all semesters.
            </p>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium text-foreground">Formula: CGPA = (Sum of SGPA × Credits) / Total Credits</p>
            </div>
            <p>
              Enter your SGPA and credits for each semester, then click "Calculate CGPA" to see your cumulative grade point average. You can add or remove semesters as needed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* What is CGPA */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 font-heading">What is CGPA at KIIT?</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">CGPA</strong> stands for <strong className="text-foreground">Cumulative Grade Point Average</strong>. At KIIT, CGPA is a measure of your overall academic performance across all semesters. It is calculated on a <strong className="text-foreground">10-point scale</strong> and reflects the weighted average of your grades in all courses you've completed.
            </p>
            <p>
              KIIT follows a credit-based grading system, meaning each course has a specific number of credits assigned based on its importance and workload. Your CGPA takes into account both your grades (SGPA) and the credits of each course.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Grading System */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 font-heading">KIIT Grading System</h2>
          <div className="rounded-lg border overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-2.5 px-3 font-medium whitespace-nowrap">Grade</th>
                  <th className="text-center py-2.5 px-3 font-medium whitespace-nowrap">Points</th>
                  <th className="text-center py-2.5 px-3 font-medium whitespace-nowrap">Range</th>
                  <th className="text-right py-2.5 px-3 font-medium whitespace-nowrap">Performance</th>
                </tr>
              </thead>
              <tbody>
                {gradeTable.map((row) => (
                  <tr key={row.grade} className="border-t">
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">{row.grade}</td>
                    <td className="py-2 px-3 text-center whitespace-nowrap">{row.points}</td>
                    <td className="py-2 px-3 text-center text-muted-foreground whitespace-nowrap">{row.range}</td>
                    <td className="py-2 px-3 text-right text-muted-foreground whitespace-nowrap">{row.performance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* How to Calculate */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 font-heading">How to Calculate CGPA at KIIT</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium text-foreground">CGPA = (Sum of SGPA × Credits) / Total Credits</p>
            </div>
            <ol className="list-decimal list-inside space-y-2">
              <li>Obtain your SGPA for each semester from your grade sheet or student portal</li>
              <li>Note down the number of credits for each semester (usually 20-26 credits per semester)</li>
              <li>Multiply each semester's SGPA by its credits</li>
              <li>Add up all the credits from all semesters to get total credits</li>
              <li>Divide the weighted sum by the total credits</li>
            </ol>

            <h3 className="text-base font-bold text-foreground pt-2">Example Calculation</h3>
            <div className="space-y-1">
              <p>• <strong className="text-foreground">Semester 1:</strong> SGPA = 8.5, Credits = 24</p>
              <p>• <strong className="text-foreground">Semester 2:</strong> SGPA = 7.8, Credits = 24</p>
              <p>• <strong className="text-foreground">Semester 3:</strong> SGPA = 8.2, Credits = 26</p>
              <p>• <strong className="text-foreground">Semester 4:</strong> SGPA = 8.9, Credits = 26</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 space-y-1">
              <p className="text-foreground">CGPA = [(8.5×24) + (7.8×24) + (8.2×26) + (8.9×26)] / (24+24+26+26)</p>
              <p className="text-foreground">CGPA = 835.8 / 100 = <strong>8.36</strong></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CGPA to Percentage */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 font-heading">Converting KIIT CGPA to Percentage</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium text-foreground">Percentage = CGPA × 9.5</p>
            </div>
            <p>
              For example, if your CGPA is <strong className="text-foreground">8.36</strong>, your percentage would be: 8.36 × 9.5 = <strong className="text-foreground">79.42%</strong>
            </p>
            <p>
              <strong className="text-foreground">Note:</strong> This is an approximate conversion. For official transcripts, always refer to the conversion formula on your KIIT mark sheet.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* What is a Good CGPA */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 font-heading">What is a Good CGPA at KIIT?</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong className="text-foreground">9.0 - 10.0:</strong> Outstanding – Top tier, eligible for top placements and scholarships</p>
            <p>• <strong className="text-foreground">8.0 - 8.9:</strong> Excellent – Very competitive for most placements</p>
            <p>• <strong className="text-foreground">7.0 - 7.9:</strong> Good – Eligible for most placement opportunities</p>
            <p>• <strong className="text-foreground">6.0 - 6.9:</strong> Average – Meets minimum requirements for placements</p>
            <p>• <strong className="text-foreground">Below 6.0:</strong> Below Average – Focus on improvement required</p>
            <div className="rounded-lg bg-muted/50 p-3 mt-3">
              <p className="text-foreground text-xs"><strong>Placement Tip:</strong> Most top recruiters at KIIT have a minimum CGPA cutoff of 7.0-7.5. Companies like Google, Microsoft, and Amazon may require 8.0 or higher.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 font-heading">Frequently Asked Questions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground">What is the minimum CGPA required to pass at KIIT?</h3>
              <p className="text-muted-foreground mt-1">The minimum CGPA to pass and graduate from KIIT is <strong className="text-foreground">5.0</strong>. You must also pass all individual courses and meet attendance requirements.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">How does CGPA differ from SGPA?</h3>
              <p className="text-muted-foreground mt-1"><strong className="text-foreground">SGPA</strong> is your GPA for a single semester only. <strong className="text-foreground">CGPA</strong> is the average of all your SGPAs across all completed semesters, weighted by credits.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Can I improve my CGPA after graduation?</h3>
              <p className="text-muted-foreground mt-1">No, once you graduate, your CGPA is final. If you have backlogs or incomplete courses, clearing them can improve your final CGPA before you receive your degree.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Does KIIT offer grade improvement exams?</h3>
              <p className="text-muted-foreground mt-1">KIIT typically allows students to reappear for failed courses (F grade). Check with the examination department for the current policy on grade improvement.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
