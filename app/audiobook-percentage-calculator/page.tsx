import { Metadata } from "next";
import AudiobookCalculatorClient from "./AudiobookCalculatorClient";

export const metadata: Metadata = {
  title: "Audiobook Percentage Calculator",
  description:
    "Track your audiobook listening progress as a percentage. Enter total and listened time to see how far you've come.",
  alternates: {
    canonical: "https://yourlearningmentor.com/audiobook-percentage-calculator",
  },
  openGraph: {
    title: "Audiobook Percentage Calculator | YourLearningMentor",
    description:
      "Track your audiobook listening progress as a percentage. Enter total and listened time to see how far you've come.",
    url: "https://yourlearningmentor.com/audiobook-percentage-calculator",
    images: ["/og/audiobook-percentage-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Audiobook Percentage Calculator",
  url: "https://yourlearningmentor.com/audiobook-percentage-calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AudiobookCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">Audiobook Percentage Calculator</h1>
          </div>

          <AudiobookCalculatorClient />
        </div>
      </main>
    </div>
  );
}
