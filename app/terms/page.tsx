import Breadcrumbs from "@/components/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />

      <div className="page-header">
        <h1 className="page-title">Terms of Use</h1>
        <p className="page-intro">
          By using this website, you agree to the following terms.
        </p>
      </div>

      <section className="page-section">
        <h2>Usage</h2>
        <p>
          The tools on this site are provided for general informational
          purposes.
        </p>
      </section>

      <section className="page-section">
        <h2>Accuracy</h2>
        <p>
          While calculations are designed to be accurate, no guarantees are
          made.
        </p>
      </section>

      <section className="page-section">
        <h2>Liability</h2>
        <p>
          The site owner is not responsible for any decisions made based on the
          results.
        </p>
      </section>
    </div>
  );
}
