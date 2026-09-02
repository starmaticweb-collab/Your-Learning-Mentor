import { Metadata } from "next";
import FindATutorClient from "./FindATutorClient";

export const metadata: Metadata = {
  title: "Find a Tutor in India | Home & Online Tutors",
  description:
    "Browse independent home and online tutors across India. Connect directly with verified tutors for CBSE, ICSE, IB, and state boards with transparent fees.",
  alternates: {
    canonical: "https://yourlearningmentor.com/find-a-tutor",
  },
  openGraph: {
    title: "Find a Tutor in India | YourLearningMentor",
    description:
      "Browse independent home and online tutors across India. Connect directly with verified tutors for CBSE, ICSE, IB, and state boards with transparent fees.",
    url: "https://yourlearningmentor.com/find-a-tutor",
    images: ["/og/find-a-tutor.png"],
  },
};

export default function FindATutorPage() {
  return (
    <div className="min-h-screen bg-background">
      <FindATutorClient />
    </div>
  );
}
