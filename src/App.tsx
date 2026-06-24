import { useState, useCallback } from 'react';
import { CursorFollower } from '@/components/CursorFollower';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { MobileCommandBar } from '@/components/MobileCommandBar';
import { OrderPopup } from '@/components/OrderPopup';
import { Navigation } from '@/sections/Navigation';
import { LoadingOverlay } from '@/sections/LoadingOverlay';
import { HeroSection } from '@/sections/HeroSection';
import { ZoneInterventionSection } from '@/sections/ZoneInterventionSection';
import { MenuSection } from '@/sections/MenuSection';
import { MenusComboSection } from '@/sections/MenusComboSection';
import { OptionsSection } from '@/sections/OptionsSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { Footer } from '@/sections/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderPopupOpen, setOrderPopupOpen] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleOrder = useCallback(() => {
    setOrderPopupOpen(true);
  }, []);

  const handleCloseOrder = useCallback(() => {
    setOrderPopupOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-bac-black text-bac-white">
      <CursorFollower />
      <FloatingWhatsApp />
      <MobileCommandBar onOrder={handleOrder} />

      <LoadingOverlay onComplete={handleLoadingComplete} />

      <Navigation onOrder={handleOrder} />

      <main>
        <HeroSection isLoaded={isLoaded} onOrder={handleOrder} />
        <ZoneInterventionSection />
        <MenuSection />
        <MenusComboSection />
        <OptionsSection />
        <TestimonialsSection />
        <Footer />
      </main>

      <OrderPopup isOpen={orderPopupOpen} onClose={handleCloseOrder} />
    </div>
  );
}
