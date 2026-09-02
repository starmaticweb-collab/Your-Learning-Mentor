import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Trust | YourLearningMentor",
  description:
    "How YourLearningMentor handles your data: what we collect, how tutor contact details are protected, and how to reach us.",
  alternates: {
    canonical: "https://yourlearningmentor.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="container mx-auto max-w-3xl flex-1 px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-foreground">Privacy & Trust</h1>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-xl font-semibold">What we collect</h2>
          <p className="text-foreground/80">
            Our calculators run entirely in your browser — none of the numbers you type are sent to us
            or stored on our servers. For the tutor directory and contact form, we only collect what you
            explicitly submit (name, email, message, or tutor application details).
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-xl font-semibold">Tutor contact details</h2>
          <p className="text-foreground/80">
            Tutor phone numbers and email addresses are never displayed publicly. They are revealed only
            after a student submits the "Request Contact" form on a tutor profile, so we can keep a
            record of who requested them.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-xl font-semibold">Access control</h2>
          <p className="text-foreground/80">
            Tutor applications and contact submissions are stored privately and can only be read by the
            site administrator. We use row-level security on our database so client apps cannot bypass
            these rules.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-xl font-semibold">Cookies & tracking</h2>
          <p className="text-foreground/80">
            We use minimal first-party storage for site preferences. We do not sell your data and do not
            run third-party advertising trackers.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-xl font-semibold">Contact</h2>
          <p className="text-foreground/80">
            Questions, takedown requests, or data deletion requests:{" "}
            <a href="mailto:yourlearningmentor@gmail.com" className="text-accent underline">
              yourlearningmentor@gmail.com
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
