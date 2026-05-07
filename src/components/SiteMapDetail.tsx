import { motion, AnimatePresence } from "framer-motion";
import { X, Mountain, Ruler, MapPin, ArrowUpRight } from "lucide-react";
import type { LotData } from "./SiteMapLot";

const statusConfig: Record<LotData["status"], { label: string; color: string; bg: string; border: string }> = {
  available: { label: "Available", color: "#4A7C59", bg: "#F0F5F2", border: "#B8D4C4" },
  reserved:  { label: "Reserved",  color: "#8C6D3F", bg: "#F7F2EC", border: "#D4BFA0" },
  sold:      { label: "Sold",      color: "#6B6B6B", bg: "#F2F2F2", border: "#CECECE" },
};

interface SiteMapDetailProps {
  lot: LotData | null;
  onClose: () => void;
}

export function SiteMapDetail({ lot, onClose }: SiteMapDetailProps) {
  return (
    <AnimatePresence>
      {lot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
          style={{ backgroundColor: "rgba(20,18,16,0.6)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-md overflow-hidden"
            style={{
              background: "#FAFAF8",
              borderRadius: "4px 4px 0 0",
              border: "1px solid #E4E0DA",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid #EDEBE7" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] font-medium tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color: statusConfig[lot.status].color,
                    background: statusConfig[lot.status].bg,
                    border: `1px solid ${statusConfig[lot.status].border}`,
                  }}
                >
                  {statusConfig[lot.status].label}
                </span>
                <span className="text-[11px] tracking-[0.14em] uppercase" style={{ color: "#A09890" }}>
                  Block {lot.block} · Lot {lot.number}
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-7 h-7 rounded-full transition-colors"
                style={{ background: "#EDEBE7", color: "#6B6560" }}
              >
                <X size={13} />
              </button>
            </div>

            {/* Hero */}
            <div
              className="flex flex-col items-center justify-center py-10 px-6"
              style={{ background: "#F3F1EE", borderBottom: "1px solid #EDEBE7" }}
            >
              <Mountain className="w-8 h-8 mb-4" style={{ color: "#C0B8AE" }} />
              <h2
                className="font-display text-3xl tracking-wide text-center"
                style={{ color: "#1C1A18" }}
              >
                {lot.name}
              </h2>
              <p
                className="text-[11px] tracking-[0.22em] uppercase mt-2"
                style={{ color: "#A09890" }}
              >
                One Oak · Castle Rock
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3"
              style={{ borderBottom: "1px solid #EDEBE7" }}
            >
              {[
                { icon: <Ruler className="w-3.5 h-3.5" />, label: "Lot Size", value: lot.acres || "0.35 ac" },
                { icon: <Mountain className="w-3.5 h-3.5" />, label: "Sq Ft", value: lot.SQF || "—" },
                { icon: <MapPin className="w-3.5 h-3.5" />, label: "Block", value: lot.block },
              ].map(({ icon, label, value }, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-5 px-3 text-center"
                  style={{
                    borderRight: i < 2 ? "1px solid #EDEBE7" : "none",
                  }}
                >
                  <span style={{ color: "#C0B8AE" }}>{icon}</span>
                  <p className="text-[9px] tracking-[0.16em] uppercase mt-2 mb-1" style={{ color: "#A09890" }}>
                    {label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#1C1A18" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description + CTA */}
            <div className="px-6 py-6">
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B6560" }}>
                {lot.description ||
                  `${lot.name} is a premium homesite in Phase 1 of One Oak, offering stunning Front Range views and the opportunity to build a custom luxury home in Castle Rock's most exclusive community.`}
              </p>

              {lot.status === "available" ? (
                <a
                  href="/contact"
                  className={[
                    "flex items-center justify-center gap-2",
                    "w-full py-3.5 text-[11px] tracking-[0.22em]",
                    "uppercase font-medium transition-opacity hover:opacity-80",
                  ].join(" ")}
                  style={{ background: "#1C1A18", color: "#FAFAF8", borderRadius: "2px" }}
                >
                  Inquire About This Lot
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div
                  className="flex items-center justify-center w-full py-3.5 text-[11px] tracking-[0.22em] uppercase font-medium"
                  style={{ background: "#F3F1EE", color: "#A09890", borderRadius: "2px", border: "1px solid #EDEBE7" }}
                >
                  {statusConfig[lot.status].label} — Not Available
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}