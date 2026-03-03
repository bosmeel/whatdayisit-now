import Link from "next/link";

export const metadata = {
  title: "Terms of Use – WhatDayIsIt.now",
  description:
    "Terms of Use for WhatDayIsIt.now explaining conditions for using this website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <span>Terms of Use</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-6">
          Terms of Use
        </h1>

        <div className="prose max-w-none text-neutral-700">

          <p>
            By accessing and using WhatDayIsIt.now, you agree to the
            following terms and conditions.
          </p>

          <h2>Use of the website</h2>
          <p>
            This website provides informational tools related to dates,
            calendars, week numbers, and countdown calculations.
            The content is provided for general informational purposes only.
          </p>

          <h2>No guarantees</h2>
          <p>
            While we aim to ensure accuracy, we do not guarantee that all
            calculations or information are free from errors. Users are
            responsible for verifying critical date-related information.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            WhatDayIsIt.now shall not be held liable for any loss or damages
            resulting from the use of this website.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All content on this website, including text and design,
            is protected by applicable intellectual property laws.
            Content may not be copied or redistributed without permission.
          </p>

          <h2>External links</h2>
          <p>
            This website may contain links to external websites.
            We are not responsible for the content or policies of third-party sites.
          </p>

          <h2>Changes</h2>
          <p>
            These terms may be updated at any time.
            Continued use of the website constitutes acceptance of any changes.
          </p>

          <h2>Contact</h2>
          <p>
            For questions regarding these terms, please visit the{" "}
            <Link href="/contact" className="underline">Contact page</Link>.
          </p>

        </div>
      </div>
    </main>
  );
}