import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Working from "@/components/Working";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <Container>
      <main className="flex-1 pt-16">
        <Hero />
        <Features />
        <Working />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </Container>
  );
}
