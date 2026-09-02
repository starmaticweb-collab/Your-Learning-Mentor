"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { fireConfetti } from "@/lib/confetti";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const conversionTable = Array.from({ length: 66 }, (_, i) => {
  const cgpa = parseFloat((10 - i * 0.1).toFixed(1));
  const pct = parseFloat(((cgpa - 0.5) * 10).toFixed(1));
  return { cgpa, pct };
}).filter((r) => r.cgpa >= 3.5);

export default function GtuCgpaCalculatorClient() {
  const [mode, setMode] = useState<"cgpa-to-pct" | "pct-to-cgpa">("cgpa-to-pct");
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const convert = () => {
    const val = parseFloat(inputVal);
    if (isNaN(val)) return;
    if (mode === "cgpa-to-pct") {
      const pct = (val - 0.5) * 10;
      setResult(`${pct.toFixed(2)}%`);
      if (pct >= 40) fireConfetti();
    } else {
      const cgpa = val / 10 + 0.5;
      setResult(cgpa.toFixed(2));
      if (cgpa >= 4) fireConfetti();
    }
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant={mode === "cgpa-to-pct" ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs sm:text-sm"
              onClick={() => { setMode("cgpa-to-pct"); setResult(null); setInputVal(""); }}
            >
              CGPA → Percentage
            </Button>
            <ArrowLeftRight size={16} className="text-muted-foreground hidden sm:block" />
            <Button
              variant={mode === "pct-to-cgpa" ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs sm:text-sm"
              onClick={() => { setMode("pct-to-cgpa"); setResult(null); setInputVal(""); }}
            >
              Percentage → CGPA
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              {mode === "cgpa-to-pct" ? "Enter your CPI / CGPA" : "Enter your Percentage"}
            </label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder={mode === "cgpa-to-pct" ? "e.g. 8.5" : "e.g. 80"}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </div>

          <Button onClick={convert} className="w-full rounded-full">
            Convert
          </Button>

          {result && (
            <div ref={resultRef} className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                {mode === "cgpa-to-pct" ? "Equivalent Percentage" : "Equivalent CGPA/CPI"}
              </p>
              <p className="mt-2 text-5xl font-bold text-accent">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        This CGPA to Percentage GTU calculator helps you convert your CPI/CGPA into percentage marks. Just enter your CPI or CGPA in the input box and press on "Convert" button. You can also use our <Link href="/cgpa-calculator" className="font-medium text-accent underline underline-offset-4 hover:text-accent/80">CGPA Calculator</Link> to calculate your cumulative GPA across all semesters.
      </p>

      {/* How to convert */}
      <Card className="mt-10">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">How to convert CGPA into percentage in GTU?</h2>
          <p className="text-sm text-muted-foreground">
            To convert CGPA into percentage marks, subtract CGPA with 0.5 and then multiply the remaining by 10.
          </p>
          <p className="text-sm text-muted-foreground">
            Here's the formula to calculate the percentage according to the{" "}
            <a href="https://www.gtu.ac.in/ImpCircular/Notification_1_of_2012_Indicating_CPI_-CGPA_Equivalent_Class.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline">
              circular released by Gujarat Technological University
            </a>:
          </p>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm font-bold">
            Percentage Marks = (CPI/CGPA - 0.5) × 10
          </div>
        </CardContent>
      </Card>

      {/* Conversion table */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">CGPA to Percentage GTU conversion table</h2>
          <div className="max-h-80 overflow-y-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">CGPA</th>
                  <th className="px-4 py-2 text-left font-semibold">Percentage Marks</th>
                </tr>
              </thead>
              <tbody>
                {conversionTable.map((row) => (
                  <tr key={row.cgpa} className="border-t">
                    <td className="px-4 py-2">{row.cgpa.toFixed(1)}</td>
                    <td className="px-4 py-2">{row.pct.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card className="mt-6">
        <CardContent className="p-6 space-y-6">
          <p className="text-sm text-muted-foreground">
            Let's understand how to convert CGPA to percentage for GTU (Gujarat Technological University) students using a few examples:
          </p>

          <div>
            <p className="font-bold text-sm">Example 1:</p>
            <p className="text-sm text-muted-foreground mt-1">
              Suppose Rajesh has got a 9 CGPA. So let's subtract that with 0.5 and multiply it by 10.
            </p>
            <div className="bg-muted rounded-lg p-3 mt-2 font-mono text-sm space-y-1">
              <p>= (9 – 0.5) × 10</p>
              <p>= 8.5 × 10</p>
              <p className="font-bold">= 85%</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Rajesh has got 85 percentage.</p>
          </div>

          <div>
            <p className="font-bold text-sm">Example 2:</p>
            <p className="text-sm text-muted-foreground mt-1">
              Suppose Neha has got 7.45 CGPA. So let's use the formula provided by GTU.
            </p>
            <div className="bg-muted rounded-lg p-3 mt-2 font-mono text-sm space-y-1">
              <p>= (CPI/CGPA – 0.5) × 10</p>
              <p>= (7.45 – 0.5) × 10</p>
              <p>= 6.95 × 10</p>
              <p className="font-bold">= 69.50%</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Neha has got 69.50 percentage.</p>
          </div>
        </CardContent>
      </Card>

      {/* About sections */}
      <Card className="mt-6">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold font-heading">What is CGPA?</h2>
            <p className="text-sm text-muted-foreground mt-2">
              CGPA stands for Cumulative Grade Point Average. It is a metric used by Gujarat Technological University (GTU) to indicate a student's academic performance over multiple semesters.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              For academic programs lasting more than two years, the degree is awarded based on the CGPA of the last four semesters.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold font-heading">What is CPI?</h2>
            <p className="text-sm text-muted-foreground mt-2">
              CPI in GTU stands for Cumulative Performance Index. It is a metric similar to CGPA, but it is calculated for degree programs with a duration of 2 years.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              CPI is calculated by summing the products of the credits and grade points for each course and then dividing that sum by the total credits for all four semesters.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold font-heading">GTU CGPA to Grade:</h2>
            <ul className="list-disc pl-6 text-sm text-muted-foreground mt-2 space-y-1">
              <li>7.1 & above = First class with distinction</li>
              <li>6.5 & above = First class</li>
              <li>5.5 & above = Second class</li>
              <li>Below 5.5 = Pass class</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm">What is the maximum CGPA in GTU?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              The maximum CGPA in GTU is 10 as it follows a 10-point scale grading system.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm">How much CGPA is good in GTU?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              If your CGPA is 7.1 & above, it is First class with distinction. If your CGPA is 6.5 & above, it is First class. If your CGPA is 5.5 & above, it is Second class. Any CGPA below 5.5 is considered a Pass class.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Based on our research, a CGPA of 7.5-8 & above is considered good. It helps you pass the minimum CGPA criteria when applying for jobs or universities.
            </p>
          </div>

          <p className="text-xs text-muted-foreground italic border-t pt-4">
            This calculator is built independently by the owner of this website for educational purposes only. It is based on the{" "}
            <a href="https://www.gtu.ac.in/ImpCircular/Notification_1_of_2012_Indicating_CPI_-CGPA_Equivalent_Class.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline">
              circular released by Gujarat Technological University, Ahmedabad
            </a>. This is not the official website of GTU. We recommend verifying the percentage by going through the official GTU documents.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
