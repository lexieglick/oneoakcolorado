import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";

import ridgelineImg from "@/assets/home-1.png";
import crestviewImg from "@/assets/home-2.png";
import springsImg from "@/assets/home-3.png";
import dillonImg from "@/assets/home-4.png";


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

// Springs
import sp01 from "@/assets/thesprings/CAM_01.jpg";
import sp02 from "@/assets/thesprings/CAM_02.jpg";
import sp03 from "@/assets/thesprings/CAM_03.jpg";
import sp04 from "@/assets/thesprings/CAM_04.jpg";
import sp05 from "@/assets/thesprings/CAM_05.jpg";

const springsGallery = [sp01, sp02, sp03, sp04, sp05];

// Dillon
import dl01 from "@/assets/thedillon/CAM_01.jpg";
import dl02 from "@/assets/thedillon/CAM_02.jpg";
import dl03 from "@/assets/thedillon/CAM_03.jpg";
import dl04 from "@/assets/thedillon/CAM_04.jpg";
import dl05 from "@/assets/thedillon/CAM_05.jpg";
import dl06 from "@/assets/thedillon/CAM_06.jpg";

const dillonGallery = [dl01, dl02, dl03, dl04, dl05, dl06];

const videos = {
  ridgeline: "NSosbPN-PY4",
  crestview: "SyB7Fm1-zH0",
  springs: "Zu5fv4ii4bk",
  dillon: "oi999w4LcQo",
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
    title: "The Steamboat",
    specs: "4 Bed · 5 Bath · 7,831 Finished Square Footage",
    desc: "A single-story contemporary masterpiece with sweeping roof lines, natural stone facades, and floor-to-ceiling glass opening to the landscape.",
    gallery: ridgelineGallery,
  },
  {
    id: "crestview",
    videoId: videos.crestview,
    poster: crestviewImg,
    title: "The Aspen",
    specs: "4 Bed · 5 Bath · 7,000 Finished Square Footage",
    desc: "A masterful blend of stone, timber, and glass set among a beautiful landscape, featuring expansive balconies, a twelve-car garage, and resort-level outdoor living.",
    gallery: crestviewGallery,
  },
  {
    id: "springs",
    videoId: videos.springs,
    poster: ridgelineImg, // temporary until you have an image
    title: "The Springs",
    specs: "4 Bed · 5 Bath · 5,917 Finished Square Footage",
    desc: "A refined mountain residence featuring spacious interiors, timeless craftsmanship, and thoughtfully curated finishes, seamlessly blending modern comfort with Colorado's natural beauty.",
    gallery: springsGallery,
  },
  {
    id: "dillon",
    videoId: videos.dillon,
    poster: crestviewImg,
    title: "The Dillon",
    specs: "4 Bed · 4 Bath · 8,082 Finished Square Footage",
    desc: "A refined residence designed to embrace its surroundings, featuring expansive windows, elevated finishes, and thoughtfully crafted spaces that create a seamless connection between sophisticated living and the Colorado landscape.",
    gallery: dillonGallery,
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
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl"
        >
          ‹
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl"
        >
          ›
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1"
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

      <ImageGallery images={home.gallery} />

<div className="mt-5">
  <span className="text-xs uppercase tracking-widest text-primary">
    {home.specs}
  </span>
  <h3 className="text-2xl font-bold mt-2">{home.title}</h3>
  <p className="text-sm text-muted-foreground mt-2">
    {home.desc}
  </p>
</div>
    </motion.div>
  );
}

function HomesPage() {
  return (
    <div className="overflow-x-hidden">
      <Header />

      <main className="pt-16">
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <SectionHeading
            label="Portfolio"
            title="Architecture"
            description="One Oak offers the opportunity to build a fully custom home or draw inspiration from our thoughtfully designed residences, each created exclusively for the community."
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