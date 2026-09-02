import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourlearningmentor.com"),
  title: {
    default: "YourLearningMentor — Free Academic Tools, GPA Calculators & Tutor Search",
    template: "%s | YourLearningMentor",
  },
  description:
    "Free online calculators for CGPA, GPA, GTU, KIIT, SRM, VIT, Drexel, CASPA, IB, IPU, Attendance, and Audiobook progress. Connect directly with verified tutors across India.",
  keywords: [
    "CGPA Calculator",
    "GPA Calculator",
    "KIIT CGPA Calculator",
    "GTU CGPA to Percentage",
    "SRM GPA Calculator",
    "VIT GPA Calculator",
    "Find a Tutor",
    "Home Tutors in India",
    "Online Tutors",
    "Attendance Calculator",
    "Audiobook Percentage Calculator",
  ],
  authors: [{ name: "YourLearningMentor", url: "https://yourlearningmentor.com" }],
  creator: "YourLearningMentor",
  publisher: "YourLearningMentor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourlearningmentor.com",
    siteName: "YourLearningMentor",
    title: "YourLearningMentor — Free Academic Tools & Tutor Marketplace",
    description:
      "Free online calculators for CGPA, GPA, GTU, KIIT, SRM, VIT, Drexel, CASPA, IB, IPU, and student mentor tools.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "YourLearningMentor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YourLearningMentor — Free Academic Tools",
    description: "Free online calculators for GPA, CGPA, Attendance, and student mentor tools.",
    images: ["/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const siteSchemaJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://yourlearningmentor.com/#website",
      url: "https://yourlearningmentor.com/",
      name: "YourLearningMentor",
      description: "Free online academic calculators, GPA converters, and tutor directory.",
      publisher: { "@id": "https://yourlearningmentor.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://yourlearningmentor.com/find-a-tutor?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://yourlearningmentor.com/#organization",
      name: "YourLearningMentor",
      url: "https://yourlearningmentor.com/",
      logo: "https://yourlearningmentor.com/og/home.png",
      sameAs: [],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemaJson) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
