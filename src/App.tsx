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

type Page = 'home' | 'book' | 'track' | 'login' | 'signup' | 'dashboard' | 'booking-confirmation';

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
