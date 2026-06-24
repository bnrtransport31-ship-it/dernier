import { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Check, Plus, Minus } from 'lucide-react';
import { NeonButton } from './NeonButton';
import { OutlineButton } from './OutlineButton';
import { NeonLine } from './NeonLine';
import { cn } from '@/lib/utils';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

const MENU_ITEMS: OrderItem[] = [
  { id: 'b1', name: 'Le Classic Intervention', price: 9.90, category: 'BURGERS' },
  { id: 'b2', name: 'Le B.A.C Spécial', price: 12.90, category: 'BURGERS' },
  { id: 'b3', name: 'Le Crispy Unité', price: 10.90, category: 'BURGERS' },
  { id: 'b4', name: 'Le Night Stack', price: 13.90, category: 'BURGERS' },
  { id: 'b5', name: 'Le French B.A.C', price: 11.90, category: 'BURGERS' },
  { id: 'c1', name: 'Crousty Classic', price: 5.90, category: 'CROUSTY' },
  { id: 'c2', name: 'Crousty B.A.C', price: 7.90, category: 'CROUSTY' },
  { id: 'c3', name: 'Crousty Tenders', price: 6.90, category: 'CROUSTY' },
  { id: 'c4', name: 'Box Croustération', price: 12.90, category: 'CROUSTY' },
  { id: 'a1', name: 'Frites Maison', price: 3.50, category: 'ACCOMPAGNEMENTS' },
  { id: 'a2', name: 'Frites Cheesy B.A.C', price: 4.50, category: 'ACCOMPAGNEMENTS' },
  { id: 'a3', name: 'Onion Rings', price: 4.00, category: 'ACCOMPAGNEMENTS' },
  { id: 'a4', name: 'Nuggets x6', price: 4.50, category: 'ACCOMPAGNEMENTS' },
  { id: 'd1', name: 'Coca / Zéro / Fanta / Sprite', price: 2.50, category: 'BOISSONS' },
  { id: 'd2', name: 'Ice Tea / Tropico', price: 2.50, category: 'BOISSONS' },
  { id: 'd3', name: 'Eau Plate / Gazeuse', price: 1.50, category: 'BOISSONS' },
  { id: 'd4', name: 'Red Bull', price: 3.50, category: 'BOISSONS' },
];

interface OrderState {
  [itemId: string]: { checked: boolean; quantity: number };
}

interface OrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderPopup({ isOpen, onClose }: OrderPopupProps) {
  const [orderState, setOrderState] = useState<OrderState>({});
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [confirmed, setConfirmed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Animate open/close
  useEffect(() => {
    if (isOpen && overlayRef.current && cardRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(cardRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (overlayRef.current && cardRef.current) {
      gsap.to(cardRef.current, { opacity: 0, scale: 0.95, duration: 0.3 });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
    } else {
      onClose();
    }
  }, [onClose]);

  const toggleItem = (itemId: string) => {
    setOrderState(prev => ({
      ...prev,
      [itemId]: {
        checked: !prev[itemId]?.checked,
        quantity: prev[itemId]?.quantity || 1,
      },
    }));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setOrderState(prev => {
      const current = prev[itemId]?.quantity || 1;
      const newQty = Math.max(1, current + delta);
      return { ...prev, [itemId]: { ...prev[itemId], quantity: newQty } };
    });
  };

  const total = MENU_ITEMS.reduce((sum, item) => {
    const state = orderState[item.id];
    if (state?.checked) {
      return sum + item.price * state.quantity;
    }
    return sum;
  }, 0);

  const handleSubmit = () => {
    setConfirmed(true);
    // Animate badge
    setTimeout(() => {
      const badge = document.querySelector('.confirmation-badge');
      if (badge) {
        gsap.fromTo(badge, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
      }
    }, 50);
  };

  const categories = ['BURGERS', 'CROUSTY', 'ACCOMPAGNEMENTS', 'BOISSONS'];

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(5, 5, 5, 0.9)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-bac-surface border border-bac-blue/20 rounded-xl p-6 md:p-10"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:text-bac-blue hover:rotate-90 transition-all duration-300"
        >
          <X className="w-6 h-6" />
        </button>

        {!confirmed ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-bac-blue/15 text-bac-blue-light text-xs font-inter font-medium uppercase rounded border border-bac-blue/30">
                APPEL D&apos;URGENCE
              </span>
              <h2 className="mt-3 font-bebas text-4xl text-white">FAIM SIGNALÉE</h2>
              <p className="mt-1 font-inter text-sm text-bac-gray">
                Remplis le formulaire, on s&apos;occupe du reste.
              </p>
            </div>

            <NeonLine className="mb-6" />

            {/* Form */}
            <div className="space-y-4 mb-6">
              {[
                { label: 'NOM', key: 'name', type: 'text', placeholder: 'Ton nom' },
                { label: 'TÉLÉPHONE', key: 'phone', type: 'tel', placeholder: '06 XX XX XX XX' },
                { label: 'ADRESSE DE LIVRAISON', key: 'address', type: 'text', placeholder: 'Ton adresse à Toulouse' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block font-inter font-medium text-xs text-bac-gray uppercase mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 bg-bac-dark border border-white/10 rounded text-white font-inter text-base
                      placeholder:text-bac-gray/50 focus:border-bac-blue focus:shadow-[0_0_12px_rgba(0,68,255,0.2)]
                      transition-all duration-200 outline-none"
                  />
                </div>
              ))}
            </div>

            <NeonLine className="mb-6" />

            {/* Menu Selection */}
            <h3 className="font-bebas text-2xl text-white mb-4">SÉLECTIONNE TON INTERVENTION</h3>

            <div className="space-y-6">
              {categories.map(category => (
                <div key={category}>
                  <h4 className="font-inter font-medium text-sm text-bac-blue-light uppercase mb-2">
                    {category}
                  </h4>
                  <div className="space-y-2">
                    {MENU_ITEMS.filter(item => item.category === category).map(item => {
                      const state = orderState[item.id];
                      const isChecked = state?.checked || false;
                      return (
                        <div key={item.id} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => toggleItem(item.id)}
                              className={cn(
                                'w-6 h-6 border rounded flex items-center justify-center transition-all duration-200 shrink-0',
                                isChecked
                                  ? 'bg-bac-blue border-bac-blue'
                                  : 'border-bac-blue bg-transparent'
                              )}
                            >
                              {isChecked && <Check className="w-4 h-4 text-white" />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <span className="font-inter font-medium text-sm text-white">{item.name}</span>
                              <span className="ml-2 font-inter text-xs text-bac-gray">{item.price.toFixed(2)}€</span>
                            </div>
                          </div>
                          {isChecked && (
                            <div className="flex items-center gap-2 ml-3">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 bg-bac-dark border border-white/10 rounded flex items-center justify-center text-white hover:bg-bac-blue transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-inter font-medium text-sm text-white w-6 text-center">
                                {state.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 bg-bac-dark border border-white/10 rounded flex items-center justify-center text-white hover:bg-bac-blue transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <NeonLine className="my-6" />

            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-bebas text-xl text-bac-gray">TOTAL</span>
              <span className="font-bebas text-2xl text-bac-blue">{total.toFixed(2)}€</span>
            </div>

            {/* Submit */}
            <NeonButton onClick={handleSubmit} icon fullWidth>
              LANCER L&apos;INTERVENTION
            </NeonButton>

            <p className="mt-3 text-center font-inter text-xs text-bac-gray">
              Un membre de l&apos;unité te contactera pour confirmer.
            </p>
          </>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8">
            <div className="confirmation-badge inline-flex items-center gap-3 px-8 py-5 bg-bac-blue/15 border-2 border-bac-blue rounded-lg">
              <Check className="w-8 h-8 text-bac-blue" />
              <span className="font-bebas text-3xl text-white">FAIM ÉLIMINÉE</span>
            </div>
            <h3 className="mt-6 font-bebas text-2xl text-white">Intervention enregistrée !</h3>
            <p className="mt-2 font-inter text-base text-bac-gray">
              Notre unité te contactera sous peu pour confirmer ta commande.
            </p>
            <div className="mt-8">
              <OutlineButton onClick={handleClose}>
                FERMER
              </OutlineButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
