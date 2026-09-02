import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Book a Counselling Session",
  description:
    "Get in touch with YourLearningMentor to book an independent career counselling session for students and parents.",
  alternates: {
    canonical: "https://yourlearningmentor.com/contact-us",
  },
  openGraph: {
    title: "Book a Counselling Session | YourLearningMentor",
    description:
      "Get in touch with YourLearningMentor to book an independent career counselling session for students and parents.",
    url: "https://yourlearningmentor.com/contact-us",
    images: ["/og/contact.png"],
  },
};

const faqs = [
  {
    q: "Who are these counselling sessions for?",
    a: "Students from Class 9 through postgraduate level, and their parents. We work with families across India and with NRIs abroad.",
  },
  {
    q: "How do I book a session?",
    a: "Fill in the form on this page with a short note about the student's class and what you'd like to discuss. We'll reply with available time slots and next steps.",
  },
  {
    q: "Is there a free introductory call?",
    a: "Yes. We offer a short introductory call so the family can decide whether the counsellor is the right fit before booking a full session.",
  },
  {
    q: "Are sessions online or in-person?",
    a: "Most sessions are conducted online over video. In-person sessions can be arranged on request.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold md:text-5xl font-heading">
            Book a <span className="text-accent">Session</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Tell us a little about the student and what you'd like to talk through. We'll get back to you with available slots and next steps.
          </p>

          <ContactForm />

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
