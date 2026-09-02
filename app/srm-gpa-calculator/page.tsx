import { Metadata } from "next";
import SrmGpaCalculatorClient from "./SrmGpaCalculatorClient";

export const metadata: Metadata = {
  title: "SRM GPA Calculator",
  description:
    "Calculate your SRM University SGPA using the official SRM grading system. Free online GPA calculator for SRM students.",
  alternates: {
    canonical: "https://yourlearningmentor.com/srm-gpa-calculator",
  },
  openGraph: {
    title: "SRM GPA Calculator | YourLearningMentor",
    description:
      "Calculate your SRM University SGPA using the official SRM grading system. Free online GPA calculator for SRM students.",
    url: "https://yourlearningmentor.com/srm-gpa-calculator",
    images: ["/og/srm-gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SRM GPA Calculator",
  url: "https://yourlearningmentor.com/srm-gpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SrmGpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">SRM GPA Calculator</h1>
          </div>

          <SrmGpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
