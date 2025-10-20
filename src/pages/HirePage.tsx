import { useLanguage } from '../contexts/LanguageContext';

interface HirePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function HirePage({ onNavigate }: HirePageProps) {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => onNavigate('home')}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === 'ja' ? '戻る' : 'Back'}
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ja' ? 'ハイヤー手配' : 'Travel Hire Service'}
          </h1>
          <p className="text-gray-600">
            {language === 'ja'
              ? 'ハイヤー予約ページは準備中です'
              : 'Hire booking page coming soon'}
          </p>
        </div>
      </div>
    </div>
  );
}
