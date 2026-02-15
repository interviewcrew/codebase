import Hero from "@/modules/landing/ui/components/hero";
import CircleBackground from "@/modules/landing/ui/components/circle-background";
import Features from "@/modules/landing/ui/components/features";
import FAQ from "@/modules/landing/ui/components/faq";
import Footer from "@/modules/landing/ui/components/footer";

export default function Home() {
  return (
    <div id="root">
      <CircleBackground />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}
