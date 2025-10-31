import { useState, useEffect } from 'react';
import {
  Package,
  Car,
  Plane,
  Stethoscope,
  UtensilsCrossed,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DashboardPageProps {
  user: any;
  onLogout: () => void;
}

interface Booking {
  id: string;
  booking_number: string;
  service_type: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  booking_status: string;
  payment_status: string;
  created_at: string;
  scheduled_datetime: string | null;
}

const serviceIcons: Record<string, any> = {
  porter: Package,
  hire: Car,
  airport: Plane,
  doctor: Stethoscope,
  dinner: UtensilsCrossed,
};

const serviceNames: Record<string, string> = {
  porter: 'Travel Porter',
  hire: 'Travel Hire',
  airport: 'Transportation',
  doctor: 'Travel Doctor',
  dinner: 'Dinner Companion',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('unified_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('unified_bookings')
        .update({
          booking_status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;
      await loadBookings();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('ステータス更新に失敗しました');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.booking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || booking.booking_status === filterStatus;
    const matchesService = filterService === 'all' || booking.service_type === filterService;

    return matchesSearch && matchesStatus && matchesService;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.booking_status === 'pending').length,
    confirmed: bookings.filter(b => b.booking_status === 'confirmed').length,
    completed: bookings.filter(b => b.booking_status === 'completed').length,
    revenue: bookings
      .filter(b => b.payment_status === 'completed')
      .reduce((sum, b) => sum + b.total_amount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">OnCarry Admin</h1>
                <p className="text-xs text-gray-500">管理画面</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>ログアウト</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">総予約数</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">保留中</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">完了</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">売上</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">
                  ¥{stats.revenue.toLocaleString()}
                </p>
              </div>
              <div className="text-orange-400 text-2xl">¥</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="予約番号、名前、メールで検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">全ステータス</option>
                <option value="pending">保留中</option>
                <option value="confirmed">確認済み</option>
                <option value="in_progress">進行中</option>
                <option value="completed">完了</option>
                <option value="cancelled">キャンセル</option>
              </select>

              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">全サービス</option>
                <option value="porter">Porter</option>
                <option value="hire">Hire</option>
                <option value="airport">Transportation</option>
                <option value="doctor">Doctor</option>
                <option value="dinner">Dinner</option>
              </select>

              <button
                onClick={loadBookings}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">更新</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">読み込み中...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500">予約がありません</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      予約番号
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      サービス
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      顧客情報
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      金額
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      予約日時
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ステータス
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      決済
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => {
                    const ServiceIcon = serviceIcons[booking.service_type] || Package;
                    return (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono font-medium text-gray-900">
                            {booking.booking_number}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <ServiceIcon className="w-5 h-5 text-orange-500" />
                            <span className="text-sm text-gray-900">
                              {serviceNames[booking.service_type]}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{booking.customer_name}</p>
                            <p className="text-gray-500">{booking.customer_email}</p>
                            <p className="text-gray-500">{booking.customer_phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            ¥{booking.total_amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.scheduled_datetime
                            ? new Date(booking.scheduled_datetime).toLocaleString('ja-JP')
                            : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={booking.booking_status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className={`text-xs px-3 py-1 rounded-full font-medium border-0 focus:ring-2 focus:ring-orange-500 ${
                              statusColors[booking.booking_status] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="pending">保留中</option>
                            <option value="confirmed">確認済み</option>
                            <option value="in_progress">進行中</option>
                            <option value="completed">完了</option>
                            <option value="cancelled">キャンセル</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            paymentStatusColors[booking.payment_status] || 'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.payment_status === 'pending' && '未払い'}
                            {booking.payment_status === 'completed' && '完了'}
                            {booking.payment_status === 'failed' && '失敗'}
                            {booking.payment_status === 'refunded' && '返金済み'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-orange-600 hover:text-orange-900 font-medium">
                            詳細
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
