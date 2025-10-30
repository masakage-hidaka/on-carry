import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber = '447862123343', // OnCarry emergency support number
  message,
  className = ''
}: WhatsAppButtonProps) {
  const { language } = useLanguage();

  const defaultMessage = language === 'ja'
    ? 'こんにちは、緊急サポートが必要です。'
    : 'Hello, I need emergency support.';

  const whatsappText = encodeURIComponent(message || defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappText}`;

  const buttonText = language === 'ja' ? '緊急サポート' : 'Emergency Support';
  const tooltipText = language === 'ja' ? '24/7 サポート可能' : '24/7 Help Available';
  const subtitleText = language === 'ja' ? 'すぐに対応' : 'Available Now';

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap">
          {tooltipText}
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex flex-col items-center gap-1 px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none ${className}`}
        aria-label={buttonText}
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          <div className="flex flex-col items-start">
            <span className="text-sm leading-tight">{buttonText}</span>
            <span className="text-xs opacity-90 leading-tight">{subtitleText}</span>
          </div>
        </div>
      </a>
    </div>
  );
}
