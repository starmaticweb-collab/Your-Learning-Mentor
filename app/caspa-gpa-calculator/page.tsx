import { Metadata } from "next";
import CaspaGpaCalculatorClient from "./CaspaGpaCalculatorClient";

export const metadata: Metadata = {
  title: "CASPA GPA Calculator | Science & Overall GPA for PA School",
  description:
    "Free CASPA GPA calculator using the official PA school grade conversion scale. Calculate overall, science (BCP), and non-science GPA for your CASPA application.",
  alternates: {
    canonical: "https://yourlearningmentor.com/caspa-gpa-calculator",
  },
  openGraph: {
    title: "CASPA GPA Calculator | YourLearningMentor",
    description:
      "Free CASPA GPA calculator using the official PA school grade conversion scale. Calculate overall, science (BCP), and non-science GPA for your CASPA application.",
    url: "https://yourlearningmentor.com/caspa-gpa-calculator",
    images: ["/og/gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CASPA GPA Calculator",
  url: "https://yourlearningmentor.com/caspa-gpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function CaspaGpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">CASPA GPA Calculator</h1>
          </div>

          <CaspaGpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
