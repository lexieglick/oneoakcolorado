import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Play, Pause, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

import ridgelineVideo from "@/assets/ridgeline.mp4";
import crestviewVideo from "@/assets/crestview.mp4";

import ridgelineImg from "@/assets/home-1.png";
import crestviewImg from "@/assets/home-2.png";

// Crestview gallery images
import cv01 from "@/assets/thecrestview/CAM_01.jpg";
import cv02 from "@/assets/thecrestview/CAM_02.jpg";
import cv03 from "@/assets/thecrestview/CAM_03.jpg";
import cv04 from "@/assets/thecrestview/CAM_04.jpg";
import cv05 from "@/assets/thecrestview/CAM_05.jpg";
import cv06 from "@/assets/thecrestview/CAM_06.jpg";
import cv07 from "@/assets/thecrestview/CAM_07.jpg";
import cv08 from "@/assets/thecrestview/CAM_08.jpg";

const crestviewGallery = [cv01, cv02, cv03, cv04, cv05, cv06, cv07, cv08];

// Ridgeline gallery images
import rl01 from "@/assets/theridgeline/cam_01.jpg";
import rl02 from "@/assets/theridgeline/cam_02.jpg";
import rl03 from "@/assets/theridgeline/cam_03.jpg";
import rl04 from "@/assets/theridgeline/cam_04.jpg";
import rl05 from "@/assets/theridgeline/cam_05.jpg";
import rl06 from "@/assets/theridgeline/cam_06.jpg";
import rl07 from "@/assets/theridgeline/cam_07.jpg";
import rl08 from "@/assets/theridgeline/cam_08.jpg";

const ridgelineGallery = [rl01, rl02, rl03, rl04, rl05, rl06, rl07, rl08];

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture — One Oak | Luxury Residences" },
      {
        name: "description",
        content:
          "Explore the architectural excellence of One Oak — modern residences blending stone, wood, and glass with the Colorado landscape.",
      },
      { property: "og:title", content: "Architecture — One Oak" },
      {
        property: "og:description",
        content: "Custom luxury residences in Castle Rock, Colorado.",
      },
    ],
  }),
  component: HomesPage,
});

const homes = [
  {
    id: "ridgeline",
    video: ridgelineVideo,
    poster: ridgelineImg,
    title: "The Ridgeline",
    specs: "4 Bed · 5 Bath · 4,800 SF",
    desc: "A single-story contemporary masterpiece with sweeping roof lines, natural stone facades, and floor-to-ceiling glass opening to the landscape.",
    gallery: ridgelineGallery,
  },
  {
    id: "crestview",
    video: crestviewVideo,
    poster: crestviewImg,
    title: "The Crestview",
    specs: "5 Bed · 5.5 Bath · 5,600 SF",
    desc: "A masterful blend of stone, timber, and glass set among towering pines — featuring expansive balconies, a three-car garage, and resort-level outdoor living.",
    gallery: crestviewGallery,
  },
];

/* ── Fullscreen Video Modal ─────────────────────────────────────── */
function VideoModal({
  src,
  poster,
  onClose,
}: {
  src: string;
  poster: string;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Auto-play when modal opens
  useEffect(() => {
    videoRef.current?.play();
  }, []);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          // Use 95vw on mobile so the close button never clips off-screen
          className="relative w-full max-w-5xl"
          style={{ width: "min(95vw, 64rem)" }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <video
            ref={videoRef}
            className="w-full rounded-sm"
            src={src}
            poster={poster}
            controls
            autoPlay
            loop
            playsInline
          />
          {/* Close button — inside the video container on mobile so it never clips */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Close video"
          >
            <X size={16} className="text-foreground" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Horizontal Image Gallery ───────────────────────────────────── */
function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Use ~70% of visible width per scroll step for a natural feel
    const step = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  // Prevent body scroll while lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i !== null ? Math.min(i + 1, images.length - 1) : null));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i !== null ? Math.max(i - 1, 0) : null));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, images.length]);

  return (
    <>
      <div className="relative mt-8 group/gallery">
        {/* Scroll arrows — hidden on touch devices (they use native scroll) */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border items-center justify-center hover:bg-card transition-colors shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft size={15} className="text-foreground" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border items-center justify-center hover:bg-card transition-colors shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight size={15} className="text-foreground" />
          </button>
        )}

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-[1] pointer-events-none rounded-l-sm" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-[1] pointer-events-none rounded-r-sm" />

        {/* Scrollable strip — fluid thumbnail width so it looks good at any viewport */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -webkit-overflow-scrolling-touch"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((src, i) => (
            <motion.button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="flex-none rounded-sm overflow-hidden relative group/thumb"
              // Fluid: ~44vw on mobile, capped at 200px on desktop
              style={{
                scrollSnapAlign: "start",
                width: "clamp(140px, 44vw, 200px)",
                height: "clamp(94px, 29.5vw, 134px)",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              aria-label={`View ${title} image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${title} — view ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-colors" />
              <span className="absolute bottom-1.5 right-2 text-[9px] tracking-[0.15em] text-white/60 font-medium uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative w-full mx-4"
              style={{ maxWidth: "min(90vw, 64rem)" }}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex]}
                alt={`${title} — view ${lightboxIndex + 1}`}
                className="w-full rounded-sm max-h-[80vh] object-contain"
              />

              {/* Close — inside frame on mobile, outside on sm+ */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-2 right-2 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Close lightbox"
              >
                <X size={16} className="text-foreground" />
              </button>

              {/* Prev */}
              {lightboxIndex > 0 && (
                <button
                  onClick={() => setLightboxIndex(lightboxIndex - 1)}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center hover:bg-card transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} className="text-foreground" />
                </button>
              )}

              {/* Next */}
              {lightboxIndex < images.length - 1 && (
                <button
                  onClick={() => setLightboxIndex(lightboxIndex + 1)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center hover:bg-card transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} className="text-foreground" />
                </button>
              )}

              {/* Counter */}
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-white/40">
                {lightboxIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Video Card ─────────────────────────────────────────────────── */
function VideoCard({
  home,
  autoPlay,
}: {
  home: (typeof homes)[0];
  autoPlay: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Don't autoplay inline on mobile — respects data/battery and iOS low-power restrictions
  const [playing, setPlaying] = useState(autoPlay);
  const [modalOpen, setModalOpen] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
  };

  const openModal = () => setModalOpen(true);

  return (
    <>
      <motion.div
        className="w-full min-w-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
      >
        {/* VIDEO PREVIEW — padding-top trick gives a reliable 16:9 box at any width */}
        <div className="relative overflow-hidden rounded-sm group" style={{ paddingTop: "56.25%" }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={home.video}
            poster={home.poster}
            muted
            autoPlay={autoPlay}
            loop
            playsInline
          />

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />

          {/* Play/Pause — centre — 44px min touch target */}
          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            <div className="w-12 h-12 rounded-full border-2 border-white/70 flex items-center justify-center group-hover:scale-110 transition">
              {playing ? (
                <Pause size={18} className="text-white" fill="currentColor" />
              ) : (
                <Play size={18} className="text-white ml-1" fill="currentColor" />
              )}
            </div>
          </button>

          {/* Fullscreen button — larger tap target on mobile */}
          <button
            onClick={openModal}
            className="absolute top-3 right-3 w-10 h-10 sm:w-8 sm:h-8 rounded-sm bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/60"
            aria-label="Open fullscreen"
          >
            <Maximize2 size={13} className="text-white" />
          </button>
        </div>

        {/* TEXT */}
        <div className="mt-5">
          <span className="text-xs tracking-[0.2em] uppercase text-primary">
            {home.specs}
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mt-2">
            {home.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {home.desc}
          </p>
        </div>

        {/* GALLERY */}
        {home.gallery && <ImageGallery images={home.gallery} title={home.title} />}
      </motion.div>

      {/* Fullscreen modal */}
      {modalOpen && (
        <VideoModal
          src={home.video}
          poster={home.poster}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
function HomesPage() {
  return (
    <>
      <Header />

      <main className="pt-24 overflow-x-hidden w-full">
        <section className="py-16 px-6">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              label="Portfolio"
              title="Architecture"
              description="Each residence at One Oak is a unique creation, designed to celebrate the landscape and crafted with materials that honor the natural beauty of Colorado's Front Range."
            />
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-16 overflow-x-hidden">
          <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 w-full">
            {homes.map((home, i) => (
              <VideoCard key={home.title} home={home} autoPlay={i === 0} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}