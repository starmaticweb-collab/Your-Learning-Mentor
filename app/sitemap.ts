import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourlearningmentor.com";
  
  const highPriorityRoutes = [
    "",
    "/cgpa-calculator",
    "/gpa-to-percentage-converter",
    "/find-a-tutor",
    "/become-a-tutor",
  ];

  const mediumPriorityRoutes = [
    "/kiit-cgpa-calculator",
    "/cgpa-to-percentage-gtu-calculator",
    "/srm-gpa-calculator",
    "/vit-gpa-calculator",
    "/vit-cgpa-to-percentage-calculator",
    "/drexel-gpa-calculator",
    "/caspa-gpa-calculator",
    "/howard-county-gpa-calculator",
    "/ib-to-gpa-calculator",
    "/ipu-cgpa-calculator",
    "/gpa-calculator",
    "/target-gpa-calculator",
    "/attendance-percentage-calculator",
    "/audiobook-percentage-calculator",
    "/percentage-increase-calculator",
    "/percentage-decrease-calculator",
  ];

  const standardRoutes = [
    "/about",
    "/contact-us",
    "/privacy",
    "/covenant-eyes-free-trial",
    "/covenant-eyes-promo-code",
    "/covenant-eyes-review",
    "/diffie-hellman-examples",
    "/best-screen-accountability-software",
  ];

  const items: MetadataRoute.Sitemap = [];

  highPriorityRoutes.forEach((route) => {
    items.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: route === "" ? 1.0 : 0.9,
    });
  });

  mediumPriorityRoutes.forEach((route) => {
    items.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  standardRoutes.forEach((route) => {
    items.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return items;
}
