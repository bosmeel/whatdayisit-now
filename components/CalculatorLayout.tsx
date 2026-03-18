import React from "react";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function CalculatorLayout({
  title,
  description,
  children,
}: Props) {
  return (
    <section className="calc-page">

      {/* HEADER */}
      <div className="calc-header">
        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}
      </div>

      {/* HERO CALCULATOR */}
      <div className="calc-hero">
        {children}
      </div>

    </section>
  );
}