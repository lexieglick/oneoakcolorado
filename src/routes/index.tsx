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
        <section className="relative h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={home2}
              alt="One Oak luxury home exterior"
              className="h-full w-full object-cover object-bottom md:object-center"
            />

            {/* TOP SCRIM FOR TITLE, BOTTOM SCRIM FOR LINK OVER THE GRASS */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-start pt-48 md:pt-48 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-sm md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-white/80 mb-2 md:mb-2 block">
                Castle Rock, Colorado
              </span>

              <h1 className="font-display text-7xl md:text-8xl lg:text-9xl tracking-tight text-white">
                One Oak
              </h1>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-12 md:pb-16 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/architecture"
                className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-white hover:text-primary transition-colors duration-300"
              >
                Explore Our Architecture <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-20 md:py-32 px-6">
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
              className="relative aspect-square sm:aspect-video md:aspect-[21/9] overflow-hidden rounded-sm"
            >
              <img
                src={home1}
                alt="One Oak luxury residence at dusk"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent md:bg-gradient-to-r md:from-background/70" />

              <div className="absolute bottom-0 left-0 p-6 md:p-12 flex flex-col items-start text-left">
                <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
                  Featured Home
                </span>

                <h3 className="font-display text-2xl md:text-4xl text-foreground mt-2 max-w-sm md:max-w-xl">
                  Modern Mountain Living
                </h3>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section className="py-20 md:py-32 px-6">
          <div className="mx-auto max-w-7xl grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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
                  className="group block p-6 md:p-8 border border-border rounded-sm hover:border-primary/30 transition-all duration-500 bg-card"
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