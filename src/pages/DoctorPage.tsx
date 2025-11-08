import { useState } from 'react';
import { Video, MessageSquare, Phone, Calendar, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { doctorService, DoctorConsultation } from '../lib/apiPartnerService';

interface DoctorPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function DoctorPage({ onNavigate }: DoctorPageProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [step, setStep] = useState<'select' | 'form' | 'confirm'>('select');
  const [selectedType, setSelectedType] = useState<'video' | 'chat' | 'phone'>('video');
  const [formData, setFormData] = useState({
    consultationDate: '',
    consultationTime: '',
    symptoms: '',
    preferredLanguage: language,
  });
  const [loading, setLoading] = useState(false);

  const content = {
    ja: {
      title: 'Travel Doctor',
      subtitle: 'オンライン医療相談サービス',
      description: '旅行中の体調不良や健康相談を、多言語対応のオンラインで即座にサポートします。',
      back: '戻る',
      selectType: '相談方法を選択',
      types: {
        video: {
          name: 'ビデオ通話',
          desc: '医師と顔を見ながら相談',
          price: '¥3,000',
        },
        chat: {
          name: 'チャット相談',
          desc: 'テキストで気軽に相談',
          price: '¥2,000',
        },
        phone: {
          name: '電話相談',
          desc: '音声のみで相談',
          price: '¥2,500',
        },
      },
      form: {
        title: '予約情報を入力',
        date: '希望日',
        time: '希望時間',
        symptoms: '症状・相談内容',
        symptomsPlaceholder: '症状や相談したい内容を詳しくお書きください...',
        language: '希望言語',
        languages: {
          ja: '日本語',
          en: 'English',
          zh: '中文',
          ko: '한국어',
        },
      },
      features: [
        '24時間以内の予約可能',
        '多言語対応',
        '即座の健康アドバイス',
        '処方箋発行可能（提携薬局）',
      ],
      buttons: {
        next: '次へ',
        book: '予約を確定',
        cancel: 'キャンセル',
      },
      loginRequired: 'ログインが必要です',
    },
    en: {
      title: 'Travel Doctor',
      subtitle: 'Online Medical Consultation Service',
      description: 'Get instant multilingual medical support for health concerns during your trip.',
      back: 'Back',
      selectType: 'Select Consultation Type',
      types: {
        video: {
          name: 'Video Call',
          desc: 'Face-to-face consultation',
          price: '¥3,000',
        },
        chat: {
          name: 'Chat Consultation',
          desc: 'Text-based consultation',
          price: '¥2,000',
        },
        phone: {
          name: 'Phone Consultation',
          desc: 'Voice-only consultation',
          price: '¥2,500',
        },
      },
      form: {
        title: 'Enter Booking Information',
        date: 'Preferred Date',
        time: 'Preferred Time',
        symptoms: 'Symptoms / Consultation Details',
        symptomsPlaceholder: 'Please describe your symptoms or concerns in detail...',
        language: 'Preferred Language',
        languages: {
          ja: 'Japanese',
          en: 'English',
          zh: 'Chinese',
          ko: 'Korean',
        },
      },
      features: [
        'Available within 24 hours',
        'Multilingual support',
        'Instant health advice',
        'Prescription available (partner pharmacies)',
      ],
      buttons: {
        next: 'Next',
        book: 'Confirm Booking',
        cancel: 'Cancel',
      },
      loginRequired: 'Login required',
    },
  };

  const t = content[language];

  const consultationTypes = [
    { type: 'video' as const, icon: Video, ...t.types.video },
    { type: 'chat' as const, icon: MessageSquare, ...t.types.chat },
    { type: 'phone' as const, icon: Phone, ...t.types.phone },
  ];

  const handleSubmit = async () => {
    if (!user) {
      alert(t.loginRequired);
      onNavigate('login');
      return;
    }

    setLoading(true);

    try {
      const consultation: DoctorConsultation = {
        user_id: user.id,
        consultation_date: `${formData.consultationDate}T${formData.consultationTime}:00`,
        consultation_type: selectedType,
        symptoms: formData.symptoms,
        language: formData.preferredLanguage,
        status: 'pending',
        price: selectedType === 'video' ? 3000 : selectedType === 'chat' ? 2000 : 2500,
      };

      await doctorService.createConsultation(consultation);
      alert(language === 'ja' ? '予約が完了しました！' : 'Booking confirmed!');
      onNavigate('home');
    } catch (error) {
      console.error('Error creating consultation:', error);
      alert(language === 'ja' ? 'エラーが発生しました' : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.back}
        </button>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            {t.title}
          </h1>
          <p className="text-2xl text-gray-600 font-medium mb-4">{t.subtitle}</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {t.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <CheckCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
              <span className="text-gray-900 font-semibold">{feature}</span>
            </div>
          ))}
        </div>

        {step === 'select' && (
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">{t.selectType}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {consultationTypes.map(({ type, icon: Icon, name, desc, price }) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setStep('form');
                  }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                  <div className="relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200 group-hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{name}</h3>
                    <p className="text-gray-600 mb-4">{desc}</p>
                    <div className="text-3xl font-black text-rose-600">{price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'form' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <h2 className="text-3xl font-black text-gray-900 mb-8">{t.form.title}</h2>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    {t.form.date}
                  </label>
                  <input
                    type="date"
                    value={formData.consultationDate}
                    onChange={(e) => setFormData({ ...formData, consultationDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Clock className="w-4 h-4" />
                    {t.form.time}
                  </label>
                  <input
                    type="time"
                    value={formData.consultationTime}
                    onChange={(e) => setFormData({ ...formData, consultationTime: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    {t.form.symptoms}
                  </label>
                  <textarea
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    placeholder={t.form.symptomsPlaceholder}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none font-medium resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    {t.form.language}
                  </label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none font-semibold"
                  >
                    <option value="ja">{t.form.languages.ja}</option>
                    <option value="en">{t.form.languages.en}</option>
                    <option value="zh">{t.form.languages.zh}</option>
                    <option value="ko">{t.form.languages.ko}</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep('select')}
                  className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                >
                  {t.buttons.cancel}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.consultationDate || !formData.consultationTime || !formData.symptoms}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-2xl hover:from-rose-500 hover:to-pink-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '処理中...' : t.buttons.book}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
