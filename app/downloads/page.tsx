import Header from "@/components/Header";
import Downloads from "@/components/Downloads";
import Footer from "@/components/Footer";

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <Downloads />
      </div>
      <Footer />
    </main>
  );
}
