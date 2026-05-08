import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";

import ridgelineImg from "@/assets/home-1.png";
import crestviewImg from "@/assets/home-2.png";

import cv01 from "@/assets/thecrestview/CAM_01.jpg";
import cv02 from "@/assets/thecrestview/CAM_02.jpg";
import cv03 from "@/assets/thecrestview/CAM_03.jpg";
import cv04 from "@/assets/thecrestview/CAM_04.jpg";
import cv05 from "@/assets/thecrestview/CAM_05.jpg";
import cv06 from "@/assets/thecrestview/CAM_06.jpg";
import cv07 from "@/assets/thecrestview/CAM_07.jpg";
import cv08 from "@/assets/thecrestview/CAM_08.jpg";

const crestviewGallery = [cv01, cv02, cv03, cv04, cv05, cv06, cv07, cv08];

import rl01 from "@/assets/theridgeline/CAM_01.jpg";
import rl02 from "@/assets/theridgeline/CAM_02.jpg";
import rl03 from "@/assets/theridgeline/CAM_03.jpg";
import rl04 from "@/assets/theridgeline/CAM_04.jpg";
import rl05 from "@/assets/theridgeline/CAM_05.jpg";
import rl06 from "@/assets/theridgeline/CAM_06.jpg";
import rl07 from "@/assets/theridgeline/CAM_07.jpg";
import rl08 from "@/assets/theridgeline/CAM_08.jpg";

const ridgelineGallery = [rl01, rl02, rl03, rl04, rl05, rl06, rl07, rl08];

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

function ImageGallery({ images }: { images: string[] }) {
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
      <div className="relative mt-6">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl"
        >
          ‹
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl"
        >
          ›
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 px-10"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="flex-none w-[40vw] md:w-[200px] h-[27vw] md:h-[133px] overflow-hidden rounded-sm"
            >
              <img src={src} className="w-full h-full object-cover" alt="" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setLightboxIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              src={images[lightboxIndex]}
              className="max-w-full max-h-[85vh] object-contain rounded"
              alt=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function VideoCard({
  home,
  autoPlay,
}: {
  home: (typeof homes)[0];
  autoPlay: boolean;
}) {
  return (
    <motion.div
      className="w-full min-w-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="relative w-full rounded-sm overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${home.videoId}?autoplay=${autoPlay ? 1 : 0}&mute=1&loop=1&playlist=${home.videoId}`}
          title={home.title}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mt-5">
        <span className="text-xs uppercase tracking-widest text-primary">
          {home.specs}
        </span>
        <h3 className="text-2xl font-bold mt-2">{home.title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{home.desc}</p>
      </div>

      <ImageGallery images={home.gallery} />
    </motion.div>
  );
}

function HomesPage() {
  return (
    <div className="overflow-x-hidden">
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
    </div>
  );
}