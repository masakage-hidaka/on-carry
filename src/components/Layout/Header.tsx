import { Globe, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'ja' as const, name: '日本語', flag: '🇯🇵' },
    { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
    { code: 'ko' as const, name: '한국어', flag: '🇰🇷' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-black/5'
          : 'bg-white/60 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
              <span className="relative text-3xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
                OnCarry
              </span>
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <NavButton
              onClick={() => onNavigate('home')}
              isActive={currentPage === 'home'}
              label={t.nav.home}
            />
            <NavButton
              onClick={() => onNavigate('track')}
              isActive={currentPage === 'track'}
              label={t.nav.track}
            />

            {user ? (
              <>
                <div className="w-px h-6 bg-gray-200 mx-2"></div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>{t.nav.logout}</span>
                </button>
              </>
            ) : (
              <>
                <div className="w-px h-6 bg-gray-200 mx-2"></div>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="relative group overflow-hidden px-6 py-2.5 text-sm font-bold text-white rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative">{t.nav.signup}</span>
                </button>
              </>
            )}

            <div className="relative ml-2">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{currentLang?.code}</span>
              </button>

              {isLangMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                          language === lang.code
                            ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 font-bold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        {language === lang.code && (
                          <div className="ml-auto w-2 h-2 bg-orange-600 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <MobileNavButton
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              isActive={currentPage === 'home'}
              label={t.nav.home}
            />
            <MobileNavButton
              onClick={() => {
                onNavigate('track');
                setIsMenuOpen(false);
              }}
              isActive={currentPage === 'track'}
              label={t.nav.track}
            />

            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl font-semibold transition-all duration-300"
              >
                {t.nav.logout}
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl font-semibold transition-all duration-300"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => {
                    onNavigate('signup');
                    setIsMenuOpen(false);
                  }}
                  className="w-full relative overflow-hidden px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-500 hover:to-red-500 rounded-xl text-center font-bold transition-all duration-300 shadow-lg shadow-orange-500/30"
                >
                  {t.nav.signup}
                </button>
              </>
            )}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                {language === 'ja' ? '言語' : 'Language'}
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-orange-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavButton({ onClick, isActive, label }: { onClick: () => void; isActive: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
        isActive
          ? 'text-orange-600'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <span className="relative z-10">{label}</span>
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl"></div>
      )}
    </button>
  );
}

function MobileNavButton({ onClick, isActive, label }: { onClick: () => void; isActive: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-600'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}
