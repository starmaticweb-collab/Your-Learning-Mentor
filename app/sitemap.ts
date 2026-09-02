import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourlearningmentor.com";
  const routes = [
    "",
    "/about",
    "/contact-us",
    "/privacy",
    "/find-a-tutor",
    "/become-a-tutor",
    "/cgpa-calculator",
    "/kiit-cgpa-calculator",
    "/audiobook-percentage-calculator",
    "/attendance-percentage-calculator",
    "/covenant-eyes-free-trial",
    "/covenant-eyes-promo-code",
    "/covenant-eyes-review",
    "/diffie-hellman-examples",
    "/cgpa-to-percentage-gtu-calculator",
    "/srm-gpa-calculator",
    "/vit-cgpa-to-percentage-calculator",
    "/vit-gpa-calculator",
    "/drexel-gpa-calculator",
    "/caspa-gpa-calculator",
    "/howard-county-gpa-calculator",
    "/ib-to-gpa-calculator",
    "/ipu-cgpa-calculator",
    "/gpa-to-percentage-converter",
    "/gpa-calculator",
    "/best-screen-accountability-software",
    "/target-gpa-calculator",
    "/percentage-increase-calculator",
    "/percentage-decrease-calculator",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
