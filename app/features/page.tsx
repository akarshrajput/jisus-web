import Header from "@/components/Header";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <Features />
      </div>
      <Footer />
    </main>
  );
}
