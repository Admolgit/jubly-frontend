/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../ui/Modal";

export default function ConfirmationModal({
  setCancelOpen,
  cancelOpen,
  message,
  onSubmit,
  onSubmitLoading,
  btnText,
  btnTextLoading,
}: any) {
  return (
    <div>
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Cancel Booking"
      >
        <div className="space-y-4">
          <p className="text-md text-gray-600">{message}</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCancelOpen(false)}
              className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50"
            >
              Cancel
            </button>
            <button
              className="rounded-[10px] border border-[#D0D5DD] px-4 py-2 text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm transition hover:opacity-90"
              onClick={onSubmit}
              disabled={onSubmitLoading}
            >
              {onSubmitLoading ? btnTextLoading : btnText}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
