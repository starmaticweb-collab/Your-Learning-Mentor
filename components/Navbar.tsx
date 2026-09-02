"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/find-a-tutor", label: "Find a Tutor" },
    { to: "/about", label: "About" },
    { to: "/contact-us", label: "Contact" },
  ];

  const toolGroups = [
    {
      label: "GPA / CGPA Calculators",
      items: [
        { to: "/cgpa-calculator", label: "CGPA Calculator" },
        { to: "/kiit-cgpa-calculator", label: "KIIT CGPA Calculator" },
        { to: "/cgpa-to-percentage-gtu-calculator", label: "GTU CGPA to %" },
        { to: "/srm-gpa-calculator", label: "SRM GPA Calculator" },
        { to: "/vit-gpa-calculator", label: "VIT GPA Calculator" },
        { to: "/vit-cgpa-to-percentage-calculator", label: "VIT CGPA to %" },
        { to: "/drexel-gpa-calculator", label: "Drexel GPA Calculator" },
        { to: "/caspa-gpa-calculator", label: "CASPA GPA Calculator" },
        { to: "/howard-county-gpa-calculator", label: "Howard GPA Calculator" },
        { to: "/ib-to-gpa-calculator", label: "IB to GPA Calculator" },
        { to: "/ipu-cgpa-calculator", label: "IPU CGPA Calculator" },
      ],
    },
    {
      label: "Student Tools",
      items: [
        { to: "/gpa-to-percentage-converter", label: "GPA to Percentage" },
        { to: "/attendance-percentage-calculator", label: "Attendance Calculator" },
        { to: "/audiobook-percentage-calculator", label: "Audiobook % Calculator" },
      ],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#000000] bg-[#ffffff] backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-serif text-xl font-bold tracking-tight">
          YourLearning<span className="text-accent">Mentor</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none">
              Tools <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {toolGroups.map((group, gi) => (
                <div key={group.label}>
                  {gi > 0 && <Separator className="my-1" />}
                  <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </p>
                  {group.items.map((tool) => (
                    <DropdownMenuItem key={tool.to} asChild>
                      <Link href={tool.to}>{tool.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="h-9 px-5 text-sm font-semibold">
            <Link href="/become-a-tutor">Become a Tutor</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t bg-background px-4 pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => setToolsOpen(!toolsOpen)}
            className="flex w-full items-center justify-between py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Tools <ChevronDown className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
          </button>
          {toolsOpen && (
            <div className="pl-4">
              {toolGroups.map((group, gi) => (
                <div key={group.label}>
                  {gi > 0 && <Separator className="my-1" />}
                  <p className="py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </p>
                  {group.items.map((tool) => (
                    <Link
                      key={tool.to}
                      href={tool.to}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          <Button asChild className="mt-3 w-full h-10 text-sm font-semibold">
            <Link href="/become-a-tutor" onClick={() => setIsOpen(false)}>
              Become a Tutor
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
