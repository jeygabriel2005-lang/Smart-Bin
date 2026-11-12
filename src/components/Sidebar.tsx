import React from 'react';
import { useApp, NavView } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    setShowShortcutsModal,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useApp();

  const navItems: { path: NavView; label: string; icon: string; shortcut: string }[] = [
    { path: 'crm-ventas', label: 'CRM & Ventas', icon: 'group_work', shortcut: '1' },
    { path: 'catalogo-smart-bin-ia', label: 'Catálogo & Smart Bin IA', icon: 'inventory_2', shortcut: '2' },
    { path: 'servicios-de-mantenimiento', label: 'Servicios de Mantenimiento', icon: 'build_circle', shortcut: '3' },
    { path: 'gestion-de-pedidos-checkout', label: 'Gestión de Pedidos & Checkout', icon: 'shopping_cart_checkout', shortcut: '4' },
    { path: 'bi-metricas-de-reciclaje', label: 'BI & Métricas de Reciclaje', icon: 'analytics', shortcut: '5' },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          role="presentation"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-on-background/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        aria-label="Navegación Principal de la Plataforma"
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.06)] z-50 flex flex-col justify-between select-none border-r border-surface-variant/40 transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
      <div className="flex flex-col">
        {/* Brand header */}
        <div className="h-16 px-6 flex items-center justify-between bg-surface-container-lowest border-b border-surface-variant/30">
          <div className="flex items-center gap-2">
            <img
              alt="Smart Clean-Tech Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/ALJJyrBlq62Q69bgr4Kj3pmaKNgQQryIyyPV49U83ie_45WkWgjmEbk8gIsuExDGx6dZj_uO2L4sLzlm72CmnAW6jWdPHzPQTKg_GLc7DI_t7dVsa1PhNRjvjuM0u7eY0heIt-DO2ia7mtCQoCNAfgGBLhVB4WYzcrium9kWsDTtSbfhxnYb-yqZpuieKV3WlK8s7ZBVKGm3opKs527NMVqVmS5ldbjeXrRHJa-pYTJF7oqz"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-primary leading-none tracking-tight">
                Ecosphere
              </span>
              <span className="text-[11px] font-semibold text-secondary tracking-wider uppercase mt-1">
                BI &amp; CRM Hardware
              </span>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menú de navegación"
            className="p-1 rounded-lg text-outline hover:text-on-surface lg:hidden cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Section label */}
        <div className="px-6 py-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-outline">
            Consola Operativa
          </span>
        </div>

        {/* Navigation items */}
        <nav aria-label="Menú del Sistema" className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = currentView === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => {
                  setCurrentView(item.path);
                  setMobileMenuOpen(false);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all text-left font-medium group cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-xl transition-colors ${
                      isActive ? 'text-on-primary' : 'text-secondary group-hover:text-primary'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.path === 'servicios-de-mantenimiento' && cart.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-on-primary">
                      {cart.reduce((s, i) => s + i.quantity, 0)}
                    </span>
                  )}
                  <kbd
                    className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-primary/40 text-on-primary'
                        : 'bg-surface-container text-outline opacity-70 group-hover:opacity-100'
                    }`}
                    title={`Atajo de teclado: número ${item.shortcut}`}
                  >
                    {item.shortcut}
                  </kbd>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Fleet Status Widget & Accessibility Help */}
      <div className="p-4 flex flex-col gap-3">
        <div className="p-4 bg-surface-container-low rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-surface-variant/30">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-on-surface">Flota Smart Bin IA</span>
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary text-[11px] font-semibold">
              99.4% Online
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mb-2.5 leading-snug">
            Sensores telemétricos e inferencia visual de clasificación activos.
          </p>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[94%]" />
          </div>
        </div>

        {/* Shortcuts quick button */}
        <button
          type="button"
          onClick={() => setShowShortcutsModal(true)}
          className="flex items-center justify-center gap-2 py-1.5 text-xs text-secondary hover:text-on-surface transition-colors rounded-lg bg-surface-container/60 hover:bg-surface-container"
          aria-label="Abrir panel de atajos de teclado y accesibilidad"
        >
          <span className="material-symbols-outlined text-base">accessibility</span>
          <span>Atajos Accesibles (Pulsa <kbd className="font-mono font-bold">?</kbd>)</span>
        </button>
      </div>
    </aside>
    </>
  );
};
