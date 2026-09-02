import { Metadata } from "next";
import AttendanceCalculatorClient from "./AttendanceCalculatorClient";

export const metadata: Metadata = {
  title: "Attendance Percentage Calculator",
  description:
    "Check your attendance percentage and find out how many classes you can skip or need to attend to meet requirements.",
  alternates: {
    canonical: "https://yourlearningmentor.com/attendance-percentage-calculator",
  },
  openGraph: {
    title: "Attendance Percentage Calculator | YourLearningMentor",
    description:
      "Check your attendance percentage and find out how many classes you can skip or need to attend to meet requirements.",
    url: "https://yourlearningmentor.com/attendance-percentage-calculator",
    images: ["/og/attendance-percentage-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Attendance Percentage Calculator",
  url: "https://yourlearningmentor.com/attendance-percentage-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AttendanceCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">Attendance Percentage Calculator</h1>
          </div>

          <AttendanceCalculatorClient />
        </div>
      </main>
    </div>
  );
}
