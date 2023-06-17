import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import FAQ from "./FAQ";
import About from "./About";
import Features from "./Features";
import LogoCloud from "./LogoCloud";

export default function GuestHomePage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <LogoCloud />
        <About />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
