import { useState, useEffect } from 'react';
import {
  Package, Car, Stethoscope, Utensils, Search, Filter, Eye, Clock,
  CheckCircle, XCircle, AlertCircle, TrendingUp, DollarSign, Users,
  Calendar, Download, RefreshCw, BarChart3, LogOut
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../contexts/AdminAuthContext';

interface Booking {
  id: string;
  booking_number: string;
  service_type: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  payment_status: string;
  booking_status: string;
  created_at: string;
  scheduled_datetime?: string;
  booking_data: any;
}

type ServiceFilter = 'all' | 'porter' | 'hire' | 'airport' | 'doctor' | 'dinner';
type StatusFilter = 'all' | 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
type DateFilter = 'all' | 'today' | 'week' | 'month';

export function AdminDashboard() {
  const { user, signOut } = useAdminAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBookings();

    const channel = supabase
      .channel('booking_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'unified_bookings' },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
        service_type: booking.service_type,
        customer_name: booking.customer_name || booking.booking_data?.customerName || 'N/A',
        customer_email: booking.customer_email || booking.booking_data?.customerEmail || 'N/A',
        total_amount: booking.total_amount,
        payment_status: booking.payment_status,
        booking_status: booking.booking_status,
        created_at: booking.created_at,
        scheduled_datetime: booking.scheduled_datetime,
        booking_data: booking.booking_data,
      }));

      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setTimeout(() => setRefreshing(false), 1000);
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

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'porter': return <Package className="w-5 h-5" />;
      case 'hire': return <Car className="w-5 h-5" />;
      case 'airport': return <Package className="w-5 h-5" />;
      case 'doctor': return <Stethoscope className="w-5 h-5" />;
      case 'dinner': return <Utensils className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getServiceColor = (serviceType: string) => {
    switch (serviceType) {
      case 'porter': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hire': return 'bg-green-100 text-green-700 border-green-200';
      case 'airport': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'doctor': return 'bg-red-100 text-red-700 border-red-200';
      case 'dinner': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filterByDate = (booking: Booking) => {
    if (dateFilter === 'all') return true;

    const bookingDate = new Date(booking.created_at);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (dateFilter) {
      case 'today':
        return bookingDate >= today;
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return bookingDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return bookingDate >= monthAgo;
      default:
        return true;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.booking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService = serviceFilter === 'all' || booking.service_type === serviceFilter;
    const matchesStatus = statusFilter === 'all' || booking.booking_status === statusFilter;
    const matchesDate = filterByDate(booking);

    return matchesSearch && matchesService && matchesStatus && matchesDate;
  });

  const stats = {
    total: bookings.length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.total_amount, 0),
    pending: bookings.filter(b => b.booking_status === 'pending').length,
    confirmed: bookings.filter(b => b.booking_status === 'confirmed').length,
    inProgress: bookings.filter(b => b.booking_status === 'in_progress').length,
    completed: bookings.filter(b => b.booking_status === 'completed').length,
    cancelled: bookings.filter(b => b.booking_status === 'cancelled').length,
    paidBookings: bookings.filter(b => b.payment_status === 'completed').length,
  };

  const serviceBreakdown = {
    porter: bookings.filter(b => b.service_type === 'porter').length,
    hire: bookings.filter(b => b.service_type === 'hire').length,
    airport: bookings.filter(b => b.service_type === 'airport').length,
    doctor: bookings.filter(b => b.service_type === 'doctor').length,
    dinner: bookings.filter(b => b.service_type === 'dinner').length,
  };

  const exportToCSV = () => {
    const headers = ['予約番号', 'サービス', '顧客名', 'メール', '金額', '決済状況', '予約状況', '作成日時'];
    const rows = filteredBookings.map(b => [
      b.booking_number,
      b.service_type,
      b.customer_name,
      b.customer_email,
      b.total_amount,
      b.payment_status,
      b.booking_status,
      new Date(b.created_at).toLocaleString('ja-JP'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `oncarry-bookings-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">OnCarry Admin</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                管理画面
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                className={`p-2 text-gray-600 hover:text-gray-900 transition-colors ${refreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="text-sm text-gray-600">
                {user?.email}
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>ログアウト</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">総予約数</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">総売上</p>
            </div>
            <p className="text-2xl font-bold text-green-600">¥{stats.totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-yellow-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-sm text-gray-600">保留中</p>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">確認済</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.confirmed}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600">進行中</p>
            </div>
            <p className="text-3xl font-bold text-orange-600">{stats.inProgress}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">完了</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ポーター</p>
                <p className="text-2xl font-bold text-gray-900">{serviceBreakdown.porter}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ハイヤー</p>
                <p className="text-2xl font-bold text-gray-900">{serviceBreakdown.hire}</p>
              </div>
              <Car className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">空港送迎</p>
                <p className="text-2xl font-bold text-gray-900">{serviceBreakdown.airport}</p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ドクター</p>
                <p className="text-2xl font-bold text-gray-900">{serviceBreakdown.doctor}</p>
              </div>
              <Stethoscope className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ディナー</p>
                <p className="text-2xl font-bold text-gray-900">{serviceBreakdown.dinner}</p>
              </div>
              <Utensils className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">予約一覧</h2>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>CSVエクスポート</span>
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="予約番号・顧客名・メールで検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value as ServiceFilter)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">全サービス</option>
              <option value="porter">ポーター</option>
              <option value="hire">ハイヤー</option>
              <option value="airport">空港送迎</option>
              <option value="doctor">ドクター</option>
              <option value="dinner">ディナー</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">全ステータス</option>
              <option value="pending">保留中</option>
              <option value="confirmed">確認済</option>
              <option value="in_progress">進行中</option>
              <option value="completed">完了</option>
              <option value="cancelled">キャンセル</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">全期間</option>
              <option value="today">今日</option>
              <option value="week">過去7日間</option>
              <option value="month">過去30日間</option>
            </select>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {filteredBookings.length} 件の予約を表示中 (全{bookings.length}件)
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">読み込み中...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600">予約が見つかりません</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      予約番号
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      サービス
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      顧客情報
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      金額
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      決済
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ステータス
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      予約日時
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono font-semibold text-gray-900">{booking.booking_number}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getServiceColor(booking.service_type)}`}>
                          {getServiceIcon(booking.service_type)}
                          {booking.service_type}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{booking.customer_name}</p>
                          <p className="text-gray-600 text-xs">{booking.customer_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">¥{booking.total_amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          booking.payment_status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(booking.booking_status)}`}>
                          {getStatusIcon(booking.booking_status)}
                          {booking.booking_status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          <p>{new Date(booking.created_at).toLocaleDateString('ja-JP')}</p>
                          <p className="text-xs">{new Date(booking.created_at).toLocaleTimeString('ja-JP')}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between text-white">
              <h2 className="text-2xl font-bold">予約詳細</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">予約番号</p>
                    <p className="font-mono font-bold text-lg text-gray-900">{selectedBooking.booking_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">サービス</p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border ${getServiceColor(selectedBooking.service_type)}`}>
                      {getServiceIcon(selectedBooking.service_type)}
                      {selectedBooking.service_type}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">金額</p>
                    <p className="font-bold text-2xl text-gray-900">¥{selectedBooking.total_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">決済状況</p>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedBooking.payment_status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedBooking.payment_status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">顧客情報</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">顧客名</p>
                    <p className="font-semibold text-gray-900">{selectedBooking.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">メールアドレス</p>
                    <p className="font-semibold text-gray-900">{selectedBooking.customer_email}</p>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">ステータス管理</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                    disabled={selectedBooking.booking_status === 'confirmed'}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    確認済みにする
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'in_progress')}
                    disabled={selectedBooking.booking_status === 'in_progress'}
                    className="px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    進行中にする
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                    disabled={selectedBooking.booking_status === 'completed'}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    完了にする
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    disabled={selectedBooking.booking_status === 'cancelled'}
                    className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    キャンセル
                  </button>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">日時情報</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">予約作成日時</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedBooking.created_at).toLocaleString('ja-JP')}
                    </p>
                  </div>
                  {selectedBooking.scheduled_datetime && (
                    <div>
                      <p className="text-sm text-gray-600">予定日時</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedBooking.scheduled_datetime).toLocaleString('ja-JP')}
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
