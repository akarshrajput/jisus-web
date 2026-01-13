import Header from "@/components/Header";
import Compatibility from "@/components/Compatibility";
import Footer from "@/components/Footer";

export default function CompatibilityPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <Compatibility />
      </div>
      <Footer />
    </main>
  );
}
