/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  Clock,
  Clock3,
  RefreshCcw,
  X,
  XCircle,
} from "lucide-react";

export const NON_ACTIONABLE_BOOKING_STATUSES = [
  "COMPLETED",
  "CANCELLED",
  "CANCELLED_BY_CLIENT",
  "CANCELLED_BY_VENDOR",
];

export const CANCELLED_BOOKING_STATUSES = [
  "CANCELLED",
  "CANCELLED_BY_CLIENT",
  "CANCELLED_BY_VENDOR",
];

const FALLBACK_BADGE = {
  wrapper: "bg-gray-100 text-gray-600",
  icon: "text-gray-500",
  Icon: Clock3,
};

export const BOOKING_STATUS_BADGE: Record<
  string,
  { wrapper: string; icon: string; Icon: any }
> = {
  PENDING: {
    wrapper: "bg-orange-100 text-orange-600",
    icon: "text-orange-500",
    Icon: Clock3,
  },
  CONFIRMED: {
    wrapper: "bg-green-100 text-green-700",
    icon: "text-green-600",
    Icon: CheckCircle2,
  },
  RESCHEDULE_REQUESTED: {
    wrapper: "bg-blue-100 text-blue-700",
    icon: "text-blue-500",
    Icon: RefreshCcw,
  },
  COMPLETED: {
    wrapper: "bg-gray-100 text-gray-700",
    icon: "text-gray-500",
    Icon: CheckSquare,
  },
  CANCELLED: { wrapper: "bg-red-100 text-red-700", icon: "text-red-500", Icon: X },
  CANCELLED_BY_CLIENT: {
    wrapper: "bg-red-100 text-red-700",
    icon: "text-red-500",
    Icon: X,
  },
  CANCELLED_BY_VENDOR: {
    wrapper: "bg-red-100 text-red-700",
    icon: "text-red-500",
    Icon: X,
  },
};

export const getBookingStatusBadge = (status?: string | null) =>
  (status && BOOKING_STATUS_BADGE[status]) || FALLBACK_BADGE;

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  RESCHEDULE_REQUESTED: "Reschedule Requested",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  CANCELLED_BY_CLIENT: "Cancelled by Client",
  CANCELLED_BY_VENDOR: "Cancelled by Vendor",
};

export const getBookingStatusLabel = (status?: string | null) =>
  (status && BOOKING_STATUS_LABEL[status]) || status || "Unknown";

export const BOOKING_STATUS_TAB_CONFIG: Record<
  string,
  { icon: JSX.Element; active: string }
> = {
  ALL: {
    icon: <Calendar size={16} />,
    active: "bg-blue-50 text-blue-600 border-blue-200",
  },
  PENDING: {
    icon: <Clock size={16} />,
    active: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
  CONFIRMED: {
    icon: <CheckCircle size={16} />,
    active: "bg-green-50 text-green-600 border-green-200",
  },
  RESCHEDULE_REQUESTED: {
    icon: <RefreshCcw size={16} />,
    active: "bg-blue-50 text-blue-600 border-blue-200",
  },
  COMPLETED: {
    icon: <CheckSquare size={16} />,
    active: "bg-gray-50 text-gray-700 border-gray-200",
  },
  CANCELLED: {
    icon: <XCircle size={16} />,
    active: "bg-red-50 text-red-600 border-red-200",
  },
  CANCELLED_BY_CLIENT: {
    icon: <XCircle size={16} />,
    active: "bg-red-50 text-red-600 border-red-200",
  },
  CANCELLED_BY_VENDOR: {
    icon: <XCircle size={16} />,
    active: "bg-red-50 text-red-600 border-red-200",
  },
};
