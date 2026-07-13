import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Mountain, TreePine, Sun, X, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

import proximityMap1 from "@/assets/proximity-map-1.jpg";
import proximityMap2 from "@/assets/proximity-map-2.jpg";
import proximityMap3 from "@/assets/proximity-map-3.jpg";
import castleRockTopo from "@/assets/castlerocktopo.png";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — One Oak | Castle Rock, CO" },
      {
        name: "description",
        content:
          "One Oak is located in the scenic foothills of Castle Rock, Colorado — 30 minutes from Denver with breathtaking mountain views.",
      },
      { property: "og:title", content: "Location — One Oak" },
      {
        property: "og:description",
        content:
          "Scenic foothills of Castle Rock, Colorado — 30 minutes from Denver.",
      },
    ],
  }),
  component: LocationPage,
});

function LocationPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Mountain,
      title: "Front Range Views",
      desc: "Panoramic vistas of the Rocky Mountain Front Range from every homesite.",
    },
    {
      icon: MapPin,
      title: "30 Min to Denver",
      desc: "Easy access to downtown Denver while enjoying small-town tranquility.",
    },
    {
      icon: TreePine,
      title: "Natural Surroundings",
      desc: "Nestled among native pines and scrub oak on rolling terrain.",
    },
    {
      icon: Sun,
      title: "300+ Days of Sun",
      desc: "Colorado's famous sunshine makes every day feel extraordinary.",
    },
  ];

  const proximityMaps = [
    {
      image: proximityMap1,
      title: "Fine Dining & Shopping",
      desc: "Premium restaurants and boutique shopping within minutes.",
    },
    {
      image: proximityMap2,
      title: "Dining & Entertainment",
      desc: "An expanded view of the area's top culinary destinations.",
    },
    {
      image: proximityMap3,
      title: "Full Area Guide",
      desc: "Comprehensive dining, shopping, and entertainment options nearby.",
    },
  ];

  const closeLightbox = () => setLightboxIndex(null);

  return (
    <>
      <Header />

      <main>
        {/* HERO + TOPO IMAGE */}
        <section className="relative w-full pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full overflow-hidden"
          >
            <img
              src={castleRockTopo}
              alt="Castle Rock topographic map"
              className="w-full h-[60vh] object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/5" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="text-xs tracking-[0.2em] uppercase text-primary mb-4">
                Location
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[0.15em] uppercase text-foreground mb-6">
                Castle Rock, Colorado
              </h1>
              <p className="text-sm sm:text-base text-foreground max-w-2xl leading-relaxed">
  Positioned between Denver and Colorado Springs along the Front Range,
  One Oak offers the perfect balance of seclusion and accessibility.
</p>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-border rounded-sm bg-card"
              >
                <f.icon size={32} className="text-primary mb-5" strokeWidth={1} />
                <h3 className="font-display text-xl text-foreground mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROXIMITY MAPS — full width, clickable to zoom */}
        <section className="px-6 pb-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              label="Nearby"
              title="What's Around You"
              description="One Oak places you at the center of Castle Rock's finest dining, shopping, and entertainment. Click any map to zoom in for a closer look."
            />

            <div className="mt-16 space-y-12">
              {proximityMaps.map((map, i) => (
                <motion.div
                  key={map.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="group relative w-full rounded-sm overflow-hidden border border-border bg-card block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-zoom-in"
                  >
                    <img
                      src={map.image}
                      alt={map.title}
                      className="w-full max-w-3xl mx-auto h-auto block transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                    {/* Dim overlay on hover */}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/25 transition-all duration-300" />
                    {/* Zoom pill — bottom right */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border rounded-sm px-3 py-2 shadow-lg">
                      <ZoomIn size={13} className="text-primary" strokeWidth={1.5} />
                      <span className="text-[11px] tracking-[0.15em] uppercase text-foreground">
                        Zoom in
                      </span>
                    </div>
                  </button>

                  <div className="mt-6">
                    <h3 className="font-display text-2xl text-foreground">{map.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{map.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="px-6 pb-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              label="Find Us"
              title="Get Directions"
              description="Located in Castle Rock, Colorado — easily accessible from I-25."
            />
            <div className="mt-16 aspect-[21/9] rounded-sm overflow-hidden border border-border bg-card">
              <iframe
                title="One Oak location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49197.74798402839!2d-104.8860837!3d39.3722121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c9bd6be2e3f73%3A0x5f09c61b1e7bc1cd!2sCastle%20Rock%2C%20CO!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="fixed top-6 right-6 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs tracking-[0.15em] uppercase">Close</span>
              <X size={14} strokeWidth={1.5} />
            </button>

            {/* Scrollable area so tall maps aren't cut off */}
            <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center py-16 px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-sm overflow-hidden border border-border">
                  <img
                    src={proximityMaps[lightboxIndex].image}
                    alt={proximityMaps[lightboxIndex].title}
                    className="w-full h-auto block"
                  />
                </div>

                {/* Caption + prev/next */}
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-2xl text-foreground">
                      {proximityMaps[lightboxIndex].title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {proximityMaps[lightboxIndex].desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 shrink-0 pt-1">
                    <button
                      onClick={() =>
                        setLightboxIndex(
                          (lightboxIndex - 1 + proximityMaps.length) % proximityMaps.length
                        )
                      }
                      className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Prev
                    </button>
                    <span className="text-xs text-muted-foreground/40">
                      {lightboxIndex + 1} / {proximityMaps.length}
                    </span>
                    <button
                      onClick={() =>
                        setLightboxIndex((lightboxIndex + 1) % proximityMaps.length)
                      }
                      className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}