import { Suspense } from "react";
import Hero, { HeroSkeleton } from "./components/Hero";
import StorySection, { StorySkeleton } from "./components/StorySection";
import Skills, { SkillsSkeleton } from "./components/Skills";
import Projects, { ProjectsSkeleton } from "./components/Projects";
import Testimonials, { TestimonialsSkeleton } from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Audience } from "./types";
import { AudienceSyncer } from "./components/AudienceSyncer";
import Navbar from "./components/ui/Navbar";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string }>;
}) {
  const params = await searchParams;
  const audienceRaw = params.audience;

  // Validate audience
  let audience: Audience = 'general';
  if (audienceRaw === 'company' || audienceRaw === 'freelance') {
    audience = audienceRaw;
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans">
      {/* Sync URL audience to Context for Client Components */}
      <AudienceSyncer audience={audience} />
      <Navbar audience={audience}/>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero audience={audience} />
      </Suspense>
      <Suspense fallback={<StorySkeleton />}>
        {/* StorySection takes audience from Context internally via Client Comp, or we pass it? 
            StorySection (Server) fetches data. Story (Client) checks context.
            It's better if we pass filtered data from Server or pass prop to Client to override context?
            Actually Story Client Comp checks context. AudienceSyncer will set it.
        */}
        <StorySection />
      </Suspense>
      <Suspense fallback={<SkillsSkeleton />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects audience={audience} />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials audience={audience} />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  );
}
