import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/location" as const, label: "Location" },
  { to: "/architecture" as const, label: "Architecture" },
  { to: "/sitemap" as const, label: "Site Map" },
  { to: "/Floorplans" as const, label: "Floor Plans" },
  { to: "/builders" as const, label: "Builders & Architects" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="One Oak logo" className="h-12 w-auto" />
          <span className="font-display text-2xl tracking-[0.2em] uppercase text-foreground">
            One Oak
          </span>
        </Link>

        {/* Desktop Navigation — only shows when there's actually room */}
        <div className="hidden xl:flex items-center gap-6 2xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-300 ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger — visible below xl */}
        <button
          className="xl:hidden text-foreground z-50 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile / tablet full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-2"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block font-display text-2xl sm:text-3xl tracking-[0.15em] uppercase text-center px-6 py-3 transition-colors ${
                    location.pathname === link.to
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}