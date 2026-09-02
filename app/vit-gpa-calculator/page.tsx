import { Metadata } from "next";
import VitGpaCalculatorClient from "./VitGpaCalculatorClient";

export const metadata: Metadata = {
  title: "VIT GPA Calculator",
  description:
    "Calculate your VIT University semester GPA using the official VIT grading scale. Free online calculator.",
  alternates: {
    canonical: "https://yourlearningmentor.com/vit-gpa-calculator",
  },
  openGraph: {
    title: "VIT GPA Calculator | YourLearningMentor",
    description:
      "Calculate your VIT University semester GPA using the official VIT grading scale. Free online calculator.",
    url: "https://yourlearningmentor.com/vit-gpa-calculator",
    images: ["/og/vit-gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "VIT GPA Calculator",
  url: "https://yourlearningmentor.com/vit-gpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function VitGpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">VIT GPA Calculator</h1>
          </div>

          <VitGpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
