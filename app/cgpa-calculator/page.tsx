import { Metadata } from "next";
import CgpaCalculatorClient from "./CgpaCalculatorClient";

export const metadata: Metadata = {
  title: "CGPA Calculator",
  description:
    "Calculate your cumulative GPA quickly and accurately by subject grades or by semester. Free online CGPA calculator for students.",
  alternates: {
    canonical: "https://yourlearningmentor.com/cgpa-calculator",
  },
  openGraph: {
    title: "CGPA Calculator | YourLearningMentor",
    description:
      "Calculate your cumulative GPA quickly and accurately by subject grades or by semester. Free online CGPA calculator for students.",
    url: "https://yourlearningmentor.com/cgpa-calculator",
    images: ["/og/cgpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CGPA Calculator",
  url: "https://yourlearningmentor.com/cgpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function CgpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">CGPA Calculator</h1>
          </div>

          <CgpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
