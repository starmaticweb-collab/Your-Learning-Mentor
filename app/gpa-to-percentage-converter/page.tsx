import { Metadata } from "next";
import GpaToPercentageClient from "./GpaToPercentageClient";

export const metadata: Metadata = {
  title: "GPA to Percentage Converter — 4.0, 5.0, 10.0 Scales",
  description:
    "Convert GPA to percentage on 4.0, 5.0, and 10.0 scales. Free online GPA to percentage converter with conversion formulas, reference tables, and FAQ.",
  keywords: [
    "GPA to Percentage",
    "GPA to Percentage Converter",
    "4.0 GPA to Percentage",
    "10.0 GPA to Percentage",
    "Indian CGPA to Percentage",
    "Convert 3.5 GPA to Percentage",
    "Grade Point to Percentage",
  ],
  alternates: {
    canonical: "https://yourlearningmentor.com/gpa-to-percentage-converter",
  },
  openGraph: {
    title: "GPA to Percentage Converter — 4.0, 5.0, 10.0 Scales",
    description:
      "Convert GPA to percentage on 4.0, 5.0, and 10.0 scales. Free online GPA to percentage converter with formulas and tables.",
    url: "https://yourlearningmentor.com/gpa-to-percentage-converter",
    images: ["/og/gpa-to-percentage-converter.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA to Percentage Converter",
    description: "Convert GPA to percentage on 4.0, 5.0, and 10.0 scales instantly.",
    images: ["/og/gpa-to-percentage-converter.png"],
  },
};

const schemasJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://yourlearningmentor.com/gpa-to-percentage-converter#webapp",
      name: "GPA to Percentage Converter",
      url: "https://yourlearningmentor.com/gpa-to-percentage-converter",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://yourlearningmentor.com/gpa-to-percentage-converter#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://yourlearningmentor.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "GPA to Percentage Converter",
          item: "https://yourlearningmentor.com/gpa-to-percentage-converter",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://yourlearningmentor.com/gpa-to-percentage-converter#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What percentage is 3.5 GPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a 4.0 scale, 3.5 GPA equals 87.5%. This is calculated as (3.5 / 4.0) × 100 = 87.5%.",
          },
        },
        {
          "@type": "Question",
          name: "What percentage is 3.0 GPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a 4.0 scale, 3.0 GPA equals 75%. This is the standard minimum for many competitive postgraduate programs and job applications in India.",
          },
        },
        {
          "@type": "Question",
          name: "How do you convert 10 point GPA to percentage in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a 10.0 scale in India (CBSE / AICTE standard), percentage is calculated as GPA × 9.5. For example, an 8.5 CGPA equals 80.75%.",
          },
        },
      ],
    },
  ],
};

export default function GpaToPercentagePage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">GPA to Percentage Converter</h1>
            <p className="mt-3 text-muted-foreground text-sm md:text-base">
              Convert GPA to percentage across 4.0, 5.0, and 10.0 scales with official formulas.
            </p>
          </div>

          <GpaToPercentageClient />
        </div>
      </main>
    </div>
  );
}
