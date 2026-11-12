import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SPARE_PARTS, SparePart } from '../data/mockData';
import { formatCurrency } from '../utils/pricing';

export const MaintenanceView: React.FC = () => {
  const {
    addToCart,
    cart,
    addRepairTicket,
    speakText,
    announceToScreenReader,
    setCurrentView,
  } = useApp();

  const [billingPeriod, setBillingPeriod] = useState<'anual' | 'evento'>('anual');
  const [largeTextMode, setLargeTextMode] = useState(false);

  // Form State
  const [clientId, setClientId] = useState('logistica@aeropuerto-mad.es');
  const [binSerial, setBinSerial] = useState('SB-IA-2024-9841');
  const [failureCategory, setFailureCategory] = useState<'vision' | 'mecanica' | 'energia'>('vision');
  const [description, setDescription] = useState(
    'La compuerta superior tarda en responder tras el escaneo de botellas PET y emite tres pitidos cortos.'
  );
  const [urgency, setUrgency] = useState('normal');
  const [plantPhone, setPlantPhone] = useState('+34 600 882 110');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  // Voice recording simulation
  const [isRecording, setIsRecording] = useState(false);

  const handleStartVoice = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.interimResults = false;

        setIsRecording(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsRecording(false);
          announceToScreenReader('Dictado por voz capturado con éxito.');
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };
      } catch (e) {
        fallbackVoiceSimulation();
      }
    } else {
      fallbackVoiceSimulation();
    }
  };

  const fallbackVoiceSimulation = () => {
    setIsRecording(true);
    setTimeout(() => {
      setDescription((prev) =>
        prev
          ? `${prev} [Dictado por voz: sensor óptico presenta parpadeo en diodo ámbar]`
          : 'Sensor óptico presenta parpadeo en diodo ámbar y leve retraso en obturación.'
      );
      setIsRecording(false);
      announceToScreenReader('Texto dictado agregado al formulario.');
    }, 1200);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addRepairTicket({
      clientId,
      binSerial,
      category:
        failureCategory === 'vision'
          ? 'Visión / Cámara AI'
          : failureCategory === 'mecanica'
          ? 'Mecánica / Compuerta'
          : 'Energía & Sensores',
      description,
      urgency,
      phone: plantPhone,
    });
    setSubmittedTicketId(newId);
    speakText(`Incidencia ${newId} registrada con éxito en el centro de mantenimiento.`);
  };

  const handleCallSpecialist = () => {
    speakText('Conectando con la mesa de guardia técnica de EcoSphere: Línea prioritaria activa.');
    alert('Conectando con la Mesa de Control de Ingeniería EcoSphere:\nLínea Prioritaria 24/7: +34 900 882 110');
  };

  return (
    <div className="flex flex-col w-full pb-16 gap-10 animate-fadeIn">
      {/* Top Banner / Transparency Header */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm border border-surface-variant/30">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                <span className="material-symbols-outlined text-base">verified</span>
                Ingeniería Certificada EcoSphere Hardware
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold">
                SLA Industrial: 99.8% Disponibilidad
              </span>
            </div>

            <h1 className="font-display font-bold text-2xl lg:text-3xl text-on-surface tracking-tight mt-1">
              Servicio Técnico Especializado &amp; Mantenimiento Preventivo para Smart Bin IA
            </h1>

            <div className="flex items-start gap-3 mt-2 p-4 rounded-xl bg-surface-container-low text-on-surface-variant border border-surface-variant/30">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-primary text-xl mt-0.5"
              >
                info
              </span>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                <strong className="font-bold text-on-surface">
                  Compromiso ético y autonomía del cliente:
                </strong>{' '}
                Este es un servicio complementario no obligatorio. Tú decides libremente cuándo,
                cómo y con qué nivel de cobertura cuidar tus equipos. Nuestros contenedores
                inteligentes mantienen su garantía estándar de fábrica independientemente del plan
                contratado.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="#solicitud-reparacion"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">home_repair_service</span>
              <span>Reportar Incidencia o Falla</span>
            </a>
            <a
              href="#catalogo-repuestos"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">precision_manufacturing</span>
              <span>Ver Despiece &amp; Refacciones</span>
            </a>
          </div>
        </div>
      </section>

      {/* Service Plans Comparison Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Nivel de Cobertura Modular
            </span>
            <h2 className="font-display font-bold text-2xl text-on-surface">
              Planes de Servicio y Mantenimiento
            </h2>
          </div>

          {/* Billing switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-high border border-surface-variant/40">
            <button
              type="button"
              onClick={() => {
                setBillingPeriod('anual');
                announceToScreenReader('Facturación anual seleccionada con 15% de ahorro.');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingPeriod === 'anual'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Facturación Anual (-15%)
            </button>
            <button
              type="button"
              onClick={() => {
                setBillingPeriod('evento');
                announceToScreenReader('Facturación por evento puntual seleccionada.');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingPeriod === 'evento'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Facturación por Evento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan 1: Bajo Demanda */}
          <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-surface-variant/30 transition-all hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
                  Flexibilidad Cero Compromiso
                </span>
                <span className="material-symbols-outlined text-secondary text-2xl">bolt</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-on-surface">Bajo Demanda</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Intervención puntual para instalaciones individuales o proyectos en fase piloto.
                </p>
              </div>

              <div className="py-2">
                <span className="font-display font-bold text-3xl text-on-surface">
                  {billingPeriod === 'anual' ? '$149' : '$175'}
                </span>
                <span className="text-xs text-on-surface-variant"> / incidente + repuestos</span>
              </div>

              <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">
                    check_circle
                  </span>
                  <span>Diagnóstico técnico in situ o remoto según viabilidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">
                    check_circle
                  </span>
                  <span>Cambio de servomotores y recalibración de cámara óptica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">
                    check_circle
                  </span>
                  <span>Garantía de mano de obra de 90 días naturales</span>
                </li>
                <li className="flex items-start gap-2 text-outline">
                  <span className="material-symbols-outlined text-outline-variant text-base shrink-0">
                    cancel
                  </span>
                  <span className="line-through">Monitoreo continuo de salud de sensores</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('solicitud-reparacion');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                Solicitar Servicio Puntual
              </button>
            </div>
          </div>

          {/* Plan 2: Preventivo Anual (Highlighted) */}
          <div className="relative flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 shadow-md border-2 border-primary transition-all hover:shadow-xl">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-primary text-on-primary text-[11px] font-bold uppercase tracking-wider shadow-sm">
              Más Recomendado para Flotas
            </span>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
                  Ciclo Bi-anual Integral
                </span>
                <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-on-surface">Preventivo Anual</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Garantiza precisión en la clasificación y vida útil óptima de los mecanismos.
                </p>
              </div>

              <div className="py-2">
                <span className="font-display font-bold text-3xl text-primary">
                  {billingPeriod === 'anual' ? '$38' : '$45'}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {' '}
                  / bin al mes {billingPeriod === 'anual' ? '(facturado anualmente)' : '(mensual)'}
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 text-xs text-on-surface">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>2 revisiones integrales por año</strong> con reporte de degradación
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">
                    check_circle
                  </span>
                  <span>Limpieza ultrasónica de lentes y sensores infrarrojos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>Actualización de modelos ML</strong> para detección de nuevos envases
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">
                    check_circle
                  </span>
                  <span>Reemplazo preventivo incluido de filtros HEPA, sellos y engranes</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('gestion-de-pedidos-checkout');
                }}
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-container transition-all cursor-pointer"
              >
                Contratar Plan Preventivo
              </button>
            </div>
          </div>

          {/* Plan 3: Enterprise Care */}
          <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-surface-variant/30 transition-all hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                  Máxima Disponibilidad
                </span>
                <span className="material-symbols-outlined text-secondary text-2xl">hub</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-on-surface">Enterprise Care</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Diseñado para aeropuertos, centros corporativos y plantas de manufactura continua.
                </p>
              </div>

              <div className="py-2">
                <span className="font-display font-bold text-3xl text-on-surface">
                  {billingPeriod === 'anual' ? '$72' : '$85'}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {' '}
                  / bin al mes (SLA crítico 4h)
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>Soporte 24/7 in situ</strong> con cuadrilla de emergencia
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>Recambio garantizado de piezas en menos de 24h</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">
                    check_circle
                  </span>
                  <span>Telemetría continua remota de vibración, temperatura y par motor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">
                    check_circle
                  </span>
                  <span>Reposición de equipo completo por daño catastrófico</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleCallSpecialist}
                className="w-full py-2.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
              >
                Consultar Acuerdo Corporativo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Visual Diagnostic / Fleet Status Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl bg-surface-container-low p-6 lg:p-8 border border-surface-variant/30">
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Salud Operativa Global
          </span>
          <h2 className="font-display font-bold text-xl lg:text-2xl text-on-surface">
            Telemetría de la Flota &amp; Diagnóstico IA
          </h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            El sistema de machine learning integrado audita en tiempo real el ciclo de vida de cada
            actuador y transductor, sugiriendo mantenimientos antes de que ocurra una interrupción.
          </p>

          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs font-bold text-on-surface">Salud Óptima (88%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-tertiary-container" />
              <span className="text-xs font-bold text-on-surface">Preventivo Próximo (10%)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1 */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-bold">Visión Artificial</span>
              <span className="material-symbols-outlined text-lg">photo_camera</span>
            </div>
            <div className="my-3">
              <div className="font-display font-bold text-2xl text-on-surface">99.4%</div>
              <span className="text-[11px] text-on-surface-variant">
                Lentes sin aberración ni polvo
              </span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[99%]" />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-bold">Servomotores</span>
              <span className="material-symbols-outlined text-lg">precision_manufacturing</span>
            </div>
            <div className="my-3">
              <div className="font-display font-bold text-2xl text-on-surface">1.2M</div>
              <span className="text-[11px] text-on-surface-variant">Aperturas sin descalibración</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[94%]" />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-tertiary">
              <span className="text-xs font-bold">Tiempo de Respuesta</span>
              <span className="material-symbols-outlined text-lg">timer</span>
            </div>
            <div className="my-3">
              <div className="font-display font-bold text-2xl text-on-surface">3.4 hrs</div>
              <span className="text-[11px] text-on-surface-variant">Media de atención en sitio</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary-container h-full w-[78%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Parts Catalog Section */}
      <section className="flex flex-col gap-6" id="catalogo-repuestos">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Transparencia Radical en Precios
            </span>
            <h2 className="font-display font-bold text-2xl text-on-surface">
              Catálogo de Repuestos &amp; Piezas Originales
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant max-w-md">
            Precios públicos sin sobrecostos ocultos. Componentes con trazabilidad serializada y
            certificación de eficiencia energética para Smart Bin IA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPARE_PARTS.map((part) => {
            const inCart = cart.find((c) => c.part.id === part.id);
            return (
              <div
                key={part.id}
                className="flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm border border-surface-variant/30 hover:shadow-md transition-shadow"
              >
                <div className="h-44 w-full relative overflow-hidden bg-surface-container">
                  <img
                    alt={part.name}
                    className="h-full w-full object-cover"
                    src={part.image}
                  />
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[11px] font-bold ${
                      part.stock.includes('Stock')
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-tertiary text-on-tertiary'
                    }`}
                  >
                    {part.stock}
                  </span>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-secondary">{part.sku}</span>
                    <h3 className="font-bold text-sm text-on-surface mt-0.5">{part.name}</h3>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                      {part.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between bg-surface-container-low p-2.5 rounded-xl border border-surface-variant/30">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant">Precio unitario</span>
                      <span className="font-display font-bold text-base text-on-surface">
                        ${part.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(part)}
                      aria-label={`Añadir ${part.name} a la orden de servicio`}
                      className={`h-9 px-3 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                        inCart
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container-lowest text-primary hover:bg-primary-container hover:text-on-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {inCart ? 'done' : 'add_shopping_cart'}
                      </span>
                      <span>{inCart ? `${inCart.quantity} en Orden` : 'Añadir'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Guided Maintenance Request Form with Universal Accessibility */}
      <section
        id="solicitud-reparacion"
        className="rounded-2xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm border border-surface-variant/30"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Guidance & Accessibility Helpers */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Atención Técnica Inmediata
            </span>
            <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">
              Solicitud Guiada de Reparación
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Diseñado bajo estándares de accesibilidad universal WCAG AAA. Si te encuentras en
              planta o en piso de operaciones, puedes utilizar el dictado por voz o activar el modo
              de asistencia técnica asistida.
            </p>

            {/* Accessibility Helper Box */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-surface-variant/30">
              <div className="flex items-center gap-1.5 text-on-surface font-bold text-sm">
                <span className="material-symbols-outlined text-secondary">accessibility_new</span>
                <span>Asistente Inclusivo Activo</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Compatible con lectores NVDA/VoiceOver y teclado numérico unidireccional. Puedes
                solicitar apoyo en vivo con un clic.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setLargeTextMode((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    largeTextMode
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'bg-surface-container-highest text-on-surface hover:bg-secondary-fixed'
                  }`}
                >
                  {largeTextMode ? 'Texto Normal' : 'Texto +20%'}
                </button>
                <button
                  type="button"
                  onClick={handleCallSpecialist}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">support_agent</span>
                  <span>Llamada Especialista</span>
                </button>
              </div>
            </div>

            {/* Cryptographic Traceability */}
            <div className="p-4 rounded-xl bg-primary-fixed/20 flex items-center gap-3 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl">security</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">
                  Trazabilidad Criptográfica
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Registro inviolable del estado del hardware en cada intervención.
                </span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form
            onSubmit={handleSubmitForm}
            className={`lg:w-2/3 flex flex-col gap-4 transition-all ${
              largeTextMode ? 'text-base scale-[1.02] origin-left' : 'text-xs'
            }`}
          >
            {/* Identification fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="cliente-id-input"
                  className="font-bold text-on-surface flex items-center justify-between text-xs"
                >
                  <span>Identificación del Cliente o Empresa</span>
                  <span className="text-secondary font-semibold">*Requerido</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-lg">
                    business
                  </span>
                  <input
                    id="cliente-id-input"
                    type="text"
                    required
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="Ej: logística@aeropuerto-mad.es o CIF"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low text-on-surface font-medium text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="bin-serial-input"
                  className="font-bold text-on-surface flex items-center justify-between text-xs"
                >
                  <span>ID o Número Serial Smart Bin IA</span>
                  <span className="text-secondary font-semibold">*Requerido</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-lg">
                    qr_code_scanner
                  </span>
                  <input
                    id="bin-serial-input"
                    type="text"
                    required
                    value={binSerial}
                    onChange={(e) => setBinSerial(e.target.value)}
                    placeholder="Ej: SB-IA-2024-9841"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low text-on-surface font-medium text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest"
                  />
                </div>
              </div>
            </div>

            {/* Failure category buttons */}
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-on-surface text-xs">
                Tipo de Anomalía o Falla Detectada
              </span>
              <div
                role="radiogroup"
                aria-label="Categoría de falla de hardware"
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
              >
                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all border ${
                    failureCategory === 'vision'
                      ? 'bg-primary-container text-on-primary border-primary ring-2 ring-primary'
                      : 'bg-surface-container-low border-surface-variant/40 text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <input
                    type="radio"
                    name="failure-cat"
                    value="vision"
                    checked={failureCategory === 'vision'}
                    onChange={() => setFailureCategory('vision')}
                    className="accent-primary h-4 w-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Visión / Cámara AI</span>
                    <span className="text-[11px] opacity-80">Clasificación errónea</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all border ${
                    failureCategory === 'mecanica'
                      ? 'bg-primary-container text-on-primary border-primary ring-2 ring-primary'
                      : 'bg-surface-container-low border-surface-variant/40 text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <input
                    type="radio"
                    name="failure-cat"
                    value="mecanica"
                    checked={failureCategory === 'mecanica'}
                    onChange={() => setFailureCategory('mecanica')}
                    className="accent-primary h-4 w-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Mecánica / Compuerta</span>
                    <span className="text-[11px] opacity-80">Atasco o servomotor</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all border ${
                    failureCategory === 'energia'
                      ? 'bg-primary-container text-on-primary border-primary ring-2 ring-primary'
                      : 'bg-surface-container-low border-surface-variant/40 text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <input
                    type="radio"
                    name="failure-cat"
                    value="energia"
                    checked={failureCategory === 'energia'}
                    onChange={() => setFailureCategory('energia')}
                    className="accent-primary h-4 w-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Energía &amp; Sensores</span>
                    <span className="text-[11px] opacity-80">Batería o volumétrico</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Description & Speech input */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label htmlFor="desc-falla" className="font-bold text-on-surface text-xs">
                  Descripción de lo Ocurrido &amp; Comportamiento Anómalo
                </label>
                <button
                  type="button"
                  onClick={handleStartVoice}
                  className={`inline-flex items-center gap-1 font-bold text-xs cursor-pointer ${
                    isRecording ? 'text-error animate-pulse' : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">mic</span>
                  <span>{isRecording ? 'Escuchando voz...' : 'Dictar por Voz'}</span>
                </button>
              </div>
              <textarea
                id="desc-falla"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe brevemente el síntoma. Ej: La compuerta superior tarda en responder tras el escaneo de botellas PET o emite tres pitidos cortos."
                className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest leading-relaxed"
              />
            </div>

            {/* Urgency and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="urgencia-select" className="font-bold text-on-surface text-xs">
                  Nivel de Impacto Operativo
                </label>
                <select
                  id="urgencia-select"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  <option value="normal">Normal: Equipo operativo con advertencia menor</option>
                  <option value="alto">Alto: Bloqueo de clasificación en zona de alto tránsito</option>
                  <option value="critico">
                    Crítico (SLA 4h): Equipo totalmente inoperativo en línea crítica
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone-input" className="font-bold text-on-surface text-xs">
                  Teléfono de Enlace en Planta
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  value={plantPhone}
                  onChange={(e) => setPlantPhone(e.target.value)}
                  placeholder="+34 600 000 000 (Opcional para técnico)"
                  className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            {/* Success Feedback Banner */}
            {submittedTicketId && (
              <div
                role="status"
                className="p-4 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-between border border-primary/30 animate-fadeIn"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-primary">task_alt</span>
                  <div>
                    <p className="font-bold text-sm text-on-primary-fixed">
                      Incidencia #{submittedTicketId} Registrada con Éxito
                    </p>
                    <p className="text-xs text-on-primary-fixed/80">
                      Un especialista técnico ha validado la telemetría del Smart Bin ({binSerial}).
                      Tiempo estimado de contacto: 18 minutos.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedTicketId(null)}
                  className="p-1 rounded hover:bg-primary/20 text-on-primary-fixed cursor-pointer"
                  aria-label="Cerrar notificación"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDescription('');
                  setSubmittedTicketId(null);
                }}
                className="px-4 py-2.5 rounded-xl text-on-surface-variant hover:text-on-surface font-bold text-xs cursor-pointer"
              >
                Limpiar Formulario
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-container transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">send</span>
                <span>Enviar Solicitud al Centro de Mantenimiento</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
