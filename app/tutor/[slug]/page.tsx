import { Metadata } from "next";
import TutorProfileClient from "./TutorProfileClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Tutor Profile | YourLearningMentor",
    description: "Browse verified tutor profile and contact details on YourLearningMentor.",
    alternates: {
      canonical: `https://yourlearningmentor.com/tutor/${slug}`,
    },
  };
}

export default async function TutorProfilePage({ params }: Props) {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-background">
      <TutorProfileClient slug={slug} />
    </div>
  );
}
