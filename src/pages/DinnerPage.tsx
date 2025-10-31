import { useState } from 'react';
import { UtensilsCrossed, Clock, Users, MapPin, Calendar, Star, Camera, Heart, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { bookingService } from '../lib/bookingService';

interface DinnerPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

type TourType = 'food' | 'culture' | 'anime' | 'izakaya' | 'street' | 'premium';
type TimeSlot = 'lunch' | 'afternoon' | 'evening' | 'night';

interface TourOption {
  id: TourType;
  nameJa: string;
  nameEn: string;
  descJa: string;
  descEn: string;
  duration: string;
  pricePerPerson: number;
  maxGroup: number;
  imageUrl: string;
  category: 'day' | 'night';
  highlights: { ja: string[]; en: string[] };
  route: { ja: string; en: string };
}

const tourOptions: TourOption[] = [
  {
    id: 'food',
    nameJa: '大阪グルメツアー',
    nameEn: 'Osaka Food Tour',
    descJa: '食い倒れの街を英語で案内。たこ焼き・お好み焼き作り体験付き',
    descEn: 'Explore Osaka\'s food culture with takoyaki & okonomiyaki making experience',
    duration: '3-4時間',
    pricePerPerson: 8000,
    maxGroup: 6,
    imageUrl: 'https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'day',
    highlights: {
      ja: ['たこ焼き作り体験', '黒門市場散策', 'インスタ映えスポット', '大阪弁レクチャー'],
      en: ['Takoyaki making', 'Kuromon Market tour', 'Instagram spots', 'Osaka dialect lesson']
    },
    route: {
      ja: '道頓堀 → 黒門市場 → 新横丁 → 法善寺横丁',
      en: 'Dotonbori → Kuromon Market → Shinsekai → Hozenji Yokocho'
    }
  },
  {
    id: 'culture',
    nameJa: '伝統文化体験ツアー',
    nameEn: 'Traditional Culture Tour',
    descJa: '神社参拝、着物体験、昭和レトロエリア散策',
    descEn: 'Shrine visit, kimono experience, and retro Showa area exploration',
    duration: '3-4時間',
    pricePerPerson: 9000,
    maxGroup: 6,
    imageUrl: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'day',
    highlights: {
      ja: ['住吉大社参拝', '着物レンタル', '通天閣見学', '伝統工芸体験'],
      en: ['Sumiyoshi Shrine', 'Kimono rental', 'Tsutenkaku Tower', 'Traditional crafts']
    },
    route: {
      ja: '住吉大社 → 天王寺 → 新世界 → 通天閣',
      en: 'Sumiyoshi Shrine → Tennoji → Shinsekai → Tsutenkaku'
    }
  },
  {
    id: 'anime',
    nameJa: 'アニメ・ポップカルチャーツアー',
    nameEn: 'Anime & Pop Culture Tour',
    descJa: 'オタク文化の聖地、日本橋でんでんタウン案内',
    descEn: 'Explore otaku culture paradise in Nipponbashi Den Den Town',
    duration: '3-4時間',
    pricePerPerson: 7500,
    maxGroup: 6,
    imageUrl: 'https://images.pexels.com/photos/2869554/pexels-photo-2869554.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'day',
    highlights: {
      ja: ['アニメショップ巡り', 'メイドカフェ体験', 'ゲーセン・プリクラ', 'コスプレスポット'],
      en: ['Anime shop tour', 'Maid cafe experience', 'Game center & Purikura', 'Cosplay spots']
    },
    route: {
      ja: '日本橋でんでんタウン → アニメイト → メイドカフェ → ゲームセンター',
      en: 'Nipponbashi → Animate → Maid Cafe → Game Center'
    }
  },
  {
    id: 'izakaya',
    nameJa: '居酒屋ホッピングツアー',
    nameEn: 'Izakaya Hopping Tour',
    descJa: '3軒ハシゴで大阪の夜を地元民と楽しむ',
    descEn: 'Experience Osaka nightlife like a local - 3 izakayas',
    duration: '4時間',
    pricePerPerson: 12000,
    maxGroup: 4,
    imageUrl: 'https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'night',
    highlights: {
      ja: ['3軒ハシゴ体験', '大阪弁レクチャー', 'カラオケ体験', '地元民交流'],
      en: ['3 izakaya hopping', 'Osaka dialect lesson', 'Karaoke experience', 'Local interaction']
    },
    route: {
      ja: '福島 → 天満 → 梅田（各店1時間20分）',
      en: 'Fukushima → Tenma → Umeda (80min each)'
    }
  },
  {
    id: 'street',
    nameJa: '屋台グルメナイトツアー',
    nameEn: 'Street Food Night Tour',
    descJa: '夜の街角グルメ発見、立ち飲み屋・屋台文化体験',
    descEn: 'Discover night street food & standing bar culture',
    duration: '4時間',
    pricePerPerson: 10000,
    maxGroup: 6,
    imageUrl: 'https://images.pexels.com/photos/4253314/pexels-photo-4253314.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'night',
    highlights: {
      ja: ['立ち飲み屋体験', '深夜ラーメン', '和スイーツ', '夜景撮影'],
      en: ['Standing bar', 'Late night ramen', 'Japanese sweets', 'Night photography']
    },
    route: {
      ja: '福島 → 天満 → 梅田 → 新横丁',
      en: 'Fukushima → Tenma → Umeda → Shin-yokocho'
    }
  },
  {
    id: 'premium',
    nameJa: '高級ディナー体験ツアー',
    nameEn: 'Premium Dining Experience',
    descJa: '懐石料理・高級焼肉・鉄板焼きで特別な夜を',
    descEn: 'Kaiseki, premium yakiniku, or teppanyaki - special night',
    duration: '4時間',
    pricePerPerson: 20000,
    maxGroup: 4,
    imageUrl: 'https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'night',
    highlights: {
      ja: ['懐石料理体験', '日本酒ペアリング', 'シェフ交流', 'フォーマルマナー指導'],
      en: ['Kaiseki experience', 'Sake pairing', 'Chef interaction', 'Formal dining etiquette']
    },
    route: {
      ja: '北新地・梅田エリアの高級店',
      en: 'Premium restaurants in Kitashinchi/Umeda'
    }
  }
];

export function DinnerPage({ onNavigate }: DinnerPageProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [selectedTour, setSelectedTour] = useState<TourOption | null>(null);
  const [step, setStep] = useState<'select' | 'form'>('select');

  const [formData, setFormData] = useState({
    customerName: user?.user_metadata?.name || '',
    customerEmail: user?.email || '',
    customerPhone: '',
    date: '',
    timeSlot: '' as TimeSlot | '',
    numGuests: 2,
    specialRequests: '',
    dietaryRestrictions: ''
  });

  const content = {
    ja: {
      title: 'Osaka Buddies - 学生ガイドと楽しむローカル体験',
      subtitle: '英語で案内！同世代と一緒に大阪の魅力を発見',
      selectTour: 'ツアーを選択',
      dayTours: '日中ツアー（3-4時間）',
      nightTours: '夜ご飯アテンド（4時間）',
      perPerson: '1名あたり',
      maxGuests: '最大',
      people: '名',
      bookNow: '予約する',
      highlights: '体験内容',
      route: 'ルート',
      bookingForm: '予約フォーム',
      customerInfo: 'お客様情報',
      tourDetails: 'ツアー詳細',
      name: 'お名前',
      email: 'メールアドレス',
      phone: '電話番号',
      tourDate: 'ツアー日',
      timeSlot: '時間帯',
      numGuests: '参加人数',
      specialRequests: '特別なリクエスト',
      dietaryRestrictions: '食事制限・アレルギー',
      submit: '予約を確定',
      back: '戻る',
      timeSlots: {
        lunch: 'ランチ（11:00-15:00）',
        afternoon: '午後（14:00-18:00）',
        evening: '夕方（17:00-21:00）',
        night: '夜（18:00-22:00）'
      }
    },
    en: {
      title: 'Osaka Buddies - Local Experience with Student Guides',
      subtitle: 'Discover Osaka\'s charm with English-speaking guides',
      selectTour: 'Select Your Tour',
      dayTours: 'Daytime Tours (3-4 hours)',
      nightTours: 'Night Dining Tours (4 hours)',
      perPerson: 'per person',
      maxGuests: 'Max',
      people: 'people',
      bookNow: 'Book Now',
      highlights: 'Highlights',
      route: 'Route',
      bookingForm: 'Booking Form',
      customerInfo: 'Customer Information',
      tourDetails: 'Tour Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      tourDate: 'Tour Date',
      timeSlot: 'Time Slot',
      numGuests: 'Number of Guests',
      specialRequests: 'Special Requests',
      dietaryRestrictions: 'Dietary Restrictions / Allergies',
      submit: 'Confirm Booking',
      back: 'Back',
      timeSlots: {
        lunch: 'Lunch (11:00-15:00)',
        afternoon: 'Afternoon (14:00-18:00)',
        evening: 'Evening (17:00-21:00)',
        night: 'Night (18:00-22:00)'
      }
    }
  };

  const t = content[language];
  const dayTours = tourOptions.filter(tour => tour.category === 'day');
  const nightTours = tourOptions.filter(tour => tour.category === 'night');

  const handleTourSelect = (tour: TourOption) => {
    setSelectedTour(tour);
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedTour) {
        throw new Error('ツアーが選択されていません');
      }

      const timeSlotMap: Record<TimeSlot, string> = {
        lunch: '12:00:00',
        afternoon: '14:00:00',
        evening: '17:00:00',
        night: '18:00:00',
      };

      const scheduledTime = formData.timeSlot ? timeSlotMap[formData.timeSlot] : '12:00:00';
      const scheduledDatetime = `${formData.date}T${scheduledTime}`;

      const booking = await bookingService.createBooking({
        serviceType: 'dinner',
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        customerId: user?.id,
        bookingData: {
          tourType: selectedTour.id,
          numGuests: formData.numGuests,
          timeSlot: formData.timeSlot,
          dietaryRestrictions: formData.dietaryRestrictions,
          specialRequests: formData.specialRequests,
          scheduledDatetime,
          meetingPoint: 'Travel Hub Namba',
          budgetRange: selectedTour.pricePerPerson >= 15000 ? 'premium' : 'mid_range',
        },
        totalAmount: selectedTour.pricePerPerson * formData.numGuests,
        scheduledDatetime,
        specialRequests: formData.specialRequests,
      });

      onNavigate('booking-confirmation', { bookingNumber: booking.booking_number });
    } catch (error) {
      console.error('Booking failed:', error);
      alert(language === 'ja'
        ? '予約に失敗しました。もう一度お試しください。'
        : 'Booking failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'form' && selectedTour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setStep('select')}
            className="text-purple-600 hover:text-purple-800 mb-6 flex items-center font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.back}
          </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Selected Tour Header */}
            <div className="relative h-64">
              <img
                src={selectedTour.imageUrl}
                alt={language === 'ja' ? selectedTour.nameJa : selectedTour.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">
                    {language === 'ja' ? selectedTour.nameJa : selectedTour.nameEn}
                  </h2>
                  <p className="text-purple-200">
                    {language === 'ja' ? selectedTour.descJa : selectedTour.descEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.bookingForm}</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.customerInfo}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Tour Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.tourDetails}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.tourDate} *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.timeSlot} *
                      </label>
                      <select
                        required
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value as TimeSlot })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        <option value="lunch">{t.timeSlots.lunch}</option>
                        <option value="afternoon">{t.timeSlots.afternoon}</option>
                        <option value="evening">{t.timeSlots.evening}</option>
                        <option value="night">{t.timeSlots.night}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.numGuests} *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        max={selectedTour.maxGroup}
                        value={formData.numGuests}
                        onChange={(e) => setFormData({ ...formData, numGuests: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.dietaryRestrictions}
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                    placeholder={language === 'ja' ? '例: ベジタリアン、ナッツアレルギー' : 'e.g., Vegetarian, nut allergy'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.specialRequests}
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    rows={3}
                    placeholder={language === 'ja' ? '特別なリクエストがあればお知らせください' : 'Any special requests?'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>{language === 'ja' ? '合計金額' : 'Total'}</span>
                    <span className="text-2xl text-purple-600">
                      ¥{(selectedTour.pricePerPerson * formData.numGuests).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    ¥{selectedTour.pricePerPerson.toLocaleString()} × {formData.numGuests} {t.people}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting
                    ? (language === 'ja' ? '予約処理中...' : 'Processing...')
                    : t.submit
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl md:text-6xl font-bold">
              {t.title}
            </h1>
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-xl md:text-2xl text-purple-100 mb-8">{t.subtitle}</p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-purple-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{language === 'ja' ? '学生ガイド' : 'Student Guides'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              <span>{language === 'ja' ? '写真撮影サポート' : 'Photo Support'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>{language === 'ja' ? '同世代交流' : 'Peer Connection'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>{language === 'ja' ? '英語対応' : 'English OK'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Tours Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t.dayTours}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dayTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden group cursor-pointer"
                onClick={() => handleTourSelect(tour)}
              >
                <div className="relative h-48">
                  <img
                    src={tour.imageUrl}
                    alt={language === 'ja' ? tour.nameJa : tour.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-purple-600">
                    {tour.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'ja' ? tour.nameJa : tour.nameEn}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {language === 'ja' ? tour.descJa : tour.descEn}
                  </p>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">{t.highlights}</p>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'ja' ? tour.highlights.ja : tour.highlights.en).slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-2xl font-bold text-purple-600">
                        ¥{tour.pricePerPerson.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">/{t.perPerson}</span>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                      {t.bookNow}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Night Tours Section */}
      <div className="py-16 px-4 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.nightTours}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nightTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white/10 backdrop-blur rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden group cursor-pointer border border-white/20"
                onClick={() => handleTourSelect(tour)}
              >
                <div className="relative h-48">
                  <img
                    src={tour.imageUrl}
                    alt={language === 'ja' ? tour.nameJa : tour.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-pink-500 px-3 py-1 rounded-full text-sm font-bold text-white">
                    {tour.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'ja' ? tour.nameJa : tour.nameEn}
                  </h3>
                  <p className="text-purple-100 mb-4 text-sm">
                    {language === 'ja' ? tour.descJa : tour.descEn}
                  </p>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">{t.highlights}</p>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'ja' ? tour.highlights.ja : tour.highlights.en).slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div>
                      <span className="text-2xl font-bold text-pink-400">
                        ¥{tour.pricePerPerson.toLocaleString()}
                      </span>
                      <span className="text-sm text-purple-200">/{t.perPerson}</span>
                    </div>
                    <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                      {t.bookNow}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
