import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Best Screen Accountability Software 2026",
  description:
    "Compare the top screen accountability software including Covenant Eyes, Accountable2You, Canopy, Truple, and Bark. Detailed reviews, pricing, and features.",
  alternates: {
    canonical: "https://yourlearningmentor.com/best-screen-accountability-software",
  },
  openGraph: {
    title: "Best Screen Accountability Software 2026 | YourLearningMentor",
    description:
      "Compare the top screen accountability software including Covenant Eyes, Accountable2You, Canopy, Truple, and Bark. Detailed reviews, pricing, and features.",
    url: "https://yourlearningmentor.com/best-screen-accountability-software",
    images: ["/og/best-screen-accountability-software.png"],
  },
};

const AFFILIATE_LINK = "https://covenanteyes.sjv.io/555m03";

type Software = {
  name: string;
  tagline: string;
  price: string;
  priceSub: string;
  description: string;
  features: string[];
  link: string;
  recommended?: boolean;
};

const software: Software[] = [
  {
    name: "Covenant Eyes",
    tagline: "Industry leader with 20+ years of proven results",
    price: "$18/mo",
    priceSub: "or $198/year",
    description:
      "Covenant Eyes is the gold standard in screen accountability. Its patented AI analyzes screenshots of your device activity, flags explicit content, and sends blurred reports to your accountability partner. Works seamlessly across Windows, Mac, iOS, and Android.",
    features: [
      "AI-powered screenshot monitoring with content detection",
      "Cross-platform: Windows, Mac, iOS, Android",
      "Blurred screenshots protect partners from explicit content",
      "Detects incognito and private browsing",
      "Up to 10 users and unlimited devices per account",
      "24/7 customer support via email, chat, and phone",
    ],
    link: AFFILIATE_LINK,
    recommended: true,
  },
  {
    name: "Accountable2You",
    tagline: "Real-time reporting and custom trigger alerts",
    price: "$11/mo",
    priceSub: "Individual Plan",
    description:
      "Accountable2You focuses on transparency without blocking. It monitors browsing, apps, and searches in real-time, sending instant alerts when questionable content is detected. Avoids screenshots to protect partners from exposure.",
    features: [
      "Real-time monitoring with instant alerts",
      "Custom trigger words for personalized accountability",
      "Works on 6 platforms including Chromebook and Linux",
      "No screenshots (protects accountability partners)",
      "Monitors incognito and private browsing",
    ],
    link: "https://accountable2you.com/",
  },
  {
    name: "Canopy",
    tagline: "AI filtering that removes explicit content instantly",
    price: "$15/mo",
    priceSub: "Per Device",
    description:
      "Canopy uses AI to scan and block explicit images before they appear on screen. Prevention-first approach eliminates temptation entirely. Excellent for families and adults seeking both accountability and protection.",
    features: [
      "Real-time AI filtering blocks explicit content instantly",
      "Tamper-proof on Android (requires partner approval)",
      "App blocking and website management",
      "Sexting detection and alerts",
      "Location tracking for families",
    ],
    link: "https://canopy.us/",
  },
  {
    name: "Truple",
    tagline: "End-to-end encrypted screenshot accountability",
    price: "$13/mo",
    priceSub: "Paid Annually",
    description:
      "The only accountability app with end-to-end encryption. Captures random screenshots at configurable intervals and uses AI to flag high-risk content. Designed for families with one subscription covering all household devices.",
    features: [
      "End-to-end encryption for maximum privacy",
      "Random screenshots with AI flagging",
      "Optional screenshot blurring and text redaction",
      "Screen time reports by hour",
      "Up to 15 devices per household",
    ],
    link: "https://truple.io/",
  },
  {
    name: "Bark",
    tagline: "Comprehensive parental control and monitoring",
    price: "$14/mo",
    priceSub: "Bark Premium",
    description:
      "Bark monitors text messages, emails, and social media for concerning content including cyberbullying and online predators. Excellent for protecting children and teens across 30+ apps and platforms.",
    features: [
      "Monitors 30+ apps and social platforms",
      "Detects cyberbullying, depression, suicidal ideation",
      "Content filtering and website blocking",
      "Screen time management and location tracking",
    ],
    link: "https://www.bark.us/",
  },
];

const faqs = [
  {
    question: "What is screen accountability software?",
    answer:
      "Screen accountability software monitors your online activity and reports it to a trusted accountability partner. It helps individuals maintain digital integrity by tracking browsing history, taking screenshots, and detecting inappropriate content.",
  },
  {
    question: "Which is the best screen accountability software?",
    answer:
      "Covenant Eyes is widely regarded as the best option. It has 20+ years of proven effectiveness, uses patented AI-powered screenshot accountability, works across all devices, and provides detailed reports to your partner.",
  },
  {
    question: "How much does screen accountability software cost?",
    answer:
      "Most range from $11 to $18 per month. Accountable2You is the most affordable at $11/mo. Covenant Eyes costs $18/mo or $198/year. Most offer free trials from 7 to 30 days.",
  },
  {
    question: "Does screen accountability software work on iPhone?",
    answer:
      "Yes, most top software works on iPhone including Covenant Eyes, Accountable2You, Canopy, and Truple. They use VPN-based monitoring and Apple's Screen Time API. Some require using their specific browser for full monitoring on iOS.",
  },
  {
    question: "Can screen accountability software be bypassed?",
    answer:
      "While no software is 100% bypass-proof, the best apps have strong tamper-resistance. Covenant Eyes alerts your partner if the app is removed. Canopy prevents uninstallation on Android without partner approval. The goal is transparency, not forced behavior.",
  },
];

const SoftwareCard = ({ item }: { item: Software }) => (
  <div
    className={`relative rounded-2xl border p-6 md:p-8 ${
      item.recommended
        ? "border-accent shadow-md"
        : "bg-card"
    }`}
  >
    {item.recommended && (
      <Badge className="absolute -top-3 left-6 bg-accent text-accent-foreground uppercase text-xs tracking-wider">
        Recommended
      </Badge>
    )}

    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold font-heading">{item.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{item.tagline}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-2xl font-bold">{item.price}</span>
        <p className="text-xs text-muted-foreground">{item.priceSub}</p>
      </div>
    </div>

    {/* Description */}
    <p className="mt-4 text-muted-foreground leading-relaxed">
      {item.description}
    </p>

    {/* Features */}
    <ul className="mt-5 space-y-2">
      {item.features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Check size={16} className="mt-0.5 shrink-0 text-accent" />
          {f}
        </li>
      ))}
    </ul>

    {/* CTA */}
    <div className="mt-6">
      <Button asChild className="rounded-full" size="lg">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          {item.recommended ? "Try Covenant Eyes Free" : `Visit ${item.name}`}
          <ExternalLink size={14} />
        </a>
      </Button>
    </div>
  </div>
);

export default function BestScreenAccountabilitySoftwarePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-wider">
            Updated{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Badge>
          <h1 className="text-3xl font-bold md:text-5xl font-heading">
            Best Screen Accountability Software
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Expert reviews and comparison of the top accountability apps to help
            you maintain digital integrity.
          </p>
        </div>

        {/* Intro */}
        <div className="mt-12 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Screen accountability software monitors your online activity and
            reports it to a trusted partner. Whether you're fighting addiction,
            building healthier habits, or maintaining transparency, the right
            tool makes all the difference.
          </p>
          <p>
            We've tested the top 5 accountability apps for{" "}
            {new Date().getFullYear()}. All have been personally evaluated for
            effectiveness, features, and value.
          </p>
        </div>

        {/* Software cards */}
        <div className="mt-12 space-y-6">
          {software.map((item) => (
            <SoftwareCard key={item.name} item={item} />
          ))}
        </div>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold font-heading">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium font-heading">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  );
}
