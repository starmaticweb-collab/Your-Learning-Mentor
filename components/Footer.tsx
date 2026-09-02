import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg">
              YourLearning<span className="text-accent">Mentor</span>
            </p>
            <p className="mt-2 text-sm text-white/70">
              Trusted tools and resources built for students.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
              Navigate
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-white/70 hover:text-white">Home</Link>
              <Link href="/find-a-tutor" className="text-sm text-white/70 hover:text-white">Find a Tutor</Link>
              <Link href="/about" className="text-sm text-white/70 hover:text-white">About</Link>
              <Link href="/contact-us" className="text-sm text-white/70 hover:text-white">Contact</Link>
              <Link href="/privacy" className="text-sm text-white/70 hover:text-white">Privacy & Trust</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
              Tools
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/cgpa-calculator" className="text-sm text-white/70 hover:text-white">CGPA Calculator</Link>
              <Link href="/attendance-percentage-calculator" className="text-sm text-white/70 hover:text-white">Attendance Calculator</Link>
              <Link href="/audiobook-percentage-calculator" className="text-sm text-white/70 hover:text-white">Audiobook Calculator</Link>
            </div>
          </div>

        </div>
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} YourLearningMentor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
