export const bookingStatusHelper = (status: string) => {
  if (status === 'COMPLETION_PENDING_APPROVAL') {
    return 'Awaiting client approval';
  } else if (status === 'RESCHEDULE_REQUESTED') {
    return 'Reschedule requested';
  } else if (status === 'CANCELLED_BY_CLIENT') {
    return 'Cancelled by client';
  } else if (status === 'CANCELLED_BY_VENDOR') {
    return 'Cancelled by vendor';
  } else if (status === 'CANCELLED') {
    return 'Cancelled';
  } else if (status === 'CONFIRMED') {
    return 'Confirmed';
  } else if (status === 'COMPLETED') {
    return 'Completed';
  } else {
    return status;
  }
};
