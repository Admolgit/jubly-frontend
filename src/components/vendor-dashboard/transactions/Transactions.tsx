/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronDown,
  Download,
  CalendarDays,
  Check,
  Clock3,
  X,
  Landmark,
  CheckCircle2,
} from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  useExportTransactionsCSVMutation,
  useGetTransactionDashStatsQuery,
  useGetTransactionHistoryByVendorQuery,
  useRefundClientTransactionMutation,
} from '../../../features/transactions/transactionAPI';
import Loader from '../../ui/Loader';
import { formatDate } from '../../utils/dateFormatter';
import { formatTimeFromISO } from '../../utils/timeFormatter';
import SelectLimit from '../../utils/selectLimit';
import Pagination from '../../utils/pagination';
import { LinkActions } from '../../ui/LinkActions';
import BookingSearch from '../booking/BookingSearch';
import toast from 'react-hot-toast';
import Modal from '../../ui/Modal';
import TransactionViewModal from './TransactionViewModal';
import Dialog from '../../ui/Dialog';

const DEFAULT_ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = [
  { label: 'All Status', value: '' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Failed', value: 'FAILED' },
  { label: 'Refund Pending', value: 'REFUND_PENDING' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

const PAYMENT_METHOD_OPTIONS = [
  { label: 'All Methods', value: '' },
  { label: 'Card', value: 'card' },
  { label: 'Bank', value: 'bank' },
  { label: 'Bank Transfer', value: 'bank_transfer' },
  { label: 'USSD', value: 'ussd' },
  { label: 'QR', value: 'qr' },
  { label: 'Mobile Money', value: 'mobile_money' },
  { label: 'EFT', value: 'eft' },
];

export default function TransactionsPage() {
  const vendor = useSelector(
    (state: { vendor: { vendor: { id: string } } }) => state.vendor.vendor,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [searchFilter, setSearchFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedView, setSelectedView] = useState(null);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const [statusFilterValue, setStatusFilterValue] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [draftStartDate, setDraftStartDate] = useState('');
  const [draftEndDate, setDraftEndDate] = useState('');
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const dateFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateFilterRef.current &&
        !dateFilterRef.current.contains(event.target as Node)
      ) {
        setIsDateFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenDateFilter = () => {
    setDraftStartDate(startDate);
    setDraftEndDate(endDate);
    setIsDateFilterOpen((prev) => !prev);
  };

  const applyDateFilter = () => {
    setStartDate(draftStartDate);
    setEndDate(draftEndDate);
    setCurrentPage(1);
    setIsDateFilterOpen(false);
  };

  const clearDateFilter = () => {
    setDraftStartDate('');
    setDraftEndDate('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
    setIsDateFilterOpen(false);
  };

  console.log(setSearchFilter);

  const { data: transactionsList, isLoading } =
    useGetTransactionHistoryByVendorQuery(
      {
        vendorId: vendor?.id,
        page: currentPage,
        limit: itemsPerPage,
        search: searchValue,
        status: statusFilterValue,
        paymentMethod: paymentMethodFilter,
        startDate,
        endDate,
      },
      {
        skip: !vendor?.id,
      },
    );
  const { data: transactionDashStats, isLoading: statsLoading } =
    useGetTransactionDashStatsQuery({});

  const transactions = transactionsList?.data?.transactions || [];

  const statusStyles: any = {
    CONFIRMED: {
      wrapper: 'bg-green-100 text-green-700',
      icon: 'fill-green-600 text-white',
    },
    PENDING: {
      wrapper: 'bg-blue-100 text-blue-600',
      icon: 'text-blue-500',
    },
    COMPLETED: {
      wrapper: 'bg-grey-100 text-grey-700',
      dot: 'bg-grey-500',
    },
    FAILED: {
      wrapper: 'bg-red-100 text-red-600',
      icon: 'text-red-500',
    },
    REFUND_PENDING: {
      wrapper: 'bg-orange-100 text-orange-600',
      icon: 'text-orange-500',
    },
    CANCELLED: {
      wrapper: 'bg-red-100 text-red-700',
      dot: 'bg-red-500',
    },
  };

  const totalPages = Math.ceil(transactionsList?.meta?.total / itemsPerPage);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setStatusFilterValue(e.target.value);
    setCurrentPage(1);
  };

  const handlePaymentMethodFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPaymentMethodFilter(e.target.value);
    setCurrentPage(1);
  };

  const [exportTransactionsCSV, { isLoading: isExporting }] =
    useExportTransactionsCSVMutation();
  const [refundClientTransaction, { isLoading: isRefunding }] =
    useRefundClientTransactionMutation();

  const handleExportTransactions = async () => {
    try {
      const blob = await exportTransactionsCSV({}).unwrap();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;

      link.setAttribute('download', `transactions-${Date.now()}.csv`);

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success('Transactions exported successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to export transactions');
    }
  };

  const openRefundTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setOpenRefund(true);
  };

  const handleRefund = async () => {
    try {
      const payload = {
        providerRef: selectedTransaction?.providerRef,
        bookingId: selectedTransaction?.bookingId,
        amount: selectedTransaction?.amount,
      };
      await refundClientTransaction(payload).unwrap();
      toast.success('Refund initiated successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to refund transactions');
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(searchFilter.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilter]);

  if (isLoading || statsLoading) {
    return <Loader />;
  }

  return (
    <div className='py-4'>
      <div className='flex items-start justify-between mb-10'>
        <div>
          <h1 className='text-2xl font-semibold'>Transactions</h1>

          <p className='text-sm text-gray-500'>
            View and track all your payout transactions.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10'>
        <StatCard
          title='Total Payouts'
          value={Number(transactionDashStats?.totalPayouts).toLocaleString()}
          icon={<Download className='w-5 h-5' />}
          color='purple'
          change={`${transactionDashStats?.totalGrowth}% from last month`}
        />
        <StatCard
          title='Completed'
          value={Number(transactionDashStats?.completed).toLocaleString()}
          icon={<Check className='w-5 h-5' />}
          color='green'
          change={`${transactionDashStats?.completedGrowth}% from last month`}
        />
        <StatCard
          title='Processing'
          value={Number(transactionDashStats?.processing).toLocaleString()}
          icon={<Clock3 className='w-5 h-5' />}
          color='blue'
          change={`${transactionDashStats?.processingGrowth}% from last month`}
        />
        <StatCard
          title='Failed'
          value={Number(transactionDashStats?.failed).toLocaleString()}
          icon={<X className='w-5 h-5' />}
          color='orange'
          change={`${transactionDashStats?.failedGrowth}% from last month`}
        />
      </div>

      {/* FILTERS */}
      <div className='sm:flex sm:items-center sm:justify-between xl:flex xl:justify-between mb-6 rounded-2xl bg-white p-4 shadow-sm mt-6'>
        <div className='flex items-center gap-4 mb-4 sm:mb-0 xl:mb-0'>
          <div className='relative' ref={dateFilterRef}>
            <button
              type='button'
              onClick={handleOpenDateFilter}
              className='h-12 px-5 bg-white border border-[#EAECF0] rounded-2xl flex items-center gap-2 text-sm font-medium text-[#344054]'
            >
              <CalendarDays size={20} />
              {startDate && endDate
                ? `${startDate} – ${endDate}`
                : 'Select date range'}
              <ChevronDown size={18} />
            </button>

            {isDateFilterOpen && (
              <div className='absolute z-10 mt-2 w-72 rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-lg'>
                <div className='flex flex-col gap-3'>
                  <label className='text-xs font-medium text-[#667085]'>
                    Start date
                    <input
                      type='date'
                      value={draftStartDate}
                      max={draftEndDate || undefined}
                      onChange={(e) => setDraftStartDate(e.target.value)}
                      className='mt-1 w-full rounded-xl border border-[#EAECF0] px-3 py-2 text-sm text-[#344054]'
                    />
                  </label>

                  <label className='text-xs font-medium text-[#667085]'>
                    End date
                    <input
                      type='date'
                      value={draftEndDate}
                      min={draftStartDate || undefined}
                      onChange={(e) => setDraftEndDate(e.target.value)}
                      className='mt-1 w-full rounded-xl border border-[#EAECF0] px-3 py-2 text-sm text-[#344054]'
                    />
                  </label>
                </div>

                <div className='mt-4 flex items-center justify-between'>
                  <button
                    type='button'
                    onClick={clearDateFilter}
                    className='text-sm font-medium text-[#667085] hover:text-[#344054]'
                  >
                    Clear
                  </button>

                  <button
                    type='button'
                    onClick={applyDateFilter}
                    className='rounded-xl bg-[#6D4AFF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5c3ce6]'
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className='relative h-12'>
            <select
              value={statusFilterValue}
              onChange={handleStatusFilterChange}
              className='h-12 pl-5 pr-10 bg-white border border-[#EAECF0] rounded-2xl appearance-none text-sm font-medium text-[#344054] cursor-pointer'
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#344054]'
            />
          </div>

          <div className='relative h-12'>
            <select
              value={paymentMethodFilter}
              onChange={handlePaymentMethodFilterChange}
              className='h-12 pl-5 pr-10 bg-white border border-[#EAECF0] rounded-2xl appearance-none text-sm font-medium text-[#344054] cursor-pointer'
            >
              {PAYMENT_METHOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#344054]'
            />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <BookingSearch value={searchValue} setSearchFilter={setSearchValue} />

          {/* EXPORT */}
          <button
            type='button'
            className='h-12 px-6 rounded-2xl border border-[#C7BFFF] text-[#6D4AFF] font-semibold text-sm flex items-center gap-3 hover:bg-[#f7f5ff] transition'
            onClick={handleExportTransactions}
            disabled={isExporting}
          >
            <Download size={18} />
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className='mt-4 w-full'>
        <div className='overflow-x-auto scrollbar-thin'>
          <table className='min-w-[700px] w-full text-left rounded-xl border border-gray-200 text-sm'>
            <thead className='text-md bg-gray-50 text-gray-500 uppercase tracking-wider'>
              <tr>
                {[
                  'Client',
                  'Date',
                  'Description',
                  'Amount',
                  'Status',
                  'Method',
                  'Reference',
                  'Actions',
                ].map((head) => (
                  <th
                    key={head}
                    className='px-6 py-4 text-left text-xs font-semibold text-[#667085]'
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {transactions?.map((item: any, i: number) => (
                <tr
                  key={`${i}-${item?.providerRef}`}
                  className='border-b border-[#EAECF0] last:border-none hover:bg-[#FAFAFB] transition'
                >
                  <td className='px-6 py-4'>
                    {item?.senderDetails?.senderName}
                  </td>

                  <td className='px-6 py-4'>
                    <div className='text-sm font-medium text-[#101828] mb-1'>
                      {formatDate(item?.createdAt)}
                    </div>

                    <div className='text-xs text-[#667085] font-medium'>
                      {formatTimeFromISO(item?.createdAt)}
                    </div>
                  </td>

                  <td className='px-6 py-4'>
                    <div className='text-sm font-semibold text-[#101828] mb-1'>
                      {item?.senderDetails?.senderDescription}
                    </div>

                    <div className='text-xs text-[#667085] font-medium'>
                      {item?.bank || 'N/A'}
                    </div>
                  </td>

                  <td className='px-6 py-4 text-sm font-semibold text-[#101828]'>
                    ₦{Number(item?.amount).toLocaleString()}
                  </td>

                  <td className='px-6 py-4'>
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold ${
                        statusStyles[item?.status]?.wrapper
                      }`}
                    >
                      {item?.status === 'CONFIRMED' && (
                        <CheckCircle2
                          size={14}
                          className={statusStyles[item?.status]?.icon}
                        />
                      )}

                      {item?.status === 'PENDING' && (
                        <Clock3
                          size={14}
                          className={statusStyles[item?.status]?.icon}
                        />
                      )}

                      {item?.status === 'FAILED' && (
                        <Clock3
                          size={14}
                          className={statusStyles[item?.status]?.icon}
                        />
                      )}
                      {item?.status === 'CANCELLED' && (
                        <X
                          size={14}
                          className={statusStyles[item?.status]?.icon}
                        />
                      )}

                      {item?.status}
                    </div>
                  </td>

                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3 text-sm font-medium text-[#344054]'>
                      <Landmark size={18} />
                      {item?.method || 'N/A'}
                    </div>
                  </td>

                  <td className='px-6 py-4 text-sm font-medium text-[#475467]'>
                    {item?.providerRef}
                  </td>

                  <td className='px-6 py-4'>
                    <LinkActions
                      setSelectedView={setSelectedView}
                      link={item}
                      component='transaction'
                      setViewVendorOpen={setOpenTransaction}
                      onReschedule={openRefundTransaction}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length > 0 && (
            <div className='mt-4 px-6 flex items-center align-center justify-between'>
              <SelectLimit
                ITEMS_OPTIONS={[5, 10, 20, 50]}
                itemsPerPage={itemsPerPage}
                handleItemsChange={handleItemsChange}
                text='Transactions'
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        open={openTransaction}
        onClose={() => setOpenTransaction(false)}
        title='Transaction Details'
        size='lg'
      >
        <TransactionViewModal
          transaction={selectedView}
          onClose={() => setOpenTransaction(false)}
        />
      </Modal>
      <Modal
        open={openRefund}
        onClose={() => setOpenRefund(false)}
        title='Refund Transaction'
        size='md'
      >
        <Dialog
          setCancelOpen={setOpenRefund}
          cancelLoading={isRefunding}
          handleCancel={() => handleRefund()}
          headerText='Are you sure you want to refund this transaction? This action cannot be undone.'
          btnCancelText='No, keep it'
          btnKeepText='Yes, refund'
        />
      </Modal>
    </div>
  );
}
