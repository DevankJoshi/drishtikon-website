"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import StorySection from "@/components/StorySection";
import TracklistSection from "@/components/TracklistSection";
import MerchSection from "@/components/MerchSection";
import PlayerSection from "@/components/PlayerSection";
import PaywallModal from "@/components/PaywallModal";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, ShoppingBag, Eye, CheckCircle, X } from "lucide-react";
import TiltWrapper from "@/components/TiltWrapper";
import { MorphingText } from "@/components/ui/morphing-text";

function SuccessToast({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-green-900/90 border border-green-500/40 backdrop-blur-md text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl max-w-sm w-full mx-4"
    >
      <CheckCircle className="text-green-400 shrink-0" size={22} />
      <div className="flex-1">
        <p className="font-bold font-inter text-sm">Payment successful! 🎉</p>
        <p className="text-xs text-green-300 mt-0.5">You now have lifetime access to the DRISHTIKON EP.</p>
      </div>
      <button onClick={onClose} className="text-green-400 hover:text-white transition-colors">
        <X size={18} />
      </button>
    </motion.div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | undefined>();
  const [paidCount, setPaidCount] = useState<number>(0);
  const playerRef = useRef<HTMLDivElement>(null);

  // On mount, check if returning from Stripe with ?success=true
  useEffect(() => {
    const success = searchParams.get("success");
    const emailFromUrl = searchParams.get("email");

    if (success === "true") {
      // Save the email from URL (Stripe redirect) or from pre-saved localStorage
      const email = emailFromUrl || localStorage.getItem("drishtikon_pending_email");
      if (email) {
        localStorage.setItem("drishtikon_email", email);
        localStorage.removeItem("drishtikon_pending_email");
      }
      setShowToast(true);
      setHasAccess(true);
      // Clean URL without reload
      router.replace("/", { scroll: false });
    } else {
      // Check access silently on regular visits
      const checkAccess = async () => {
        const email = localStorage.getItem("drishtikon_email");
        if (!email) return;
        try {
          const res = await fetch("/api/check-access", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (data.hasAccess) setHasAccess(true);
        } catch { /* silently fail */ }
      };
      checkAccess();
    }
  }, [searchParams, router]);

  // Fetch paid users counter
  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await fetch("/api/paid-users");
        const data = await res.json();
        if (data.totalPaidUsers) {
          setPaidCount(data.totalPaidUsers);
        }
      } catch {
        console.error("Failed to fetch paid users count");
      }
    };
    fetchCounter();
    // Refresh every 10 seconds
    const interval = setInterval(fetchCounter, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPlayer = () => {
    document.getElementById("player")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen selection:bg-brand-orange selection:text-black">
      <Navigation hasAccess={hasAccess} onOpenPaywall={() => setIsPaywallOpen(true)} />

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && <SuccessToast onClose={() => setShowToast(false)} />}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      >
        {/* Abstract Background Waves */}
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-brand-orange blur-[120px] opacity-40 mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-blue blur-[150px] opacity-30 mix-blend-screen" style={{ animation: "pulse 8s infinite alternate" }}></div>
        </div>

        <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
          {/* Counter Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 inline-block bg-brand-orange/10 border border-brand-orange/30 rounded-full px-8 py-3"
          >
            <p className="text-sm md:text-base font-inter tracking-widest text-brand-orange">
              {paidCount.toLocaleString()} people have unlocked this EP
            </p>
          </motion.div>

          <TiltWrapper intensity={1.5}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6 flex flex-col items-center"
            >
              <MorphingText
                texts={[
                  "DRISHTIKON",
                  "दृष्टिकोण",
                  "نقطہ نظر",
                  "ਪਹੁੰਚ",
                  "અભિગમ",
                  "ಅಪ್ರೋಚ್",
                  "視点",
                  "Acercarse",
                  "Perspektive",
                  "Точка зрения",
                  "يقترب"
                ]}
                className="h-24 text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-white via-blue-200 to-brand-blue text-gradient inline-block cursor-default"
              />
              <p className="mt-6 text-lg md:text-xl font-inter tracking-widest max-w-2xl mx-auto text-gray-300">
                A LIMITED EARLY-ACCESS RELEASE. PAY WHAT YOU WANT, UNLOCK THE EP, AND BECOME PART OF THE MOVEMENT.
              </p>
            </motion.div>
          </TiltWrapper>

          <TiltWrapper intensity={1}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 mt-8 md:mt-12 w-full max-w-4xl px-4"
            >
              <button
                onClick={scrollToPlayer}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-all hover:scale-105 group whitespace-nowrap"
              >
                <PlayCircle className="group-hover:text-brand-orange transition-colors" />
                Listen Now
              </button>
              {!hasAccess && (
                <button
                  onClick={() => setIsPaywallOpen(true)}
                  className="w-full md:w-auto flex items-center justify-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-600 transition-all hover:scale-105 whitespace-nowrap"
                >
                  <Eye />
                  Pay What You Want
                </button>
              )}
              {hasAccess && (
                <div className="w-full md:w-auto flex items-center justify-center gap-3 bg-green-600/20 border border-green-500/40 text-green-400 px-8 py-4 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                  <CheckCircle size={20} />
                  Full Access Unlocked
                </div>
              )}
              <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-transparent border-2 border-white/30 text-white/60 px-8 py-4 rounded-full font-bold uppercase tracking-widest whitespace-nowrap cursor-not-allowed">
                <ShoppingBag />
                Merch (Coming Soon)
              </button>
            </motion.div>
          </TiltWrapper>
        </div>
      </section>

      <StorySection />
      <TracklistSection hasAccess={hasAccess} onTrackSelect={setSelectedTrackIndex} />
      <div ref={playerRef}>
        <PlayerSection selectedTrackIndex={selectedTrackIndex} />
      </div>
      <MerchSection />

      {/* Global Paywall Modal (for hero CTA) */}
      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
