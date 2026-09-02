import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StickyCtaBar from "@/components/StickyCtaBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Covenant Eyes Review ${currentYear}: Best Screen Accountability App?`,
  description:
    "Honest Covenant Eyes review for families. Covers how it works, iPhone limitations, pricing ($18/mo, $198/year, $950 lifetime), pros, cons, and top alternatives.",
  alternates: {
    canonical: "https://yourlearningmentor.com/covenant-eyes-review",
  },
  openGraph: {
    title: `Covenant Eyes Review ${currentYear} | YourLearningMentor`,
    description:
      "Honest Covenant Eyes review for families. Covers how it works, iPhone limitations, pricing ($18/mo, $198/year, $950 lifetime), pros, cons, and top alternatives.",
    url: "https://yourlearningmentor.com/covenant-eyes-review",
    images: ["/og/covenant-eyes-promo-code.png"],
  },
};

const AFFILIATE_LINK = "https://dub.sh/covenant-eyes-free";

const pros = [
  "Relationship-first model — it encourages honest conversations rather than silently blocking everything.",
  "AI blurring protects you — you know something was flagged without seeing the content yourself.",
  "Strong on Windows, Mac, and Android — on these devices, it is very hard for a child to bypass.",
  "Educational resources included — kids learn why healthy screen habits matter, not just that rules exist.",
  "One plan covers up to 10 family members on unlimited devices.",
];

const cons = [
  "iOS coverage is very limited — Safari-only monitoring on iPhones is a real weakness for many families.",
  "Higher price — at $18 per month, it costs more than most competitors.",
  "Can feel intrusive — older teens may push back on screenshot-based monitoring.",
  "Battery and VPN issues — some users report battery drain and occasional VPN drops on mobile.",
];

const platformData = [
  { device: "Windows PC", monitors: "All apps and browsers", blocking: "Yes" },
  { device: "Mac", monitors: "All apps and browsers", blocking: "Yes" },
  { device: "Android Phone", monitors: "All apps and browsers", blocking: "Yes" },
  { device: "iPhone / iPad", monitors: "Safari only", blocking: "Yes (via VPN)" },
];

const comparisons = [
  {
    name: "Ever Accountable",
    bestFor: "iPhone families",
    price: "$14.99/mo",
    note: "Monitors inside third-party apps on iOS — including YouTube, Instagram, and TikTok — which Covenant Eyes cannot do. Offers a No Loophole guarantee.",
    link: "https://everaccountable.com/",
  },
  {
    name: "Accountable2You",
    bestFor: "Families uncomfortable with screenshots",
    price: "~$16/mo (family)",
    note: "Logs text-based activity instead of taking screenshots. Covers 20 devices. Less invasive and easier on battery.",
    link: "https://accountable2you.com/",
  },
  {
    name: "Canopy",
    bestFor: "Younger children (blocking-first)",
    price: "~$10/mo",
    note: "Prevention tool that uses AI to block harmful content before it loads. Not an accountability app, but excellent for blocking.",
    link: "https://canopy.us/",
  },
];

const faqs = [
  {
    question: "Is there a better app than Covenant Eyes for parents?",
    answer:
      "It depends on your child's device. For iPhone users, Ever Accountable is often the better choice since it monitors inside apps that Covenant Eyes cannot see on iOS. For younger children where blocking is the priority, Canopy is a strong option. If you want activity logs without screenshots, Accountable2You is worth a look.",
  },
  {
    question: "Is Covenant Eyes effective for monitoring children?",
    answer:
      "Yes, especially on Windows, Mac, and Android where it covers all apps and browsers. On iPhones, it is limited to Safari, which is a significant gap for many families.",
  },
  {
    question: "Which is better for families — Canopy or Covenant Eyes?",
    answer:
      "They serve different goals. Canopy blocks harmful content before it loads, making it great for younger kids. Covenant Eyes reports activity to a parent and encourages accountability conversations, making it better for older children and teenagers.",
  },
  {
    question: "Why is Covenant Eyes more expensive than other apps?",
    answer:
      "At $18 per month, the cost reflects its AI monitoring technology, built-in courses, and community support. It also covers up to 10 family members on unlimited devices under one plan. Whether that is worth the price depends on your family's size and which devices you need to cover.",
  },
  {
    question: "Does Covenant Eyes work on iPhone?",
    answer:
      "Partially. Due to Apple's privacy rules, Covenant Eyes can only take screenshots inside the Safari browser on iOS. If your child opens Chrome, YouTube, Instagram, or TikTok, Covenant Eyes will not see any of that. To close this gap, you would need to use Apple's Screen Time settings to block other browsers and prevent app deletion.",
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

export default function CovenantEyesReviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-wider">
            Updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </Badge>
          <h1 className="text-3xl font-bold md:text-5xl font-heading">
            Covenant Eyes Review {currentYear}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Is it the best screen accountability app for families? We break down features, pricing, iPhone limitations, and how it compares to alternatives.
          </p>
        </div>

        {/* Quick verdict card */}
        <div className="mt-10 rounded-2xl border bg-card p-6 md:p-8">
          <h2 className="text-lg font-bold font-heading">Quick Verdict</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Covenant Eyes is a solid, well-thought-out accountability app that genuinely works on Windows, Mac, and Android. The relationship-first model encourages honest conversations. However, the Safari-only limitation on iPhones is a significant gap that parents need to know about before buying.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="sm" className="rounded-full">
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Try Free for 30 Days <ArrowRight size={14} />
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <Link href="/covenant-eyes-promo-code">View Promo Codes</Link>
            </Button>
          </div>
        </div>

        {/* What is it */}
        <section className="mt-16 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-2xl font-bold font-heading">What Is Covenant Eyes?</h2>
          <p className="text-muted-foreground">
            Covenant Eyes is a screen accountability app founded in 2000. It has helped over 1.7 million users build healthier digital habits. Unlike basic parental control apps that just block websites, Covenant Eyes takes a different approach: it monitors screen activity and sends reports to a trusted parent or guardian so real conversations can happen.
          </p>
          <p className="text-muted-foreground">
            The idea is simple. When your child knows you will see a report, they are less likely to visit harmful sites. It works on Windows, macOS, Android, and iOS devices.
          </p>
        </section>

        {/* How it works */}
        <section className="mt-16 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-2xl font-bold font-heading">How Does Covenant Eyes Work?</h2>
          <p className="text-muted-foreground">
            The app's main feature is called <strong>Screen Accountability</strong>, powered by AI. It periodically takes screenshots of your child's screen. The AI scans those screenshots on the device to check for harmful content. If something is flagged, the screenshot is blurred before being sent to you as the parent. You receive a report so you can have an informed conversation with your child. You are never directly exposed to the content itself.
          </p>
        </section>

        {/* Key Features */}
        <section className="mt-16 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-2xl font-bold font-heading">Key Features</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span><strong>AI Screen Monitoring</strong> — Tracks activity across all apps and browsers on Windows, Mac, and Android, including private browsing.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span><strong>Real-Time Alerts</strong> — You get instant notifications and can view an activity feed when something is flagged.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span><strong>Content Blocking (Victory Shield VPN)</strong> — An optional VPN that blocks harmful websites. You can also build custom allow and block lists.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span><strong>Educational Courses</strong> — Programs like Strive and Arise help young people build healthy screen habits.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span><strong>Community Support</strong> — Access to a faith-based community for families who want extra encouragement.</span>
            </li>
          </ul>
        </section>

        {/* iPhone warning */}
        <section className="mt-16 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-2xl font-bold font-heading">Does It Work on iPhones?</h2>
          <p className="text-muted-foreground">
            This is the most important thing for parents to know before buying. Covenant Eyes works very well on Windows, Mac, and Android — it monitors all apps and browsers on those devices. iPhones and iPads are a very different story.
          </p>
          <p className="text-muted-foreground">
            Due to Apple's privacy rules, Covenant Eyes can only take screenshots inside the <strong>Safari browser</strong> on iOS. If your child opens Chrome, YouTube, Instagram, or TikTok, Covenant Eyes will not see any of that. This is a big gap that parents need to know about. To close this gap on an iPhone, you would need to use Apple's Screen Time settings to block other browsers and prevent your child from deleting the app.
          </p>
        </section>

        {/* Platform table */}
        <section className="mt-10">
          <h3 className="text-lg font-bold font-heading">Platform Coverage Summary</h3>
          <div className="mt-4 overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Device</th>
                  <th className="px-4 py-3 text-left font-semibold">What It Monitors</th>
                  <th className="px-4 py-3 text-left font-semibold">Content Blocking</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {platformData.map((row) => (
                  <tr key={row.device} className="text-muted-foreground">
                    <td className="px-4 py-3 font-medium text-foreground">{row.device}</td>
                    <td className="px-4 py-3">{row.monitors}</td>
                    <td className="px-4 py-3">{row.blocking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-16 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-2xl font-bold font-heading">Covenant Eyes Pricing ({currentYear})</h2>
          <p className="text-muted-foreground">
            One subscription covers unlimited devices for up to 10 family members. Here are the current plans:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-5 text-center">
              <p className="text-sm text-muted-foreground">Monthly</p>
              <p className="mt-1 text-2xl font-bold">$18/mo</p>
            </div>
            <div className="rounded-xl border bg-card p-5 text-center">
              <p className="text-sm text-muted-foreground">Yearly</p>
              <p className="mt-1 text-2xl font-bold">$198/yr</p>
              <p className="mt-1 text-xs text-muted-foreground">Equivalent to $16.50/mo</p>
            </div>
            <div className="rounded-xl border bg-card p-5 text-center">
              <p className="text-sm text-muted-foreground">Lifetime</p>
              <p className="mt-1 text-2xl font-bold">$950</p>
              <p className="mt-1 text-xs text-muted-foreground">One-time payment</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            A <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 hover:text-accent/80">30-day free trial</a> is available. You can also find verified promo codes on our{" "}
            <Link href="/covenant-eyes-promo-code" className="text-accent underline underline-offset-4 hover:text-accent/80">
              Covenant Eyes promo code page
            </Link>
            {" "}to save on your subscription.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="sm" className="rounded-full">
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Try Free for 30 Days <ArrowRight size={14} />
              </a>
            </Button>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-bold font-heading">What We Like</h2>
            <ul className="mt-4 space-y-3">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-bold font-heading">What Could Be Better</h2>
            <ul className="mt-4 space-y-3">
              {cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <X size={16} className="mt-0.5 shrink-0 text-red-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Comparisons */}
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold font-heading">How Does It Compare to Other Apps?</h2>
          <div className="space-y-4">
            {comparisons.map((item) => (
              <div key={item.name} className="rounded-2xl border bg-card p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold font-heading">{item.name}</h3>
                  <span className="text-sm font-medium text-muted-foreground">{item.price}</span>
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  Best for: {item.bestFor}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                <Button asChild size="sm" variant="outline" className="mt-4 rounded-full">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Visit {item.name} <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        {/* Internal links */}
        <section className="mt-16 rounded-xl border bg-muted/50 p-6">
          <h3 className="text-base font-bold font-heading">Related Resources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/covenant-eyes-free-trial" className="text-accent underline underline-offset-4 hover:text-accent/80">
                Covenant Eyes 30-Day Free Trial
              </Link>
            </li>
            <li>
              <Link href="/covenant-eyes-promo-code" className="text-accent underline underline-offset-4 hover:text-accent/80">
                Covenant Eyes Promo Codes & Coupons
              </Link>
            </li>
            <li>
              <Link href="/best-screen-accountability-software" className="text-accent underline underline-offset-4 hover:text-accent/80">
                Best Screen Accountability Software Comparison
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <StickyCtaBar
        href={AFFILIATE_LINK}
        ctaLabel="Get 30-Day Free Trial"
      />
      <div aria-hidden="true" className="h-20 md:h-24" />
    </div>
  );
}
