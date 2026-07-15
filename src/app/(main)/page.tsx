import HomeHeroSection from "@/components/home/HomeHeroSection";
import FeaturesSection from "@/components/home/Benefits";
import HowItWorksSection from "@/components/home/HowItWorks";
import FeaturedWorkspacesSection from "@/components/home/Category";
import TestimonialsSection from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FeaturedWorkspacesSection />
      <TestimonialsSection  />
    </>
  );
}
