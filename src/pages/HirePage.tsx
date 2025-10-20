import { useState } from 'react';
import { Car, MapPin, Calendar, Clock, User, Phone, Mail, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface HirePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

type VehicleType = 'sedan' | 'wagon' | 'luxury' | 'van';
type RentalType = 'hourly' | 'half_day' | 'full_day';

const vehicleOptions: Record<VehicleType, { nameJa: string; nameEn: string; capacity: number; price: number; imageUrl: string }> = {
  sedan: {
    nameJa: 'セダン',
    nameEn: 'Sedan',
    capacity: 4,
    price: 8000,
    imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  wagon: {
    nameJa: 'ワゴン',
    nameEn: 'Wagon',
    capacity: 6,
    price: 10000,
    imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  luxury: {
    nameJa: 'ラグジュアリー',
    nameEn: 'Luxury',
    capacity: 4,
    price: 15000,
    imageUrl: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  van: {
    nameJa: 'バン',
    nameEn: 'Van',
    capacity: 8,
    price: 12000,
    imageUrl: 'https://images.pexels.com/photos/2526127/pexels-photo-2526127.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
};

export function HirePage({ onNavigate }: HirePageProps) {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    customerName: user?.user_metadata?.name || '',
    customerEmail: user?.email || '',
    customerPhone: '',
    vehicleType: 'sedan' as VehicleType,
    rentalType: 'hourly' as RentalType,
    rentalHours: 4,
    pickupLocation: '',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    passengerCount: 1,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const calculatePrice = () => {
    const basePrice = vehicleOptions[formData.vehicleType].price;
    switch (formData.rentalType) {
      case 'hourly':
        return basePrice * formData.rentalHours;
      case 'half_day':
        return basePrice * 4;
      case 'full_day':
        return basePrice * 8;
      default:
        return basePrice * 4;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName) newErrors.customerName = 'Name is required';
    if (!formData.customerEmail && !formData.customerPhone) {
      newErrors.customerEmail = 'Email or phone is required';
    }
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Hire booking data:', formData);
    onNavigate('booking-confirmation', { bookingId: 'temp-hire-id' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => onNavigate('home')}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === 'ja' ? '戻る' : 'Back'}
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {language === 'ja' ? 'ハイヤー手配' : 'Travel Hire Service'}
            </h1>
            <p className="text-green-100">
              {language === 'ja'
                ? 'プロドライバー付き高級車両サービス'
                : 'Premium car service with professional driver'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Vehicle Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <Car className="w-5 h-5 mr-2 text-green-600" />
                {language === 'ja' ? '車両タイプ' : 'Vehicle Type'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(Object.keys(vehicleOptions) as VehicleType[]).map((type) => {
                  const vehicle = vehicleOptions[type];
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, vehicleType: type }))}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        formData.vehicleType === type
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.nameEn}
                        className="w-full h-24 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-sm mb-1">
                        {language === 'ja' ? vehicle.nameJa : vehicle.nameEn}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        <Users className="w-3 h-3 inline mr-1" />
                        {vehicle.capacity} {language === 'ja' ? '名' : 'passengers'}
                      </p>
                      <p className="text-sm font-semibold text-green-600">¥{vehicle.price.toLocaleString()}/h</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rental Type */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                {language === 'ja' ? 'レンタルタイプ' : 'Rental Type'}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rentalType: 'hourly', rentalHours: 4 }))}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    formData.rentalType === 'hourly'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">
                    {language === 'ja' ? '時間貸し' : 'Hourly'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'ja' ? '1時間から利用可能' : 'Available from 1 hour'}
                  </p>
                  {formData.rentalType === 'hourly' && (
                    <select
                      name="rentalHours"
                      value={formData.rentalHours}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {[2, 3, 4, 5, 6, 7, 8].map(hours => (
                        <option key={hours} value={hours}>{hours} {language === 'ja' ? '時間' : 'hours'}</option>
                      ))}
                    </select>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rentalType: 'half_day' }))}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    formData.rentalType === 'half_day'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">
                    {language === 'ja' ? '半日' : 'Half Day'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ja' ? '4時間パッケージ' : '4-hour package'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rentalType: 'full_day' }))}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    formData.rentalType === 'full_day'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">
                    {language === 'ja' ? '終日' : 'Full Day'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ja' ? '8時間パッケージ' : '8-hour package'}
                  </p>
                </button>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                {language === 'ja' ? 'お客様情報' : 'Customer Information'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ja' ? 'お名前' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.customerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'ja' ? '山田太郎' : 'John Doe'}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {language === 'ja' ? 'メールアドレス' : 'Email'}
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {language === 'ja' ? '電話番号' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="+81 90-1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {language === 'ja' ? '乗客数' : 'Passengers'}
                  </label>
                  <select
                    name="passengerCount"
                    value={formData.passengerCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {Array.from({ length: vehicleOptions[formData.vehicleType].capacity }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                {language === 'ja' ? '行程詳細' : 'Trip Details'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ja' ? 'ピックアップ場所' : 'Pickup Location'} *
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.pickupLocation ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'ja' ? 'ホテル名または住所' : 'Hotel name or address'}
                  />
                  {errors.pickupLocation && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ja' ? '目的地（オプション）' : 'Destination (Optional)'}
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'ja' ? '複数箇所の場合は空欄可' : 'Leave blank for multiple stops'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {language === 'ja' ? 'ピックアップ日' : 'Pickup Date'} *
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pickupDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {language === 'ja' ? 'ピックアップ時刻' : 'Pickup Time'} *
                  </label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.pickupTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pickupTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ja' ? '特別なご要望' : 'Special Requests'}
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder={language === 'ja' ? 'チャイルドシート、英語対応ドライバー等' : 'Child seat, English-speaking driver, etc.'}
              />
            </div>

            {/* Price Summary */}
            <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {language === 'ja' ? '見積金額' : 'Estimated Price'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {vehicleOptions[formData.vehicleType][language === 'ja' ? 'nameJa' : 'nameEn']} •
                    {formData.rentalType === 'hourly' && ` ${formData.rentalHours}${language === 'ja' ? '時間' : 'h'}`}
                    {formData.rentalType === 'half_day' && (language === 'ja' ? ' 半日' : ' Half Day')}
                    {formData.rentalType === 'full_day' && (language === 'ja' ? ' 終日' : ' Full Day')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">¥{calculatePrice().toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{language === 'ja' ? '税込' : 'Tax included'}</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                {language === 'ja' ? 'キャンセル' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
              >
                {language === 'ja' ? '予約を確定' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
