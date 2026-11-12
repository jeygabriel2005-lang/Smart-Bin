import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CATALOG_MODELS,
  INITIAL_CLIENTS,
  INITIAL_ALERTS,
  ModelProduct,
  SparePart,
  SystemAlert,
} from '../data/mockData';
import { ClientRecord } from '../utils/pricing';

export type NavView =
  | 'crm-ventas'
  | 'catalogo-smart-bin-ia'
  | 'servicios-de-mantenimiento'
  | 'gestion-de-pedidos-checkout'
  | 'bi-metricas-de-reciclaje';

export type TextScale = 'normal' | 'large' | 'xlarge';

export interface CartItem {
  part: SparePart;
  quantity: number;
}

export interface RepairTicket {
  id: string;
  clientId: string;
  binSerial: string;
  category: string;
  description: string;
  urgency: string;
  phone: string;
  timestamp: string;
}

interface AppContextType {
  currentView: NavView;
  setCurrentView: (view: NavView) => void;

  // Mobile navigation drawer
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
  toggleMobileMenu: () => void;

  // Accessibility States
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleHighContrast: () => void;
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  cycleTextScale: () => void;
  audioAssistant: boolean;
  setAudioAssistant: (val: boolean) => void;
  toggleAudioAssistant: () => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  toggleReducedMotion: () => void;
  speakText: (text: string) => void;
  showShortcutsModal: boolean;
  setShowShortcutsModal: (val: boolean) => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Hardware Configurator & Checkout sync
  selectedModelKey: 'office' | 'enterprise' | 'industrial';
  setSelectedModelKey: (key: 'office' | 'enterprise' | 'industrial') => void;
  units: number;
  setUnits: (u: number) => void;
  finish: string;
  setFinish: (f: string) => void;
  compartments: string;
  setCompartments: (c: string) => void;
  includeMaintenance: boolean;
  setIncludeMaintenance: (inc: boolean) => void;
  maintenanceFeePerUnit: number;
  setMaintenanceFeePerUnit: (fee: number) => void;

  // Quick Action: Preload into Checkout & Navigate
  startCheckoutWithModel: (modelKey: 'office' | 'enterprise' | 'industrial', qty?: number, maint?: boolean) => void;

  // Parts Cart
  cart: CartItem[];
  addToCart: (part: SparePart) => void;
  removeFromCart: (partId: string) => void;
  clearCart: () => void;

  // Clients & CRM
  clients: ClientRecord[];
  activeClientId: string;
  setActiveClientId: (id: string) => void;
  addClientRecord: (client: ClientRecord) => void;

  // Repair Tickets
  tickets: RepairTicket[];
  addRepairTicket: (ticket: Omit<RepairTicket, 'id' | 'timestamp'>) => string;

  // Alerts & Notifications
  alerts: SystemAlert[];
  unreadAlertCount: number;
  markAlertsAsRead: () => void;
  addAlert: (alert: Omit<SystemAlert, 'id' | 'time'>) => void;

  // Accessible live announcements
  liveAnnouncement: string;
  announceToScreenReader: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<NavView>('catalogo-smart-bin-ia');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accessibility
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState<TextScale>('normal');
  const [audioAssistant, setAudioAssistant] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Global search
  const [searchQuery, setSearchQuery] = useState('');

  // Configurator & Checkout
  const [selectedModelKey, setSelectedModelKey] = useState<'office' | 'enterprise' | 'industrial'>('enterprise');
  const [units, setUnits] = useState(2);
  const [finish, setFinish] = useState('Verde Bosque Orgánico (#2D6A4F)');
  const [compartments, setCompartments] = useState('triple');
  const [includeMaintenance, setIncludeMaintenance] = useState(false);
  const [maintenanceFeePerUnit, setMaintenanceFeePerUnit] = useState(38);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // CRM
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [activeClientId, setActiveClientId] = useState<string>('CL-9021');

  // Tickets
  const [tickets, setTickets] = useState<RepairTicket[]>([
    {
      id: 'TK-8924',
      clientId: 'CL-9021',
      binSerial: 'SB-IA-2024-9841',
      category: 'Visión / Cámara AI',
      description: 'Lente con polvo y aberración leve detectada en área de urgencias.',
      urgency: 'normal',
      phone: '+34 600 112 233',
      timestamp: 'Hoy 11:20 hrs',
    },
  ]);

  // Alerts
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [unreadAlertCount, setUnreadAlertCount] = useState<number>(INITIAL_ALERTS.length);

  // Effect to apply high contrast and text scale to body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    document.body.classList.remove('text-scale-large', 'text-scale-xlarge');
    if (textScale === 'large') {
      document.body.classList.add('text-scale-large');
    } else if (textScale === 'xlarge') {
      document.body.classList.add('text-scale-xlarge');
    }
  }, [textScale]);

  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      announceToScreenReader(next ? 'Modo de alto contraste activado' : 'Modo de contraste estándar activado');
      return next;
    });
  };

  const cycleTextScale = () => {
    setTextScale((prev) => {
      const next = prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal';
      announceToScreenReader(
        next === 'large'
          ? 'Tamaño de texto grande (+15%)'
          : next === 'xlarge'
          ? 'Tamaño de texto extra grande (+30%)'
          : 'Tamaño de texto normal'
      );
      return next;
    });
  };

  const toggleAudioAssistant = () => {
    setAudioAssistant((prev) => {
      const next = !prev;
      if (next) {
        speakText('Asistente de lectura de voz activado. Navegación guiada para Ecosphere Smart Bin.');
      } else {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      }
      return next;
    });
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const next = !prev;
      announceToScreenReader(next ? 'Modo de movimiento reducido activado' : 'Movimiento estándar activado');
      return next;
    });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const announceToScreenReader = (message: string) => {
    setLiveAnnouncement(message);
    if (audioAssistant) {
      speakText(message);
    }
  };

  const startCheckoutWithModel = (
    modelKey: 'office' | 'enterprise' | 'industrial',
    qty: number = 2,
    maint: boolean = false
  ) => {
    setSelectedModelKey(modelKey);
    setUnits(qty);
    setIncludeMaintenance(maint);
    setCurrentView('gestion-de-pedidos-checkout');
    announceToScreenReader(`Iniciando checkout con modelo ${modelKey}, ${qty} unidades.`);
  };

  const addToCart = (part: SparePart) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.part.id === part.id);
      if (existing) {
        return prev.map((item) =>
          item.part.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { part, quantity: 1 }];
    });
    announceToScreenReader(`${part.name} añadido a la orden de servicio.`);
  };

  const removeFromCart = (partId: string) => {
    setCart((prev) => prev.filter((item) => item.part.id !== partId));
  };

  const clearCart = () => setCart([]);

  const addClientRecord = (client: ClientRecord) => {
    setClients((prev) => [client, ...prev]);
    announceToScreenReader(`Nuevo cliente ${client.name} registrado en CRM.`);
  };

  const addRepairTicket = (ticket: Omit<RepairTicket, 'id' | 'timestamp'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `TK-${randomNum}`;
    const newTicket: RepairTicket = {
      ...ticket,
      id: newId,
      timestamp: 'Ahora mismo',
    };
    setTickets((prev) => [newTicket, ...prev]);
    announceToScreenReader(`Incidencia ${newId} registrada correctamente.`);
    return newId;
  };

  const markAlertsAsRead = () => {
    setUnreadAlertCount(0);
  };

  const addAlert = (alert: Omit<SystemAlert, 'id' | 'time'>) => {
    const newAlert: SystemAlert = {
      ...alert,
      id: `alt-${Date.now()}`,
      time: 'Ahora',
    };
    setAlerts((prev) => [newAlert, ...prev]);
    setUnreadAlertCount((c) => c + 1);
  };

  // Keyboard accessibility listeners (1-5 for quick tab switching, ? for shortcuts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setShowShortcutsModal((prev) => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        toggleHighContrast();
      } else if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        cycleTextScale();
      } else if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        toggleAudioAssistant();
      } else if (e.key === '1') {
        setCurrentView('crm-ventas');
      } else if (e.key === '2') {
        setCurrentView('catalogo-smart-bin-ia');
      } else if (e.key === '3') {
        setCurrentView('servicios-de-mantenimiento');
      } else if (e.key === '4') {
        setCurrentView('gestion-de-pedidos-checkout');
      } else if (e.key === '5') {
        setCurrentView('bi-metricas-de-reciclaje');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [audioAssistant]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        mobileMenuOpen,
        setMobileMenuOpen,
        toggleMobileMenu: () => setMobileMenuOpen((v) => !v),
        highContrast,
        setHighContrast,
        toggleHighContrast,
        textScale,
        setTextScale,
        cycleTextScale,
        audioAssistant,
        setAudioAssistant,
        toggleAudioAssistant,
        reducedMotion,
        setReducedMotion,
        toggleReducedMotion,
        speakText,
        showShortcutsModal,
        setShowShortcutsModal,
        searchQuery,
        setSearchQuery,
        selectedModelKey,
        setSelectedModelKey,
        units,
        setUnits,
        finish,
        setFinish,
        compartments,
        setCompartments,
        includeMaintenance,
        setIncludeMaintenance,
        maintenanceFeePerUnit,
        setMaintenanceFeePerUnit,
        startCheckoutWithModel,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        clients,
        activeClientId,
        setActiveClientId,
        addClientRecord,
        tickets,
        addRepairTicket,
        alerts,
        unreadAlertCount,
        markAlertsAsRead,
        addAlert,
        liveAnnouncement,
        announceToScreenReader,
      }}
    >
      {children}
      {/* Hidden live region for screen readers */}
      <div aria-live="assertive" className="sr-only">
        {liveAnnouncement}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
