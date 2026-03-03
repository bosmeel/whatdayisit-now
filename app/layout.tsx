import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whatdayisit.now"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5866549959429332"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-white text-neutral-900 antialiased flex flex-col min-h-screen">
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