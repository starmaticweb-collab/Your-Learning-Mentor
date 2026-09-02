import { Metadata } from "next";
import IbToGpaCalculatorClient from "./IbToGpaCalculatorClient";

export const metadata: Metadata = {
  title: "IB to GPA Calculator | Convert IB Scores to 4.0 GPA",
  description:
    "Free IB to GPA calculator. Convert your IB Diploma scores (1-7) for SL and HL subjects to a US 4.0 GPA, with weighted and unweighted results and CAS bonus.",
  alternates: {
    canonical: "https://yourlearningmentor.com/ib-to-gpa-calculator",
  },
  openGraph: {
    title: "IB to GPA Calculator | YourLearningMentor",
    description:
      "Free IB to GPA calculator. Convert your IB Diploma scores (1-7) for SL and HL subjects to a US 4.0 GPA, with weighted and unweighted results and CAS bonus.",
    url: "https://yourlearningmentor.com/ib-to-gpa-calculator",
    images: ["/og/gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "IB to GPA Calculator",
  url: "https://yourlearningmentor.com/ib-to-gpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function IbToGpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">IB to GPA Calculator</h1>
          </div>

          <IbToGpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
