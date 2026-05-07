import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — One Oak | Castle Rock, CO" },
      { name: "description", content: "Get in touch with One Oak to learn about available luxury homesites in Castle Rock, Colorado." },
      { property: "og:title", content: "Contact — One Oak" },
      { property: "og:description", content: "Inquire about luxury homesites in Castle Rock, CO." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              label="Get in Touch"
              title="Contact Us"
              description="We'd love to hear from you. Reach out to learn more about available lots at One Oak."
            />
          </div>
        </section>

        <section className="px-6 pb-32">
          <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-10"
            >
              <div>
                <h3 className="font-display text-2xl text-foreground mb-6">Visit One Oak</h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, text: "Castle Rock, Colorado 80108" },
                    { icon: Mail, text: "info@oneoakcommunity.com" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-4">
                      <item.icon size={20} className="text-primary" strokeWidth={1.5} />
                      <span className="text-foreground/80">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-3">Sales Office Hours</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Monday – Friday: 10am – 5pm<br />
                  Saturday/Sunday: By appointment
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {submitted ? (
                <div className="p-10 border border-primary/30 rounded-sm text-center">
                  <h3 className="font-display text-2xl text-foreground">Thank You</h3>
                  <p className="mt-3 text-muted-foreground">We'll be in touch shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  {[
                    { name: "name", label: "Full Name", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "phone", label: "Phone", type: "tel" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        className="w-full bg-transparent border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full bg-transparent border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-sm text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors"
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
