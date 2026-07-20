import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight, Phone } from "lucide-react"; 

import goddenImg from "@/assets/godden.jpg";
import alpertImg from "@/assets/alpert.jpg";
import maImg from "@/assets/ma.jpg";
import perezImg from "@/assets/perez.jpg";

export const Route = createFileRoute("/builders")({
  head: () => ({
    meta: [
      { title: "Builders & Architects — One Oak" },
      {
        name: "description",
        content:
          "Meet the premier builders and architects behind One Oak's luxury homes in Castle Rock, Colorado.",
      },
      { property: "og:title", content: "Builders & Architects — One Oak" },
      {
        property: "og:description",
        content:
          "Premier builders and architects crafting luxury homes in Castle Rock, CO.",
      },
    ],
  }),
  component: BuildersPage,
});

type Partner = {
  name: string;
  specialty: string;
  description: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  img?: string;
};

const builders: Partner[] = [
  {
    name: "Alpert Custom Homes",
    specialty: "Bespoke Luxury Construction",
    description:
      "Alpert Custom Homes brings decades of craftsmanship to every project, delivering meticulously built residences defined by precision, premium materials, and timeless detail.",
    website: "https://www.alperthomes.com",
    img: alpertImg,
  },
  {
    name: "Builder Partner — Coming Soon",
    specialty: "Modern Mountain Architecture",
    description:
      "A second distinguished builder partner will be announced for the One Oak community.",
  },
];

const architects: Partner[] = [
  {
    name: "Godden | Sudik",
    specialty: "Award-Winning Residential Design",
    description:
      "For over 26 years, Godden | Sudik Architects has been creating innovative, livable spaces that enrich communities.",
    website: "https://goddensudik.com",
    linkedin: "https://linkedin.com/company/godden-sudik-architects",
    img: goddenImg,
  },
  {
    name: "Michael Perez Architects",
    specialty: "Boutique Luxury Residential",
    description:
      "Known for award-winning luxury residential designs combining innovation and craftsmanship.",
      website: "https://mparchitect.com",
    img: perezImg,
  },
  {
    name: "M-A Architects",
    specialty: "Custom Residential & Commercial",
    description:
      "Led by John Matthews, M-A Architects delivers award-winning residential and commercial design work across Colorado.",
    website: "https://maarchitects.co",
    img: maImg,
  },
];

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  // Only show the bottom contact area if there is a phone number
  const hasPhone = !!partner.phone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group flex flex-col sm:flex-row gap-8 p-8 border border-border rounded-sm bg-card hover:border-primary/30 transition-all duration-500"
    >
      <div className="w-full h-64 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden rounded-sm bg-muted flex items-center justify-center mx-auto">
        {partner.img ? (
          <img
            src={partner.img}
            alt={partner.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[10px] uppercase text-muted-foreground">
            Coming Soon
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center text-center sm:items-start sm:text-left">
        <span className="text-xs tracking-widest uppercase text-primary">
          {partner.specialty}
        </span>

        <h3 className="font-display text-2xl text-foreground mt-2">
          {partner.name}
        </h3>

        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
          {partner.description}
        </p>

        {/* Keeping only the main Visit Website button */}
        {partner.website && (
          <a
            href={partner.website}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center text-xs tracking-widest uppercase text-primary hover:text-foreground transition-colors"
          >
            Visit Website <ArrowRight size={14} className="ml-2" />
          </a>
        )}

        {/* Removed LinkedIn, Email, and Globe Website icons */}
        {hasPhone && (
          <div className="mt-6 pt-4 flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border/50 w-full justify-center sm:justify-start">
            <a href={`tel:${partner.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={14} /> Call
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function BuildersPage() {
  return (
    <>
      <Header />

      <main className="pt-24">
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading
              label=""
              title="Builders & Architects"
              description="One Oak is shaped by Colorado’s most distinguished builders and architects, offering the opportunity to create a fully custom home or draw inspiration from thoughtfully designed residences crafted exclusively for the community."
            />
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl mb-8">Builders</h2>
              <div className="space-y-6">
                {builders.map((b, i) => (
                  <PartnerCard key={b.name} partner={b} index={i} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl mb-8">Architects</h2>
              <div className="space-y-6">
                {architects.map((a, i) => (
                  <PartnerCard key={a.name} partner={a} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-32 text-center">
          <div className="mx-auto max-w-4xl">
            <h3 className="font-display text-3xl">Interested in Building?</h3>
            <p className="mt-4 text-muted-foreground">
              Connect with our team to learn more about available homesites.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 text-sm tracking-widest uppercase text-primary hover:text-foreground"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}