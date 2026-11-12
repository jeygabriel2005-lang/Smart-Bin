import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { speakText, announceToScreenReader } = useApp();
  const [period, setPeriod] = useState<'30d' | 'quarter' | 'year'>('30d');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleExportESG = () => {
    setDownloadNotice('Certificado de Auditoría ESG y huella de carbono descargado (PDF/UA).');
    speakText('Descargando auditoría ambiental certificada bajo estándar Scope 3.');
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-secondary mb-1">
            <span className="material-symbols-outlined text-base">analytics</span>
            <span className="text-xs uppercase font-bold tracking-wider">
              Inteligencia Ambiental &amp; Telemetría Circular
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-xs font-bold text-primary">GHG Protocol Scope 3</span>
          </div>

          <h1 className="font-display font-bold text-2xl lg:text-3xl text-on-surface tracking-tight">
            BI &amp; Métricas de Reciclaje Automatizado
          </h1>

          <p className="text-xs text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Consolidación en tiempo real de material clasificado mediante inferencia edge de Smart Bin
            IA, ahorro de emisiones de CO2 y pureza de fardos en origen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-high border border-surface-variant/40">
            <button
              type="button"
              onClick={() => {
                setPeriod('30d');
                announceToScreenReader('Periodo: Últimos 30 días');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                period === '30d'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              30 Días
            </button>
            <button
              type="button"
              onClick={() => {
                setPeriod('quarter');
                announceToScreenReader('Periodo: Trimestre');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                period === 'quarter'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Trimestre
            </button>
            <button
              type="button"
              onClick={() => {
                setPeriod('year');
                announceToScreenReader('Periodo: Anual');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                period === 'year'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Año Completo
            </button>
          </div>

          <button
            type="button"
            onClick={handleExportESG}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Descargar Certificado ESG</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div
          role="status"
          className="mb-6 p-4 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-between border border-primary/30 animate-fadeIn"
        >
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="material-symbols-outlined text-lg text-primary">verified</span>
            <span>{downloadNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setDownloadNotice(null)}
            className="text-on-primary-fixed text-xs p-1"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      {/* KPI Cards Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Masa Total Clasificada
            </span>
            <span className="h-8 w-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">weight</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display font-bold text-3xl text-on-surface leading-none">
              384.6
            </span>
            <span className="text-sm font-bold text-secondary">Ton</span>
          </div>
          <span className="text-[11px] text-primary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">trending_up</span> +18.4% vs mes
            anterior
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              CO2 Evitado a la Atmósfera
            </span>
            <span className="h-8 w-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">co2</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display font-bold text-3xl text-primary leading-none">
              219.4
            </span>
            <span className="text-sm font-bold text-primary">Ton eq</span>
          </div>
          <span className="text-[11px] text-on-surface-variant">
            Equivale a 84,200 km de transporte fósil evitado
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Pureza en Origen
            </span>
            <span className="h-8 w-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">verified</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display font-bold text-3xl text-on-surface leading-none">
              98.7%
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
              Grado Alimentario
            </span>
          </div>
          <span className="text-[11px] text-on-surface-variant">
            Solo 1.3% de contaminación cruzada
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Valor Económico Recuperado
            </span>
            <span className="h-8 w-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">payments</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display font-bold text-3xl text-tertiary leading-none">
              € 64.8K
            </span>
          </div>
          <span className="text-[11px] text-on-surface-variant">
            Ingresos generados por venta de subproductos a plantas
          </span>
        </div>
      </section>

      {/* Two Column Section: Material Breakdown & Environmental Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Material Distribution */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-on-surface">
                Desglose por Fracción de Residuo
              </h2>
              <span className="text-xs text-secondary font-bold">Auditoría con Cámara NIR</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* PET */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-on-surface">
                    <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
                    Plásticos PET &amp; Termoplásticos
                  </span>
                  <span className="text-secondary">142.2 Ton (37%)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[37%]" />
                </div>
              </div>

              {/* Organics */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-on-surface">
                    <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                    Materia Orgánica &amp; Compost
                  </span>
                  <span className="text-primary">118.0 Ton (31%)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[31%]" />
                </div>
              </div>

              {/* Paper / Cardboard */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-on-surface">
                    <span className="w-3 h-3 rounded-full bg-tertiary inline-block" />
                    Papel, Cartón &amp; Celulosa
                  </span>
                  <span className="text-tertiary">75.8 Ton (20%)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[20%]" />
                </div>
              </div>

              {/* Aluminum / Metals */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-on-surface">
                    <span className="w-3 h-3 rounded-full bg-outline inline-block" />
                    Aluminio &amp; Metales Ligeros
                  </span>
                  <span className="text-on-surface-variant">48.6 Ton (12%)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-outline h-full w-[12%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs text-on-surface-variant border border-surface-variant/30">
            <span>Algoritmo de clasificación auditado por Bureau Veritas</span>
            <span className="font-bold text-primary">Precisión promedio: 99.2%</span>
          </div>
        </div>

        {/* Environmental Equivalencies */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-on-surface">
                Impacto en la Biosfera
              </h2>
              <span className="material-symbols-outlined text-primary">eco</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-3 border border-surface-variant/30">
                <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">forest</span>
                </div>
                <div>
                  <span className="font-display font-bold text-lg text-on-surface block leading-tight">
                    3,420 Árboles
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Preservados por reciclaje de celulosa y cartón
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-3 border border-surface-variant/30">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">water_drop</span>
                </div>
                <div>
                  <span className="font-display font-bold text-lg text-on-surface block leading-tight">
                    480,000 Litros
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    De agua potable ahorrada en procesos industriales
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-3 border border-surface-variant/30">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">bolt</span>
                </div>
                <div>
                  <span className="font-display font-bold text-lg text-on-surface block leading-tight">
                    89,200 kWh
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Energía eléctrica limpia ahorrada en refinería secundaria
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-variant/20 flex items-center justify-between text-xs">
            <span className="text-secondary font-bold">Índice Circularidad: 94.6/100</span>
            <span className="text-outline">Actualizado hace 12 min</span>
          </div>
        </div>
      </div>
    </div>
  );
};
