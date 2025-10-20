import { useState } from 'react';
import { Package, Plane, Calendar, MapPin, User, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface BookingPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialHotelId?: string;
}

type ServiceType = 'luggage' | 'airport';

export function BookingPage({ onNavigate }: BookingPageProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [serviceType, setServiceType] = useState<ServiceType>('luggage');
  const [formData, setFormData] = useState({
    // Customer info
    customerName: user?.user_metadata?.name || '',
    customerEmail: user?.email || '',
    customerPhone: '',

    // Luggage delivery specific
    pickupHotel: '',
    deliveryHotel: '',
    luggageCount: 1,
    luggageSize: 'standard',
    deliveryDate: '',
    deliveryTime: '',

    // Airport transfer specific
    airportDirection: 'to_airport',
    flightNumber: '',
    flightDate: '',
    flightTime: '',
    airline: '',
    terminal: '',
    transferLocation: '',
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName) newErrors.customerName = 'Name is required';
    if (!formData.customerEmail && !formData.customerPhone) {
      newErrors.customerEmail = 'Email or phone is required';
    }

    if (serviceType === 'luggage') {
      if (!formData.pickupHotel) newErrors.pickupHotel = 'Pickup location is required';
      if (!formData.deliveryHotel) newErrors.deliveryHotel = 'Delivery location is required';
      if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
      if (!formData.deliveryTime) newErrors.deliveryTime = 'Delivery time is required';
    } else {
      if (!formData.flightNumber) newErrors.flightNumber = 'Flight number is required';
      if (!formData.flightDate) newErrors.flightDate = 'Flight date is required';
      if (!formData.flightTime) newErrors.flightTime = 'Flight time is required';
      if (!formData.transferLocation) newErrors.transferLocation = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: Submit to Supabase and create booking
    console.log('Booking data:', { serviceType, ...formData });

    // Navigate to confirmation
    onNavigate('booking-confirmation', { bookingId: 'temp-id' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {language === 'ja' ? 'ポーターサービス予約' : 'Porter Service Booking'}
            </h1>
            <p className="text-blue-100">
              {language === 'ja'
                ? '荷物配送または空港送迎をお選びください'
                : 'Choose luggage delivery or airport transfer'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Service Type Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                {language === 'ja' ? 'サービスタイプ' : 'Service Type'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setServiceType('luggage')}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    serviceType === 'luggage'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Package className={`w-8 h-8 mb-3 ${serviceType === 'luggage' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <h3 className="font-semibold text-lg mb-1">
                    {language === 'ja' ? '荷物配送' : 'Luggage Delivery'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ja' ? 'ホテル間の荷物配送' : 'Hotel-to-hotel delivery'}
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mt-2">¥800〜</p>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('airport')}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    serviceType === 'airport'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Plane className={`w-8 h-8 mb-3 ${serviceType === 'airport' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <h3 className="font-semibold text-lg mb-1">
                    {language === 'ja' ? '空港送迎' : 'Airport Transfer'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ja' ? '関西国際空港送迎' : 'Kansai Airport transfer'}
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mt-2">¥2,500〜</p>
                </button>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
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
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+81 90-1234-5678"
                  />
                </div>
              </div>
            </div>

            {/* Service Details - Luggage Delivery */}
            {serviceType === 'luggage' && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  {language === 'ja' ? '配送詳細' : 'Delivery Details'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? 'ピックアップホテル' : 'Pickup Hotel'} *
                    </label>
                    <input
                      type="text"
                      name="pickupHotel"
                      value={formData.pickupHotel}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.pickupHotel ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={language === 'ja' ? 'ホテル名または住所' : 'Hotel name or address'}
                    />
                    {errors.pickupHotel && (
                      <p className="text-red-500 text-sm mt-1">{errors.pickupHotel}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? '配送先ホテル' : 'Delivery Hotel'} *
                    </label>
                    <input
                      type="text"
                      name="deliveryHotel"
                      value={formData.deliveryHotel}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.deliveryHotel ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={language === 'ja' ? 'ホテル名または住所' : 'Hotel name or address'}
                    />
                    {errors.deliveryHotel && (
                      <p className="text-red-500 text-sm mt-1">{errors.deliveryHotel}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? '荷物の数' : 'Number of Items'}
                    </label>
                    <select
                      name="luggageCount"
                      value={formData.luggageCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? '荷物サイズ' : 'Luggage Size'}
                    </label>
                    <select
                      name="luggageSize"
                      value={formData.luggageSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="standard">{language === 'ja' ? '標準' : 'Standard'}</option>
                      <option value="large">{language === 'ja' ? '大型' : 'Large'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {language === 'ja' ? '配送日' : 'Delivery Date'} *
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.deliveryDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? '希望配送時間' : 'Preferred Time'} *
                    </label>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.deliveryTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">{language === 'ja' ? '選択してください' : 'Select time'}</option>
                      <option value="09:00-12:00">09:00 - 12:00</option>
                      <option value="12:00-15:00">12:00 - 15:00</option>
                      <option value="15:00-18:00">15:00 - 18:00</option>
                      <option value="18:00-21:00">18:00 - 21:00</option>
                    </select>
                    {errors.deliveryTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.deliveryTime}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Service Details - Airport Transfer */}
            {serviceType === 'airport' && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-blue-600" />
                  {language === 'ja' ? 'フライト情報' : 'Flight Information'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? '送迎方向' : 'Transfer Direction'}
                    </label>
                    <select
                      name="airportDirection"
                      value={formData.airportDirection}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="to_airport">{language === 'ja' ? '空港へ' : 'To Airport'}</option>
                      <option value="from_airport">{language === 'ja' ? '空港から' : 'From Airport'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? 'フライト番号' : 'Flight Number'} *
                    </label>
                    <input
                      type="text"
                      name="flightNumber"
                      value={formData.flightNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.flightNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="JL123"
                    />
                    {errors.flightNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.flightNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? 'フライト日' : 'Flight Date'} *
                    </label>
                    <input
                      type="date"
                      name="flightDate"
                      value={formData.flightDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.flightDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.flightDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.flightDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? 'フライト時刻' : 'Flight Time'} *
                    </label>
                    <input
                      type="time"
                      name="flightTime"
                      value={formData.flightTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.flightTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.flightTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.flightTime}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? '航空会社' : 'Airline'}
                    </label>
                    <input
                      type="text"
                      name="airline"
                      value={formData.airline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={language === 'ja' ? 'JAL, ANA等' : 'JAL, ANA, etc.'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? 'ターミナル' : 'Terminal'}
                    </label>
                    <select
                      name="terminal"
                      value={formData.terminal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{language === 'ja' ? '選択してください' : 'Select'}</option>
                      <option value="T1">Terminal 1</option>
                      <option value="T2">Terminal 2</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? 'ホテル/住所' : 'Hotel/Address'} *
                    </label>
                    <input
                      type="text"
                      name="transferLocation"
                      value={formData.transferLocation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.transferLocation ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={language === 'ja' ? 'ホテル名または住所' : 'Hotel name or address'}
                    />
                    {errors.transferLocation && (
                      <p className="text-red-500 text-sm mt-1">{errors.transferLocation}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ja' ? '乗客数' : 'Passengers'}
                    </label>
                    <select
                      name="passengerCount"
                      value={formData.passengerCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={language === 'ja' ? 'その他のご要望があればご記入ください' : 'Any special requirements?'}
              />
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
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
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
