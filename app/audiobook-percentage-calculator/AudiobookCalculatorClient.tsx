"use client";

import { useState, useRef } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function AudiobookCalculatorClient() {
  const [totalHours, setTotalHours] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");
  const [listenedHours, setListenedHours] = useState("");
  const [listenedMinutes, setListenedMinutes] = useState("");
  const [result, setResult] = useState<{ percentage: number; listened: string; total: string; remaining: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const calculate = () => {
    const totalMin = (parseFloat(totalHours) || 0) * 60 + (parseFloat(totalMinutes) || 0);
    const listenedMin = Math.min((parseFloat(listenedHours) || 0) * 60 + (parseFloat(listenedMinutes) || 0), totalMin);

    if (totalMin <= 0) {
      setResult(null);
      return;
    }

    setResult({
      percentage: parseFloat(((listenedMin / totalMin) * 100).toFixed(1)),
      listened: formatTime(listenedMin),
      total: formatTime(totalMin),
      remaining: formatTime(totalMin - listenedMin),
    });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const reset = () => {
    setTotalHours("");
    setTotalMinutes("");
    setListenedHours("");
    setListenedMinutes("");
    setResult(null);
  };

  return (
    <>
      <Card>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Total Audiobook Length</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  placeholder="Hours"
                  value={totalHours}
                  onChange={(e) => setTotalHours(e.target.value)}
                />
                <Input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Min"
                  value={totalMinutes}
                  onChange={(e) => setTotalMinutes(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Current Progress</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  placeholder="Hours"
                  value={listenedHours}
                  onChange={(e) => setListenedHours(e.target.value)}
                />
                <Input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Min"
                  value={listenedMinutes}
                  onChange={(e) => setListenedMinutes(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-6">
        <Button onClick={calculate} className="rounded-full w-full">
          <Calculator size={16} className="mr-1" />
          Calculate Percentage
        </Button>
      </div>

      {/* Result */}
      {result && (
        <Card ref={resultRef} className="mt-8 border-accent/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-heading">
              Completion
            </p>
            <p className="mt-2 text-5xl font-bold text-accent">{result.percentage}%</p>

            <div className="w-full rounded-full bg-secondary h-3 mt-4 mb-3">
              <div
                className="h-3 rounded-full bg-accent transition-all"
                style={{ width: `${result.percentage}%` }}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>Listened: <strong className="text-foreground">{result.listened}</strong></span>
              <span>Total: <strong className="text-foreground">{result.total}</strong></span>
              <span>Remaining: <strong className="text-foreground">{result.remaining}</strong></span>
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
          <h2 className="text-lg font-bold mb-4 font-heading">How to Use This Calculator</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> Enter the total length of your audiobook in hours and minutes.</p>
            <p><strong className="text-foreground">Step 2:</strong> Enter how much you've listened so far.</p>
            <p><strong className="text-foreground">Step 3:</strong> Click "Calculate Percentage" to see your progress.</p>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 p-3">
            <p className="text-sm font-medium">Formula: Percentage = (Time Listened / Total Duration) × 100</p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 font-heading">About the Audiobook Percentage Calculator</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              This free audiobook percentage calculator helps you quickly determine how much of your audiobook you've completed. Whether you're tracking progress on Audible, Spotify, or any other platform, simply enter the total length and your current position to get an instant percentage.
            </p>
            <p>
              Knowing your listening progress helps you plan your reading goals, estimate time to finish, and stay motivated through longer audiobooks.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
