import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 text-sm leading-relaxed text-foreground">
      <h1 className="text-2xl font-display tracking-wide mb-8">
        Disclaimer, Privacy & Cookie Policy – One Oak
      </h1>

      <p className="mb-6">
        At One Oak, we respect your privacy and are committed to protecting the personal information you share with us while providing a transparent and secure experience when you visit our website or communicate with our team. This document explains how we collect, use, disclose, and safeguard your information, as well as how cookies and similar technologies are used on our website. By accessing or using this website, you acknowledge that you have read and agree to the practices described in this Policy.
      </p>

      <p className="mb-6">
        This website is provided strictly for informational and marketing purposes related to One Oak in Colorado. Nothing contained on this website constitutes a binding offer to sell, lease, or otherwise contract for any property. All pricing, availability, floor plans, square footage, designs, features, and specifications are subject to change at any time without notice. Renderings, imagery, and descriptions are conceptual and for illustrative purposes only and may not reflect actual or final conditions. No information on this website should be relied upon as the sole basis for any real estate or purchasing decision, and all transactions, if any, must be confirmed through direct communication with our team.
      </p>

      <p className="mb-6">
        When you interact with our website, we may collect personal information that you voluntarily provide, such as your name, email address, phone number, and any other information you submit through contact forms, inquiries, or direct communication. We also automatically collect technical information such as IP address, browser type, device information, pages viewed, and general usage behavior. This helps us improve website performance and user experience.
      </p>

      <p className="mb-6">
        Our website uses cookies and similar technologies to enhance functionality, analyze traffic, and support marketing. Cookies are small data files stored on your device. Some are required for basic functionality, while others help us understand user behavior. We may use third-party analytics tools such as Google Analytics. These tools collect aggregated, non-identifiable usage data but do not receive your name or email address.
      </p>

      <p className="mb-6">
      To the fullest extent permitted by law, One Oak shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.
      </p>

      <p className="mb-6">
        We use collected information to respond to inquiries, operate and improve the website, and communicate about One Oak. We do not sell your personal information. We may share limited data with trusted third-party service providers who help us operate our website, including analytics, hosting, and email systems, all of whom are required to keep information confidential.
      </p>

      <p className="mb-6">
        We take reasonable security measures to protect your information, but no system is completely secure. We retain data only as long as necessary for business, legal, and operational purposes.
      </p>

      <p className="mb-6">
        Under Colorado law, including the Colorado Privacy Act (CPA), you may have rights to access, correct, delete, or opt out of certain uses of your personal data. One Oak does not sell personal information.
      </p>

      <p className="mb-6">
        This website is intended for individuals 18 years or older. We do not knowingly collect data from children under 13. We are not responsible for third-party websites linked from this site.
      </p>

      <p className="mb-6">
        All content is provided for informational purposes only and may be updated or changed at any time without notice. One Oak disclaims liability for reliance on website content.
      </p>

      <p className="mt-10 text-xs text-muted-foreground">
        Last Updated: April 23, 2026
      </p>

      <p className="mt-6 text-xs text-muted-foreground">
        One Oak <br />
        1201 S Parker Rd #200 <br />
        Denver, CO 80231 <br />
        Contact: Click on “Contact Us”
      </p>
    </div>
  );
}