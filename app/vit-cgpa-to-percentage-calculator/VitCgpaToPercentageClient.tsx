"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { fireConfetti } from "@/lib/confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function VitCgpaToPercentageClient() {
  const [cgpa, setCgpa] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const convert = () => {
    const val = parseFloat(cgpa);
    if (isNaN(val)) return;
    setResult(`${(val * 10).toFixed(2)}%`);
    if (val >= 4) fireConfetti();
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Enter your CGPA</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="e.g. 8.95"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />
          </div>
          <Button onClick={convert} className="w-full rounded-full">
            Convert
          </Button>
          {result && (
            <div ref={resultRef} className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium font-heading">Equivalent Percentage</p>
              <p className="mt-2 text-5xl font-bold text-accent">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        This VIT CGPA to Percentage calculator allows you to convert your CGPA into percentage marks. It is a tool built by an independent creator for students of Vellore Institute of Technology University.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Just enter your CGPA into the input box and press the "Convert" button. You'll instantly get equivalent percentage marks. Need to calculate your CGPA first? Use our <Link href="/cgpa-calculator" className="font-medium text-accent underline underline-offset-4 hover:text-accent/80">CGPA Calculator</Link>.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        The conversion formula of this calculator is based on the{" "}
        <a href="https://vit.ac.in/sites/default/files/CGPAConversion.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline">
          document released by the Vellore Institute of Technology
        </a>, Tamil Nadu, India.
      </p>

      <Card className="mt-10">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">What is CGPA?</h2>
          <p className="text-sm text-muted-foreground">
            CGPA stands for Cumulative Grade Point Average. It is a score used by universities to indicate a student's overall academic performance during multiple semesters or the entire educational program.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading">How do I calculate CGPA to percentage in VIT?</h2>
          <p className="text-sm text-muted-foreground">
            To convert CGPA into percentage marks, you can use the following formula provided by the Vellore Institute of Technology University:
          </p>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm font-bold">
            Percentage marks = CGPA × 10
          </div>
          <p className="text-sm text-muted-foreground">
            The formula is straightforward. Just multiply your CGPA by 10 and you'll get equivalent percentage marks. For example, CGPA 8.95 × 10 = 89.50%.
          </p>

          <div className="border-t pt-4">
            <p className="font-bold text-sm">Example:</p>
            <p className="text-sm text-muted-foreground mt-1">
              Suppose Rahul has an 8.20 CGPA. So simply multiply 8.20 CGPA by 10.
            </p>
            <div className="bg-muted rounded-lg p-3 mt-2 font-mono text-sm space-y-1">
              <p>= 8.20 × 10</p>
              <p className="font-bold">= 82%</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Rahul has got 82%.</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
