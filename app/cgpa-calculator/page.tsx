import { Metadata } from "next";
import CgpaCalculatorClient from "./CgpaCalculatorClient";

export const metadata: Metadata = {
  title: "CGPA Calculator — Calculate Cumulative GPA by Semester or Subject",
  description:
    "Free online CGPA Calculator. Calculate your cumulative grade point average (CGPA) by subject letter grades or semester GPAs. Download PDF report and convert CGPA easily.",
  keywords: [
    "CGPA Calculator",
    "Calculate CGPA",
    "Cumulative Grade Point Average",
    "Semester GPA Calculator",
    "CGPA to Percentage",
    "College CGPA Calculator",
    "Subject Grade Calculator",
  ],
  alternates: {
    canonical: "https://yourlearningmentor.com/cgpa-calculator",
  },
  openGraph: {
    title: "CGPA Calculator — Free Online Cumulative GPA Tool",
    description:
      "Calculate your cumulative GPA quickly and accurately by subject grades or semester GPAs. Download instant PDF transcript report.",
    url: "https://yourlearningmentor.com/cgpa-calculator",
    images: ["/og/cgpa-calculator.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CGPA Calculator — Free Online Cumulative GPA Tool",
    description:
      "Calculate your cumulative GPA quickly and accurately by subject grades or semester GPAs.",
    images: ["/og/cgpa-calculator.png"],
  },
};

const schemasJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://yourlearningmentor.com/cgpa-calculator#webapp",
      name: "CGPA Calculator",
      url: "https://yourlearningmentor.com/cgpa-calculator",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://yourlearningmentor.com/cgpa-calculator#breadcrumb",
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
          name: "CGPA Calculator",
          item: "https://yourlearningmentor.com/cgpa-calculator",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://yourlearningmentor.com/cgpa-calculator#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How is CGPA calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CGPA is calculated by dividing the sum of weighted grade points (Grade Point x Credit Hours for each course) by the total number of credit hours attempted.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download my CGPA report as a PDF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, after calculating your CGPA on YourLearningMentor, click the 'Download PDF' button to save your formatted academic progress report.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between GPA and CGPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GPA (Grade Point Average) usually measures academic performance for a single semester, whereas CGPA (Cumulative Grade Point Average) represents your overall academic performance across all completed semesters.",
          },
        },
      ],
    },
  ],
};

export default function CgpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">CGPA Calculator</h1>
            <p className="mt-3 text-muted-foreground text-sm md:text-base">
              Calculate your cumulative grade point average instantly by subject grades or semester GPAs.
            </p>
          </div>

          <CgpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
