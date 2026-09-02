import { Metadata } from "next";
import KiitCgpaCalculatorClient from "./KiitCgpaCalculatorClient";

export const metadata: Metadata = {
  title: "KIIT CGPA Calculator",
  description:
    "Calculate your KIIT University CGPA instantly. Uses official KIIT grading system with SGPA to CGPA conversion.",
  alternates: {
    canonical: "https://yourlearningmentor.com/kiit-cgpa-calculator",
  },
  openGraph: {
    title: "KIIT CGPA Calculator | YourLearningMentor",
    description:
      "Calculate your KIIT University CGPA instantly. Uses official KIIT grading system with SGPA to CGPA conversion.",
    url: "https://yourlearningmentor.com/kiit-cgpa-calculator",
    images: ["/og/kiit-cgpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "KIIT CGPA Calculator",
  url: "https://yourlearningmentor.com/kiit-cgpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function KiitCgpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">KIIT CGPA Calculator</h1>
          </div>

          <KiitCgpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
