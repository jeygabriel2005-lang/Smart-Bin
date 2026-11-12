import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATALOG_MODELS, ModelProduct } from '../data/mockData';
import { calculateOrderPricing, formatCurrency } from '../utils/pricing';

export const CatalogView: React.FC = () => {
  const {
    selectedModelKey,
    setSelectedModelKey,
    units,
    setUnits,
    finish,
    setFinish,
    includeMaintenance,
    setIncludeMaintenance,
    startCheckoutWithModel,
    speakText,
    announceToScreenReader,
  } = useApp();

  const [activeHotspot, setActiveHotspot] = useState<number>(1);
  const [deliveryAddress, setDeliveryAddress] = useState('Calle Agustín de Foxá 24, Planta 3, Madrid');
  const [connectivityModule, setConnectivityModule] = useState('WiFi 6E Corporativo + Ethernet PoE');

  const selectedModel: ModelProduct =
    CATALOG_MODELS.find((m) => m.key === selectedModelKey) || CATALOG_MODELS[1];

  const pricing = calculateOrderPricing({
    basePrice: selectedModel.basePrice,
    quantity: units,
    maintenanceFeePerUnit: 49,
    hasMaintenance: includeMaintenance,
    shippingCost: 0, // In catalog preview, shipping is initial bonification
  });

  const handleSelectModel = (model: ModelProduct) => {
    setSelectedModelKey(model.key);
    announceToScreenReader(`Modelo ${model.name} seleccionado.`);
    const el = document.getElementById('configurador-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToCheckout = () => {
    startCheckoutWithModel(selectedModel.key, units, includeMaintenance);
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn">
      {/* Top Header & Hardware Sub-bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-secondary mb-1">
            <span className="text-xs uppercase font-bold tracking-wider">
              Línea de Hardware Industrial
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-xs font-semibold text-primary">Generación IV - Edge Neural</span>
          </div>
          <h1 className="font-display font-bold text-2xl lg:text-3xl text-on-surface tracking-tight">
            Smart Bin IA: Separación Inteligente por Inferencia Visual
          </h1>
        </div>

        {/* Live Hardware Telemetry Capsule */}
        <div className="flex items-center gap-4 bg-surface-container-lowest p-2.5 px-4 rounded-xl shadow-sm border border-surface-variant/40 self-start lg:self-auto">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span className="text-xs font-bold text-on-surface">Red Neural V4.8 Activa</span>
          </div>
          <div className="h-4 w-px bg-surface-variant" />
          <div className="text-xs text-on-surface-variant">
            Latencia de inferencia: <span className="font-bold text-primary">42 ms</span>
          </div>
        </div>
      </div>

      {/* Hero Visual Section: Interactive Hotspots + Operational Engineering Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
        {/* Visual Display with Interactive Hotspots */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-variant/30 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 z-10">
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold tracking-wider uppercase">
              TECNOLOGÍA PATENTADA
            </span>
            <span className="text-xs font-semibold text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span> Certificación CE
              &amp; ISO 14001
            </span>
          </div>

          {/* Interactive Mockup */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container-low mb-4 group flex items-center justify-center border border-surface-variant/20">
            <img
              alt="Smart Bin IA Hardware Industrial"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuADFGRaNjcgTweDSoqB8qk-297SwmXTXc30N57ikoAkTkl3Dh7-6cyDh-Vl5ZfZmzdt1l53Uwsd_xbQGslJ9e0mZnCaEVWPy6t6rM3FHge1g2_umMcVgYZzjPoz0RHqfUhijTV1PN-Ws14Qmt6QZWjXWze6_cyniBEG1CKf4ZmlX8xAfwg2CX3GV9vUX_fF9h1rZ8VaPz4P1sU1gx6S1fN0fdNnVpchg9WBcsyfyEA"
            />

            {/* Hotspot 1: Módulo HD */}
            <button
              type="button"
              onClick={() => {
                setActiveHotspot(1);
                announceToScreenReader('Punto 1 seleccionado: Módulo HD con sensor ToF 3D');
              }}
              className={`absolute top-8 left-1/4 -translate-x-1/2 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg transition-transform flex items-center gap-1.5 cursor-pointer text-xs font-bold ${
                activeHotspot === 1
                  ? 'bg-primary text-on-primary scale-110 ring-4 ring-primary/30'
                  : 'bg-surface-container-lowest/90 text-primary hover:scale-105'
              }`}
              aria-label="Ver detalle del Módulo Óptico HD"
            >
              <span className="material-symbols-outlined text-base">videocam</span>
              <span>1. Módulo HD</span>
            </button>

            {/* Hotspot 2: Edge IA Core */}
            <button
              type="button"
              onClick={() => {
                setActiveHotspot(2);
                announceToScreenReader('Punto 2 seleccionado: Procesador Edge IA local 2.4 TOPS');
              }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg transition-transform flex items-center gap-1.5 cursor-pointer text-xs font-bold ${
                activeHotspot === 2
                  ? 'bg-secondary text-on-secondary scale-110 ring-4 ring-secondary/30'
                  : 'bg-surface-container-lowest/90 text-secondary hover:scale-105'
              }`}
              aria-label="Ver detalle del Procesador Edge IA"
            >
              <span className="material-symbols-outlined text-base">memory</span>
              <span>2. Edge IA Core</span>
            </button>

            {/* Hotspot 3: Apertura Touchless */}
            <button
              type="button"
              onClick={() => {
                setActiveHotspot(3);
                announceToScreenReader('Punto 3 seleccionado: Apertura Mecánica Touchless WCAG AAA');
              }}
              className={`absolute bottom-8 right-1/4 translate-x-1/2 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg transition-transform flex items-center gap-1.5 cursor-pointer text-xs font-bold ${
                activeHotspot === 3
                  ? 'bg-tertiary-container text-on-tertiary scale-110 ring-4 ring-tertiary-container/30'
                  : 'bg-surface-container-lowest/90 text-tertiary hover:scale-105'
              }`}
              aria-label="Ver detalle de la Apertura Touchless"
            >
              <span className="material-symbols-outlined text-base">sensors</span>
              <span>3. Apertura Touchless</span>
            </button>
          </div>

          {/* High-level value propositions */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-surface-container-low rounded-xl text-center border border-surface-variant/30">
            <div>
              <div className="font-display font-bold text-2xl text-primary leading-tight">99.2%</div>
              <div className="text-xs text-on-surface-variant">Precisión Clasificación</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-secondary leading-tight">
                0.3 seg
              </div>
              <div className="text-xs text-on-surface-variant">Tiempo de Respuesta</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-on-surface leading-tight">
                100%
              </div>
              <div className="text-xs text-on-surface-variant">Autónomo Offline</div>
            </div>
          </div>
        </div>

        {/* Technical Explanatory Panel */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-secondary mb-1">
              <span className="material-symbols-outlined text-base">schema</span>
              <span className="text-xs font-bold uppercase tracking-wider">
                Flujo de Trabajo Operativo
              </span>
            </div>
            <h2 className="font-display font-bold text-xl text-on-surface mb-4">
              Ingeniería sin fricción para el usuario
            </h2>

            {/* Interactive Steps */}
            <div className="flex flex-col gap-3">
              {/* Step 1 */}
              <div
                onClick={() => setActiveHotspot(1)}
                className={`p-3.5 rounded-xl transition-all cursor-pointer border ${
                  activeHotspot === 1
                    ? 'bg-primary-container/10 border-primary ring-1 ring-primary'
                    : 'bg-surface-container-low border-surface-variant/30 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">lens</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-on-surface">
                        a) Visión HD con Sensor IR
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-primary-container text-on-primary font-semibold">
                        ToF 3D
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Cámara ultra gran angular de 1080p con matriz infrarroja activa. Detecta la
                      proximidad del usuario a 40 cm y mapea la densidad y volumen del residuo al
                      instante.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => setActiveHotspot(2)}
                className={`p-3.5 rounded-xl transition-all cursor-pointer border ${
                  activeHotspot === 2
                    ? 'bg-secondary-container/20 border-secondary ring-1 ring-secondary'
                    : 'bg-surface-container-low border-surface-variant/30 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-on-surface">
                        b) Procesador Edge AI Local
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-semibold">
                        NPU 2.4 TOPS
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Inferencia neural en el dispositivo. Discrimina al instante PET reciclable,
                      vidrio, restos orgánicos, latas de aluminio y derivados de celulosa sin enviar
                      datos a la nube externa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => setActiveHotspot(3)}
                className={`p-3.5 rounded-xl transition-all cursor-pointer border ${
                  activeHotspot === 3
                    ? 'bg-tertiary-fixed/30 border-tertiary ring-1 ring-tertiary'
                    : 'bg-surface-container-low border-surface-variant/30 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-tertiary-container text-on-tertiary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">accessible</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-on-surface">
                        c) Apertura Mecánica Touchless
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                        WCAG AAA
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Compuerta motorizada silenciosa orientada al compartimento verificado. Cero
                      contacto manual para máxima asepsia hospitalaria y corporativa, con altura
                      ergonómica universal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-surface-container-high rounded-xl flex items-center justify-between border border-surface-variant/40">
            <span className="text-xs text-on-surface-variant font-medium">
              Conectividad Mesh &amp; LoRaWAN
            </span>
            <span className="text-xs text-primary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">wifi</span> Telemetría Encriptada
            </span>
          </div>
        </div>
      </section>

      {/* Ethical Transparency Banner */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-5 mb-8 shadow-sm border border-surface-variant/30 flex flex-col md:flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl">verified_user</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-bold text-base text-on-surface">
              Transparencia Ética al Consumidor y Propiedad Total
            </h3>
            <span className="text-[11px] px-2 py-0.5 bg-primary-fixed text-on-primary-fixed rounded-full font-bold uppercase">
              Sin Bloqueos
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            El <strong className="text-on-surface">Smart Bin IA funciona de manera 100% autónoma y completa desde el primer día</strong>. El Servicio de Mantenimiento Preventivo y Sustitución de Piezas es complementario y estrictamente opcional, diseñado para extender la vida útil según el volumen operativo de su instalación sin forzar suscripciones obligatorias.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            speakText('Nuestros equipos inteligentes no requieren contratos forzosos para operar.');
            announceToScreenReader('Garantía oficial estándar incluida por 3 años.');
          }}
          className="shrink-0 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-variant text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Garantía de Fábrica 3 Años</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Models Catalog Section */}
      <section className="mb-8" id="catalogo">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Portafolio Modular 2025
            </span>
            <h2 className="font-display font-bold text-2xl text-on-surface">
              Catálogo de Modelos Smart Bin IA
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant max-w-md">
            Diseñados con chasis de acero al carbono reciclado y bandejas de polímero bacteriostático de fácil extracción.
          </p>
        </div>

        {/* 3 Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATALOG_MODELS.map((model) => {
            const isSelected = selectedModelKey === model.key;
            return (
              <div
                key={model.id}
                className={`bg-surface-container-lowest rounded-2xl p-6 shadow-sm border transition-all flex flex-col justify-between group hover:shadow-md relative ${
                  model.featured
                    ? 'border-primary ring-2 ring-primary/40'
                    : isSelected
                    ? 'border-secondary ring-2 ring-secondary/30'
                    : 'border-surface-variant/30'
                }`}
              >
                {model.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    Estándar Corporativo Más Elegido
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-surface-container text-on-surface-variant">
                      {model.badge}
                    </span>
                    <span className="text-xs font-semibold text-secondary">
                      {model.targetAudience}
                    </span>
                  </div>

                  <div className="aspect-4/3 rounded-xl overflow-hidden bg-surface-container-low mb-4 border border-surface-variant/20">
                    <img
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={model.image}
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg text-on-surface">{model.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-1 mb-4 leading-relaxed line-clamp-2">
                    {model.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-col gap-1.5 py-3 mb-4 bg-surface-container-low rounded-xl px-4 text-xs border border-surface-variant/20">
                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Capacidad Total:</span>
                      <span className="font-bold text-on-surface">{model.specs.capacity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Separación:</span>
                      <span className="font-bold text-primary">{model.specs.separation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Mecanismo / Sensores:</span>
                      <span className="font-semibold text-on-surface">{model.specs.sensors}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Chasis / Batería:</span>
                      <span className="font-semibold text-on-surface">{model.specs.chassis}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="font-display font-bold text-2xl text-on-surface">
                        {formatCurrency(model.basePrice)}
                      </span>
                      <span className="text-xs text-on-surface-variant"> + IVA</span>
                    </div>
                    <span className="text-xs font-bold text-primary">{model.delivery}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectModel(model)}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary'
                    }`}
                  >
                    <span>{isSelected ? 'Modelo Seleccionado' : 'Seleccionar Modelo'}</span>
                    <span className="material-symbols-outlined text-base">
                      {isSelected ? 'check_circle' : 'arrow_forward'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Express Configurator Section */}
      <section
        id="configurador-section"
        className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-variant/30 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 border-b border-surface-variant/30">
          <div>
            <div className="flex items-center gap-1.5 text-secondary mb-1">
              <span className="material-symbols-outlined text-base">tune</span>
              <span className="text-xs font-bold uppercase tracking-wider">
                Configurador Express B2B &amp; B2C
              </span>
            </div>
            <h2 className="font-display font-bold text-xl text-on-surface">
              Personaliza tu Despliegue de Hardware
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-xl border border-surface-variant/30">
            <span className="text-xs text-on-surface-variant font-medium">Selección activa:</span>
            <span className="text-sm font-bold text-primary">{selectedModel.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quantity Stepper */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant/30">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-1">
                  Cantidad de Unidades
                </label>
                <p className="text-xs text-on-surface-variant mb-3">
                  Descuento de flota automático a partir de 5 unidades (-12%).
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setUnits(Math.max(1, units - 1))}
                    aria-label="Disminuir una unidad"
                    className="h-10 w-10 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high flex items-center justify-center font-bold text-lg shadow-sm border border-surface-variant/30 cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={units}
                    onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                    aria-label="Número de unidades"
                    className="h-10 w-24 text-center rounded-lg bg-surface-container-lowest text-on-surface font-bold text-base shadow-sm border border-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => setUnits(units + 1)}
                    aria-label="Aumentar una unidad"
                    className="h-10 w-10 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high flex items-center justify-center font-bold text-lg shadow-sm border border-surface-variant/30 cursor-pointer"
                  >
                    +
                  </button>
                  {units >= 5 && (
                    <span className="px-2 py-1 rounded bg-primary-container text-on-primary text-xs font-bold">
                      -12% Flota Activo
                    </span>
                  )}
                </div>
              </div>

              {/* Finish Variant */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant/30">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-1">
                  Acabado y Color Estructural
                </label>
                <p className="text-xs text-on-surface-variant mb-3">
                  Pintura electrostática con protección UV y huellas dactilares.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFinish('Verde Bosque Orgánico (#2D6A4F)')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      finish.includes('Verde')
                        ? 'bg-surface-container-lowest border-primary ring-2 ring-primary text-on-surface'
                        : 'bg-surface-container-lowest border-surface-variant/40 text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                    <span>Verde / Grafito</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinish('Blanco Quirúrgico Puro (#F8F9FA)')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      finish.includes('Blanco')
                        ? 'bg-surface-container-lowest border-secondary ring-2 ring-secondary text-on-surface'
                        : 'bg-surface-container-lowest border-surface-variant/40 text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-surface-variant inline-block border border-outline" />
                    <span>Blanco Sala</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Ethical Maintenance Service Selector */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <span>Servicio Opcional de Mantenimiento Preventivo &amp; Telemetría Premium</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-bold uppercase">
                    100% Opcional
                  </span>
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-3">
                Garantiza sustitución in situ de sensores, calibración de lentes HD cada 6 meses y recambio inmediato de servomotores.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Standalone Hardware */}
                <label
                  onClick={() => setIncludeMaintenance(false)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    !includeMaintenance
                      ? 'bg-surface-container-lowest border-primary ring-2 ring-primary'
                      : 'bg-surface-container-lowest/80 border-surface-variant/40 hover:bg-surface-container-lowest'
                  }`}
                >
                  <input
                    type="radio"
                    name="maint-choice"
                    checked={!includeMaintenance}
                    onChange={() => setIncludeMaintenance(false)}
                    className="mt-1 h-4 w-4 text-primary"
                  />
                  <div>
                    <span className="text-sm font-bold text-on-surface block">
                      Sin Mantenimiento Suscrito
                    </span>
                    <span className="text-xs text-on-surface-variant block mt-0.5">
                      El equipo opera completamente autónomo. Soporte técnico por demanda estándar.
                    </span>
                    <span className="text-xs font-bold text-primary block mt-1.5">€ 0 / mes</span>
                  </div>
                </label>

                {/* Full Care Pro */}
                <label
                  onClick={() => setIncludeMaintenance(true)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    includeMaintenance
                      ? 'bg-surface-container-lowest border-primary ring-2 ring-primary'
                      : 'bg-surface-container-lowest/80 border-surface-variant/40 hover:bg-surface-container-lowest'
                  }`}
                >
                  <input
                    type="radio"
                    name="maint-choice"
                    checked={includeMaintenance}
                    onChange={() => setIncludeMaintenance(true)}
                    className="mt-1 h-4 w-4 text-primary"
                  />
                  <div>
                    <span className="text-sm font-bold text-on-surface block">
                      Plan Smart Total Care
                    </span>
                    <span className="text-xs text-on-surface-variant block mt-0.5">
                      SLA de sustitución física en 4 horas, actualizaciones OTA de modelos IA y monitoreo.
                    </span>
                    <span className="text-xs font-bold text-secondary block mt-1.5">
                      + € 49 / mes por unidad
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Quick Address and Connectivity Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Dirección de Entrega / Despliegue
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Módulo de Conectividad Primario
                </label>
                <select
                  value={connectivityModule}
                  onChange={(e) => setConnectivityModule(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  <option>WiFi 6E Corporativo + Ethernet PoE</option>
                  <option>Módem Celular Industrial 4G/LTE / 5G e-SIM</option>
                  <option>LoRaWAN Privado para Campus &amp; Naves</option>
                </select>
              </div>
            </div>
          </div>

          {/* Real-time Order Summary Card */}
          <div className="lg:col-span-4 bg-surface-container rounded-2xl p-5 border border-surface-variant/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-variant/30">
                <span className="font-display font-bold text-base text-on-surface">
                  Resumen Presupuestario
                </span>
                <span className="material-symbols-outlined text-secondary">receipt_long</span>
              </div>

              <div className="flex flex-col gap-2 text-xs mb-4">
                <div className="flex justify-between text-on-surface-variant">
                  <span>{selectedModel.name}</span>
                  <span className="text-on-surface font-bold">
                    {formatCurrency(selectedModel.basePrice)}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Unidades solicitadas:</span>
                  <span className="text-on-surface font-bold">{units}</span>
                </div>
                {units >= 5 && (
                  <div className="flex justify-between text-primary font-bold">
                    <span>Descuento de flota (12%):</span>
                    <span>- {formatCurrency(pricing.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>Plan de Servicio:</span>
                  <span className="text-on-surface font-bold">
                    {includeMaintenance
                      ? `Total Care (${formatCurrency(pricing.maintenanceMonthlyTotal)}/m)`
                      : 'Solo Hardware (€0)'}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Logística &amp; Calibración:</span>
                  <span className="text-primary font-bold">Bonificado (Gratis)</span>
                </div>

                <div className="h-px bg-surface-variant my-1" />

                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-bold text-sm text-on-surface">Total Estimado</span>
                  <div className="text-right">
                    <span className="font-display font-bold text-2xl text-primary block leading-none">
                      {pricing.formattedGrandTotal}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">+ IVA 21% aplicable</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-3 bg-surface-container-lowest rounded-xl mb-4 flex flex-col gap-1.5 border border-surface-variant/30">
                <div className="flex items-center gap-1.5 text-xs text-on-surface">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Hardware de propiedad directa (Sin bloqueos)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-base">bolt</span>
                  <span>Integración API REST con ERP/SAP incluida</span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Configurar Pedido &amp; Envío</span>
                <span className="material-symbols-outlined text-lg">shopping_cart_checkout</span>
              </button>
              <p className="text-[11px] text-center text-on-surface-variant mt-2">
                Paso 1 de 2: Se abrirá la consola de gestión de pedidos y facturación CRM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Model Edge Classification Matrix */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-variant/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Matriz de Rendimiento Neuronal
            </span>
            <h3 className="font-display font-bold text-xl text-on-surface">
              Capacidades de Clasificación Edge AI
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Reentrenamiento Dinámico Local</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant uppercase font-bold">
                <th className="py-3 px-4 rounded-l-lg">Material / Residuo</th>
                <th className="py-3 px-4">Sensor Óptico Primario</th>
                <th className="py-3 px-4">Precisión Algorítmica</th>
                <th className="py-3 px-4">Mecanismo de Desvío</th>
                <th className="py-3 px-4 rounded-r-lg">Estatus Operativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/20">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">
                    water_bottle
                  </span>
                  <span>Plástico PET &amp; Termoplásticos</span>
                </td>
                <td className="py-3 px-4 text-on-surface-variant">Espectrometría NIR + RGB</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[99%]" />
                    </div>
                    <span className="font-bold text-secondary">99.4%</span>
                  </div>
                </td>
                <td className="py-3 px-4">Compuerta B (Canal Azul)</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[11px]">
                    Activo
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">eco</span>
                  <span>Materia Orgánica &amp; Compost</span>
                </td>
                <td className="py-3 px-4 text-on-surface-variant">Cámara IR Térmica + Visión 3D</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[98%]" />
                    </div>
                    <span className="font-bold text-primary">98.9%</span>
                  </div>
                </td>
                <td className="py-3 px-4">Compuerta A (Canal Verde)</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-bold text-[11px]">
                    Activo
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base">
                    inventory
                  </span>
                  <span>Celulosa, Cartón &amp; Papel Blanco</span>
                </td>
                <td className="py-3 px-4 text-on-surface-variant">Análisis de Textura y Densidad</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-tertiary-container h-full w-[97%]" />
                    </div>
                    <span className="font-bold text-tertiary">97.6%</span>
                  </div>
                </td>
                <td className="py-3 px-4">Compuerta D (Canal Amarillo)</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[11px]">
                    Activo
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface text-base">
                    takeout_dining
                  </span>
                  <span>Aluminio, Latas &amp; Metales Ligeros</span>
                </td>
                <td className="py-3 px-4 text-on-surface-variant">Sensor Inductivo + Inferencia</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[99%]" />
                    </div>
                    <span className="font-bold text-primary">99.1%</span>
                  </div>
                </td>
                <td className="py-3 px-4">Compuerta C (Canal Gris)</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-bold text-[11px]">
                    Activo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
