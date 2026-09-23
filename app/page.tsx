import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OQueFazemos from "@/components/OQueFazemos";
import ComoTrabalhamos from "@/components/ComoTrabalhamos";
import NoQueAcreditamos from "@/components/NoQueAcreditamos";
import QuemSomos from "@/components/QuemSomos";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OQueFazemos />
        <ComoTrabalhamos />
        <NoQueAcreditamos />
        <QuemSomos />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
