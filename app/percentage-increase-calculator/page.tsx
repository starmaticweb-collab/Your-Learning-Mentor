import { Metadata } from "next";
import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Increase Calculator — Free & Instant",
  description:
    "Calculate percentage increase between two numbers. Free, fast, and accurate with formula shown.",
  alternates: {
    canonical: "https://yourlearningmentor.com/percentage-increase-calculator",
  },
  openGraph: {
    title: "Percentage Increase Calculator | YourLearningMentor",
    description:
      "Calculate percentage increase between two numbers. Free, fast, and accurate with formula shown.",
    url: "https://yourlearningmentor.com/percentage-increase-calculator",
    images: ["/og/percentage-increase-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Percentage Increase Calculator",
  url: "https://yourlearningmentor.com/percentage-increase-calculator",
  description: "Calculate percentage increase between two numbers instantly.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PercentageIncreaseCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto max-w-2xl px-4 py-10 md:py-16">
        <h1 className="text-3xl font-bold text-center md:text-4xl font-heading">Percentage Increase Calculator</h1>
        <PercentageCalculatorClient />
      </main>
    </div>
  );
}
