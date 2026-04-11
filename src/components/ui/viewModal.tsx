/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "../utils/dateFormatter";
import { formatTimeFromISO } from "../utils/timeFormatter";
import Modal from "./Modal";

function ViewModal({
  setViewVendorOpen,
  viewVendorOpen,
  booking,
}: any) {
  console.log({ booking })
  return (
    <>
      <Modal
        open={viewVendorOpen}
        onClose={() => setViewVendorOpen(false)}
        title="Booking Details"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              Service: {booking?.services?.name}
            </h3>
            <p className="text-sm text-gray-500">
              Vendor: {booking?.vendorName}
            </p>
            <p className="text-sm text-gray-500">Date: {formatDate(booking?.date)}</p>
            <p className="text-sm text-gray-500">
              Time: {formatTimeFromISO(booking?.startTime)} -{" "}
              {formatTimeFromISO(booking?.endTime)}
            </p>
            <p className="text-sm text-gray-500">Status: {booking?.status}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ViewModal;
