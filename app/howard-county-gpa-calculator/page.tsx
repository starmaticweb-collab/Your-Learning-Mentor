import { Metadata } from "next";
import HowardGpaCalculatorClient from "./HowardGpaCalculatorClient";

export const metadata: Metadata = {
  title: "Howard County GPA Calculator | HCC Grade Point Average Tool",
  description:
    "Free Howard Community College GPA calculator. Uses the official HCC 4.0 grading scale (A=4, B=3, C=2, D=1, F=0) with semester and cumulative GPA support.",
  alternates: {
    canonical: "https://yourlearningmentor.com/howard-county-gpa-calculator",
  },
  openGraph: {
    title: "Howard County GPA Calculator | YourLearningMentor",
    description:
      "Free Howard Community College GPA calculator. Uses the official HCC 4.0 grading scale (A=4, B=3, C=2, D=1, F=0) with semester and cumulative GPA support.",
    url: "https://yourlearningmentor.com/howard-county-gpa-calculator",
    images: ["/og/gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Howard Community College GPA Calculator",
  url: "https://yourlearningmentor.com/howard-county-gpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HowardGpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">Howard County GPA Calculator</h1>
          </div>

          <HowardGpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
