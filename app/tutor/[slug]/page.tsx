import { Metadata } from "next";
import { supabase } from "@/integrations/supabase/client";
import { resolveTutorPhotoUrl } from "@/lib/tutorPhoto";
import TutorProfileClient from "./TutorProfileClient";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getTutor(slug: string) {
  try {
    const { data: tutor } = await supabase
      .from("tutors_public")
      .select(
        "id, slug, name, subjects, grade_levels, boards, mode, country, state, city, area, experience_years, fee_min, fee_max, photo_url, intro, qualification"
      )
      .eq("slug", slug)
      .maybeSingle();

    return tutor;
  } catch (err) {
    console.error("Failed to fetch tutor for metadata/schema:", err);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutor = await getTutor(slug);

  if (!tutor) {
    return {
      title: "Tutor Profile | YourLearningMentor",
      description: "Browse verified tutor profile and contact details on YourLearningMentor.",
      alternates: {
        canonical: `https://yourlearningmentor.com/tutor/${slug}`,
      },
    };
  }

  const subjects = (tutor.subjects ?? []).filter(Boolean);
  const subjectList = subjects.length > 0 ? subjects.slice(0, 3).join(", ") : "Academic Subjects";
  const location = tutor.city ? `${tutor.city}, India` : "India";
  const modeText =
    tutor.mode === "online"
      ? "Online"
      : tutor.mode === "offline"
      ? "Home"
      : "Home & Online";

  const title = `${tutor.name} — ${subjectList} ${modeText} Tutor in ${tutor.city || "India"}`;
  const rawDescription =
    tutor.intro ||
    tutor.qualification ||
    `Connect with ${tutor.name}, verified ${subjectList} tutor in ${location}. View qualifications, teaching modes, and book a direct session.`;
  const description =
    rawDescription.length > 155
      ? `${rawDescription.slice(0, 152).trim()}...`
      : rawDescription;

  const photo =
    resolveTutorPhotoUrl(tutor.photo_url) || "https://yourlearningmentor.com/og/home.png";

  return {
    title,
    description,
    alternates: {
      canonical: `https://yourlearningmentor.com/tutor/${slug}`,
    },
    openGraph: {
      title: `${tutor.name} — Verified Tutor Profile | YourLearningMentor`,
      description,
      url: `https://yourlearningmentor.com/tutor/${slug}`,
      images: [
        {
          url: photo,
          alt: `${tutor.name} tutor profile photo`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [photo],
    },
  };
}

export default async function TutorProfilePage({ params }: Props) {
  const { slug } = await params;
  const tutor = await getTutor(slug);

  const photo = tutor?.photo_url ? resolveTutorPhotoUrl(tutor.photo_url) : null;
  const subjects = (tutor?.subjects ?? []).filter(Boolean);

  const schemasJson = tutor
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": `https://yourlearningmentor.com/tutor/${slug}#person`,
            name: tutor.name,
            jobTitle: "Tutor",
            description: tutor.intro || tutor.qualification || undefined,
            image: photo || undefined,
            url: `https://yourlearningmentor.com/tutor/${slug}`,
            knowsAbout: subjects.length > 0 ? subjects : undefined,
            address: tutor.city
              ? {
                  "@type": "PostalAddress",
                  addressLocality: tutor.city,
                  addressRegion: tutor.state || undefined,
                  addressCountry: "IN",
                }
              : undefined,
            worksFor: {
              "@type": "Organization",
              name: "YourLearningMentor",
              url: "https://yourlearningmentor.com",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `https://yourlearningmentor.com/tutor/${slug}#breadcrumb`,
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
                name: tutor.name,
                item: `https://yourlearningmentor.com/tutor/${slug}`,
              },
            ],
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen bg-background">
      {schemasJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasJson) }}
        />
      )}
      <TutorProfileClient slug={slug} />
    </div>
  );
}

