"use client";

import { useState, useRef } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const requiredOptions = [60, 65, 70, 75, 80, 85, 90];

export default function AttendanceCalculatorClient() {
  const [requiredPercent, setRequiredPercent] = useState(75);
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");
  const [result, setResult] = useState<{
    percentage: number;
    total: number;
    attended: number;
    status: "good" | "warning" | "danger";
    classesNeeded: number;
    canSkip: number;
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const total = parseInt(totalClasses) || 0;
    const attended = Math.min(parseInt(attendedClasses) || 0, total);

    if (total <= 0) {
      setResult(null);
      return;
    }

    const percentage = parseFloat(((attended / total) * 100).toFixed(1));
    const requiredClasses = Math.ceil((requiredPercent / 100) * total);
    const classesNeeded = Math.max(0, requiredClasses - attended);
    const canSkip = Math.max(0, attended - requiredClasses);

    let status: "good" | "warning" | "danger" = "good";
    if (percentage < requiredPercent) status = "danger";
    else if (percentage < requiredPercent + 5) status = "warning";

    setResult({ percentage, total, attended, status, classesNeeded, canSkip });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setTotalClasses("");
    setAttendedClasses("");
    setResult(null);
  };

  const statusColor = {
    good: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
  };

  const statusLabel = {
    good: "Good",
    warning: "Low",
    danger: "Below Required",
  };

  return (
    <>
      <Card>
        <CardContent className="p-5 space-y-5">
          {/* Required percentage */}
          <div>
            <label className="text-sm font-medium mb-2 block">Percentage Required</label>
            <div className="flex flex-wrap gap-2">
              {requiredOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRequiredPercent(opt)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                    requiredPercent === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {opt}%
                </button>
              ))}
            </div>
          </div>

          {/* Classes inputs */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Total Classes Held</label>
              <Input
                type="number"
                min="0"
                placeholder="100"
                value={totalClasses}
                onChange={(e) => setTotalClasses(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Classes Attended</label>
              <Input
                type="number"
                min="0"
                placeholder="85"
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-6">
        <Button onClick={calculate} className="rounded-full w-full">
          <Calculator size={16} className="mr-1" />
          Calculate Attendance
        </Button>
      </div>

      {/* Result */}
      {result && (
        <Card ref={resultRef} className="mt-8 border-accent/30">
          <CardContent className="p-6 text-center">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">
              Your Attendance
            </h2>
            <p className={`mt-2 text-5xl font-bold ${statusColor[result.status]}`}>
              {result.percentage}%
            </p>
            <p className={`mt-1 text-sm font-medium ${statusColor[result.status]}`}>
              {statusLabel[result.status]}
            </p>

            <div className="w-full rounded-full bg-secondary h-3 mt-4 mb-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  result.status === "good"
                    ? "bg-green-500"
                    : result.status === "warning"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${Math.min(result.percentage, 100)}%` }}
              />
            </div>

            <div className="space-y-1 text-sm text-muted-foreground mt-4">
              <p>
                Current Attendance:{" "}
                <strong className="text-foreground">
                  {result.attended}/{result.total} → {result.percentage}%
                </strong>
              </p>
              <p>
                Attendance Required:{" "}
                <strong className="text-foreground">
                  {Math.ceil((requiredPercent / 100) * result.total)}/{result.total} → {requiredPercent}%
                </strong>
              </p>
              {result.classesNeeded > 0 ? (
                <p className="text-red-600 font-medium mt-2">
                  You need to attend {result.classesNeeded} more classes to reach {requiredPercent}%
                </p>
              ) : (
                <p className="text-green-600 font-medium mt-2">
                  You can skip {result.canSkip} more classes and still maintain {requiredPercent}%
                </p>
              )}
            </div>

            <Button variant="ghost" size="sm" onClick={reset} className="mt-4 text-muted-foreground">
              Reset Calculator
            </Button>
          </CardContent>
        </Card>
      )}

      {/* How to use */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">How to Use</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> Enter the total number of classes held so far.</p>
            <p><strong className="text-foreground">Step 2:</strong> Enter the number of classes you attended.</p>
            <p><strong className="text-foreground">Step 3:</strong> Click "Calculate Attendance" to see your percentage.</p>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3">
            <p className="text-sm font-medium">Note: Most schools/colleges require 75% minimum attendance.</p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">About the Attendance Percentage Calculator</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              This free attendance percentage calculator helps students quickly determine their attendance status. Enter your total classes and attended classes to get an instant percentage along with how many classes you can skip or need to attend.
            </p>
            <p>
              Maintaining good attendance is crucial for academic success. Use this tool to stay on top of your attendance requirements throughout the semester.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
