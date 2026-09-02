import { Metadata } from "next";
import VitCgpaToPercentageClient from "./VitCgpaToPercentageClient";

export const metadata: Metadata = {
  title: "VIT CGPA to Percentage Calculator",
  description:
    "Convert your VIT CGPA to percentage marks instantly. Uses the official VIT formula: Percentage = CGPA × 10.",
  alternates: {
    canonical: "https://yourlearningmentor.com/vit-cgpa-to-percentage-calculator",
  },
  openGraph: {
    title: "VIT CGPA to Percentage Calculator | YourLearningMentor",
    description:
      "Convert your VIT CGPA to percentage marks instantly. Uses the official VIT formula: Percentage = CGPA × 10.",
    url: "https://yourlearningmentor.com/vit-cgpa-to-percentage-calculator",
    images: ["/og/vit-cgpa-to-percentage-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "VIT CGPA to Percentage Calculator",
  url: "https://yourlearningmentor.com/vit-cgpa-to-percentage-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function VitCgpaToPercentagePage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">VIT CGPA to Percentage Calculator</h1>
          </div>

          <VitCgpaToPercentageClient />
        </div>
      </main>
    </div>
  );
}
