import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Covenant Eyes 30-Day Free Trial (Exclusive)",
  description:
    "Get an exclusive 30-day free trial of Covenant Eyes instead of the standard 14-day trial. Activate your extended free trial now.",
  alternates: {
    canonical: "https://yourlearningmentor.com/covenant-eyes-free-trial",
  },
  openGraph: {
    title: "Covenant Eyes 30-Day Free Trial (Exclusive)",
    description:
      "Get an exclusive 30-day free trial of Covenant Eyes instead of the standard 14-day trial. Activate your extended free trial now.",
    url: "https://yourlearningmentor.com/covenant-eyes-free-trial",
    images: ["/og/covenant-eyes-free-trial.png"],
  },
};

const AFFILIATE_LINK = "https://covenanteyes.sjv.io/555m03";

export default function CovenantEyesFreeTrialPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
        <h1 className="text-center text-3xl font-bold md:text-4xl font-heading">
          Covenant Eyes 30-Day Free Trial (Exclusive)
        </h1>

        {/* Logo + CTA Card */}
        <div className="mx-auto mt-10 flex flex-col items-center rounded-2xl border bg-card p-8 shadow-sm">
          <Image
            src="/assets/covenant-eyes-logo.png"
            alt="Covenant Eyes logo"
            width={320}
            height={160}
            className="h-40 w-auto object-contain"
          />
          <Button asChild size="lg" className="mt-8 w-full max-w-xs rounded-full px-10 text-base">
            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              Activate your Free Trial <ArrowRight size={18} />
            </a>
          </Button>
        </div>

        {/* Copy */}
        <div className="mt-12 space-y-6 text-base leading-relaxed text-foreground">
          <p>
            Congratulations on choosing Covenant Eyes as your accountability software.
          </p>
          <p>
            We want to provide you a 30-day free trial of Covenant Eyes so you can try it out.
          </p>
          <p>
            We've partnered with Covenant Eyes to offer you great value. With{" "}
            <a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 hover:text-accent/80"
            >
              our link
            </a>
            , you can get an exclusive 30-day free trial instead of a 14-day trial provided by Covenant Eyes.
          </p>
          <p>
            Just click on the "Activate your 30-day free trial" button above and it will automatically apply the trial.
          </p>
        </div>

        {/* Proof */}
        <figure className="mt-12 text-center">
          <Image
            src="/assets/covenant-eyes-proof.jpg"
            alt="Proof: Covenant Eyes 30-Day free trial"
            width={600}
            height={400}
            className="mx-auto rounded-xl border shadow-sm"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Proof: Covenant Eyes 30-Day free trial.
          </figcaption>
        </figure>
      </main>
    </div>
  );
}
