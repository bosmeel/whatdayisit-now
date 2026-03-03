import Link from "next/link";

export const metadata = {
  title: "Privacy Policy – WhatDayIsIt.now",
  description:
    "Privacy Policy for WhatDayIsIt.now explaining data usage, cookies, and advertising.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <span>Privacy Policy</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-6">
          Privacy Policy
        </h1>

        <div className="prose max-w-none text-neutral-700">

          <p>
            This Privacy Policy describes how WhatDayIsIt.now collects,
            uses, and protects information when you use this website.
          </p>

          <h2>Information we collect</h2>
          <p>
            This website does not require user accounts and does not collect
            personally identifiable information directly from visitors.
          </p>

          <p>
            Standard server logs may record non-personal information such as
            browser type, device type, and general geographic region for
            analytics and security purposes.
          </p>

          <h2>Cookies</h2>
          <p>
            This website may use cookies to improve user experience and
            enable advertising services. Cookies are small text files stored
            on your device by your browser.
          </p>

          <h2>Advertising</h2>
          <p>
            We may use third-party advertising services such as Google AdSense.
            These services may use cookies or similar technologies to serve ads
            based on your visit to this and other websites.
          </p>

          <p>
            Google’s use of advertising cookies enables it and its partners
            to serve ads based on users’ visits to this site and other sites
            on the Internet.
          </p>

          <p>
            Users may opt out of personalized advertising by visiting
            Google Ads Settings.
          </p>

          <h2>Third-party links</h2>
          <p>
            This website may contain links to other websites.
            We are not responsible for the privacy practices of those sites.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            This Privacy Policy may be updated periodically.
            Changes will be posted on this page.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy,
            please visit the <Link href="/contact" className="underline">Contact page</Link>.
          </p>

        </div>
      </div>
    </main>
  );
}