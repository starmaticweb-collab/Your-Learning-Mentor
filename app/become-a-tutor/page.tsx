import { Metadata } from "next";
import BecomeATutorClient from "./BecomeATutorClient";

export const metadata: Metadata = {
  title: "Become a Tutor — List Your Profile Free | YourLearningMentor",
  description:
    "Join our network of independent home and online tutors. List your subjects, experience, and fees to connect directly with students across India.",
  alternates: {
    canonical: "https://yourlearningmentor.com/become-a-tutor",
  },
  openGraph: {
    title: "Become a Tutor — List Your Profile Free | YourLearningMentor",
    description:
      "Join our network of independent home and online tutors. List your subjects, experience, and fees to connect directly with students across India.",
    url: "https://yourlearningmentor.com/become-a-tutor",
    images: ["/og/become-a-tutor.png"],
  },
};

export default function BecomeATutorPage() {
  return (
    <div className="min-h-screen bg-background">
      <BecomeATutorClient />
    </div>
  );
}
