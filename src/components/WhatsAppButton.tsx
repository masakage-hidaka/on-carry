import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber = '818012345678', // Default placeholder - replace with actual number
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

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${className}`}
      aria-label={buttonText}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">{buttonText}</span>
    </a>
  );
}
