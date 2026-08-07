/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Clock3 } from "lucide-react";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { formatDate } from "../../utils/dateFormatter";
import { formatTimeFromISO } from "../../utils/timeFormatter";
import {
  useGetRescheduleHistoryQuery,
  useAcceptRescheduleMutation,
  useRejectRescheduleMutation,
  useCounterProposeRescheduleMutation,
} from "../../../features/booking/bookingApi";

type Props = {
  open: boolean;
  onClose: () => void;
  booking: any;
  currentUserId?: string;
};

const RESCHEDULE_STATUS_LABEL: Record<string, string> = {
  PENDING: "Awaiting response",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  COUNTER_PROPOSED: "Countered",
};

export default function ManageRescheduleModal({
  open,
  onClose,
  booking,
  currentUserId,
}: Props) {
  const [reason, setReason] = useState("");
  const [counterOpen, setCounterOpen] = useState(false);
  const [counterDate, setCounterDate] = useState("");
  const [counterTime, setCounterTime] = useState("");
  const [counterReason, setCounterReason] = useState("");

  const { data: historyData, isLoading: historyLoading } =
    useGetRescheduleHistoryQuery(booking?.id, {
      skip: !open || !booking?.id,
    });

  const [acceptReschedule, { isLoading: accepting }] =
    useAcceptRescheduleMutation();
  const [rejectReschedule, { isLoading: rejecting }] =
    useRejectRescheduleMutation();
  const [counterProposeReschedule, { isLoading: countering }] =
    useCounterProposeRescheduleMutation();

  useEffect(() => {
    if (!open) return;
    setReason("");
    setCounterOpen(false);
    setCounterReason("");
    setCounterDate(booking?.date ? booking.date.split("T")[0] : "");
    setCounterTime(
      booking?.startTime
        ? new Date(booking.startTime).toISOString().slice(11, 16)
        : "",
    );
  }, [open, booking]);

  const history = historyData?.data ?? [];
  const active = history.find((r: any) => r.status === "PENDING");
  const isInitiator = active && active.initiatedBy === currentUserId;
  const pastHistory = history.filter((r: any) => r.id !== active?.id);

  const handleAccept = async () => {
    if (!booking?.id) return;

    try {
      await acceptReschedule({
        bookingId: booking.id,
        reason: reason || undefined,
      }).unwrap();
      toast.success("Reschedule accepted successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to accept reschedule");
    }
  };

  const handleReject = async () => {
    if (!booking?.id) return;

    try {
      await rejectReschedule({
        bookingId: booking.id,
        reason: reason || undefined,
      }).unwrap();
      toast.success("Reschedule rejected successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject reschedule");
    }
  };

  const handleCounterPropose = async () => {
    if (!booking?.id || !counterDate || !counterTime) {
      toast.error("Please select a date and time");
      return;
    }

    const proposedDate = new Date(`${counterDate}T${counterTime}`).toISOString();

    try {
      await counterProposeReschedule({
        bookingId: booking.id,
        proposedDate,
        reason: counterReason || undefined,
      }).unwrap();
      toast.success("Counter-proposal submitted successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit counter-proposal");
    }
  };

  const isBusy = accepting || rejecting || countering;

  return (
    <Modal open={open} onClose={onClose} title="Manage Reschedule Request">
      {historyLoading ? (
        <p className="text-sm text-gray-500">Loading reschedule details...</p>
      ) : !active ? (
        <div className="space-y-4">
          <p className="text-md text-gray-600">
            There's no active reschedule request on this booking anymore.
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Clock3 size={16} />
              <p className="text-sm font-semibold">
                Proposed: {formatDate(active.proposedDate)} at{" "}
                {formatTimeFromISO(active.proposedDate)}
              </p>
            </div>
            {active.reason && (
              <p className="mt-2 text-sm text-blue-700">"{active.reason}"</p>
            )}
          </div>

          {isInitiator ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Waiting for the other party to respond to your reschedule
                request.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          ) : counterOpen ? (
            <div className="space-y-3 rounded-2xl border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-900">
                Propose a different time
              </p>
              <Input
                label="Proposed Date"
                type="date"
                value={counterDate}
                onChange={(e) => setCounterDate(e.target.value)}
                className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
              />
              <Input
                label="Proposed Time"
                type="time"
                value={counterTime}
                onChange={(e) => setCounterTime(e.target.value)}
                className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
              />
              <Textarea
                label="Reason (optional)"
                value={counterReason}
                onChange={(e) => setCounterReason(e.target.value)}
                rows={3}
              />
              <div className="flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setCounterOpen(false)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
                  onClick={handleCounterPropose}
                  disabled={!counterDate || !counterTime || countering}
                >
                  {countering ? "Submitting..." : "Submit Counter-Proposal"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Textarea
                label="Reason (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Add a note for your response..."
                rows={3}
              />
              <div className="flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:opacity-60"
                  onClick={handleReject}
                  disabled={isBusy}
                >
                  {rejecting ? "Rejecting..." : "Reject"}
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50 disabled:opacity-60"
                  onClick={() => setCounterOpen(true)}
                  disabled={isBusy}
                >
                  Counter-Propose
                </button>
                <button
                  type="button"
                  className="rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
                  onClick={handleAccept}
                  disabled={isBusy}
                >
                  {accepting ? "Accepting..." : "Accept"}
                </button>
              </div>
            </div>
          )}

          {pastHistory.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Reschedule History
              </p>
              <div className="space-y-2">
                {pastHistory.map((r: any) => (
                  <div
                    key={r.id}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">
                        {formatDate(r.proposedDate)} at{" "}
                        {formatTimeFromISO(r.proposedDate)}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        {RESCHEDULE_STATUS_LABEL[r.status] || r.status}
                      </span>
                    </div>
                    {r.reason && (
                      <p className="mt-1 text-xs text-gray-500">"{r.reason}"</p>
                    )}
                    {r.responseReason && (
                      <p className="mt-1 text-xs text-gray-500">
                        Response: "{r.responseReason}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
