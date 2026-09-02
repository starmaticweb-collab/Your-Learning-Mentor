import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "YourLearningMentor is an independent career counselling practice helping students and parents make confident decisions about streams, colleges, and careers.",
  alternates: {
    canonical: "https://yourlearningmentor.com/about",
  },
  openGraph: {
    title: "About Us | YourLearningMentor",
    description:
      "YourLearningMentor is an independent career counselling practice helping students and parents make confident decisions about streams, colleges, and careers.",
    url: "https://yourlearningmentor.com/about",
    images: ["/og/about.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold md:text-5xl font-heading">
            About <span className="text-accent">Us</span>
          </h1>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground">Our Story</h2>
              <p className="mt-3">
                YourLearningMentor began with a simple observation: too many students were choosing careers based on peer pressure, family expectations, or whatever happened to be trending — and too many parents were navigating those decisions without anyone to talk to. Career counselling in India had become a sales pitch for colleges, coaching, and study-abroad packages. We wanted to do the opposite.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="mt-3">
                We help families make career decisions with clarity, not pressure. Through one-on-one counselling sessions, we work with students and parents to understand strengths, explore real options, and walk away with a written plan they can actually act on — no commissions, no sales scripts, no upselling.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground">How We Work</h2>
              <p className="mt-3">
                Every engagement starts with a conversation. We learn about the student — their interests, board, subjects, and where they feel stuck — and then meet with the family one-on-one. After the session, you receive a clear, written action plan covering the next 3 to 6 months: streams, exams, colleges, careers, and the practical steps to get there. Sessions are available online and, on request, in person.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground">What We Stand For</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Independent Advice", desc: "We don't earn commissions from colleges, coaching institutes, or abroad agencies. Ever." },
                  { title: "Student & Parent Together", desc: "We give equal time to the student's aspirations and the parent's concerns." },
                  { title: "Beyond the Obvious", desc: "Design, law, liberal arts, research, civil services, creative careers — not just engineering and medicine." },
                  { title: "Confidential & Judgement-Free", desc: "Every conversation stays private. There are no wrong questions." },
                ].map((v) => (
                  <div key={v.title} className="rounded-xl border bg-card p-5">
                    <h3 className="font-serif text-lg font-bold text-foreground">{v.title}</h3>
                    <p className="mt-1 text-sm">{v.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
