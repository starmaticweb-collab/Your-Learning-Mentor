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
    default: "YourLearningMentor — Free Academic Tools & Study Resources",
    template: "%s | YourLearningMentor",
  },
  description: "Free online calculators for GPA, CGPA, Attendance, Audiobook listening, GTU, KIIT, SRM, VIT, Drexel, CASPA, Howard County, IB, IPU, and student mentor tools.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourlearningmentor.com",
    siteName: "YourLearningMentor",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
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
