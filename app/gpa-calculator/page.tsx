import { Metadata } from "next";
import GpaCalculatorClient from "./GpaCalculatorClient";

export const metadata: Metadata = {
  title: "GPA Calculator | US 4.0 Scale",
  description:
    "Calculate your GPA on a 4.0 scale. Free online GPA calculator for US and international students with downloadable PDF report.",
  alternates: {
    canonical: "https://yourlearningmentor.com/gpa-calculator",
  },
  openGraph: {
    title: "GPA Calculator | YourLearningMentor",
    description:
      "Calculate your GPA on a 4.0 scale. Free online GPA calculator for US and international students with downloadable PDF report.",
    url: "https://yourlearningmentor.com/gpa-calculator",
    images: ["/og/gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GPA Calculator",
  url: "https://yourlearningmentor.com/gpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">GPA Calculator</h1>
          </div>

          <GpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
