import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* PEREZ */
import perez1 from "@/assets/perezfp/perez-1.png";
import perez2 from "@/assets/perezfp/perez-2.png";

/* SUDIK */
import sudik1 from "@/assets/sudikfp/sudik-1.png";
import sudik2 from "@/assets/sudikfp/sudik-2.png";
import sudik3 from "@/assets/sudikfp/sudik-3.png";

/* MICHAEL */
import michael1 from "@/assets/michaelfp/michael-1.png";
import michael2 from "@/assets/michaelfp/michael-2.png";

export const Route = createFileRoute("/floorplans")({
  component: FloorPlans,
});

const residences = [
  {
    index: "06",
    name: "Steamboat",
    lotName: "Lot 6",
    primary: perez1,
    secondary: perez2,
  },
  {
    index: "02",
    name: "The Aspen",
    lotName: "Lot 2",
    primary: sudik1,
    secondary: sudik2,
    third: sudik3,
  },
  {
    index: "11",
    name: "Dillon",
    lotName: "Lot 11",
    primary: michael1,
    secondary: michael2,
  },
];

// Each residence's images, grouped separately, so the lightbox only
// cycles through images within the same section.
type LightboxImage = {
  src: string;
  label: string; // e.g. "Steamboat — Floor 1"
};

const imageGroups: LightboxImage[][] = residences.map((r) => {
  const imgs: LightboxImage[] = [
    { src: r.primary, label: `${r.name} — Floor 1` },
    { src: r.secondary, label: `${r.name} — Floor 2` },
  ];
  if (r.third) {
    imgs.push({ src: r.third, label: `${r.name} — Floor 3` });
  }
  return imgs;
});

function FloorPlans() {
  // groupIndex = which residence, imageIndex = which image within it
  const [lightbox, setLightbox] = useState<{
    groupIndex: number;
    imageIndex: number;
  } | null>(null);

  const isOpen = lightbox !== null;
  const currentGroup = isOpen ? imageGroups[lightbox.groupIndex] : null;
  const current = currentGroup ? currentGroup[lightbox!.imageIndex] : null;

  const goNext = useCallback(() => {
    setLightbox((prev) => {
      if (prev === null) return null;
      const groupLength = imageGroups[prev.groupIndex].length;
      return {
        groupIndex: prev.groupIndex,
        imageIndex: (prev.imageIndex + 1) % groupLength,
      };
    });
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) => {
      if (prev === null) return null;
      const groupLength = imageGroups[prev.groupIndex].length;
      return {
        groupIndex: prev.groupIndex,
        imageIndex: (prev.imageIndex - 1 + groupLength) % groupLength,
      };
    });
  }, []);

  const close = useCallback(() => setLightbox(null), []);

  // Keyboard navigation: Left/Right to move, Esc to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goNext, goPrev, close]);

  return (
    <>
      <Header />

      {/* Lightbox overlay */}
      {isOpen && current && currentGroup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={close}
        >
          <button
            className="absolute top-5 right-6 text-white/60 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            Close ✕
          </button>

          {/* Prev arrow */}
          <button
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-3"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-3"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <img
            src={current.src}
            className="max-w-[90vw] max-h-[80vh] object-contain shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption / position indicator */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/80">
              {current.label}
            </p>
            <p className="font-mono text-[9px] text-white/40 mt-1">
              {lightbox!.imageIndex + 1} / {currentGroup.length}
            </p>
          </div>
        </div>
      )}

      <main className="pt-28 pb-32 px-6 bg-[#F8F5EF] min-h-screen">
        <div className="mx-auto max-w-5xl">
          {/* Page header */}
          <div className="mb-14 border-b border-stone-300 pb-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8960C] mb-3">
              One Oak — Residences
            </p>

            <h1
              className="text-5xl md:text-7xl font-light text-stone-900 leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              Floor Plans
            </h1>

            <p className="mt-4 text-stone-500 text-sm max-w-md leading-relaxed">
              A curated look at architectural layouts across One Oak residences.
            </p>
          </div>

          {/* Residence sections */}
          <div className="space-y-20">
            {residences.map((r, rIndex) => (
              <section key={r.name}>
                {/* Section label row */}
                <div className="flex items-end gap-4 mb-6">
                  <span
                    className="text-7xl leading-none font-light select-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: "#C9A84C",
                      opacity: 0.45,
                    }}
                  >
                    {r.index}
                  </span>

                  <div className="pb-1">
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#B8960C] mb-0.5">
                      {r.lotName}
                    </p>

                    <h2
                      className="text-3xl font-light text-stone-800 leading-none"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      {r.name}
                    </h2>
                  </div>
                </div>

                {/* Plans grid */}
                <div
                  className={`grid gap-3 ${
                    r.third ? "md:grid-cols-3" : "md:grid-cols-2"
                  }`}
                >
                  {/* Floor 1 */}
                  <div
                    className="overflow-hidden bg-white border border-stone-200 group cursor-zoom-in"
                    onClick={() =>
                      setLightbox({ groupIndex: rIndex, imageIndex: 0 })
                    }
                  >
                    <img
                      src={r.primary}
                      alt={`${r.name} Residence — primary floor plan`}
                      className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="px-3 py-1.5 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-[#B8960C]">
                        Floor 1
                      </span>

                      <span className="font-mono text-[9px] text-stone-300">
                        Click to expand
                      </span>
                    </div>
                  </div>

                  {/* Floor 2 */}
                  <div
                    className="overflow-hidden bg-white border border-stone-200 group cursor-zoom-in"
                    onClick={() =>
                      setLightbox({ groupIndex: rIndex, imageIndex: 1 })
                    }
                  >
                    <img
                      src={r.secondary}
                      alt={`${r.name} Residence — secondary floor plan`}
                      className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="px-3 py-1.5 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-[#B8960C]">
                        Floor 2
                      </span>

                      <span className="font-mono text-[9px] text-stone-300">
                        Click to expand
                      </span>
                    </div>
                  </div>

                  {/* Floor 3 (Aspen only) */}
                  {r.third && (
                    <div
                      className="overflow-hidden bg-white border border-stone-200 group cursor-zoom-in"
                      onClick={() =>
                        setLightbox({ groupIndex: rIndex, imageIndex: 2 })
                      }
                    >
                      <img
                        src={r.third}
                        alt={`${r.name} Residence — third floor plan`}
                        className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />

                      <div className="px-3 py-1.5 border-t border-stone-100 flex items-center justify-between">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-[#B8960C]">
                          Floor 3
                        </span>

                        <span className="font-mono text-[9px] text-stone-300">
                          Click to expand
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gold divider */}
                <div className="mt-8 h-px bg-gradient-to-r from-[#C9A84C]/40 via-[#C9A84C]/10 to-transparent" />
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}