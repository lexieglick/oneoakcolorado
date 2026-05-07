import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ label, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {label && (
        <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
          {label}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed text-lg mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
