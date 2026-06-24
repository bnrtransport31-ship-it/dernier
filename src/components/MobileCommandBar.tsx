import { NeonButton } from './NeonButton';

interface MobileCommandBarProps {
  onOrder: () => void;
}

export function MobileCommandBar({ onOrder }: MobileCommandBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
      <NeonButton onClick={onOrder} fullWidth className="rounded-none py-4 shadow-[0_-4px_20px_rgba(0,68,255,0.3)]">
        COMMANDER — 06 XX XX XX XX
      </NeonButton>
    </div>
  );
}
