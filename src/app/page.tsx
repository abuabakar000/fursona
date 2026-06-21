import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Commissions from "@/components/Commissions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <Header />
      
      {/* Hero section featuring greeting and mascot */}
      <Hero />
      
      {/* Meet the Artist Bio section */}
      <About />
      
      {/* Portfolio Gallery */}
      <Gallery />
      
      {/* Commission status and pricing plans */}
      <Commissions />
      
      {/* Notebook-styled Client Pitch form */}
      <Contact />
      
      {/* Footnote details and links */}
      <Footer />
    </main>
  );
}
