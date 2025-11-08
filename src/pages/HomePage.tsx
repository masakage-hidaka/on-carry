import { WhatsAppButton } from '../components/WhatsAppButton';
import { TravelHubSection } from '../components/TravelHubSection';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { PricingSection } from '../components/PricingSection';
import { ServiceEcosystem } from '../components/ServiceEcosystem';
import { Footer } from '../components/Footer';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <HeroSection onBookNow={() => onNavigate('book')} />
        <ServiceEcosystem onNavigate={onNavigate} />
        <HowItWorksSection />
        <PricingSection onNavigate={onNavigate} />
        <TravelHubSection />
        <Footer onNavigate={onNavigate} />
        <WhatsAppButton />
      </div>
    </div>
  );
}
