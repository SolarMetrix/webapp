import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import About from "./About";
import Features from "./Features";
import LogoCloud from "./LogoCloud";

export default function GuestHomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoCloud />
        <About />
        <Features />
      </main>
      <Footer />
    </>
  );
}
