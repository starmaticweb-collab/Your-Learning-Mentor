"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AFFILIATE_LINK = "https://covenanteyes.sjv.io/555m03";

type Coupon = {
  id: number;
  title: string;
  description: string;
  discount: string;
  code: string | null;
  link: string;
  isBestDeal: boolean;
  verified: boolean;
  expiry: string;
};

const coupons: Coupon[] = [
  {
    id: 1,
    title: "100% Off First Month",
    description:
      "Get an exclusive 30-day free trial of Covenant Eyes instead of the standard 14-day trial. That's 100% off your first month — use our promo code and link to activate.",
    discount: "100% Off",
    code: "KEEPLEARNING",
    link: AFFILIATE_LINK,
    isBestDeal: true,
    verified: true,
    expiry: "Limited Time",
  },
  {
    id: 2,
    title: "First Month $2 Off",
    description:
      "Save $2 on your first month of Covenant Eyes Premium membership after your trial ends.",
    discount: "$2 Off",
    code: "CE2OFF",
    link: AFFILIATE_LINK,
    isBestDeal: false,
    verified: true,
    expiry: "Ongoing",
  },
  {
    id: 3,
    title: "Annual Plan — Save 20%",
    description:
      "Switch to an annual billing plan and save 20% compared to monthly billing. Best for long-term users.",
    discount: "20% Off",
    code: "YEARLY20",
    link: AFFILIATE_LINK,
    isBestDeal: false,
    verified: false,
    expiry: "Ongoing",
  },
  {
    id: 4,
    title: "Family Plan Discount",
    description:
      "Add up to 10 family members for just a small additional fee per user. Protect the entire household.",
    discount: "Family Deal",
    code: "FAMILY10",
    link: AFFILIATE_LINK,
    isBestDeal: false,
    verified: false,
    expiry: "Ongoing",
  },
  {
    id: 5,
    title: "Student & Nonprofit Discount",
    description:
      "Special pricing available for students and nonprofit organizations. Contact Covenant Eyes support to apply.",
    discount: "Special Pricing",
    code: null,
    link: AFFILIATE_LINK,
    isBestDeal: false,
    verified: true,
    expiry: "Ongoing",
  },
];

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

const CouponCard = ({ coupon }: { coupon: Coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(`Code "${code}" copied to clipboard.`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative flex flex-col gap-4 rounded-2xl border p-6 transition-all sm:flex-row sm:items-center ${
        coupon.isBestDeal
          ? "border-accent bg-accent/5 shadow-md"
          : "bg-card hover:shadow-sm"
      }`}
    >
      <div className="flex shrink-0 flex-col items-center gap-2 sm:w-28">
        <span
          className={`text-2xl font-bold ${
            coupon.isBestDeal ? "text-accent" : "text-foreground"
          }`}
        >
          {coupon.discount}
        </span>
        {coupon.isBestDeal && (
          <Badge className="gap-1 bg-accent text-accent-foreground">
            <Star size={12} /> Best Deal
          </Badge>
        )}
        {coupon.verified && !coupon.isBestDeal && (
          <Badge variant="secondary" className="gap-1 text-xs">
            <Check size={12} /> Verified
          </Badge>
        )}
      </div>

      <div className="hidden sm:block sm:h-20 sm:border-l sm:border-dashed sm:border-border" />

      <div className="flex-1">
        <h3 className="text-lg font-semibold font-heading">{coupon.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{coupon.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">Expires: {coupon.expiry}</p>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:w-40">
        {coupon.code ? (
          <>
            <button
              onClick={() => handleCopy(coupon.code!)}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-accent bg-accent/5 px-4 py-2.5 font-mono text-sm font-bold text-accent transition-colors hover:bg-accent/10"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {coupon.code}
            </button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <a href={coupon.link} target="_blank" rel="noopener noreferrer">
                Visit Site <ExternalLink size={14} />
              </a>
            </Button>
          </>
        ) : (
          <Button asChild className="w-full">
            <a href={coupon.link} target="_blank" rel="noopener noreferrer">
              Get Deal <ExternalLink size={14} />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default function CovenantEyesPromoCodeClient() {
  const currentMonth = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-wider">
          Updated {currentMonth}
        </Badge>
        <h1 className="text-3xl font-bold md:text-5xl font-heading">
          Covenant Eyes Promo Codes & Coupons ({new Date().getFullYear()})
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Save on Covenant Eyes with our exclusive deals and verified promo codes. Our top pick gives you a full 30-day free trial.
        </p>
      </div>

      {/* Quick Answer — optimized for AI Overview extraction */}
      <section className="mt-10 rounded-xl border bg-card p-6">
        <h2 className="text-lg font-bold font-heading">Best Covenant Eyes Promo Code — Quick Summary</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The best Covenant Eyes promo code in {new Date().getFullYear()} is <strong className="text-foreground">KEEPLEARNING</strong>. 
          It gives you a <strong className="text-foreground">free 30-day trial</strong> instead of the standard 14-day trial.
        </p>
      </section>

      {/* Coupon list */}
      <div className="mt-10 space-y-4">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>

      {/* How-to section */}
      <section className="mt-16 space-y-6 text-base leading-relaxed">
        <h2 className="text-2xl font-bold font-heading">How to Use Covenant Eyes Promo Codes</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>Choose a deal from the list above.</li>
          <li>If there's a code, click to copy it to your clipboard.</li>
          <li>Click "Visit Site" or "Get Deal" to go to Covenant Eyes.</li>
          <li>Paste the promo code at checkout, or the discount will apply automatically.</li>
        </ol>

        <h2 className="text-2xl font-bold font-heading">About Covenant Eyes</h2>
        <p className="text-muted-foreground">
          Covenant Eyes is an accountability and filtering software designed to help individuals and families use the internet safely. It provides screen monitoring, website filtering, and accountability reports shared with a trusted ally. Plans start at $18 per month (or $198/year, $950 lifetime), covering unlimited devices for up to 10 users.
        </p>
      </section>

      {/* FAQ section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold font-heading">Frequently Asked Questions</h2>
        <Accordion type="multiple" className="mt-6">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium font-heading">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
