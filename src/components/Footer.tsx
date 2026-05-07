import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h3 className="font-display text-2xl tracking-[0.2em] uppercase text-foreground">
              One Oak
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              A luxury community nestled in the foothills of Castle Rock, Colorado.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Navigate
              </span>

              <Link
                to="/location"
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Location
              </Link>

              <Link
                to="/architecture"
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Architecture
              </Link>

              <Link
                to="/builders"
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Builders & Architects
              </Link>

              <Link
                to="/contact"
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Contact
              </Link>

              <Link
                to="/privacy"
                className="text-sm text-foreground/50 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} One Oak Community. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}