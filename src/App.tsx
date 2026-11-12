/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { MaintenanceView } from './components/MaintenanceView';
import { CheckoutView } from './components/CheckoutView';
import { CrmView } from './components/CrmView';
import { AnalyticsView } from './components/AnalyticsView';
import { AccessibilityShortcutsModal } from './components/AccessibilityShortcutsModal';

const AppContent: React.FC = () => {
  const { currentView, audioAssistant, toggleAudioAssistant } = useApp();

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased flex">
      {/* Skip to Main Content Link for Keyboard & Screen Reader Users (WCAG AAA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-lg focus:shadow-xl font-bold text-xs"
      >
        Saltar directamente al contenido principal
      </a>

      {/* Main Persistent Sidebar */}
      <Sidebar />

      {/* Primary Workspace Layout */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen">
        {/* Global Accessible Header */}
        <Header />

        {/* Dynamic Views */}
        <main
          id="main-content"
          role="main"
          className="w-full pt-20 px-6 lg:px-8 py-6 min-h-screen flex-1"
        >
          {currentView === 'crm-ventas' && <CrmView />}
          {currentView === 'catalogo-smart-bin-ia' && <CatalogView />}
          {currentView === 'servicios-de-mantenimiento' && <MaintenanceView />}
          {currentView === 'gestion-de-pedidos-checkout' && <CheckoutView />}
          {currentView === 'bi-metricas-de-reciclaje' && <AnalyticsView />}
        </main>
      </div>

      {/* Universal Accessibility Shortcuts & Assistance Dialog */}
      <AccessibilityShortcutsModal />

      {/* Floating Audio Assistant Indicator when active */}
      {audioAssistant && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 z-40 bg-surface-container-lowest border border-tertiary-container/40 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fadeIn"
        >
          <div className="h-3 w-3 rounded-full bg-tertiary-container animate-ping" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-on-surface">Voz Asistida Activa</span>
            <span className="text-[10px] text-on-surface-variant">
              Narrando actualizaciones y navegación
            </span>
          </div>
          <button
            type="button"
            onClick={toggleAudioAssistant}
            aria-label="Silenciar asistente de voz"
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container text-xs ml-1"
          >
            <span className="material-symbols-outlined text-base">volume_off</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
