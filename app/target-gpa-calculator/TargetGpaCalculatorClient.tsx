"use client";

import { useState, useRef } from "react";
import { generateTargetGpaReport } from "@/lib/generateTargetGpaReport";
import { Calculator, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function TargetGpaCalculatorClient() {
  const [scale, setScale] = useState<4 | 10>(4);
  const [currentCgpa, setCurrentCgpa] = useState("");
  const [currentCredits, setCurrentCredits] = useState("");
  const [nextCredits, setNextCredits] = useState("");
  const [targetCgpa, setTargetCgpa] = useState("");
  const [result, setResult] = useState<{
    requiredGpa: number;
    achievable: boolean;
    currentPoints: number;
    targetPoints: number;
    totalCredits: number;
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const cCgpa = parseFloat(currentCgpa);
    const cCredits = parseFloat(currentCredits);
    const nCredits = parseFloat(nextCredits);
    const tCgpa = parseFloat(targetCgpa);

    if ([cCgpa, cCredits, nCredits, tCgpa].some(isNaN) || cCredits <= 0 || nCredits <= 0) return;

    const totalCredits = cCredits + nCredits;
    const currentPoints = cCgpa * cCredits;
    const targetPoints = tCgpa * totalCredits;
    const requiredGpa = (targetPoints - currentPoints) / nCredits;
    const achievable = requiredGpa >= 0 && requiredGpa <= scale;

    setResult({ requiredGpa: parseFloat(requiredGpa.toFixed(2)), achievable, currentPoints, targetPoints, totalCredits });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setCurrentCgpa("");
    setCurrentCredits("");
    setNextCredits("");
    setTargetCgpa("");
    setResult(null);
  };

  return (
    <>
      {/* Scale toggle */}
      <div className="flex justify-center gap-2 mb-6">
        <Button
          variant={scale === 4 ? "default" : "outline"}
          size="sm"
          onClick={() => { setScale(4); setResult(null); }}
          className="rounded-full"
        >
          4.0 Scale (US)
        </Button>
        <Button
          variant={scale === 10 ? "default" : "outline"}
          size="sm"
          onClick={() => { setScale(10); setResult(null); }}
          className="rounded-full"
        >
          10.0 Scale
        </Button>
      </div>

      {/* Inputs */}
      <Card>
        <CardContent className="p-5 space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Current Cumulative GPA</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              max={scale}
              placeholder={scale === 4 ? "e.g. 3.2" : "e.g. 7.5"}
              value={currentCgpa}
              onChange={(e) => setCurrentCgpa(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">Your overall GPA from your transcript</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Credits Completed</label>
            <Input
              type="number"
              step="1"
              min="1"
              placeholder="e.g. 90"
              value={currentCredits}
              onChange={(e) => setCurrentCredits(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">Total credit hours attempted so far</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Remaining / Next Semester Credits</label>
            <Input
              type="number"
              step="1"
              min="1"
              placeholder="e.g. 18"
              value={nextCredits}
              onChange={(e) => setNextCredits(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">Credits you plan to take going forward</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Target Cumulative GPA</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              max={scale}
              placeholder={scale === 4 ? "e.g. 3.5" : "e.g. 8.0"}
              value={targetCgpa}
              onChange={(e) => setTargetCgpa(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">The cumulative GPA you want to achieve</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={calculate} className="rounded-full flex-1">
          <Calculator size={16} className="mr-1" />
          Calculate Required GPA
        </Button>
      </div>

      {/* Result */}
      {result && (
        <Card ref={resultRef} className="mt-8 border-accent/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">
              {result.achievable ? "Required GPA Next Semester" : "Target Not Achievable"}
            </p>
            {result.achievable ? (
              <p className="mt-2 text-5xl font-bold text-accent">{result.requiredGpa.toFixed(2)}</p>
            ) : (
              <p className="mt-2 text-lg text-destructive font-semibold">
                You would need a GPA of {result.requiredGpa.toFixed(2)}, which exceeds the {scale}.0 scale.
              </p>
            )}

            <div className="mt-6 text-left">
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider font-heading">
                Calculation Breakdown
              </h4>
              <div className="space-y-2">
                <div className="rounded-lg border p-3 text-sm">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                    <span>Current Points: <strong className="text-foreground">{result.currentPoints.toFixed(2)}</strong></span>
                    <span>Target Points: <strong className="text-foreground">{result.targetPoints.toFixed(2)}</strong></span>
                    <span>Gap: <strong className="text-foreground">{(result.targetPoints - result.currentPoints).toFixed(2)}</strong></span>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-sm font-medium">
                  Total Credits After Next Sem: {result.totalCredits}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  generateTargetGpaReport({
                    currentCgpa: parseFloat(currentCgpa),
                    currentCredits: parseFloat(currentCredits),
                    nextCredits: parseFloat(nextCredits),
                    targetCgpa: parseFloat(targetCgpa),
                    requiredGpa: result.requiredGpa,
                    achievable: result.achievable,
                    scale,
                  })
                }
                className="rounded-full w-full sm:w-auto"
              >
                <Download size={14} className="mr-1" />
                Download PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground w-full sm:w-auto">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* How to use */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">How to Use This Calculator</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> Select your grading scale (4.0 or 10.0).</p>
            <p><strong className="text-foreground">Step 2:</strong> Enter your current CGPA and total credits earned so far.</p>
            <p><strong className="text-foreground">Step 3:</strong> Enter the number of credits you'll take next semester.</p>
            <p><strong className="text-foreground">Step 4:</strong> Enter your target CGPA and click "Calculate Required GPA".</p>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3">
            <p className="text-sm font-medium">
              Formula: Required GPA = (Target CGPA × Total Credits − Current CGPA × Current Credits) / Next Semester Credits
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
