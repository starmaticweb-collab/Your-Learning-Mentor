import { Metadata } from "next";
import CovenantEyesPromoCodeClient from "./CovenantEyesPromoCodeClient";

export const metadata: Metadata = {
  title: "Covenant Eyes Promo Code 2026",
  description:
    "Best Covenant Eyes promo code for 2026: use KEEPLEARNING for a free 30-day trial. Plus verified coupons for $2 off, 20% annual discount, and family deals.",
  alternates: {
    canonical: "https://yourlearningmentor.com/covenant-eyes-promo-code",
  },
  openGraph: {
    title: "Covenant Eyes Promo Code 2026 | YourLearningMentor",
    description:
      "Best Covenant Eyes promo code for 2026: use KEEPLEARNING for a free 30-day trial. Plus verified coupons for $2 off, 20% annual discount, and family deals.",
    url: "https://yourlearningmentor.com/covenant-eyes-promo-code",
    images: ["/og/covenant-eyes-promo-code.png"],
  },
};

const faqs = [
  {
    question: "What is the best Covenant Eyes promo code right now?",
    answer:
      "The best Covenant Eyes promo code right now is KEEPLEARNING, which gives you a full 30-day free trial instead of the standard 14-day trial. This is an exclusive deal available through our affiliate link.",
  },
  {
    question: "Does Covenant Eyes offer a free trial?",
    answer:
      "Yes, Covenant Eyes offers a standard 14-day free trial. However, with our exclusive promo code KEEPLEARNING, you can get an extended 30-day free trial — doubling the time to try the service risk-free.",
  },
  {
    question: "How much does Covenant Eyes cost per month?",
    answer:
      "Covenant Eyes costs $18 per month for the monthly plan. The yearly plan is $198 per year (equivalent to $16.50/month), and there's also a lifetime plan for a one-time payment of $950. All plans cover unlimited devices for up to 10 individual users within a family.",
  },
  {
    question: "Can I use multiple Covenant Eyes promo codes at once?",
    answer:
      "No, Covenant Eyes only allows one promo code per account at checkout. We recommend using the KEEPLEARNING code for the best value, as it provides a full 30-day free trial.",
  },
  {
    question: "Does Covenant Eyes have a student discount?",
    answer:
      "Yes, Covenant Eyes offers special pricing for students and nonprofit organizations. You need to contact Covenant Eyes support directly to verify your eligibility and apply the discount to your account.",
  },
  {
    question: "How do I apply a Covenant Eyes promo code?",
    answer:
      "To apply a promo code: 1) Copy the code from this page. 2) Click the link to visit the Covenant Eyes website. 3) During signup, paste the promo code in the coupon field at checkout. The discount will be applied to your order.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function CovenantEyesPromoCodePage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <CovenantEyesPromoCodeClient />
      </main>
    </div>
  );
}
