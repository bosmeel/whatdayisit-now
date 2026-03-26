import Breadcrumbs from "@/components/Breadcrumbs";

export default function AboutPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />

      <div className="page-header">
        <h1 className="page-title">About</h1>
        <p className="page-intro">
          WhatDayIsIt.now is a simple and reliable collection of date tools
          designed to give quick answers without distractions.
        </p>
      </div>

      <section className="page-section">
        <h2>Purpose</h2>
        <p>
          The goal of this site is to provide fast, accurate, and easy-to-use
          date calculations.
        </p>
      </section>

      <section className="page-section">
        <h2>How it works</h2>
        <p>
          All tools are based on standard calendar calculations and are designed
          to work consistently across devices.
        </p>
      </section>

      <section className="page-section">
        <h2>Independence</h2>
        <p>
          This website is independently operated and continuously improved based
          on user feedback.
        </p>
      </section>

      <section className="page-section">
        <h2>Contact</h2>
        <p>For questions or feedback, please visit the contact page.</p>
      </section>
    </div>
  );
}
