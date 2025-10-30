import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { TrackingPage } from './pages/TrackingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { TransportationPage } from './pages/TransportationPage';
import { HirePage } from './pages/HirePage';
import { DoctorPage } from './pages/DoctorPage';
import { DinnerPage } from './pages/DinnerPage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { CareersPage } from './pages/CareersPage';
import { PressPage } from './pages/PressPage';
import { PartnerPage } from './pages/PartnerPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { SitemapPage } from './pages/SitemapPage';

type Page = 'home' | 'book' | 'track' | 'login' | 'signup' | 'dashboard' | 'booking-confirmation' | 'transportation' | 'hire' | 'doctor' | 'dinner' | 'hire-booking' | 'doctor-booking' | 'dinner-booking' | 'airport-booking' | 'transportation-combined' | 'about' | 'team' | 'careers' | 'press' | 'partner' | 'privacy' | 'terms' | 'refund' | 'sitemap';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const navigate = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page as Page);
    if (params) {
      setPageParams(params);
    } else {
      setPageParams({});
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'transportation':
        return <TransportationPage onNavigate={navigate} />;
      case 'hire':
        return <HirePage onNavigate={navigate} />;
      case 'doctor':
        return <DoctorPage onNavigate={navigate} />;
      case 'dinner':
        return <DinnerPage onNavigate={navigate} />;
      case 'book':
        return <BookingPage onNavigate={navigate} initialHotelId={pageParams.hotelId} />;
      case 'booking-confirmation':
        return <BookingConfirmationPage onNavigate={navigate} bookingNumber={pageParams.bookingNumber} />;
      case 'track':
        return <TrackingPage bookingNumber={pageParams.bookingNumber} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'signup':
        return <SignupPage onNavigate={navigate} />;
      case 'about':
        return <AboutPage />;
      case 'team':
        return <TeamPage />;
      case 'careers':
        return <CareersPage />;
      case 'press':
        return <PressPage />;
      case 'partner':
        return <PartnerPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'refund':
        return <RefundPolicyPage />;
      case 'sitemap':
        return <SitemapPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <Header onNavigate={navigate} currentPage={currentPage} />
          {renderPage()}
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
