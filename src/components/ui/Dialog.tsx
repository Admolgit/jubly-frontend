import Textarea from "./Textarea";

export default function Dialog({
  setCancelOpen,
  cancelLoading,
  handleCancel,
  headerText,
  btnCancelText,
  btnKeepText,
  showReasonInput,
  reason,
  onReasonChange,
  reasonLabel = "Reason (optional)",
}: {
  setCancelOpen: (open: boolean) => void;
  cancelLoading: boolean;
  handleCancel: () => void;
  headerText: string;
  btnCancelText: string;
  btnKeepText: string;
  showReasonInput?: boolean;
  reason?: string;
  onReasonChange?: (value: string) => void;
  reasonLabel?: string;
}) {
  return (
    <div className="space-y-6">
      <p className="text-md text-gray-600">{headerText}</p>
      {showReasonInput && (
        <Textarea
          label={reasonLabel}
          value={reason}
          onChange={(e) => onReasonChange?.(e.target.value)}
          placeholder="Let them know why..."
          rows={3}
        />
      )}
      <div className="flex flex-wrap justify-between gap-2">
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50"
          onClick={() => setCancelOpen(false)}
        >
          {btnCancelText}
        </button>
        <button
          className="rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          onClick={handleCancel}
          disabled={cancelLoading}
        >
          {cancelLoading ? "Submitting..." : btnKeepText}
        </button>
      </div>
    </div>
  );
}
