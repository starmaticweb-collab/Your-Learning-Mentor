import { Metadata } from "next";
import GpaToPercentageClient from "./GpaToPercentageClient";

export const metadata: Metadata = {
  title: "GPA to Percentage Converter",
  description:
    "Convert GPA to percentage on 4.0, 5.0, and 10.0 scales. Free online GPA to percentage converter for students worldwide.",
  alternates: {
    canonical: "https://yourlearningmentor.com/gpa-to-percentage-converter",
  },
  openGraph: {
    title: "GPA to Percentage Converter | YourLearningMentor",
    description:
      "Convert GPA to percentage on 4.0, 5.0, and 10.0 scales. Free online GPA to percentage converter for students worldwide.",
    url: "https://yourlearningmentor.com/gpa-to-percentage-converter",
    images: ["/og/gpa-to-percentage-converter.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GPA to Percentage Converter",
  url: "https://yourlearningmentor.com/gpa-to-percentage-converter",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GpaToPercentagePage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">GPA to Percentage Converter</h1>
          </div>

          <GpaToPercentageClient />
        </div>
      </main>
    </div>
  );
}
