import Navbar           from "@/components/Navbar";
import NoticesBanner    from "@/components/NoticesBanner";
import CanvasSequence   from "@/components/CanvasSequence";
import StorySection     from "@/components/StorySection";
import ServicesSection  from "@/components/ServicesSection";
import BookingSection   from "@/components/BookingSection";
import DonationSection  from "@/components/DonationSection";
import MyBookingsSection from "@/components/MyBookingsSection";
import HistorySection   from "@/components/HistorySection";
import GallerySection   from "@/components/GallerySection";
import Footer           from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-bg-deep selection:bg-gold-primary/30 selection:text-ivory">
      {/* Sticky notice strip */}
      <NoticesBanner />

      {/* Fixed navigation */}
      <Navbar />

      {/* ─── Hero Scrollytelling ─────────────────────────── */}
      {/* The canvas is pinned for 500vh; StorySection overlays it */}
      <div className="relative" style={{ height: "500vh" }}>
        <CanvasSequence frameCount={151} />
        <StorySection />
      </div>

      {/* ─── Services Horizontal Pan ─────────────────────── */}
      <ServicesSection />

      {/* ─── Booking Form ────────────────────────────────── */}
      <BookingSection />

      {/* ─── E-Undiyal Donation ──────────────────────────── */}
      <DonationSection />

      {/* ─── My Bookings ─────────────────────────────────── */}
      <MyBookingsSection />

      {/* ─── Temple History (Sticky Stack) ───────────────── */}
      <HistorySection />

      {/* ─── Sacred Gallery ──────────────────────────────── */}
      <GallerySection />

      {/* ─── Footer ──────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
