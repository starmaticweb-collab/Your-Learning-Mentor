import { Metadata } from "next";
import TargetGpaCalculatorClient from "./TargetGpaCalculatorClient";

export const metadata: Metadata = {
  title: "Target GPA Calculator",
  description:
    "Calculate the minimum GPA you need next semester to reach your target CGPA. Free online target GPA calculator for students.",
  alternates: {
    canonical: "https://yourlearningmentor.com/target-gpa-calculator",
  },
  openGraph: {
    title: "Target GPA Calculator | YourLearningMentor",
    description:
      "Calculate the minimum GPA you need next semester to reach your target CGPA. Free online target GPA calculator for students.",
    url: "https://yourlearningmentor.com/target-gpa-calculator",
    images: ["/og/target-gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Target GPA Calculator",
  url: "https://yourlearningmentor.com/target-gpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function TargetGpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">Target GPA Calculator</h1>
          </div>

          <TargetGpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
