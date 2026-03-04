import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whatdayisit.now"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5866549959429332"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="bg-white text-neutral-900 antialiased flex flex-col min-h-screen">

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T4W5TE4EFN"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T4W5TE4EFN');
          `}
        </Script>

        <div className="flex-grow">
          {children}
        </div>

        <footer className="border-t mt-16 py-8 text-sm text-neutral-600">
          <div className="max-w-4xl mx-auto px-6 flex flex-wrap gap-6 justify-center">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>

          <div className="text-center mt-4 text-xs text-neutral-500">
            © {new Date().getFullYear()} WhatDayIsIt.now
          </div>
        </footer>

      </body>
    </html>
  );
}