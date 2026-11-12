import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATALOG_MODELS } from '../data/mockData';
import {
  calculateOrderPricing,
  calculateDynamicShipping,
  formatCurrency,
  isValidEmail,
} from '../utils/pricing';

export const CheckoutView: React.FC = () => {
  const {
    selectedModelKey,
    units,
    setUnits,
    finish,
    setFinish,
    compartments,
    setCompartments,
    includeMaintenance,
    setIncludeMaintenance,
    maintenanceFeePerUnit,
    setCurrentView,
    addClientRecord,
    speakText,
    announceToScreenReader,
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Buyer Form State
  const [buyerName, setBuyerName] = useState('Valeria Santoro Moncloa');
  const [buyerEmail, setBuyerEmail] = useState('v.santoro@ecologix-latam.org');
  const [buyerPhone, setBuyerPhone] = useState('+54 11 4892 0184');
  const [commPreference, setCommPreference] = useState('standard-email');

  // Shipping Form State
  const [shippingAddress, setShippingAddress] = useState(
    'Av. San Martín 4250, Parque Industrial Tecnológico Norte'
  );
  const [shippingCity, setShippingCity] = useState('Buenos Aires');
  const [shippingZip, setShippingZip] = useState('B1605');
  const [shippingSchedule, setShippingSchedule] = useState('afternoon');
  const [shippingNotes, setShippingNotes] = useState(
    'Muelle de carga posterior por calle paralela con rampa de descarga de 2.20m de ancho. Notificar a seguridad 15 minutos antes.'
  );

  // Status Modal State
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [quoteSavedNotice, setQuoteSavedNotice] = useState(false);

  // Pricing calculations
  const activeModel =
    CATALOG_MODELS.find((m) => m.key === selectedModelKey) || CATALOG_MODELS[1];
  const shippingCost = calculateDynamicShipping(shippingZip, units);

  const pricing = calculateOrderPricing({
    basePrice: activeModel.basePrice,
    quantity: units,
    maintenanceFeePerUnit: maintenanceFeePerUnit,
    hasMaintenance: includeMaintenance,
    shippingCost,
  });

  const emailValid = isValidEmail(buyerEmail);

  const handleGoToStep = (newStep: number) => {
    setStep(newStep);
    const stepNames = [
      'Datos del Comprador',
      'Dirección y Logística Asistida',
      'Configuración Smart Bin y Servicios',
    ];
    announceToScreenReader(`Paso ${newStep} de 3: ${stepNames[newStep - 1]}`);
  };

  const handleFinishOrder = () => {
    // Register new client or order in CRM
    addClientRecord({
      id: `CL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: buyerName,
      category: 'Corporativo & Industrial',
      contactName: buyerName,
      contactRole: 'Apoderado / Gerente de Operaciones',
      email: buyerEmail,
      phone: buyerPhone,
      address: `${shippingAddress}, ${shippingCity} (CP ${shippingZip})`,
      binCount: units,
      modelName: `${activeModel.name} (${finish.split('(')[0].trim()})`,
      hasMaintenance: includeMaintenance,
      maintenanceSla: includeMaintenance ? 'SLA 4h Activo' : 'Sin Mantenimiento Suscrito',
      pendingDispatch: true,
      verifiedAddress: true,
      accessibilityNotes: shippingNotes,
      currentCapacity: '0% (Por despachar)',
      opticalSensorHealth: '100% Calibrado en Fábrica',
      firmware: 'v4.8 Neural Edge',
      opportunity: {
        title: 'Verificación de Telemetría Inicial',
        description:
          'Se coordinará prueba de enlace LoRaWAN y cámara espectral al recibir el hardware en muelle.',
        badge: 'Nueva Alta en CRM',
      },
    });

    setShowConfirmationModal(true);
    speakText(`Orden completada con éxito. Total facturado: ${pricing.formattedGrandTotal}`);
  };

  const handleSaveQuote = () => {
    setQuoteSavedNotice(true);
    announceToScreenReader('Cotización formal #QT-912 guardada y remitida al correo.');
    setTimeout(() => setQuoteSavedNotice(false), 3500);
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn">
      {/* Top Banner / Operational Context Indicator */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 bg-surface-container-low p-4 rounded-2xl shadow-sm border border-surface-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
            <span aria-hidden="true" className="material-symbols-outlined text-2xl">
              shopping_cart_checkout
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-secondary">
                Flujo de Checkout B2B/B2C
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs text-on-surface-variant font-medium">
                Validación Criptográfica &amp; Alta CRM
              </span>
            </div>
            <h1 className="font-display font-bold text-xl lg:text-2xl text-on-surface tracking-tight">
              Gestión de Pedidos &amp; Despacho Inteligente
            </h1>
          </div>
        </div>

        {/* Accessibility & WCAG Status Quick Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-surface-container-lowest px-4 py-2 rounded-xl shadow-sm border border-surface-variant/30">
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-primary text-base"
          >
            verified_user
          </span>
          <span className="text-xs font-bold text-on-surface">
            IHC Ético · 0% Patrones Oscuros · WCAG AAA
          </span>
        </div>
      </div>

      {/* Stepper / Accessible Process Bar */}
      <div
        role="region"
        aria-label="Progreso del pedido"
        className="w-full mb-8 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-variant/30"
      >
        <div className="flex items-center justify-between relative">
          {/* Background Connecting Bar */}
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-surface-container-high z-0"
          >
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            />
          </div>

          {/* Step 1 Indicator */}
          <button
            type="button"
            onClick={() => handleGoToStep(1)}
            aria-current={step === 1 ? 'step' : undefined}
            className="relative z-10 flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-transform group-hover:scale-105 ring-4 ring-surface-container-lowest ${
                step >= 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              1
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
                Paso 1
              </span>
              <span className="font-bold text-sm text-on-surface">Datos del Comprador</span>
            </div>
          </button>

          {/* Step 2 Indicator */}
          <button
            type="button"
            onClick={() => handleGoToStep(2)}
            aria-current={step === 2 ? 'step' : undefined}
            className="relative z-10 flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-transform group-hover:scale-105 ring-4 ring-surface-container-lowest ${
                step >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              2
            </div>
            <div className="hidden sm:flex flex-col">
              <span
                className={`text-[11px] uppercase tracking-wider font-bold ${
                  step >= 2 ? 'text-primary' : 'text-outline'
                }`}
              >
                Paso 2
              </span>
              <span
                className={`font-bold text-sm ${
                  step >= 2 ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                Dirección &amp; Logística
              </span>
            </div>
          </button>

          {/* Step 3 Indicator */}
          <button
            type="button"
            onClick={() => handleGoToStep(3)}
            aria-current={step === 3 ? 'step' : undefined}
            className="relative z-10 flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-transform group-hover:scale-105 ring-4 ring-surface-container-lowest ${
                step === 3 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              3
            </div>
            <div className="hidden sm:flex flex-col">
              <span
                className={`text-[11px] uppercase tracking-wider font-bold ${
                  step === 3 ? 'text-primary' : 'text-outline'
                }`}
              >
                Paso 3
              </span>
              <span
                className={`font-bold text-sm ${
                  step === 3 ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                Equipos &amp; Servicios
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Grid: Forms Left / Order Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Dynamic Interactive Steps */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* STEP 1: BUYER PROFILE */}
          {step === 1 && (
            <section
              aria-labelledby="heading-step-1"
              className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm border border-surface-variant/30 flex flex-col gap-5 animate-fadeIn"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant/30">
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    Identificación del Cliente
                  </span>
                  <h2
                    id="heading-step-1"
                    className="font-display font-bold text-xl text-on-surface"
                  >
                    1. Perfil del Titular o Representante B2B
                  </h2>
                </div>
                <span className="material-symbols-outlined text-secondary text-2xl">badge</span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                Ingrese los datos de contacto corporativo para asociar los sensores de clasificación al
                panel de telemetría y generar la orden fiscal.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGoToStep(2);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="buyer-fullname"
                      className="text-xs font-bold text-on-surface flex items-center justify-between"
                    >
                      <span>
                        Nombre Completo o Razón Social <span className="text-error">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                        person
                      </span>
                      <input
                        id="buyer-fullname"
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="Ej. Valeria Santoro Moncloa"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      Persona autorizada para el alta de infraestructura telemétrica.
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="buyer-email"
                      className="text-xs font-bold text-on-surface flex items-center justify-between"
                    >
                      <span>
                        Correo Corporativo <span className="text-error">*</span>
                      </span>
                      <span
                        className={`text-[11px] flex items-center gap-1 font-bold ${
                          emailValid ? 'text-primary' : 'text-outline'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {emailValid ? 'check_circle' : 'pending'}
                        </span>
                        {emailValid ? 'Válido' : 'Incompleto'}
                      </span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                        mail
                      </span>
                      <input
                        id="buyer-email"
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="usuario@empresa.com"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      Recibirá los tokens criptográficos de vinculación con el Smart Bin.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="buyer-phone" className="text-xs font-bold text-on-surface">
                      Teléfono Directo de Planta / Móvil <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                        call
                      </span>
                      <input
                        id="buyer-phone"
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  {/* Accessibility Communication Preferences */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="comm-preference"
                      className="text-xs font-bold text-on-surface flex items-center gap-1"
                    >
                      <span>Preferencia de Comunicación Accesible</span>
                      <span
                        className="material-symbols-outlined text-sm text-secondary"
                        title="Adaptamos las alertas y confirmaciones técnicas"
                      >
                        accessibility_new
                      </span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                        contact_support
                      </span>
                      <select
                        id="comm-preference"
                        value={commPreference}
                        onChange={(e) => setCommPreference(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary cursor-pointer"
                      >
                        <option value="standard-email">Correo corporativo estándar (PDF accesible)</option>
                        <option value="email-screenreader">Texto plano optimizado para lector de pantalla</option>
                        <option value="whatsapp-direct">Mensajería instantánea directa / WhatsApp Bot</option>
                        <option value="phone-highclarity">Llamada asistida por técnico certificado</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Inclusive Confirmation Callout */}
                <div className="bg-surface-container-low p-4 rounded-xl flex items-start gap-3 border border-surface-variant/30">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                    diversity_1
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Todos los comprobantes fiscales y contratos digitales de esta plataforma se entregan
                    bajo estándar PDF/UA y con transcripción sintética para interoperabilidad total.
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-on-primary font-bold text-xs rounded-xl shadow hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuar a Logística</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 2: SHIPPING & LOGISTICS */}
          {step === 2 && (
            <section
              aria-labelledby="heading-step-2"
              className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm border border-surface-variant/30 flex flex-col gap-5 animate-fadeIn"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant/30">
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    Distribución &amp; Entregas Técnicas
                  </span>
                  <h2
                    id="heading-step-2"
                    className="font-display font-bold text-xl text-on-surface"
                  >
                    2. Destino de Entrega &amp; Logística Asistida
                  </h2>
                </div>
                <span className="material-symbols-outlined text-secondary text-2xl">local_shipping</span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                Nuestros Smart Bins IA se entregan mediante transporte técnico paletizado con descarga en
                planta baja o muelle habilitado.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGoToStep(3);
                }}
                className="space-y-4"
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="shipping-addr" className="text-xs font-bold text-on-surface">
                    Dirección Detallada (Calle, Número, Módulo, Nave){' '}
                    <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                      location_on
                    </span>
                    <input
                      id="shipping-addr"
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Ej. Calle Principal 123, Edificio C"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="shipping-city" className="text-xs font-bold text-on-surface">
                      Ciudad <span className="text-error">*</span>
                    </label>
                    <input
                      id="shipping-city"
                      type="text"
                      required
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="shipping-zip" className="text-xs font-bold text-on-surface">
                      Código Postal <span className="text-error">*</span>
                    </label>
                    <input
                      id="shipping-zip"
                      type="text"
                      required
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="shipping-time" className="text-xs font-bold text-on-surface">
                      Franja Horaria Preferida
                    </label>
                    <select
                      id="shipping-time"
                      value={shippingSchedule}
                      onChange={(e) => setShippingSchedule(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                    >
                      <option value="morning">08:00 - 12:00 (Recepción Operativa)</option>
                      <option value="afternoon">13:00 - 17:00 (Turno Tarde General)</option>
                      <option value="flexible">Jornada Completa Indistinta</option>
                    </select>
                  </div>
                </div>

                {/* Special logistics and accessibility access directives */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="shipping-notes"
                    className="text-xs font-bold text-on-surface flex items-center justify-between"
                  >
                    <span>Indicaciones Especiales de Acceso &amp; Descarga</span>
                    <span className="text-secondary font-semibold">Accesibilidad universal</span>
                  </label>
                  <textarea
                    id="shipping-notes"
                    rows={3}
                    value={shippingNotes}
                    onChange={(e) => setShippingNotes(e.target.value)}
                    placeholder="Ej. Acceso adaptado para rampa / montacargas habilitado / Recepción por conserjería central..."
                    className="w-full p-3 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary leading-relaxed"
                  />
                </div>

                {/* Logistics preview card */}
                <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between border border-surface-variant/30">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-2xl">hub</span>
                    <div>
                      <span className="text-xs font-bold text-on-surface block">
                        Centro de Despacho Regional Norte: 32 km de destino
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        Tarifa calibrada por peso volumétrico y rampa técnica.
                      </span>
                    </div>
                  </div>
                  <span className="font-display font-bold text-base text-primary">
                    {formatCurrency(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => handleGoToStep(1)}
                    className="px-5 py-2.5 bg-surface-container-high text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    <span>Volver a Datos</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl shadow hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuar a Selección de Equipos</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 3: HARDWARE CUSTOMIZATION & ETHICAL SERVICE TOGGLE */}
          {step === 3 && (
            <section
              aria-labelledby="heading-step-3"
              className="flex flex-col gap-6 animate-fadeIn"
            >
              {/* Product Showcase & Customizer Card */}
              <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm border border-surface-variant/30">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-variant/30">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-primary font-bold">
                      Hardware Inteligente Certificado
                    </span>
                    <h2
                      id="heading-step-3"
                      className="font-display font-bold text-xl text-on-surface"
                    >
                      3. Configuración Smart Bin IA
                    </h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary text-xs font-bold">
                    Modelo v4.2 Enterprise
                  </span>
                </div>

                {/* Product Specs Split Presentation */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-6 bg-surface-container-low p-4 rounded-xl border border-surface-variant/30">
                  <div className="md:col-span-5 relative overflow-hidden rounded-xl bg-surface shadow-sm aspect-video md:aspect-auto md:h-48">
                    <img
                      alt="Ecosphere Smart Bin IA v4.2"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQJdbNjwxN2KrUZMEmT_phzi7nbOsMc97atsl-TWLCEwBp4w2w6FX0hNKVJjn8H4sWASWC_eAZyHl0LyF5dTfvJhKAYBkj4o1CHjJGCmWt0sPsz2uPgy4tywCO2qLD3MVbUZIdzNWQ6F8acg9t5QFzu8c0yDQzUTHKUWFhBJNKv4lVP7FjtyZvDoS1iUXqgt3Jeca6yuYzXXat82W5ENBcPqUcxT_2xzSL51sNLDI"
                    />
                    <div className="absolute bottom-2 left-2 bg-inverse-surface/90 text-on-primary px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow">
                      <span className="material-symbols-outlined text-xs">sensors</span>
                      <span>Inferencia Edge Neural</span>
                    </div>
                  </div>

                  <div className="md:col-span-7 flex flex-col gap-2">
                    <h3 className="font-display font-bold text-base text-on-surface">
                      Ecosphere Smart Bin IA™ ({activeModel.name})
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Contenedor autogestionado con cámara hiperespectral y celda de carga de precisión.
                      Clasifica plásticos PET, residuos orgánicos e inorgánicos con un 99.2% de certeza en
                      450 milisegundos.
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-1">
                      <div className="bg-surface-container-lowest p-2 rounded-lg text-center border border-surface-variant/30">
                        <span className="text-[10px] text-secondary font-bold block">Capacidad</span>
                        <span className="font-bold text-xs text-on-surface">120 L</span>
                      </div>
                      <div className="bg-surface-container-lowest p-2 rounded-lg text-center border border-surface-variant/30">
                        <span className="text-[10px] text-secondary font-bold block">Conectividad</span>
                        <span className="font-bold text-xs text-on-surface">5G / LoRa</span>
                      </div>
                      <div className="bg-surface-container-lowest p-2 rounded-lg text-center border border-surface-variant/30">
                        <span className="text-[10px] text-secondary font-bold block">Batería Solar</span>
                        <span className="font-bold text-xs text-on-surface">72 hrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configuration Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  {/* Quantity Counter */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="qty-counter-input" className="text-xs font-bold text-on-surface">
                      Cantidad de Unidades
                    </label>
                    <div className="flex items-center bg-surface rounded-xl p-1 shadow-sm border border-surface-variant/40">
                      <button
                        type="button"
                        onClick={() => setUnits(Math.max(1, units - 1))}
                        aria-label="Disminuir una unidad"
                        className="w-10 h-9 flex items-center justify-center rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <input
                        id="qty-counter-input"
                        type="number"
                        min={1}
                        max={50}
                        value={units}
                        onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center bg-transparent text-on-surface font-bold text-sm focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setUnits(units + 1)}
                        aria-label="Aumentar una unidad"
                        className="w-10 h-9 flex items-center justify-center rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>

                  {/* Finish Option */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="finish-select" className="text-xs font-bold text-on-surface">
                      Acabado de Chasis
                    </label>
                    <select
                      id="finish-select"
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                    >
                      <option value="Verde Bosque Orgánico (#2D6A4F)">
                        Verde Bosque Orgánico (#2D6A4F)
                      </option>
                      <option value="Azul Océano PET (#1B4965)">Azul Océano PET (#1B4965)</option>
                      <option value="Gris Industrial Anodizado">Gris Industrial Anodizado</option>
                    </select>
                  </div>

                  {/* Compartment Configuration */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="compartment-select" className="text-xs font-bold text-on-surface">
                      Partición Interior
                    </label>
                    <select
                      id="compartment-select"
                      value={compartments}
                      onChange={(e) => setCompartments(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-surface text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                    >
                      <option value="dual">Doble tolva (Orgánico / Inorgánico)</option>
                      <option value="tri">Triple tolva (PET / Orgánico / Vidrio)</option>
                      <option value="quad">Cuádruple tolva ISO 14001</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Ethical Complementary Service Toggle: Explicit Binary Choice */}
              <div
                role="region"
                aria-labelledby="service-toggle-heading"
                className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm border border-surface-variant/30 relative overflow-hidden"
              >
                {/* Visual strip */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-2 transition-colors ${
                    includeMaintenance ? 'bg-tertiary' : 'bg-surface-variant'
                  }`}
                />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pl-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-tertiary-container text-lg">
                        workspace_premium
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-tertiary font-bold">
                        Servicio Opcional e Independiente
                      </span>
                    </div>

                    <h3
                      id="service-toggle-heading"
                      className="font-display font-bold text-lg text-on-surface mb-1"
                    >
                      ¿Deseas añadir Servicio de Mantenimiento y Garantía Extendida de Piezas?
                    </h3>

                    <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                      Incluye calibración bimensual de espectrómetros ópticos, reemplazo ilimitado de
                      actuadores neumáticos y atención técnica prioritaria in-situ con SLA garantizado
                      de 4 horas.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-on-surface-variant">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px] flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">bolt</span> SLA 4h en
                        planta
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px] flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">memory</span> Sensores de
                        repuesto incluidos
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px] flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">cancel</span> Cancelable en
                        cualquier momento
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 bg-surface-container-low p-4 rounded-xl border border-surface-variant/30 self-start">
                    <span className="text-[10px] text-secondary uppercase font-bold block">
                      Tarifa mensual
                    </span>
                    <span className="font-display font-bold text-2xl text-on-surface block">
                      € 38
                      <span className="text-xs font-normal text-on-surface-variant">
                        /mes por unidad
                      </span>
                    </span>
                  </div>
                </div>

                {/* Explicit Binary Buttons (No pre-checked trap) */}
                <div className="mt-6 pt-4 bg-surface-container-low -mx-6 -mb-6 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-variant/30">
                  <span className="text-xs font-bold text-on-surface">
                    Seleccione su preferencia de servicio para esta orden:
                  </span>

                  <div
                    role="radiogroup"
                    aria-label="Opción de Plan Preventivo de Mantenimiento"
                    className="inline-flex p-1 rounded-xl bg-surface shadow-inner border border-surface-variant/40"
                  >
                    {/* NO Button */}
                    <button
                      type="button"
                      role="radio"
                      aria-checked={!includeMaintenance}
                      onClick={() => {
                        setIncludeMaintenance(false);
                        announceToScreenReader('Solo hardware seleccionado. Sin costo mensual recurrente.');
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        !includeMaintenance
                          ? 'bg-inverse-surface text-on-secondary shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                      <span>NO, solo deseo adquirir el hardware</span>
                    </button>

                    {/* YES Button */}
                    <button
                      type="button"
                      role="radio"
                      aria-checked={includeMaintenance}
                      onClick={() => {
                        setIncludeMaintenance(true);
                        announceToScreenReader('Plan Preventivo de Mantenimiento añadido.');
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        includeMaintenance
                          ? 'bg-inverse-surface text-on-secondary shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">check</span>
                      <span>SÍ, incluir Plan Preventivo</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleGoToStep(2)}
                  className="px-5 py-2.5 bg-surface-container-high text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Volver a Logística</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('order-summary-card');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl shadow hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Revisar Resumen y Concluir</span>
                  <span className="material-symbols-outlined text-base">fact_check</span>
                </button>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Order Summary & Direct Actions */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-20">
          <div
            id="order-summary-card"
            role="region"
            aria-label="Resumen de facturación y pedido"
            className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-variant/30 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant/30">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-xl">receipt_long</span>
                <h2 className="font-display font-bold text-lg text-on-surface">Resumen del Pedido</h2>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                EUR (€)
              </span>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs">
              {/* Hardware */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="font-bold text-on-surface block leading-tight">
                    {activeModel.name}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    {units} {units > 1 ? 'unidades' : 'unidad'} · {finish.split('(')[0]}
                  </span>
                </div>
                <span className="font-bold text-on-surface whitespace-nowrap">
                  {formatCurrency(pricing.discountedHardware)}
                </span>
              </div>

              {/* Maintenance */}
              {includeMaintenance && (
                <div className="flex justify-between items-start gap-2 bg-tertiary-fixed/30 p-2 rounded-lg border border-tertiary/20">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-base">
                      build_circle
                    </span>
                    <div>
                      <span className="font-bold text-on-surface block">
                        Plan Mantenimiento Preventivo
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        Suscripción activa · {units} u. (€38/u)
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-on-surface whitespace-nowrap">
                    {formatCurrency(pricing.maintenanceMonthlyTotal)}/m
                  </span>
                </div>
              )}

              {/* Shipping */}
              <div className="flex justify-between items-center text-on-surface-variant pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  Transporte técnico calibrado
                </span>
                <span className="font-bold text-on-surface">{formatCurrency(shippingCost)}</span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Subtotal Imponible</span>
                <span className="font-bold text-on-surface">
                  {formatCurrency(pricing.taxableSubtotal)}
                </span>
              </div>

              {/* VAT */}
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>IVA Desglosado (21%)</span>
                <span className="font-bold text-on-surface">
                  {formatCurrency(pricing.vatAmount)}
                </span>
              </div>

              {/* Total Due */}
              <div className="pt-3 mt-1 bg-surface-container-low p-4 rounded-xl flex flex-col gap-1 border border-surface-variant/30">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-on-surface">Total Inversión</span>
                  <span className="font-display font-bold text-2xl text-primary">
                    {pricing.formattedGrandTotal}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Recargo mensual recurrente:</span>
                  <span className="font-bold text-secondary">
                    {includeMaintenance
                      ? `${formatCurrency(pricing.maintenanceMonthlyTotal)}/mes`
                      : '€ 0,00/mes'}
                  </span>
                </div>
              </div>
            </div>

            {/* Live sync badge */}
            <div className="p-2 flex items-center gap-1.5 bg-surface-container rounded-lg text-[11px] text-on-surface-variant border border-surface-variant/30">
              <span className="material-symbols-outlined text-primary text-base">sync_alt</span>
              <span>Sincronización en tiempo real con HubSpot &amp; Salesforce Enterprise</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={handleFinishOrder}
                className="w-full py-3 px-4 bg-primary text-on-primary font-bold text-xs rounded-xl shadow hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span className="material-symbols-outlined text-lg">done_all</span>
                <span>Finalizar y Crear Registro en CRM</span>
              </button>

              <button
                type="button"
                onClick={handleSaveQuote}
                className="w-full py-2.5 px-4 bg-surface-container-lowest text-secondary font-bold text-xs rounded-xl border border-surface-variant/40 hover:bg-surface-container-high transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">
                  {quoteSavedNotice ? 'done' : 'bookmark'}
                </span>
                <span>
                  {quoteSavedNotice ? 'Cotización Formal Guardada' : 'Guardar como Cotización Formal'}
                </span>
              </button>
            </div>

            {/* Security labels */}
            <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-outline">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">lock</span> SSL 256-bit
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">gavel</span> Conforme RGPD
              </span>
              <span>·</span>
              <span>Garantía Oficial 3 Años</span>
            </div>
          </div>

          {/* Dedicated Support Box */}
          <div className="bg-surface-container-low p-4 rounded-2xl shadow-sm border border-surface-variant/30 flex items-center gap-3">
            <img
              alt="Ingeniera de Soporte"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-surface-container-lowest"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf_FFeNYbKFmtOjQ19BlC12nVSNPHXNb90nkeFCRm7UDg7YFi5XkSE8A0uMExV9HqEkxfxZubPaoM5jvafw5McK1raByUv04HGPP2yMmBbp9hxLsncQbzPj4vE4KdORrA5HSoWxftzYCQ2iSW0GfNchPAUAFH-0XRLPZjllVVxCTROyWdhBEUdq2gA5IFO6xSjc8YDQ5AIXo_KiC7W3ScR02gzLFsTxxaR0M4v_C8"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-on-surface truncate">
                ¿Dudas con la instalación?
              </span>
              <span className="text-[11px] text-on-surface-variant truncate">
                Soporte técnico directo disponible
              </span>
              <button
                type="button"
                onClick={() =>
                  speakText(
                    'Ingeniero de ventas listo para asesorarle en la configuración de la orden.'
                  )
                }
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1 mt-0.5 text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">forum</span>
                <span>Chatear con Ingeniero de Ventas</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/70 backdrop-blur-sm p-4 animate-fadeIn"
        >
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl shadow-2xl p-6 lg:p-8 flex flex-col gap-4 border border-surface-variant/40 text-left">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>

            <div>
              <h3 id="dialog-title" className="font-display font-bold text-xl text-on-surface">
                Registro Generado Exitosamente en CRM
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                La orden <strong>#ECO-2024-9841</strong> ha sido asentada con ID de cliente en Salesforce. Se
                ha despachado la orden de ensamble al centro logístico norte y el contrato digital accesible
                fue remitido a <strong>{buyerEmail}</strong>.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-1.5 text-xs border border-surface-variant/30">
              <div className="flex justify-between text-on-surface">
                <span className="text-on-surface-variant">Dispositivos:</span>
                <span className="font-bold">
                  {units} x {activeModel.name}
                </span>
              </div>
              <div className="flex justify-between text-on-surface">
                <span className="text-on-surface-variant">Suscripción Preventiva:</span>
                <span className="font-bold">
                  {includeMaintenance
                    ? `Plan Preventivo Activo (${formatCurrency(pricing.maintenanceMonthlyTotal)}/mes)`
                    : 'No añadida (Solo Hardware)'}
                </span>
              </div>
              <div className="flex justify-between text-on-surface">
                <span className="text-on-surface-variant">Total Facturado:</span>
                <span className="font-bold text-primary">{pricing.formattedGrandTotal}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmationModal(false);
                  setCurrentView('crm-ventas');
                }}
                className="px-6 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl shadow hover:bg-primary-container transition-all cursor-pointer"
              >
                Aceptar e Ir al CRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
