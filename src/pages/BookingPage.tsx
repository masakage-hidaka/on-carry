import { useState, useEffect } from 'react';
import { Calendar, Package, User, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { hotelService } from '../services/hotelService';
import { bookingService, BookingFormData } from '../services/bookingService';
import type { Database } from '../lib/database.types';

type Hotel = Database['public']['Tables']['hotels']['Row'];

interface BookingPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialHotelId?: string;
}

export function BookingPage({ onNavigate, initialHotelId }: BookingPageProps) {
  const { t } = useLanguage();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    pickupHotelId: initialHotelId || '',
    deliveryHotelId: '',
    pickupDate: '',
    luggageType: 'standard',
    luggageCount: 1,
    specialNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const data = await hotelService.getActiveHotels();
      setHotels(data);
    } catch (err) {
      console.error('Error loading hotels:', err);
      setError('Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = t.booking.errors.required;
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = t.booking.errors.required;
    } else if (!/^\+?[\d\s-()]+$/.test(formData.customerPhone)) {
      newErrors.customerPhone = t.booking.errors.invalidPhone;
    }

    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = t.booking.errors.invalidEmail;
    }

    if (!formData.pickupHotelId) {
      newErrors.pickupHotelId = t.booking.errors.required;
    }

    if (!formData.deliveryHotelId) {
      newErrors.deliveryHotelId = t.booking.errors.required;
    }

    if (formData.pickupHotelId === formData.deliveryHotelId) {
      newErrors.deliveryHotelId = t.booking.errors.sameHotel;
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = t.booking.errors.required;
    } else if (!bookingService.validateBookingDate(formData.pickupDate)) {
      newErrors.pickupDate = t.booking.errors.invalidDate;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const booking = await bookingService.createBooking(formData);
      onNavigate('booking-confirmation', { bookingNumber: booking.booking_number });
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const totalAmount = bookingService.calculateAmount(formData.luggageType, formData.luggageCount);

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.booking.title}</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                {t.booking.customerInfo}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.booking.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.customerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.booking.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+81 90-1234-5678"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.booking.email}
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {t.booking.pickupDetails}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.booking.pickupHotel} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.pickupHotelId}
                    onChange={(e) => setFormData({ ...formData, pickupHotelId: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.pickupHotelId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">{t.common.select}</option>
                    {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} - {hotel.city}
                      </option>
                    ))}
                  </select>
                  {errors.pickupHotelId && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupHotelId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.booking.pickupDate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    min={minDate}
                    max={maxDate}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pickupDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {t.booking.deliveryDetails}
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.booking.deliveryHotel} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.deliveryHotelId}
                  onChange={(e) => setFormData({ ...formData, deliveryHotelId: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.deliveryHotelId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t.common.select}</option>
                  {hotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name} - {hotel.city}
                    </option>
                  ))}
                </select>
                {errors.deliveryHotelId && (
                  <p className="text-red-500 text-sm mt-1">{errors.deliveryHotelId}</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                {t.booking.luggageInfo}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.booking.luggageType}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, luggageType: 'standard' })}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        formData.luggageType === 'standard'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-semibold">{t.booking.standard}</div>
                      <div className="text-sm text-gray-600 mt-1">¥1,000</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, luggageType: 'large' })}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        formData.luggageType === 'large'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-semibold">{t.booking.large}</div>
                      <div className="text-sm text-gray-600 mt-1">¥1,500</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.booking.luggageCount}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.luggageCount}
                    onChange={(e) =>
                      setFormData({ ...formData, luggageCount: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.booking.specialNotes}
                  </label>
                  <textarea
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900">{t.booking.totalAmount}:</span>
                <span className="text-2xl font-bold text-blue-600">¥{totalAmount.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? t.common.loading : t.booking.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
