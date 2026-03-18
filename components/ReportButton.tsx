"use client";

export default function ReportButton() {

  function handleClick() {
    const url = window.location.href;

    const message = encodeURIComponent(
      `Incorrect result on:\n${url}\n\nDescribe the issue:`
    );

    const link = `/contact?type=wrong-calculation&message=${message}`;

    window.location.href = link;
  }

  return (
    <button
      onClick={handleClick}
      className="text-sm text-red-600 underline mt-4 hover:text-red-800"
    >
      Report incorrect result
    </button>
  );
}