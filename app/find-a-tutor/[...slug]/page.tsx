import { Metadata } from "next";
import FindATutorClient from "../FindATutorClient";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";
  return {
    title: "Find a Tutor | YourLearningMentor",
    description: "Browse home and online tutors. Direct contact with verified tutors across India.",
    alternates: {
      canonical: `https://yourlearningmentor.com/find-a-tutor${path ? `/${path}` : ""}`,
    },
  };
}

export default async function FindATutorCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";
  return (
    <div className="min-h-screen bg-background">
      <FindATutorClient rest={path} />
    </div>
  );
}
