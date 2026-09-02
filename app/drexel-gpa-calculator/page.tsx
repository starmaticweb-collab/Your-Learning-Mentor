import { Metadata } from "next";
import DrexelGpaCalculatorClient from "./DrexelGpaCalculatorClient";

export const metadata: Metadata = {
  title: "Drexel GPA Calculator | Cumulative GPA Tool",
  description:
    "Free Drexel University GPA and Cumulative GPA calculator. Uses the official Drexel 4.00 grading scale with prior CGPA support.",
  alternates: {
    canonical: "https://yourlearningmentor.com/drexel-gpa-calculator",
  },
  openGraph: {
    title: "Drexel GPA Calculator | YourLearningMentor",
    description:
      "Free Drexel University GPA and Cumulative GPA calculator. Uses the official Drexel 4.00 grading scale with prior CGPA support.",
    url: "https://yourlearningmentor.com/drexel-gpa-calculator",
    images: ["/og/gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Drexel GPA Calculator",
  url: "https://yourlearningmentor.com/drexel-gpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function DrexelGpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">Drexel GPA Calculator</h1>
          </div>

          <DrexelGpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
