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
    <div>

      <h1>{title}</h1>

      {description && (
        <p>{description}</p>
      )}

      <div className="calculator">
        {children}
      </div>

    </div>
  );
}