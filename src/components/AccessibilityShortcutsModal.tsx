import React from 'react';
import { useApp } from '../context/AppContext';

export const AccessibilityShortcutsModal: React.FC = () => {
  const {
    showShortcutsModal,
    setShowShortcutsModal,
    highContrast,
    toggleHighContrast,
    textScale,
    setTextScale,
    audioAssistant,
    toggleAudioAssistant,
    reducedMotion,
    toggleReducedMotion,
    speakText,
  } = useApp();

  if (!showShortcutsModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="acc-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/70 backdrop-blur-sm p-4 animate-fadeIn"
    >
      <div className="bg-surface-container-lowest max-w-xl w-full rounded-2xl shadow-2xl p-6 border border-surface-variant/40 flex flex-col gap-4 text-left">
        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/30">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl">accessibility_new</span>
            <h2 id="acc-modal-title" className="font-display font-bold text-xl text-on-surface">
              Centro de Accesibilidad Universal &amp; Atajos
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowShortcutsModal(false)}
            aria-label="Cerrar panel de accesibilidad"
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <p className="text-sm text-on-surface-variant">
          Esta plataforma está diseñada bajo directrices <strong>WCAG 2.2 Nivel AAA</strong> para
          garantizar una interacción fluida a usuarios con discapacidades visuales, motrices o
          auditivas.
        </p>

        {/* Quick Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* High Contrast */}
          <button
            type="button"
            onClick={toggleHighContrast}
            className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
              highContrast
                ? 'bg-primary-container text-on-primary border-primary ring-2 ring-primary'
                : 'bg-surface-container-low border-surface-variant/40 text-on-surface hover:bg-surface-container'
            }`}
          >
            <div>
              <span className="font-bold text-sm block">Alto Contraste AAA</span>
              <span className="text-xs opacity-80">Máxima legibilidad y contraste</span>
            </div>
            <span className="material-symbols-outlined text-xl">
              {highContrast ? 'check_box' : 'check_box_outline_blank'}
            </span>
          </button>

          {/* Screen Reader Voice Audio */}
          <button
            type="button"
            onClick={toggleAudioAssistant}
            className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
              audioAssistant
                ? 'bg-primary-container text-on-primary border-primary ring-2 ring-primary'
                : 'bg-surface-container-low border-surface-variant/40 text-on-surface hover:bg-surface-container'
            }`}
          >
            <div>
              <span className="font-bold text-sm block">Voz Asistida Sintética</span>
              <span className="text-xs opacity-80">Lee alertas y estados en voz alta</span>
            </div>
            <span className="material-symbols-outlined text-xl">
              {audioAssistant ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* Reduced Motion */}
          <button
            type="button"
            onClick={toggleReducedMotion}
            className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
              reducedMotion
                ? 'bg-primary-container text-on-primary border-primary ring-2 ring-primary'
                : 'bg-surface-container-low border-surface-variant/40 text-on-surface hover:bg-surface-container'
            }`}
          >
            <div>
              <span className="font-bold text-sm block">Movimiento Reducido</span>
              <span className="text-xs opacity-80">Sin animaciones bruscas</span>
            </div>
            <span className="material-symbols-outlined text-xl">
              {reducedMotion ? 'check_box' : 'check_box_outline_blank'}
            </span>
          </button>

          {/* Voice Prompt Demo */}
          <button
            type="button"
            onClick={() =>
              speakText(
                'Bienvenido a Ecosphere. Utiliza los números 1 al 5 para navegar rápidamente por los módulos de CRM, Catálogo, Mantenimiento, Checkout y BI.'
              )
            }
            className="p-3 rounded-xl border border-secondary/40 bg-secondary-fixed/20 text-on-surface flex items-center justify-between text-left hover:bg-secondary-fixed/40 transition-all cursor-pointer"
          >
            <div>
              <span className="font-bold text-sm block text-secondary">Probar Lectura por Voz</span>
              <span className="text-xs text-on-surface-variant">Ejemplo de audio asistido</span>
            </div>
            <span className="material-symbols-outlined text-xl text-secondary">play_circle</span>
          </button>
        </div>

        {/* Text Scale Selector */}
        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-variant/40">
          <label className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2">
            Escala Tipográfica Adaptativa
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setTextScale('normal')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                textScale === 'normal'
                  ? 'bg-primary text-on-primary shadow'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Normal (100%)
            </button>
            <button
              type="button"
              onClick={() => setTextScale('large')}
              className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                textScale === 'large'
                  ? 'bg-primary text-on-primary shadow'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Grande (+15%)
            </button>
            <button
              type="button"
              onClick={() => setTextScale('xlarge')}
              className={`py-2 px-3 rounded-lg text-base font-bold transition-all ${
                textScale === 'xlarge'
                  ? 'bg-primary text-on-primary shadow'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Extra (+30%)
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts List */}
        <div className="bg-surface-container-lowest border border-surface-variant/30 rounded-xl p-3 flex flex-col gap-2">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Atajos Rápidos de Teclado (Navegación sin ratón)
          </span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-on-surface">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Módulo CRM &amp; Ventas:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold">1</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Módulo Catálogo Smart Bin:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold">2</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Módulo Mantenimiento:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold">3</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Módulo Checkout B2B:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold">4</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Módulo BI &amp; Reciclaje:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold">5</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Abrir / Cerrar este panel:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold">?</kbd>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => setShowShortcutsModal(false)}
            className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm shadow hover:bg-primary-container transition-colors cursor-pointer"
          >
            Entendido, Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
