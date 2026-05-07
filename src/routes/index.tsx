import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight, MapPin, Home, Users } from "lucide-react";
import home1 from "@/assets/home-1.png";
import home2 from "@/assets/home-2.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={home2}
              alt="One Oak luxury home exterior"
              className="h-full w-full object-cover"
            />

            {/* DARK CINEMATIC OVERLAY (RESTORED) */}
            <div className="absolute inset-0 bg-black/40" />

            {/* TOP TO BOTTOM READABILITY FADE */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs tracking-[0.4em] uppercase text-white/80 mb-6 block">
                Castle Rock, Colorado
              </span>

              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight text-white">
                One Oak
              </h1>

              <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                An exclusive enclave of luxury homes nestled in Colorado's most coveted foothills.
              </p>

              <Link
                to="/architecture"
                className="mt-10 inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-primary hover:text-white transition-colors duration-300"
              >
                Explore Our Architecture <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              label="Welcome"
              title="Where Nature Meets Architecture"
              description="One Oak is a premier luxury community offering custom-built homes that harmonize with the stunning Colorado landscape. Every residence is a masterpiece of modern design, crafted by the region's finest builders."
            />
          </div>
        </section>

        {/* PHOTO FEATURE */}
        <section className="px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-sm"
            >
              <img
                src={home1}
                alt="One Oak luxury residence at dusk"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent md:bg-gradient-to-r md:from-background/70" />

              <div className="absolute bottom-0 left-0 p-8 md:p-12 flex flex-col items-start text-left">
                <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
                  Featured Home
                </span>

                <h3 className="font-display text-3xl md:text-4xl text-foreground mt-2 max-w-sm md:max-w-xl">
                  Modern Mountain Living
                </h3>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Location",
                desc: "Discover the beauty of Castle Rock and the Front Range.",
                to: "/location" as const,
              },
              {
                icon: Home,
                title: "Architecture",
                desc: "Explore the design vision behind every One Oak residence.",
                to: "/architecture" as const,
              },
              {
                icon: Users,
                title: "Builders & Architects",
                desc: "Meet the visionary builders and architects behind every home.",
                to: "/builders" as const,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  to={item.to}
                  className="group block p-8 border border-border rounded-sm hover:border-primary/30 transition-all duration-500 bg-card"
                >
                  <item.icon
                    size={28}
                    className="text-primary mb-6"
                    strokeWidth={1}
                  />

                  <h3 className="font-display text-2xl text-foreground mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}