"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Calculator, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function PercentageCalculatorClient() {
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [result, setResult] = useState<{ value: number; from: number; to: number; diff: number } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);
    if (isNaN(a) || isNaN(b) || a === 0) return;
    const value = parseFloat((((b - a) / Math.abs(a)) * 100).toFixed(4));
    setResult({ value, from: a, to: b, diff: b - a });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => { setValueA(""); setValueB(""); setResult(null); };

  const isPositive = result ? result.value >= 0 : true;

  return (
    <>
      <Card className="mt-8">
        <CardContent className="p-5 space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Original Value</label>
            <Input type="number" inputMode="decimal" placeholder="e.g. 200" value={valueA} onChange={(e) => setValueA(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">The starting number</p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">New Value</label>
            <Input type="number" inputMode="decimal" placeholder="e.g. 250" value={valueB} onChange={(e) => setValueB(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">The number after the change</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={calculate} className="flex-1 gap-2"><Calculator size={18} /> Calculate</Button>
            <Button variant="outline" onClick={reset} className="gap-2"><RotateCcw size={16} /> Reset</Button>
          </div>
          <Link href="/percentage-decrease-calculator" className="block">
            <Button variant="outline" className="w-full gap-2"><Calculator size={16} /> Percentage Decrease Calculator</Button>
          </Link>
        </CardContent>
      </Card>

      {result && (
        <Card ref={resultRef} className="mt-6 overflow-hidden">
          <div className={`px-5 py-3 text-sm font-medium ${isPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
            {isPositive ? "Percentage Increase" : "Percentage Decrease"}
          </div>
          <CardContent className="p-5 space-y-4">
            <p className={`text-5xl font-bold text-center ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
              {Math.abs(result.value)}%
            </p>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-muted-foreground">Original</p>
                <p className="mt-1 text-lg font-semibold">{result.from}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-muted-foreground">New</p>
                <p className="mt-1 text-lg font-semibold">{result.to}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-muted-foreground">Change</p>
                <p className="mt-1 text-lg font-semibold">{result.diff > 0 ? "+" : ""}{result.diff}</p>
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground pt-2 border-t">
              Formula: (({result.to} − {result.from}) ÷ |{result.from}|) × 100
            </p>
          </CardContent>
        </Card>
      )}

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold font-heading">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Enter the original value in the first field.</li>
          <li>Enter the new value in the second field.</li>
          <li>Click <strong>Calculate</strong> to see the percentage increase instantly.</li>
        </ol>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-bold font-heading">Formula</h2>
        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Percentage Increase</p>
          <code className="mt-1 block">((New − Original) ÷ |Original|) × 100</code>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-bold font-heading">About This Calculator</h2>
        <p className="text-muted-foreground">
          This free percentage increase calculator helps you find the percentage change between two numbers.
          Results are calculated instantly with the formula shown for transparency.
        </p>
      </section>
    </>
  );
}
