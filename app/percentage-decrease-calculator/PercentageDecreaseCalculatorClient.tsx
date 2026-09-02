"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Calculator, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function PercentageDecreaseCalculatorClient() {
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [result, setResult] = useState<{ value: number; from: number; to: number; diff: number } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);
    if (isNaN(a) || isNaN(b) || a === 0) return;
    const value = parseFloat((((a - b) / Math.abs(a)) * 100).toFixed(4));
    setResult({ value, from: a, to: b, diff: a - b });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => { setValueA(""); setValueB(""); setResult(null); };

  const isDecrease = result ? result.value >= 0 : true;

  return (
    <>
      <Card className="mt-8">
        <CardContent className="p-5 space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Original Value</label>
            <Input type="number" inputMode="decimal" placeholder="e.g. 250" value={valueA} onChange={(e) => setValueA(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">The starting number</p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">New Value</label>
            <Input type="number" inputMode="decimal" placeholder="e.g. 200" value={valueB} onChange={(e) => setValueB(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">The number after the decrease</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={calculate} className="flex-1 gap-2"><Calculator size={18} /> Calculate</Button>
            <Button variant="outline" onClick={reset} className="gap-2"><RotateCcw size={16} /> Reset</Button>
          </div>
          <Link href="/percentage-increase-calculator" className="block">
            <Button variant="outline" className="w-full gap-2"><Calculator size={16} /> Percentage Increase Calculator</Button>
          </Link>
        </CardContent>
      </Card>

      {result && (
        <Card ref={resultRef} className="mt-6 overflow-hidden">
          <div className={`px-5 py-3 text-sm font-medium ${isDecrease ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
            {isDecrease ? "Percentage Decrease" : "Percentage Increase"}
          </div>
          <CardContent className="p-5 space-y-4">
            <p className={`text-5xl font-bold text-center ${isDecrease ? "text-red-600" : "text-emerald-600"}`}>
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
                <p className="text-muted-foreground">Decrease</p>
                <p className="mt-1 text-lg font-semibold">{result.diff > 0 ? "" : "+"}{result.diff}</p>
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground pt-2 border-t">
              Formula: (({result.from} − {result.to}) ÷ |{result.from}|) × 100
            </p>
          </CardContent>
        </Card>
      )}

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold font-heading">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Enter the original (higher) value in the first field.</li>
          <li>Enter the new (lower) value in the second field.</li>
          <li>Click <strong>Calculate</strong> to see the percentage decrease instantly.</li>
        </ol>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-bold font-heading">Formula</h2>
        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Percentage Decrease</p>
          <code className="mt-1 block">((Original − New) ÷ |Original|) × 100</code>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-bold font-heading">About This Calculator</h2>
        <p className="text-muted-foreground">
          This free percentage decrease calculator helps you find how much a value has decreased in percentage terms.
          Results are calculated instantly with the formula shown for transparency.
        </p>
      </section>
    </>
  );
}
