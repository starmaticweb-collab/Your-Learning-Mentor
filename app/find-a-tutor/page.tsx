import { Metadata } from "next";
import FindATutorClient from "./FindATutorClient";

export const metadata: Metadata = {
  title: "Find a Tutor in India — Home Tutors & Online Tutors",
  description:
    "Browse independent home and online tutors across India. Connect directly with verified tutors for CBSE, ICSE, IB, and state boards with transparent fees and zero middlemen.",
  keywords: [
    "Find a Tutor",
    "Home Tutors in India",
    "Online Tutors India",
    "CBSE Home Tutor",
    "ICSE Tutor",
    "IB Tutors",
    "Maths Home Tutor",
    "Physics Tutor",
    "Private Tutors Near Me",
  ],
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
  twitter: {
    card: "summary_large_image",
    title: "Find a Tutor in India — Home Tutors & Online Tutors",
    description:
      "Connect directly with verified home and online tutors for CBSE, ICSE, IB, and state boards.",
    images: ["/og/find-a-tutor.png"],
  },
};

const schemasJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://yourlearningmentor.com/find-a-tutor#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://yourlearningmentor.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Find a Tutor",
          item: "https://yourlearningmentor.com/find-a-tutor",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://yourlearningmentor.com/find-a-tutor#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I connect with a tutor on YourLearningMentor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Browse our verified tutor directory, filter by subject, board, city, and mode (home or online), view the tutor's profile, and submit your name and email to reveal their direct contact phone and WhatsApp number.",
          },
        },
        {
          "@type": "Question",
          name: "Does YourLearningMentor charge any commission to students or parents?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Connecting with tutors is completely free for students and parents. You deal directly with the tutor.",
          },
        },
        {
          "@type": "Question",
          name: "Are home tutors and online tutors available for CBSE and ICSE boards?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our directory includes verified tutors covering CBSE, ICSE, IB, IGCSE, State Boards, and competitive exams.",
          },
        },
      ],
    },
  ],
};

export default function FindATutorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasJson) }}
      />
      <FindATutorClient />
    </div>
  );
}
