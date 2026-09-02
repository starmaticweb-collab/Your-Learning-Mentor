import { Metadata } from "next";
import IpuCgpaCalculatorClient from "./IpuCgpaCalculatorClient";

export const metadata: Metadata = {
  title: "IPU CGPA Calculator | GGSIPU Ordinance 11 Grade Calculator",
  description:
    "Free IPU CGPA Calculator based on GGSIPU Ordinance 11. Enter your marks or grade points and credits to get your CGPA, percentage equivalent (CGPA × 10), and division.",
  alternates: {
    canonical: "https://yourlearningmentor.com/ipu-cgpa-calculator",
  },
  openGraph: {
    title: "IPU CGPA Calculator | YourLearningMentor",
    description:
      "Free IPU CGPA Calculator based on GGSIPU Ordinance 11. Enter your marks or grade points and credits to get your CGPA, percentage equivalent (CGPA × 10), and division.",
    url: "https://yourlearningmentor.com/ipu-cgpa-calculator",
    images: ["/og/gpa-calculator.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "IPU CGPA Calculator",
  url: "https://yourlearningmentor.com/ipu-cgpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function IpuCgpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-5xl font-heading">IPU CGPA Calculator</h1>
          </div>

          <IpuCgpaCalculatorClient />
        </div>
      </main>
    </div>
  );
}
