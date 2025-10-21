import { useState, useEffect } from 'react';
import { Package, Car, Stethoscope, Utensils, Search, Filter, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface ManagementPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

interface Booking {
  id: string;
  booking_number: string;
  service_category: string;
  service_type: string;
  customer_name: string;
  total_amount: number;
  payment_status: string;
  booking_status: string;
  created_at: string;
  scheduled_datetime?: string;
}

type ServiceFilter = 'all' | 'transportation' | 'hire' | 'doctor' | 'dinner';
type StatusFilter = 'all' | 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export function ManagementPage({ onNavigate }: ManagementPageProps) {
  const { language } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('unified_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedBookings = (data || []).map((booking: any) => ({
        id: booking.id,
        booking_number: booking.booking_number,
        service_category: booking.service_category,
        service_type: booking.service_type,
        customer_name: booking.booking_data?.customerName || 'N/A',
        total_amount: booking.total_amount,
        payment_status: booking.payment_status,
        booking_status: booking.booking_status,
        created_at: booking.created_at,
        scheduled_datetime: booking.scheduled_datetime,
      }));

      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (serviceCategory: string) => {
    switch (serviceCategory) {
      case 'transportation':
        return <Package className="w-5 h-5" />;
      case 'hire':
        return <Car className="w-5 h-5" />;
      case 'doctor':
        return <Stethoscope className="w-5 h-5" />;
      case 'dinner':
        return <Utensils className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getServiceColor = (serviceCategory: string) => {
    switch (serviceCategory) {
      case 'transportation':
        return 'bg-blue-100 text-blue-700';
      case 'hire':
        return 'bg-green-100 text-green-700';
      case 'doctor':
        return 'bg-red-100 text-red-700';
      case 'dinner':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.booking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService = serviceFilter === 'all' || booking.service_category === serviceFilter;
    const matchesStatus = statusFilter === 'all' || booking.booking_status === statusFilter;

    return matchesSearch && matchesService && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.booking_status === 'pending').length,
    confirmed: bookings.filter(b => b.booking_status === 'confirmed').length,
    inProgress: bookings.filter(b => b.booking_status === 'in_progress').length,
    completed: bookings.filter(b => b.booking_status === 'completed').length,
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('unified_bookings')
        .update({ booking_status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      await fetchBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'ja' ? '予約管理' : 'Order Management'}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'ja' ? '全サービスの予約状況を管理' : 'Manage all service bookings'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {language === 'ja' ? 'ホームへ' : 'Back to Home'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border-2 border-gray-100">
            <p className="text-sm text-gray-600 mb-1">{language === 'ja' ? '合計' : 'Total'}</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-2 border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">{language === 'ja' ? '保留中' : 'Pending'}</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">{language === 'ja' ? '確認済' : 'Confirmed'}</p>
            <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-2 border-orange-200">
            <p className="text-sm text-gray-600 mb-1">{language === 'ja' ? '進行中' : 'In Progress'}</p>
            <p className="text-2xl font-bold text-orange-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-1">{language === 'ja' ? '完了' : 'Completed'}</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={language === 'ja' ? '予約番号または顧客名で検索' : 'Search by booking # or customer'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Service Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value as ServiceFilter)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{language === 'ja' ? '全サービス' : 'All Services'}</option>
                <option value="transportation">{language === 'ja' ? 'ポーター' : 'Porter'}</option>
                <option value="hire">{language === 'ja' ? 'ハイヤー' : 'Hire'}</option>
                <option value="doctor">{language === 'ja' ? 'ドクター' : 'Doctor'}</option>
                <option value="dinner">{language === 'ja' ? 'ディナー' : 'Dinner'}</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{language === 'ja' ? '全ステータス' : 'All Status'}</option>
                <option value="pending">{language === 'ja' ? '保留中' : 'Pending'}</option>
                <option value="confirmed">{language === 'ja' ? '確認済' : 'Confirmed'}</option>
                <option value="in_progress">{language === 'ja' ? '進行中' : 'In Progress'}</option>
                <option value="completed">{language === 'ja' ? '完了' : 'Completed'}</option>
                <option value="cancelled">{language === 'ja' ? 'キャンセル' : 'Cancelled'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">{language === 'ja' ? '読み込み中...' : 'Loading...'}</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{language === 'ja' ? '予約が見つかりません' : 'No bookings found'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ja' ? '予約番号' : 'Booking #'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ja' ? 'サービス' : 'Service'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ja' ? '顧客名' : 'Customer'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ja' ? '金額' : 'Amount'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ja' ? '決済' : 'Payment'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ja' ? 'ステータス' : 'Status'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ja' ? '予約日時' : 'Created'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ja' ? '操作' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{booking.booking_number}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getServiceColor(booking.service_category)}`}>
                          {getServiceIcon(booking.service_category)}
                          {booking.service_type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.customer_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ¥{booking.total_amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          booking.payment_status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.booking_status)}`}>
                          {getStatusIcon(booking.booking_status)}
                          {booking.booking_status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'ja' ? '予約詳細' : 'Booking Details'}
              </h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {language === 'ja' ? '基本情報' : 'Basic Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'ja' ? '予約番号' : 'Booking Number'}</p>
                    <p className="font-semibold text-gray-900">{selectedBooking.booking_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'ja' ? 'サービス' : 'Service'}</p>
                    <p className="font-semibold text-gray-900">{selectedBooking.service_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'ja' ? '顧客名' : 'Customer Name'}</p>
                    <p className="font-semibold text-gray-900">{selectedBooking.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'ja' ? '金額' : 'Amount'}</p>
                    <p className="font-semibold text-gray-900">¥{selectedBooking.total_amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {language === 'ja' ? 'ステータス管理' : 'Status Management'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {language === 'ja' ? '確認済みにする' : 'Mark Confirmed'}
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'in_progress')}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    {language === 'ja' ? '進行中にする' : 'Mark In Progress'}
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {language === 'ja' ? '完了にする' : 'Mark Completed'}
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {language === 'ja' ? 'キャンセル' : 'Cancel Booking'}
                  </button>
                </div>
              </div>

              {/* Timestamps */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {language === 'ja' ? '日時情報' : 'Timestamps'}
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'ja' ? '予約作成日時' : 'Created At'}</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedBooking.created_at).toLocaleString()}
                    </p>
                  </div>
                  {selectedBooking.scheduled_datetime && (
                    <div>
                      <p className="text-sm text-gray-600">{language === 'ja' ? '予定日時' : 'Scheduled For'}</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedBooking.scheduled_datetime).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
