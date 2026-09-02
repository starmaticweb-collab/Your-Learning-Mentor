import { Metadata } from "next";
import PercentageDecreaseCalculatorClient from "./PercentageDecreaseCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Decrease Calculator — Free & Instant",
  description:
    "Calculate percentage decrease between two numbers. Free, fast, and accurate with formula shown.",
  alternates: {
    canonical: "https://yourlearningmentor.com/percentage-decrease-calculator",
  },
  openGraph: {
    title: "Percentage Decrease Calculator | YourLearningMentor",
    description:
      "Calculate percentage decrease between two numbers. Free, fast, and accurate with formula shown.",
    url: "https://yourlearningmentor.com/percentage-decrease-calculator",
    images: ["/og/percentage-decrease-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Percentage Decrease Calculator",
  url: "https://yourlearningmentor.com/percentage-decrease-calculator",
  description: "Calculate percentage decrease between two numbers instantly.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PercentageDecreaseCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto max-w-2xl px-4 py-10 md:py-16">
        <h1 className="text-3xl font-bold text-center md:text-4xl font-heading">Percentage Decrease Calculator</h1>
        <PercentageDecreaseCalculatorClient />
      </main>
    </div>
  );
}
