import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    highContrast,
    toggleHighContrast,
    textScale,
    cycleTextScale,
    audioAssistant,
    toggleAudioAssistant,
    alerts,
    unreadAlertCount,
    markAlertsAsRead,
    setCurrentView,
    speakText,
    toggleMobileMenu,
  } = useApp();

  const [showAlertsPopover, setShowAlertsPopover] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const alertsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (alertsRef.current && !alertsRef.current.contains(e.target as Node)) {
        setShowAlertsPopover(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenAlerts = () => {
    setShowAlertsPopover((prev) => !prev);
    if (unreadAlertCount > 0) {
      markAlertsAsRead();
    }
  };

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-4 lg:px-6 flex items-center justify-between gap-3 border-b border-surface-variant/30"
    >
      {/* Mobile Hamburger Menu Button */}
      <button
        type="button"
        onClick={toggleMobileMenu}
        aria-label="Abrir menú de navegación"
        className="lg:hidden p-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-variant/30 flex items-center justify-center cursor-pointer shrink-0"
      >
        <span className="material-symbols-outlined text-xl">menu</span>
      </button>

      {/* Global Live Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center w-full">
          <span
            aria-hidden="true"
            className="material-symbols-outlined absolute left-3.5 text-outline pointer-events-none text-xl"
          >
            search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Búsqueda global corporativa de clientes, pedidos y dispositivos Smart Bin"
            placeholder="Buscar clientes, pedidos, dispositivos Smart Bin IA..."
            className="w-full h-10 pl-11 pr-4 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline text-sm shadow-[0_1px_8px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-secondary transition-all border border-surface-variant/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-outline hover:text-on-surface text-xs p-1"
              aria-label="Limpiar búsqueda"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Universal Accessibility & Actions Header Toolbar */}
      <div className="flex items-center gap-2">
        {/* WCAG AAA Inclusivity Controls */}
        <div
          role="group"
          aria-label="Herramientas de Accesibilidad Universal"
          className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-surface-variant/30"
        >
          {/* High Contrast */}
          <button
            type="button"
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            title={`Modo Alto Contraste WCAG AAA (Alt+C) - ${highContrast ? 'Activo' : 'Inactivo'}`}
            aria-label={`Modo Alto Contraste WCAG AAA - Actualmente ${highContrast ? 'Activo' : 'Inactivo'}`}
            className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              highContrast
                ? 'bg-primary text-on-primary ring-2 ring-primary'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-lg">
              contrast
            </span>
          </button>

          {/* Adaptive Font Sizing */}
          <button
            type="button"
            onClick={cycleTextScale}
            title={`Tamaño de Texto Adaptativo (Alt+T) - Nivel actual: ${
              textScale === 'normal' ? 'Normal' : textScale === 'large' ? '+15%' : '+30%'
            }`}
            aria-label={`Tamaño de Texto Adaptativo - Nivel actual: ${
              textScale === 'normal' ? 'Normal' : textScale === 'large' ? '+15%' : '+30%'
            }`}
            className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              textScale !== 'normal'
                ? 'bg-secondary text-on-secondary ring-2 ring-secondary'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-lg">
              format_size
            </span>
          </button>

          {/* Screen Reader Voice Narration Assistant */}
          <button
            type="button"
            onClick={toggleAudioAssistant}
            aria-pressed={audioAssistant}
            title={`Asistente de Lectura por Voz (Alt+A) - ${audioAssistant ? 'Activado' : 'Desactivado'}`}
            aria-label={`Asistente de Lectura por Voz - ${audioAssistant ? 'Activado' : 'Desactivado'}`}
            className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              audioAssistant
                ? 'bg-tertiary-container text-on-tertiary ring-2 ring-tertiary-container animate-pulse'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-lg">
              hearing
            </span>
          </button>
        </div>

        <div aria-hidden="true" className="h-6 w-px bg-surface-variant mx-1" />

        {/* Notifications & Telemetry Alerts */}
        <div className="relative" ref={alertsRef}>
          <button
            type="button"
            onClick={handleOpenAlerts}
            aria-label={`Notificaciones del sistema: ${unreadAlertCount} alertas telemétricas`}
            aria-expanded={showAlertsPopover}
            className="relative h-10 w-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-colors border border-surface-variant/30 cursor-pointer"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-xl">
              notifications
            </span>
            {unreadAlertCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface-container-lowest animate-pulse"
              />
            )}
          </button>

          {/* Alerts Popover */}
          {showAlertsPopover && (
            <div
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-variant/40 p-3 z-50 animate-fadeIn"
              role="dialog"
              aria-label="Alertas y Telemetría en Vivo"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-variant/30">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">sensors</span>
                  <span className="font-title text-sm font-bold text-on-surface">
                    Alertas Telemétricas de la Flota
                  </span>
                </div>
                <span className="text-xs text-secondary font-semibold">En tiempo real</span>
              </div>

              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {alerts.map((al) => (
                  <div
                    key={al.id}
                    className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-1 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold flex items-center gap-1 ${
                          al.type === 'warning'
                            ? 'text-tertiary'
                            : al.type === 'info'
                            ? 'text-secondary'
                            : 'text-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {al.type === 'warning'
                            ? 'warning'
                            : al.type === 'info'
                            ? 'info'
                            : 'check_circle'}
                        </span>
                        {al.title}
                      </span>
                      <span className="text-[11px] text-outline">{al.time}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{al.detail}</p>
                    {al.binSerial && (
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentView('servicios-de-mantenimiento');
                          setShowAlertsPopover(false);
                          speakText(`Navegando a mantenimiento para atender ${al.binSerial}`);
                        }}
                        className="self-start text-[11px] text-primary font-bold hover:underline flex items-center gap-0.5 mt-0.5"
                      >
                        <span>Abrir diagnóstico de {al.binSerial}</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User profile */}
        <div className="relative" ref={profileRef}>
          <div className="flex items-center gap-2 pl-1">
            <div className="flex flex-col text-right hidden lg:flex">
              <span className="text-sm font-bold text-on-surface leading-tight">
                Elena Domínguez
              </span>
              <span className="text-xs text-secondary font-medium">
                Gerente de Operaciones &amp; BI
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              aria-label="Menú de perfil de usuario corporativo"
              aria-expanded={showProfileMenu}
              className="flex items-center gap-1 rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
            >
              <img
                alt="Foto de Elena Domínguez"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-surface-variant"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAANJb_z7quBMmCX7R2OmOGBAabe4eGNBFTGzmGj-uqh2poy50UWTAa6495YEcfsa4b4M5SRxukcRmwwK9XoonRU5-ij1evO6w0vPWx1WJ2FbeHhKOr96Ln1Lhk1CbKKa_Q_ou0qHCKkN75fjccgfC1cizrgdEDGVDo6meHVYoLqJB1aRbCL_aSWh1q3H0Xc579PzibhnMMKf1gCzSfbbWVyhgtFMaACZ4OwYDNPuw"
              />
            </button>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div
              className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-variant/40 p-2 z-50 text-left animate-fadeIn"
              role="menu"
              aria-label="Opciones de perfil"
            >
              <div className="p-3 border-b border-surface-variant/30">
                <p className="text-sm font-bold text-on-surface">Elena Domínguez</p>
                <p className="text-xs text-secondary">e.dominguez@ecosphere.clean</p>
                <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-primary-container text-on-primary font-semibold">
                  Credencial Nivel 4 (Master ESG)
                </span>
              </div>
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('bi-metricas-de-reciclaje');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-3 py-2 text-xs text-on-surface hover:bg-surface-container flex items-center gap-2 rounded-lg"
                >
                  <span className="material-symbols-outlined text-base text-secondary">monitoring</span>
                  <span>Ver KPIs de Planta &amp; ESG</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    cycleTextScale();
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-3 py-2 text-xs text-on-surface hover:bg-surface-container flex items-center gap-2 rounded-lg"
                >
                  <span className="material-symbols-outlined text-base text-secondary">accessibility</span>
                  <span>Cambiar escala tipográfica</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
