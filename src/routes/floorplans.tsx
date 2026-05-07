import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* PEREZ */
import perez1 from "@/assets/Perezfp/perez-1.png";
import perez2 from "@/assets/Perezfp/perez-2.png";
/* SUDIK */
import sudik1 from "@/assets/Sudikfp/sudik-1.png";
import sudik2 from "@/assets/Sudikfp/sudik-2.png";
/* MICHAEL */
import michael1 from "@/assets/Michaelfp/michael-1.png";
import michael2 from "@/assets/Michaelfp/michael-2.png";

export const Route = createFileRoute("/floorplans")({
  component: FloorPlans,
});

const residences = [
  { index: "06", name: "Steamboat", lotName: "Lot 6", primary: perez1, secondary: perez2 },
  { index: "02", name: "The Aspen", lotName: "Lot 2", primary: sudik1, secondary: sudik2 },
  { index: "11", name: "Dillon", lotName: "Lot 11", primary: michael1, secondary: michael2 },
];

function FloorPlans() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <Header />

      {/* Lightbox overlay */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-6 text-white/60 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors"
            onClick={() => setLightbox(null)}
          >
            Close ✕
          </button>
          <img
            src={lightbox}
            className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
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
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Floor Plans
            </h1>
            <p className="mt-4 text-stone-500 text-sm max-w-md leading-relaxed">
              A curated look at architectural layouts across One Oak residences.
            </p>
          </div>

          {/* Residence sections */}
          <div className="space-y-20">
            {residences.map((r) => (
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
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {r.name}
                    </h2>
                  </div>
                </div>

                {/* Plans grid */}
                <div className="grid md:grid-cols-2 gap-3">
                  {/* Primary */}
                  <div
                    className="overflow-hidden bg-white border border-stone-200 group cursor-zoom-in"
                    onClick={() => setLightbox(r.primary)}
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

                  {/* Secondary */}
                  <div
                    className="overflow-hidden bg-white border border-stone-200 group cursor-zoom-in"
                    onClick={() => setLightbox(r.secondary)}
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