import { useState } from "react";

export function CopyDiv({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${window.location.host}/vendor-booking/${text}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 border rounded-xl">
      <span className="text-sm text-gray-600">{`${window.location.host}/vendor-booking/${text}`}</span>

      <button
        onClick={handleCopy}
        className="text-blue-600 text-sm font-medium"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
