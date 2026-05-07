import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

// YouTube video IDs
const videos = {
  ridgeline: "NSosbPN-PY4",
  crestview: "SyB7Fm1-zH0",
};

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
    videoId: videos.ridgeline,
    poster: ridgelineImg,
    title: "The Ridgeline",
    specs: "4 Bed · 5 Bath · 4,800 SF",
    desc: "A single-story contemporary masterpiece with sweeping roof lines, natural stone facades, and floor-to-ceiling glass opening to the landscape.",
    gallery: ridgelineGallery,
  },
  {
    id: "crestview",
    videoId: videos.crestview,
    poster: crestviewImg,
    title: "The Crestview",
    specs: "5 Bed · 5.5 Bath · 5,600 SF",
    desc: "A masterful blend of stone, timber, and glass set among towering pines — featuring expansive balconies, a three-car garage, and resort-level outdoor living.",
    gallery: crestviewGallery,
  },
];

/* ── Image Gallery ───────────────────────────────────── */
function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative mt-8">
        <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-10">‹</button>
        <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-10">›</button>

        <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="flex-none w-[180px] h-[120px] overflow-hidden rounded-sm"
            >
              <img src={src} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setLightboxIndex(null)}
          >
            <img
              src={images[lightboxIndex]}
              className="max-w-[90vw] max-h-[80vh]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Video Card (YouTube) ───────────────────────────────────── */
function VideoCard({
  home,
  autoPlay,
}: {
  home: (typeof homes)[0];
  autoPlay: boolean;
}) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* YouTube Video */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-sm"
          src={`https://www.youtube.com/embed/${home.videoId}?autoplay=${autoPlay ? 1 : 0}&mute=1&loop=1&playlist=${home.videoId}`}
          title={home.title}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Text */}
      <div className="mt-5">
        <span className="text-xs uppercase tracking-widest text-primary">
          {home.specs}
        </span>
        <h3 className="text-2xl font-bold mt-2">{home.title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{home.desc}</p>
      </div>

      {/* Gallery */}
      <ImageGallery images={home.gallery} title={home.title} />
    </motion.div>
  );
}

/* ── Page ───────────────────────────────────── */
function HomesPage() {
  return (
    <>
      <Header />

      <main className="pt-24">
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <SectionHeading
            label="Portfolio"
            title="Architecture"
            description="Each residence at One Oak is a unique creation designed for the landscape."
          />
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {homes.map((home, i) => (
            <VideoCard key={home.id} home={home} autoPlay={i === 0} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}