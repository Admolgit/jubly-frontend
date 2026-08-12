/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import {
  useCancelBookingMutation,
  useGetBookingsQuery,
  useGetDashboardStartsQuery,
  useGetStatusFilterCountQuery,
  useMarkBookingAsCompletedMutation,
} from '../../../features/booking/bookingApi';
import { formatDate } from '../../utils/dateFormatter';
import Pagination from '../../utils/pagination';
import SelectLimit from '../../utils/selectLimit';
import { formatTimeFromISO } from '../../utils/timeFormatter';
import Loader from '../../ui/Loader';
import { useSelector } from 'react-redux';
// import { useGetTransactionAmountByVendorQuery } from "../../../features/transactions/transactionAPI";
import { CalendarCheck, Check, ChevronDown, ClipboardList, Wallet } from 'lucide-react';
import { LinkActions } from '../../ui/LinkActions';
import toast from 'react-hot-toast';
import Modal from '../../ui/Modal';
import ViewBookingModal from './BookingViewModal';
import RequestRescheduleModal from './RequestRescheduleModal';
import ManageRescheduleModal from './ManageRescheduleModal';
import { StatCard } from '../dashboard/StatCard';
import BookingSearch from './BookingSearch';
import BookingForm from '../BookingCreationForm';
import { useExportBookingsCSVMutation } from '../../../features/vendor/vendorApi';
import Dialog from '../../ui/Dialog';
import {
  getBookingStatusBadge,
  BOOKING_STATUS_TAB_CONFIG,
} from '../../utils/bookingStatus';

const DEFAULT_ITEMS_PER_PAGE = 10;

export function Bookings() {
  const vendor = useSelector(
    (state: { vendor: { vendor: { id: string; businessName: string } } }) =>
      state.vendor.vendor,
  );
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [openMark, setOpenMark] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [manageRescheduleOpen, setManageRescheduleOpen] = useState(false);
  const [viewVendorOpen, setViewVendorOpen] = useState(false);
  const [selectedView, setSelectedView] = useState(null);

  const { data: getBookingsData, isLoading: getBookingsDataLoading } =
    useGetBookingsQuery({
      page: currentPage,
      limit: itemsPerPage,
      status: statusFilter === 'ALL' ? '' : statusFilter?.toUpperCase(),
      dateFilter: undefined,
      search: searchValue || undefined,
      date: undefined,
    });
  const { data: dashboardStats, isLoading: dashboardStatsLoading } =
    useGetDashboardStartsQuery(vendor?.id, {
      skip: !vendor?.id,
    });
  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();
  const [markBookingAsCompleted, { isLoading: markingLoading }] =
    useMarkBookingAsCompletedMutation();
  const { data: statusFilterData } = useGetStatusFilterCountQuery({});

  const statusOptions = [
    {
      label: 'All',
      value: 'ALL',
      style: 'bg-blue-50 text-blue-700',
      count: statusFilterData?.data?.all,
    },
    {
      label: 'Upcoming',
      value: 'PENDING',
      style: 'bg-amber-100 text-amber-700',
      count: statusFilterData?.data?.pending,
    },
    {
      label: 'Confirmed',
      value: 'CONFIRMED',
      style: 'bg-green-100 text-green-700',
      count: statusFilterData?.data?.confirmed,
    },
    {
      label: 'Reschedule Requested',
      value: 'RESCHEDULE_REQUESTED',
      style: 'bg-blue-100 text-blue-700',
      count: statusFilterData?.data?.rescheduleRequested ?? 0,
    },
    {
      label: 'Completed',
      value: 'COMPLETED',
      style: 'bg-gray-100 text-gray-600',
      count: statusFilterData?.data?.completed,
    },
    {
      label: 'Cancelled',
      value: 'CANCELLED',
      style: 'bg-red-100 text-red-700',
      count: statusFilterData?.data?.cancelled ?? 0,
    },
    {
      label: 'Cancelled By Vendor',
      value: 'CANCELLED_BY_VENDOR',
      style: 'bg-red-100 text-red-700',
      count: statusFilterData?.data?.cancelled_by_vendor ?? 0,
    },
    {
      label: 'Cancelled By Client',
      value: 'CANCELLED_BY_CLIENT',
      style: 'bg-red-100 text-red-700',
      count: statusFilterData?.data?.cancelled_by_client ?? 0,
    },
  ];

  const totalPages = Math.ceil(getBookingsData?.meta?.total / itemsPerPage);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const openCancel = (booking: any) => {
    setSelectedBooking(booking);
    setCancelReason('');
    setCancelOpen(true);
  };

  const onMarking = (booking: any) => {
    setSelectedBooking(booking);
    setOpenMark(true);
  };

  const openReschedule = (booking: any) => {
    setSelectedBooking(booking);
    setRescheduleOpen(true);
  };

  const openManageReschedule = (booking: any) => {
    setSelectedBooking(booking);
    setManageRescheduleOpen(true);
  };

  const handleCancel = async () => {
    if (!selectedBooking?.id) return;

    try {
      await cancelBooking({
        bookingId: selectedBooking.id,
        reason: cancelReason || undefined,
      }).unwrap();
      toast.success('Booking cancelled successfully');
      setCancelOpen(false);
      setSelectedBooking(null);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleMarkAsCompleted = async () => {
    if (!selectedBooking?.id) return;

    try {
      await markBookingAsCompleted(selectedBooking.id).unwrap();
      toast.success('Booking mark as completed successfully');
      setOpenMark(false);
      setSelectedBooking(null);
    } catch (error: any) {
      if (error?.status === 403) {
        toast.error(error?.data?.message);
      } else {
        toast.error(error?.message || 'Failed to cancel booking');
      }
    }
  };

  const handleCreateBooking = async (data: any) => {
    console.log(data);
  };

  const [exportBookingsCSV, { isLoading: exporting }] =
    useExportBookingsCSVMutation({});

  const handleExportCSV = async () => {
    try {
      const blob = await exportBookingsCSV({}).unwrap();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = url;

      a.download = `${vendor?.businessName
        ?.toLowerCase()
        .replace(/\s+/g, '-')}-bookings-${Date.now()}.csv`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

      toast.success('CSV exported successfully');
    } catch (error: any) {
      console.error('Export CSV error:', error);
      toast.error('Failed to export CSV');
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(searchFilter.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilter]);

  useEffect(() => {
    if (!statusDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setStatusDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [statusDropdownOpen]);

  if (getBookingsDataLoading || dashboardStatsLoading) {
    return <Loader />;
  }

  return (
    <div className='py-4'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Bookings</h1>
          <p className='text-sm text-gray-500'>
            Track upcoming and past appointments.
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <button
            type='button'
            onClick={handleExportCSV}
            className='inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50'
          >
            Export
          </button>
          <button
            type='button'
            onClick={() => setBookingOpen(true)}
            className='rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90'
          >
            {exporting ? 'Exporting...' : '+ New Booking'}
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 mt-6'>
        <StatCard
          title='Total Bookings'
          value={dashboardStats?.data?.bookingCount?.total?.toString() || '0'}
          icon={<ClipboardList className='w-5 h-5' />}
          color='purple'
          change={`${dashboardStats?.data?.bookingCount?.growth}% from last month`}
        />
        <StatCard
          title='Upcoming'
          value={
            dashboardStats?.data?.upcomingBooking?.total?.toString() || '0'
          }
          icon={<CalendarCheck className='w-5 h-5' />}
          color='green'
          change={`${dashboardStats?.data?.upcomingBooking?.growth} this week`}
        />
        <StatCard
          title='This Month Revenue'
          value={`₦${Number(dashboardStats?.data?.earnings?.total)?.toLocaleString()}`}
          isLoadingStats={dashboardStatsLoading}
          icon={<Wallet className='w-5 h-5' />}
          color='orange'
          change={`${dashboardStats?.data?.earnings?.growth}% from last month`}
        />
      </div>
      <div className='rounded-2xl bg-white p-4 shadow-sm mt-6 dark:bg-black'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
          <div className='relative w-full md:w-64' ref={statusDropdownRef}>
            {(() => {
              const selectedOption =
                statusOptions.find((option) => option.value === statusFilter) ??
                statusOptions[0];
              const selectedConfig =
                BOOKING_STATUS_TAB_CONFIG[selectedOption.value] ??
                BOOKING_STATUS_TAB_CONFIG.ALL;

              return (
                <>
                  <button
                    type='button'
                    onClick={() => setStatusDropdownOpen((prev) => !prev)}
                    className='flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:bg-black dark:text-gray-300'
                  >
                    <span className='flex items-center gap-2'>
                      <span className='opacity-90'>{selectedConfig.icon}</span>
                      <span>{selectedOption.label}</span>
                      <span className='ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600'>
                        {selectedOption.count ?? 0}
                      </span>
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {statusDropdownOpen && (
                    <div className='absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg dark:bg-black'>
                      {statusOptions.map((option) => {
                        const isActive = statusFilter === option.value;
                        const config =
                          BOOKING_STATUS_TAB_CONFIG[option.value] ??
                          BOOKING_STATUS_TAB_CONFIG.ALL;

                        return (
                          <button
                            type='button'
                            key={option.value}
                            onClick={() => {
                              setStatusFilter(option.value);
                              setStatusDropdownOpen(false);
                            }}
                            className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition
                              ${isActive ? config.active : 'text-gray-600 hover:bg-gray-50'}
                            `}
                          >
                            <span className='flex items-center gap-2'>
                              <span className='opacity-90'>{config.icon}</span>
                              <span>{option.label}</span>
                            </span>
                            <span className='flex items-center gap-2'>
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${isActive ? 'bg-white/70' : 'bg-gray-100 text-gray-600'}`}
                              >
                                {option.count ?? 0}
                              </span>
                              {isActive && <Check size={16} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
          <BookingSearch
            value={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        </div>

        <div className='mt-4 w-full relative'>
          <div className='overflow-x-auto overflow-y-visible scrollbar-thin'>
            {getBookingsDataLoading ? (
              <Loader />
            ) : (
              <table className='w-full min-w-[700px] text-left rounded-xl border border-gray-200 text-sm relative'>
                <thead className='text-md bg-gray-50 text-gray-500 uppercase tracking-wider'>
                  <tr className='border-b'>
                    <th className='px-3 py-3'>Client</th>
                    <th className='px-3 py-3'>Service</th>
                    <th className='px-3 py-3'>Date</th>
                    <th className='px-3 py-3'>Time</th>
                    <th className='px-3 py-3'>Amount</th>
                    <th className='px-3 py-3'>Status</th>
                    <th className='px-3 py-3'>Action</th>
                  </tr>
                </thead>
                <tbody className='text-md text-gray-700'>
                  {getBookingsData?.data?.map((b: any, index: number) => (
                    <tr
                      key={`${b.id - index}`}
                      className='border-b last:border-b-0'
                    >
                      <td className='px-3 py-4 font-semibold text-gray-900 dark:text-gray-400 flex items-center gap-3'>
                        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-medium'>
                          {b?.clientName?.split(' ')[0]?.charAt(0)}
                          {b?.clientName?.split(' ')[1]?.charAt(0)}
                        </div>
                        {b.clientName || 'Client Name'}
                      </td>
                      <td className='px-3 py-4 text-gray-600 font-semibold'>
                        {b.services?.name}
                      </td>
                      <td className='px-3 py-4 text-gray-600 font-semibold'>
                        {formatDate(b.date, 'DD/MM/YYYY')}
                      </td>
                      <td className='px-3 py-4 text-gray-600 font-semibold'>
                        {formatTimeFromISO(b.startTime as string)}
                      </td>
                      <td className='px-3 py-4 font-semibold text-gray-900 dark:text-gray-400 tracking-tight'>
                        ₦ {Number(b.services?.price)?.toLocaleString()}
                      </td>
                      <td className='px-6 py-4'>
                        {(() => {
                          const badge = getBookingStatusBadge(b.status);
                          const StatusIcon = badge.Icon;
                          return (
                            <div
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${badge.wrapper}`}
                            >
                              <StatusIcon size={14} className={badge.icon} />
                              {b.status}
                            </div>
                          );
                        })()}
                      </td>
                      <td className='px-3 py-4 relative overflow-visible'>
                        <LinkActions
                          link={b}
                          onReschedule={openReschedule}
                          onManageReschedule={openManageReschedule}
                          setViewVendorOpen={setViewVendorOpen}
                          onCancle={openCancel}
                          onMarking={onMarking}
                          setSelectedView={setSelectedView}
                          setOpenMark={setOpenMark}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {getBookingsData?.data?.length > 0 && (
          <div className='mt-4 flex items-center text-sm align-center justify-between'>
            <SelectLimit
              ITEMS_OPTIONS={[5, 10, 20, 50]}
              itemsPerPage={itemsPerPage}
              handleItemsChange={handleItemsChange}
              text='Bookings'
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
      <ViewBookingModal
        open={viewVendorOpen}
        onClose={() => setViewVendorOpen(false)}
        booking={selectedView}
        onCancel={openCancel}
        onMarkComplete={onMarking}
        onReschedule={openReschedule}
        onManageReschedule={openManageReschedule}
      />
      <Modal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title='Create Booking'
      >
        <BookingForm
          setBookingOpen={setBookingOpen}
          handleCreateBooking={handleCreateBooking}
        />
      </Modal>
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title='Cancel Booking'
      >
        <Dialog
          setCancelOpen={setCancelOpen}
          cancelLoading={cancelLoading}
          handleCancel={handleCancel}
          headerText='Are you sure you want to cancel this booking? This action cannot be
            undone.'
          btnCancelText='No, keep it'
          btnKeepText='Yes, cancel'
          showReasonInput
          reason={cancelReason}
          onReasonChange={setCancelReason}
        />
      </Modal>
      <Modal
        open={openMark}
        onClose={() => setOpenMark(false)}
        title='Mark Booking as Complete'
      >
        <Dialog
          setCancelOpen={setOpenMark}
          cancelLoading={markingLoading}
          handleCancel={handleMarkAsCompleted}
          headerText='Are you sure you want to mark this booking as completed? This action
            cannot be undone.'
          btnCancelText='No, keep it'
          btnKeepText='Yes, mark as completed'
        />
      </Modal>
      <RequestRescheduleModal
        open={rescheduleOpen}
        onClose={() => {
          setRescheduleOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
      />
      <ManageRescheduleModal
        open={manageRescheduleOpen}
        onClose={() => {
          setManageRescheduleOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
        currentUserId={user?.id}
      />
    </div>
  );
}
