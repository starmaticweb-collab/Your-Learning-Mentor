import { Metadata } from "next";
import GtuCgpaCalculatorClient from "./GtuCgpaCalculatorClient";

export const metadata: Metadata = {
  title: "GTU CGPA to Percentage Calculator",
  description:
    "Convert your GTU CPI/CGPA to percentage marks instantly using the official GTU formula. Free online converter.",
  alternates: {
    canonical: "https://yourlearningmentor.com/cgpa-to-percentage-gtu-calculator",
  },
  openGraph: {
    title: "GTU CGPA to Percentage Calculator | YourLearningMentor",
    description:
      "Convert your GTU CPI/CGPA to percentage marks instantly using the official GTU formula. Free online converter.",
    url: "https://yourlearningmentor.com/cgpa-to-percentage-gtu-calculator",
    images: ["/og/cgpa-to-percentage-gtu-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GTU CGPA to Percentage Calculator",
  url: "https://yourlearningmentor.com/cgpa-to-percentage-gtu-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GtuCgpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">GTU CGPA to Percentage Calculator</h1>
          </div>

          <GtuCgpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
