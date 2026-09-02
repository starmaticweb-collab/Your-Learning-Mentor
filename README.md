# YourLearningMentor — Next.js Academic Tools & Tutor Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

**YourLearningMentor** is a high-performance, SEO-optimized web application built with **Next.js App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**. It provides a comprehensive suite of academic tools, university GPA/CGPA calculators, educational articles, and a direct tutor search directory for students and parents across India and worldwide.

---

## 🚀 Key Features

### 🎓 1. Academic & University Calculators
- **CGPA Calculator**: Calculate cumulative GPA by subject letter grades or semester GPAs with downloadable PDF reports and confetti animations.
- **University Specific Calculators**:
  - **KIIT CGPA Calculator**: Tailored for Kalinga Institute of Industrial Technology grade points.
  - **GTU CGPA to Percentage**: Official Gujarat Technological University formula (`(CGPA - 0.5) * 10`).
  - **SRM GPA Calculator**: SRM Institute of Science & Technology SGPA calculator.
  - **VIT GPA Calculator**: Vellore Institute of Technology S-F grading scale calculator.
  - **VIT CGPA to Percentage**: VIT formula (`Percentage = CGPA * 10`).
  - **Drexel GPA Calculator**: Drexel University 4.0 scale calculator with prior credit support.
  - **CASPA GPA Calculator**: PA School 4.0 scale & BCPM Science GPA calculator.
  - **Howard County GPA Calculator**: Howard Community College (HCC) grading scale calculator.
  - **IB to GPA Calculator**: International Baccalaureate 1-7 scale to US 4.0 GPA converter.
  - **IPU CGPA Calculator**: GGSIPU Ordinance 11 CGPA calculator (Marks vs Grade mode).
- **Utility Calculators**:
  - **GPA to Percentage Converter**: Universal converter supporting 4.0, 5.0, and 10.0 scale conversions.
  - **Target GPA Calculator**: Find required semester GPA needed to achieve a target CGPA.
  - **Attendance Percentage Calculator**: Calculate current attendance % and required/skippable classes.
  - **Audiobook Percentage Calculator**: Track audiobook listening progress by time.
  - **Percentage Increase & Decrease Calculators**: Step-by-step percentage change tools.

### 👩‍🏫 2. Independent Tutor Marketplace
- **Tutor Directory (`/find-a-tutor`)**: Filter home and online tutors by subject, board (CBSE, ICSE, IB, State), city, area, and teaching mode.
- **SEO Taxonomy Catch-all Routes (`/find-a-tutor/[...slug]`)**: Programmatic SEO pages for city, board, and subject combinations.
- **Verified Tutor Profiles (`/tutor/[slug]`)**: View qualifications, teaching experience, hourly rates, and submit lead requests to reveal contact phone & WhatsApp details.
- **Tutor Application Form (`/become-a-tutor`)**: Registration form with live profile URL slug availability check and profile photo uploads to Supabase Storage.

### 🔐 3. Admin Portal (`/admin`)
- Secure authentication for site administrators (`/admin/login`).
- Admin dashboard to review, approve, reject, or permanently delete tutor applications with rejection notes.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 16.3.4](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/) + [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL + RLS + RPC + Storage)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + jsPDF-AutoTable
- **Animations**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Form Validation**: [Zod](https://zod.dev/) + React Hook Form

---

## 🔍 SEO & Ranking Strategy

Every page in the application is engineered for search engine ranking (SERP) leadership:

1. **Server Component First Architecture**: HTML is statically pre-rendered on the server (SSG), maximizing Core Web Vitals (FCP, LCP, CLS) and instant page loads.
2. **Schema.org JSON-LD Data**:
   - `WebSite` & `Organization` schema with Google Sitelinks Searchbox integration.
   - `WebApplication` schema for all calculator tools.
   - `FAQPage` rich snippet schema on Q&A blocks to trigger Google search accordions.
   - `BreadcrumbList` schema for SERP snippet trails.
3. **Automated Metadata & OpenGraph**:
   - Canonical URLs (`https://yourlearningmentor.com/...`) generated dynamically per route.
   - Targeted long-tail keyword lists and social card meta definitions (`openGraph`, `twitter`).
4. **Crawl Efficiency**:
   - `app/sitemap.ts`: Dynamic XML sitemap with prioritized weights (`1.0` for Home, `0.9` for primary tools, `0.8` for regional calculators).
   - `app/robots.ts`: Clean indexing instructions with Googlebot directives (`max-snippet: -1`, `max-image-preview: "large"`).

---

## 📦 Project Structure

```text
my-app/
├── app/                                  # Next.js App Router
│   ├── layout.tsx                        # Root layout (Fonts, Nav, Footer, Global Schema)
│   ├── page.tsx                          # Home page (Career Counselling Hero & Services)
│   ├── globals.css                       # Global Tailwind CSS definitions & color tokens
│   ├── sitemap.ts                        # Dynamic XML Sitemap generator
│   ├── robots.ts                         # Robots.txt generator
│   ├── not-found.tsx                     # Custom 404 page
│   ├── about/                            # About Us page
│   ├── contact-us/                       # Contact Us page & contact form
│   ├── privacy/                          # Privacy Policy page
│   ├── cgpa-calculator/                  # CGPA Calculator page & client component
│   ├── gpa-calculator/                   # US 4.0 GPA Calculator
│   ├── gpa-to-percentage-converter/      # GPA to Percentage Converter
│   ├── target-gpa-calculator/            # Target GPA Calculator
│   ├── kiit-cgpa-calculator/             # KIIT CGPA Calculator
│   ├── cgpa-to-percentage-gtu-calculator/# GTU CGPA Converter
│   ├── srm-gpa-calculator/               # SRM GPA Calculator
│   ├── vit-gpa-calculator/               # VIT GPA Calculator
│   ├── vit-cgpa-to-percentage-calculator/# VIT CGPA Converter
│   ├── drexel-gpa-calculator/            # Drexel GPA Calculator
│   ├── caspa-gpa-calculator/             # CASPA PA School Calculator
│   ├── howard-county-gpa-calculator/     # Howard Community College Calculator
│   ├── ib-to-gpa-calculator/             # IB to GPA Converter
│   ├── ipu-cgpa-calculator/              # GGSIPU IPU CGPA Calculator
│   ├── attendance-percentage-calculator/ # Attendance Calculator
│   ├── audiobook-percentage-calculator/  # Audiobook Progress Calculator
│   ├── percentage-increase-calculator/   # Percentage Increase Tool
│   ├── percentage-decrease-calculator/   # Percentage Decrease Tool
│   ├── covenant-eyes-free-trial/         # Covenant Eyes Trial Landing Page
│   ├── covenant-eyes-promo-code/          # Covenant Eyes Promo Codes Page
│   ├── covenant-eyes-review/             # Covenant Eyes Review Article
│   ├── best-screen-accountability-software/# Accountability Apps Article
│   ├── diffie-hellman-examples/          # Solved Crypto Math Article
│   ├── find-a-tutor/                     # Tutor Directory & Catch-all Taxonomy Routes
│   ├── tutor/[slug]/                     # Public Tutor Profile
│   ├── tutors/[slug]/                    # Profile Alias Route
│   ├── become-a-tutor/                   # Tutor Application Form
│   └── admin/                            # Admin Portal & Login Page
├── components/                           # Shared Components & UI Library
│   ├── Navbar.tsx                        # Sticky Navigation Header & Dropdown
│   ├── Footer.tsx                        # Site Footer
│   ├── StickyCtaBar.tsx                  # Sticky Mobile CTA Bar
│   ├── PageLoader.tsx                    # Skeleton Loader
│   └── ui/                               # Shadcn UI Primitives
├── hooks/                                # Custom React Hooks
├── integrations/                         # Supabase Client & Database Types
├── lib/                                  # Utility Functions & PDF Generators
├── public/                               # Static Assets, Logos & OG Cards
├── tailwind.config.ts                    # Tailwind CSS Configuration
└── tsconfig.json                         # TypeScript Configuration
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or higher (Recommended: `v20.x` or `v22.x`)
- **npm** or **pnpm** or **yarn**

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/starmaticweb-collab/Your-Learning-Mentor.git
   cd Your-Learning-Mentor
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

6. **Start Production Server**:
   ```bash
   npm run start
   ```

---

## 🌐 Deployment Guide

### Deploying on Vercel (Recommended)

1. Push your repository to GitHub.
2. Connect your repository to [Vercel](https://vercel.com).
3. Set the Environment Variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel Dashboard.
4. Click **Deploy**. Vercel will automatically build and optimize all 36 static pages.

---

## 📄 License

Copyright © 2026 **YourLearningMentor**. All rights reserved.
