import Hero from "@/components/public/Hero";
import ServicePreview from "@/components/public/ServicePreview";
import WhyChooseUs from "@/components/public/WhyChooseUs";
import HowItWorks from "@/components/public/HowItWorks";
import ServiceAreas from "@/components/public/ServiceAreas";
import RecentWork from "@/components/public/RecentWork";
import Reviews from "@/components/public/Reviews";
import FinalCTA from "@/components/public/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicePreview />
      <WhyChooseUs />
      <HowItWorks />
      <ServiceAreas />
      <RecentWork />
      <Reviews />
      <FinalCTA />
    </>
  );
}