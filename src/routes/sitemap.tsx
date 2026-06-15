import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteMapDetail } from "@/components/SiteMapDetail";
import type { LotData } from "@/components/SiteMapLot";
import sitemapImage from "@/assets/Sitemap-light.png";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Site Map — One Oak | Community Layout" },
      { name: "description", content: "Explore the One Oak community site map — browse available lots across Block 1 and Block 2 phases." },
      { property: "og:title", content: "Site Map — One Oak" },
      { property: "og:description", content: "Interactive community lot map for One Oak, Castle Rock." },
    ],
  }),
  component: SiteMapPage,
});

const lots: LotData[] = [
  // B1
  { id: "b1-1",  block: "B1", number: 1,  name: "The Vail",      status: "available", acres: "0.52 ac", SQF: "23,049 ft²",  path: "" },
  { id: "b1-2",  block: "B1", number: 2,  name: "Durango",     status: "reserved",  acres: "0.52 ac", SQF: "22,980 ft²",  path: "" },
  { id: "b1-3",  block: "B1", number: 3,  name: "Telluride",     status: "available", acres: "0.48 ac", SQF: "21,104 ft²",  path: "" },
  { id: "b1-4",  block: "B1", number: 4,  name: "The Breck",     status: "available", acres: "0.80 ac", SQF: "26,179 ft²",  path: "" },
  { id: "b1-5",  block: "B1", number: 5,  name: "Keystone",      status: "sold",      acres: "0.59 ac", SQF: "25,825 ft²",  path: "" },
  { id: "b1-6",  block: "B1", number: 6,  name: "Steamboat",     status: "available", acres: "0.62 ac", SQF: "27,960 ft²",  path: "" },
  { id: "b1-7",  block: "B1", number: 7,  name: "Silverton",     status: "available", acres: "0.40 ac", SQF: "17,815 ft²",  path: "" },
  { id: "b1-8",  block: "B1", number: 8,  name: "Estes Park",    status: "available", acres: "0.77 ac", SQF: "33,707 ft²",  path: "" },
  { id: "b1-9",  block: "B1", number: 9,  name: "Winter Park",   status: "available", acres: "0.52 ac", SQF: "22,640 ft²",  path: "" },
  { id: "b1-10", block: "B1", number: 10, name: "Frisco",        status: "available", acres: "0.44 ac", SQF: "19,178 ft²",  path: "" },
  { id: "b1-11", block: "B1", number: 11, name: "Dillon",        status: "reserved",  acres: "0.47 ac", SQF: "20,766 ft²",  path: "" },
  { id: "b1-12", block: "B1", number: 12, name: "Georgetown",    status: "available", acres: "0.42 ac", SQF: "18,692 ft²",  path: "" },
  { id: "b1-13", block: "B1", number: 13, name: "Idaho Springs", status: "available", acres: "0.48 ac", SQF: "21,259 ft²",  path: "" },
  { id: "b1-14", block: "B1", number: 14, name: "Fairplay",      status: "available", acres: "0.61 ac", SQF: "26,975 ft²",  path: "" },
  { id: "b1-15", block: "B1", number: 15, name: "Alma",          status: "sold",      acres: "0.61 ac", SQF: "26,922 ft²",  path: "" },
  // B2
  { id: "b2-1",  block: "B2", number: 1,  name: "Crested Butte", status: "available", acres: "0.41 ac", SQF: "18,120 ft²",  path: "" },
  { id: "b2-2",  block: "B2", number: 2,  name: "The Aspen",       status: "available", acres: "0.36 ac", SQF: "15,938 ft²",  path: "" },
  { id: "b2-3",  block: "B2", number: 3,  name: "Ouray",         status: "reserved",  acres: "0.41 ac", SQF: "18,170 ft²",  path: "" },
  { id: "b2-4",  block: "B2", number: 4,  name: "Pagosa Springs",status: "available", acres: "0.78 ac", SQF: "33,989 ft²",  path: "" },
  { id: "b2-5",  block: "B2", number: 5,  name: "Leadville",     status: "available", acres: "0.63 ac", SQF: "27,523 ft²",  path: "" },
  { id: "b2-6",  block: "B2", number: 6,  name: "Salida",        status: "sold",      acres: "0.61 ac", SQF: "26,827 ft²",  path: "" },
  { id: "b2-7",  block: "B2", number: 7,  name: "Manitou",       status: "available", acres: "0.53 ac", SQF: "23,131 ft²",  path: "" },
  { id: "b2-8",  block: "B2", number: 8,  name: "Peak",          status: "available", acres: "0.46 ac", SQF: "20,028 ft²",  path: "" },
];

const hotspots: Record<string, { x: number; y: number; w: number; h: number }> = {
  "b1-1":  { x: 58.8, y: 13,   w: 7,  h: 11 },
  "b1-2":  { x: 50.1, y: 14.6, w: 9,  h: 11 },
  "b1-3":  { x: 43.9, y: 20,   w: 10, h: 10 },
  "b1-4":  { x: 41.6, y: 9.8,  w: 11, h: 11 },
  "b1-5":  { x: 33.9, y: 8.3,  w: 10, h: 11 },
  "b1-6":  { x: 26.5, y: 8.9,  w: 11, h: 13 },
  "b1-7":  { x: 24.9, y: 19,   w: 13, h: 10 },
  "b1-8":  { x: 32.9, y: 26.9, w: 14, h: 11 },
  "b1-9":  { x: 32.6, y: 35.5, w: 14, h: 10 },
  "b1-10": { x: 33.2, y: 42.1, w: 14, h: 10 },
  "b1-11": { x: 35.2, y: 49.8, w: 14, h: 10 },
  "b1-12": { x: 39.5, y: 55.9, w: 14, h: 9  },
  "b1-13": { x: 44.2, y: 60.8, w: 13, h: 9  },
  "b1-14": { x: 49.4, y: 66.8, w: 13, h: 8  },
  "b1-15": { x: 58.7, y: 68.4, w: 11, h: 9  },
  "b2-1":  { x: 66.9, y: 57.2, w: 10, h: 9  },
  "b2-2":  { x: 67.3, y: 51.2, w: 10, h: 9  },
  "b2-3":  { x: 68.3, y: 43.9, w: 11, h: 11 },
  "b2-4":  { x: 67.7, y: 32.1, w: 12, h: 11 },
  "b2-5":  { x: 61.1, y: 31.7, w: 10, h: 10 },
  "b2-6":  { x: 53,   y: 34.4, w: 11, h: 10 },
  "b2-7":  { x: 50.2, y: 42.6, w: 12, h: 12 },
  "b2-8":  { x: 56,   y: 51.8, w: 11, h: 10 },
};

const statusMeta: Record<LotData["status"], { label: string; swatch: string }> = {
  available: { label: "Available", swatch: "#7A9E7E" },
  reserved:  { label: "Reserved",  swatch: "#C4924A" },
  sold:      { label: "Sold",      swatch: "#9E7A7A" },
};

function SiteMapPage() {
  const [selectedLot, setSelectedLot] = useState<LotData | null>(null);
  const [hoveredLot, setHoveredLot] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              label="Community"
              title="Site Map"
              description="Explore the One Oak community layout. Each lot is named after a legendary Colorado mountain town. Click any lot to view details and availability."
            />
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-4xl">

            {/* Legend */}
            <div className="flex items-center justify-center gap-8 mb-10">
              {Object.entries(statusMeta).map(([status, { label, swatch }]) => (
                <div key={status} className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: swatch }} />
                  <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Map */}
            <div className="relative border border-[#D6C9B4] rounded-sm overflow-hidden bg-[#EFE9DF]">
              <img
                src={sitemapImage}
                alt="One Oak community site map showing Block 1 and Block 2 lot layout"
                className="w-full h-auto block"
              />

              {/* Clickable hotspot overlays */}
              {lots.map((lot) => {
                const spot = hotspots[lot.id];
                if (!spot) return null;
                const isHovered = hoveredLot === lot.id;
                return (
                  <button
                    key={lot.id}
                    className="absolute cursor-pointer transition-all duration-200 rounded-sm"
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      width: `${spot.w}%`,
                      height: `${spot.h}%`,
                      backgroundColor: isHovered ? "rgba(122, 107, 85, 0.12)" : "transparent",
                      border: isHovered ? "1px solid rgba(140, 115, 85, 0.4)" : "1px solid transparent",
                    }}
                    onClick={() => setSelectedLot(lot)}
                    onMouseEnter={() => setHoveredLot(lot.id)}
                    onMouseLeave={() => setHoveredLot(null)}
                    aria-label={`${lot.name} — Block ${lot.block}, Lot ${lot.number}`}
                  />
                );
              })}

              {/* Hover tooltip */}
              {hoveredLot && (() => {
                const lot = lots.find(l => l.id === hoveredLot);
                const spot = lot ? hotspots[lot.id] : null;
                if (!lot || !spot) return null;
                return (
                  <div
                    className="absolute pointer-events-none z-10 backdrop-blur-sm border rounded-sm px-3 py-2 shadow-sm"
                    style={{
                      left: `${spot.x + spot.w / 2}%`,
                      top: `${spot.y - 1}%`,
                      transform: "translate(-50%, -100%)",
                      backgroundColor: "#F7F3ED",
                      borderColor: "#D6C9B4",
                    }}
                  >
                    <p className="text-xs font-display whitespace-nowrap" style={{ color: "#2C2318" }}>{lot.name}</p>
                    <p className="text-[10px] tracking-wider" style={{ color: "#8C7355" }}>
                      {lot.block}-{lot.number} · {statusMeta[lot.status].label}
                    </p>
                  </div>
                );
              })()}
            </div>

            <div className="text-center mt-4">
              <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: "#BCA98C" }}>
                Hover over a lot to preview · Click for full details
              </p>
            </div>

            {/* Lot directory */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px rounded-sm overflow-hidden" style={{ background: "#D6C9B4", border: "1px solid #D6C9B4" }}>
              {["B1", "B2"].map((block) => (
                <div key={block} className="p-8" style={{ backgroundColor: "#F7F3ED" }}>
                  <h3 className="font-display text-lg mb-4" style={{ color: "#4A3F33" }}>Block {block}</h3>
                  <div className="space-y-1">
                    {lots
                      .filter((l) => l.block === block)
                      .map((lot) => (
                        <button
                          key={lot.id}
                          onClick={() => setSelectedLot(lot)}
                          className="flex items-center justify-between w-full py-2 px-3 rounded-sm text-left transition-colors group"
                          style={{ backgroundColor: "transparent" }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#EFE9DF")}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs w-5" style={{ color: "#BCA98C" }}>{lot.number}</span>
                            <span className="text-sm transition-colors" style={{ color: "#4A3F33" }}>{lot.name}</span>
                          </div>
                          <span
                            className="text-[9px] tracking-[0.15em] uppercase font-medium"
                            style={{ color: statusMeta[lot.status].swatch }}
                          >
                            {statusMeta[lot.status].label}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SiteMapDetail lot={selectedLot} onClose={() => setSelectedLot(null)} />
      </main>
      <Footer />
    </>
  );
}