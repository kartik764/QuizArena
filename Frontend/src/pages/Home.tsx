import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Feature";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#00020c] text-white">

      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <CTA />

      <Footer />

    </div>
  );
}

export default Home;