import { Metadata } from "next";
import { unslug } from "@/lib/tutorTaxonomy";
import FindATutorClient from "../FindATutorClient";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

function formatFilterLabels(slug?: string[]) {
  if (!slug || slug.length === 0) return "Verified";
  return slug
    .map((s) => unslug(decodeURIComponent(s)))
    .filter(Boolean)
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";
  const filterLabel = formatFilterLabels(slug);

  const title = `${filterLabel} Tutors — Home & Online Verified Tutors`;
  const description = `Find verified ${filterLabel} tutors for home tuition or online classes across India. Compare profiles, subjects, fees, and contact tutors directly with zero middlemen.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://yourlearningmentor.com/find-a-tutor${path ? `/${path}` : ""}`,
    },
    openGraph: {
      title: `${title} | YourLearningMentor`,
      description,
      url: `https://yourlearningmentor.com/find-a-tutor${path ? `/${path}` : ""}`,
      images: ["/og/find-a-tutor.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | YourLearningMentor`,
      description,
      images: ["/og/find-a-tutor.png"],
    },
  };
}

export default async function FindATutorCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";
  const filterLabel = formatFilterLabels(slug);

  const breadcrumbsJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
      {
        "@type": "ListItem",
        position: 3,
        name: `${filterLabel} Tutors`,
        item: `https://yourlearningmentor.com/find-a-tutor${path ? `/${path}` : ""}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJson) }}
      />
      <FindATutorClient rest={path} />
    </div>
  );
}

