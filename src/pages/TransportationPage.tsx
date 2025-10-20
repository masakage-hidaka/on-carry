import { useEffect } from 'react';

interface TransportationPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function TransportationPage({ onNavigate }: TransportationPageProps) {
  useEffect(() => {
    onNavigate('book');
  }, [onNavigate]);

  return null;
}
