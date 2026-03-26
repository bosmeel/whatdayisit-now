import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

      <div className="page-header">
        <h1 className="page-title">Contact</h1>
        <p className="page-intro">
          Have a question, found an issue, or want to get in touch? Use the form
          below.
        </p>
      </div>

      <section className="page-section">
        <h2>Feedback and corrections</h2>

        <p>If you notice an issue, please include:</p>

        <ul className="page-list">
          <li>The page URL</li>
          <li>The dates or inputs used</li>
          <li>A short explanation</li>
        </ul>
      </section>

      <section className="page-section">
        <h2>Suggestions</h2>
        <p>Ideas for improvements or new tools are always welcome.</p>
      </section>

      <section className="page-section">
        <h2>Advertising</h2>
        <p>
          For partnerships or advertising inquiries, include relevant details.
        </p>
      </section>

      <section className="page-section">
        <h2>Response time</h2>
        <p>Messages are reviewed regularly.</p>
      </section>

      {/* 🔥 FIX: form ook section */}
      <section className="page-section">
        <h2>Send a message</h2>
        <ContactForm />
      </section>
    </div>
  );
}
