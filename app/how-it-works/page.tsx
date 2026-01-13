import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
