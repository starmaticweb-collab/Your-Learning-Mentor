import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  GraduationCap,
  Target,
  ClipboardList,
  Users,
  ShieldCheck,
  BookOpen,
  Globe2,
  Briefcase,
  MessageSquare,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "YourLearningMentor — Career Counselling for Students & Parents",
  description:
    "Independent career counselling for students and parents. Stream selection, college shortlisting, study abroad guidance, and clear action plans from trained counsellors.",
  alternates: {
    canonical: "https://yourlearningmentor.com/",
  },
  openGraph: {
    title: "YourLearningMentor — Career Counselling for Students & Parents",
    description:
      "Independent career counselling for students and parents. Stream selection, college shortlisting, study abroad guidance, and clear action plans from trained counsellors.",
    url: "https://yourlearningmentor.com/",
    images: ["/og/home.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "YourLearningMentor — Career Counselling for Students & Parents",
    description:
      "Independent career counselling for students and parents. Stream selection, college shortlisting, study abroad guidance.",
    images: ["/og/home.png"],
  },
};

const steps = [
  {
    icon: ClipboardList,
    title: "Share Your Story",
    desc: "Tell us about the student — interests, strengths, subjects, board, and where they feel stuck.",
  },
  {
    icon: MessageSquare,
    title: "One-on-One Counselling",
    desc: "Talk directly with a qualified counsellor. Honest guidance for both students and parents — no scripts, no upselling.",
  },
  {
    icon: CalendarCheck,
    title: "Walk Away With a Plan",
    desc: "Leave with a clear roadmap: stream, exams, colleges, careers, and the next 3-6 months mapped out.",
  },
];

const services = [
  {
    icon: Compass,
    title: "Stream Selection (After Class 10)",
    desc: "Science, Commerce, Arts or Vocational — decide based on the student's aptitude, not peer pressure.",
  },
  {
    icon: Target,
    title: "Career Discovery (Class 11-12)",
    desc: "Identify careers that match interests and ability. Understand entrance exams, eligibility, and timelines.",
  },
  {
    icon: GraduationCap,
    title: "College & Course Shortlisting",
    desc: "Pick the right undergraduate course and shortlist Indian and international colleges that genuinely fit.",
  },
  {
    icon: Globe2,
    title: "Study Abroad Guidance",
    desc: "Country, course, application timelines, and budgeting clarity for students considering overseas education.",
  },
  {
    icon: Briefcase,
    title: "Career Change & Postgrad",
    desc: "For graduates re-evaluating their path — masters, switching fields, or planning their first real career move.",
  },
  {
    icon: BookOpen,
    title: "Parent Counselling",
    desc: "A dedicated session for parents to ask questions, ease worries, and learn how to support without pressuring.",
  },
];

const whyPoints = [
  "Sessions led by trained counsellors, not salespeople",
  "Independent advice — we don't earn commissions from colleges",
  "Equal focus on student aspirations and parent concerns",
  "Clear, written action plan after every session",
  "Online and in-person options available",
  "Confidential, judgement-free conversations",
];

const audienceCards = [
  {
    label: "For Students",
    title: "Confused about what to do next?",
    points: [
      "Class 9-10 — choosing the right stream",
      "Class 11-12 — picking entrance exams and courses",
      "Graduates — planning postgrad or careers",
    ],
  },
  {
    label: "For Parents",
    title: "Worried about your child's future?",
    points: [
      "Understand today's career options beyond engineering and medicine",
      "Learn how to guide without overwhelming",
      "Get clarity on costs, scholarships, and timelines",
    ],
  },
];

const faqs = [
  {
    q: "Who are these sessions for?",
    a: "Students from Class 9 through postgraduate level, and their parents. We work with families across India and with NRIs.",
  },
  {
    q: "Is the first conversation paid?",
    a: "We offer a short introductory call so you can decide whether the counsellor is the right fit before booking a full session.",
  },
  {
    q: "Do you only suggest engineering and medicine?",
    a: "No. We discuss the full landscape — design, law, liberal arts, commerce, research, civil services, creative careers, and emerging fields.",
  },
  {
    q: "Are sessions online or offline?",
    a: "Both. Most families prefer online video sessions; in-person sessions can be arranged on request.",
  },
];

const schemaJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://yourlearningmentor.com/#edu-org",
      name: "YourLearningMentor",
      url: "https://yourlearningmentor.com",
      logo: "https://yourlearningmentor.com/og/home.png",
      description:
        "Independent career counselling, academic tools, and verified tutor directory for students and parents.",
      areaServed: "IN",
      sameAs: [],
    },
    {
      "@type": "FAQPage",
      "@id": "https://yourlearningmentor.com/#faq",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-7 text-center lg:text-left">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
              Career Counselling
            </span>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl font-heading">
              The right career decision, made with clarity — not pressure.
            </h1>
            <p className="mx-auto max-w-md text-lg text-muted-foreground lg:mx-0">
              Independent, one-on-one counselling for students and parents. From choosing a stream after Class 10 to shortlisting colleges and planning careers — we help families decide with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button asChild size="lg" className="rounded-full px-8 text-base">
                <Link href="/contact-us">Book a Counselling Session</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-foreground px-8 text-base"
              >
                <Link href="/about">How It Works</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent" /> Independent advice
              </span>
              <span className="inline-flex items-center gap-2">
                <Users size={16} className="text-accent" /> Sessions for parents too
              </span>
            </div>
          </div>
          <div className="mx-auto w-64 shrink-0 md:w-80 lg:w-full lg:max-w-md">
            <Image
              src="/assets/idea-launch.png"
              alt="Student and parent planning a career path with a counsellor"
              className="h-auto w-full"
              width={480}
              height={480}
              priority
            />
          </div>
        </div>
      </section>

      {/* Audience split */}
      <section className="border-t bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {audienceCards.map((c) => (
              <div key={c.label} className="rounded-2xl border bg-background p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  {c.label}
                </span>
                <h2 className="mt-3 text-2xl font-bold md:text-3xl font-heading">{c.title}</h2>
                <ul className="mt-6 space-y-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-foreground" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 space-y-3 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            How It Works
          </span>
          <h2 className="text-3xl font-bold md:text-4xl font-heading">From confusion to a clear plan</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f0f0]">
                <s.icon size={24} className="text-[#212121]" />
              </div>
              <span className="mt-5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Step {i + 1}
              </span>
              <h3 className="mt-1 text-lg font-bold font-heading">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-t bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 space-y-3 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              What We Help With
            </span>
            <h2 className="text-3xl font-bold md:text-4xl font-heading">Counselling at every stage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border bg-background p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f0f0]">
                  <s.icon size={20} className="text-[#212121]" />
                </div>
                <h3 className="mt-4 text-base font-bold font-heading">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Why Families Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl font-heading">
              Honest guidance. Nothing sold on the side.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We are not an admissions agency. We don't push particular colleges, coaching institutes, or study-abroad packages. The only thing we offer is clear, qualified counselling that helps families make the right call for their child.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whyPoints.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 text-sm"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-card py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 space-y-3 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Common Questions
            </span>
            <h2 className="text-3xl font-bold md:text-4xl font-heading">Before you book</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border bg-background p-6">
                <h3 className="text-base font-bold font-heading">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold md:text-4xl font-heading">
            Ready to take the guesswork out of your next decision?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Book a session and walk away with a clear, written plan — one that the student is excited about and the parents feel confident in.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full px-10 text-base">
            <Link href="/contact-us">Book a Counselling Session</Link>
          </Button>
        </div>
      </section>

      {/* Founder */}
      <section className="border-t bg-card py-20">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="rounded-2xl border bg-background p-8 shadow-sm">
            <h2 className="break-words text-center text-2xl font-bold sm:text-3xl md:text-4xl font-heading">
              The idea behind YourLearningMentor
            </h2>
            <div className="mt-8 flex justify-center">
              <Image
                src="/assets/rushikesh.jpg"
                alt="Rushikesh Barkade, founder of YourLearningMentor"
                className="h-80 w-80 rounded-2xl object-cover shadow-lg"
                width={320}
                height={320}
              />
            </div>
            <div className="mt-8 space-y-4 text-muted-foreground">
              <p className="text-lg">
                Hola! My name is{" "}
                <span className="font-semibold text-foreground">Rushikesh Barkade</span>, and I lead counselling at YourLearningMentor.
              </p>
              <p>
                I started this practice after seeing too many students pushed into careers they never chose — and too many parents left guessing because no one took the time to explain the options properly.
              </p>
              <p>
                Every family deserves an honest conversation before such a big decision. If you'd like to talk,{" "}
                <Link
                  href="/contact-us"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
                >
                  reach out here
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
