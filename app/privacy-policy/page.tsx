import Breadcrumbs from "@/components/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="page">
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
      />

      <div className="page-header">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-intro">
          This page explains how data is handled when using this website.
        </p>
      </div>

      <section className="page-section">
        <h2>Data collection</h2>
        <p>
          This site does not collect personal data unless voluntarily provided
          via forms.
        </p>
      </section>

      <section className="page-section">
        <h2>Cookies</h2>
        <p>Cookies may be used for analytics and improving user experience.</p>
      </section>

      <section className="page-section">
        <h2>Third-party services</h2>
        <p>
          Advertising and analytics providers may use cookies to deliver
          relevant content.
        </p>
      </section>
    </div>
  );
}
