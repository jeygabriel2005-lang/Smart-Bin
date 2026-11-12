import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { filterClientRecords, ClientRecord } from '../utils/pricing';

export const CrmView: React.FC = () => {
  const {
    clients,
    activeClientId,
    setActiveClientId,
    searchQuery,
    startCheckoutWithModel,
    speakText,
    announceToScreenReader,
    addRepairTicket,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<
    'all' | 'with-maintenance' | 'without-maintenance' | 'verified-address' | 'pending-dispatch'
  >('all');

  const [showCallModal, setShowCallModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [callNotes, setCallNotes] = useState('');
  const [ticketIssue, setTicketIssue] = useState('');
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  const filteredClients = filterClientRecords(clients, activeFilter, searchQuery);
  const activeClient: ClientRecord =
    clients.find((c) => c.id === activeClientId) || clients[0];

  const handleSelectClient = (client: ClientRecord) => {
    setActiveClientId(client.id);
    announceToScreenReader(`Ficha comercial de ${client.name} cargada.`);
  };

  const handleExportBI = () => {
    setActionSuccessNotice('Reporte de BI exportado en formato CSV y PDF accesible.');
    speakText('Generando y descargando reporte de Business Intelligence con telemetría de flota.');
    setTimeout(() => setActionSuccessNotice(null), 3500);
  };

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    setActionSuccessNotice(`Llamada con ${activeClient.contactName} registrada en el CRM.`);
    setShowCallModal(false);
    setCallNotes('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addRepairTicket({
      clientId: activeClient.id,
      binSerial: 'SB-IA-2024-9841',
      category: 'Mantenimiento Preventivo',
      description: ticketIssue || 'Mantenimiento preventivo solicitado desde CRM.',
      urgency: 'normal',
      phone: activeClient.phone,
    });
    setActionSuccessNotice(`Ticket #${newId} creado para ${activeClient.name}.`);
    setShowTicketModal(false);
    setTicketIssue('');
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn">
      {/* Top Bar: Operational Context & Quick Global Actions */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-secondary mb-1">
            <span className="material-symbols-outlined text-base">dashboard_customize</span>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Consola Comercial &amp; Flota Distribuida
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-xs font-bold text-primary">WCAG AAA Compliance</span>
          </div>

          <h1 className="font-display font-bold text-2xl lg:text-3xl text-on-surface tracking-tight">
            Gestión Comercial &amp; CRM de Clientes
          </h1>

          <p className="text-xs text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Supervisión de cuentas corporativas, contratos telemétricos Smart Bin IA, direcciones de
            entrega verificadas y adopción de servicios de mantenimiento preventivo.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleExportBI}
            aria-label="Exportar datos del CRM a reporte BI en formato CSV o PDF"
            className="inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-surface-container text-secondary font-bold text-xs hover:bg-surface-container-high transition-all shadow-sm border border-surface-variant/40 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">file_download</span>
            <span>Exportar Reporte BI</span>
          </button>

          <button
            type="button"
            onClick={() => startCheckoutWithModel('enterprise', 2, false)}
            aria-label="Abrir formulario para registrar nueva venta o pedido de Smart Bin IA"
            className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
            <span>Registrar Nueva Venta / Pedido</span>
          </button>
        </div>
      </section>

      {/* Temporary Success Toast */}
      {actionSuccessNotice && (
        <div
          role="status"
          className="mb-6 p-4 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-between border border-primary/30 animate-fadeIn"
        >
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="material-symbols-outlined text-lg text-primary">check_circle</span>
            <span>{actionSuccessNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccessNotice(null)}
            className="text-on-primary-fixed text-xs p-1"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      {/* Metric Badges / Accessible KPIs Strip */}
      <section
        aria-label="Métricas de Impacto Comercial y Operativo"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
      >
        {/* Card 1: Clientes Activos */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Clientes Activos
            </span>
            <span className="h-8 w-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">corporate_fare</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display font-bold text-3xl text-on-surface leading-none">
              1,248
            </span>
            <span className="inline-flex items-center text-primary font-bold text-xs">
              <span className="material-symbols-outlined text-sm">trending_up</span> +14.2%
            </span>
          </div>
          <span className="text-[11px] text-on-surface-variant">
            420 sedes corporativas con telemática activa
          </span>
        </div>

        {/* Card 2: Pedidos en Tránsito */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Pedidos en Tránsito
            </span>
            <span className="h-8 w-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">local_shipping</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display font-bold text-3xl text-on-surface leading-none">86</span>
            <span className="text-xs font-bold text-secondary">100% rutas accesibles</span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-secondary h-full w-[78%]" />
          </div>
        </div>

        {/* Card 3: Adopción Mantenimiento Opcional */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Adopción Mantenimiento
            </span>
            <span className="h-8 w-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">health_and_safety</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display font-bold text-3xl text-primary leading-none">42%</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-bold uppercase">
              Meta Trimestral
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Contratos preventivos con reemplazo por sensor óptico
          </p>
        </div>

        {/* Card 4: Residuos Clasificados con IA */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Residuos Clasificados IA
            </span>
            <span className="h-8 w-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display font-bold text-3xl text-on-surface leading-none">
              384.6
            </span>
            <span className="font-display font-bold text-base text-secondary">Ton</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span>98.7% precisión en espectro PET/Orgánico</span>
          </div>
        </div>
      </section>

      {/* Main Master-Detail Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filter Bar and Client Feed */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Filter Pills Bar */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-variant/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div
              role="toolbar"
              aria-label="Filtros de Clientes"
              className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0"
            >
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Todos (1,248)
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('with-maintenance')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'with-maintenance'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Con Mantenimiento (524)
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('without-maintenance')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'without-maintenance'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Solo Hardware (592)
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('verified-address')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'verified-address'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Dirección Verificada (1,180)
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('pending-dispatch')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'pending-dispatch'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Pendiente Despacho (46)
              </button>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-outline font-medium">
                Mostrando {filteredClients.length} clientes clave
              </span>
            </div>
          </div>

          {/* Client Rows */}
          <div
            role="feed"
            aria-label="Listado de Clientes y Contratos Smart Bin IA"
            className="flex flex-col gap-3"
          >
            {filteredClients.map((client) => {
              const isSelected = activeClient.id === client.id;
              return (
                <article
                  key={client.id}
                  tabIndex={0}
                  onClick={() => handleSelectClient(client)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectClient(client);
                    }
                  }}
                  className={`p-4 lg:p-5 rounded-2xl shadow-sm border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-surface-container border-primary ring-2 ring-primary/40'
                      : 'bg-surface-container-lowest border-surface-variant/30 hover:border-surface-variant hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0 border border-surface-variant/30">
                        <span className="material-symbols-outlined text-2xl">
                          {client.category.includes('Salud')
                            ? 'local_hospital'
                            : client.category.includes('Educación')
                            ? 'school'
                            : client.category.includes('Workplace')
                            ? 'apartment'
                            : 'warehouse'}
                        </span>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-bold text-sm text-on-surface truncate">
                            {client.name}
                          </h2>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold">
                            <span className="material-symbols-outlined text-xs">verified</span>
                            Email Validado
                          </span>

                          {client.hasMaintenance ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                              <span className="material-symbols-outlined text-xs">
                                verified_user
                              </span>
                              Mantenimiento Activo ({client.maintenanceSla?.split(' ')[1] || 'SLA 4h'})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold">
                              <span className="material-symbols-outlined text-xs">
                                do_not_disturb_on
                              </span>
                              Solo Hardware
                            </span>
                          )}

                          {client.pendingDispatch && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                              <span className="material-symbols-outlined text-xs">schedule</span>
                              Despacho Pendiente
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1.5 text-xs text-on-surface-variant">
                          <span className="flex items-center gap-1 text-on-surface font-medium">
                            <span className="material-symbols-outlined text-sm text-outline">
                              mail
                            </span>
                            {client.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-outline">
                              call
                            </span>
                            {client.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-outline">
                              location_on
                            </span>
                            {client.address.split(',')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hardware Badge & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0">
                      <div className="text-left md:text-right">
                        <div className="flex items-center md:justify-end gap-1 text-primary font-bold text-sm">
                          <span className="material-symbols-outlined text-lg">delete_sweep</span>
                          <span>{client.binCount} Smart Bins IA</span>
                        </div>
                        <span className="text-[11px] text-outline">{client.modelName}</span>
                      </div>

                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container text-secondary group-hover:bg-secondary group-hover:text-on-secondary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">chevron_right</span>
                      </div>
                    </div>
                  </div>

                  {/* Accessibility & Route Details */}
                  <div className="mt-3 pt-2.5 border-t border-surface-variant/20 flex flex-wrap items-center justify-between gap-2 text-xs text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-primary">
                        accessible
                      </span>
                      <span className="text-[11px]">{client.accessibilityNotes}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-outline">
                        Última sync telemétrica: hace 4 min
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-[10px] font-bold">
                        ID: {client.id}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          <nav
            aria-label="Navegación de páginas de clientes"
            className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-variant/30 text-xs text-on-surface-variant"
          >
            <span>
              Página <strong className="text-on-surface font-bold">1</strong> de 42
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="px-3 py-1.5 rounded-lg bg-surface-container text-outline opacity-60 cursor-not-allowed font-bold text-xs"
              >
                Anterior
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-bold text-xs"
              >
                1
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-bold text-xs"
              >
                2
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-bold text-xs"
              >
                3
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-bold text-xs cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </nav>
        </div>

        {/* Right Column: Master-Detail Drawer */}
        <aside
          aria-label="Ficha de Detalle de Cliente y Oportunidades CRM"
          className="lg:col-span-4 flex flex-col gap-4 sticky top-20"
        >
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-variant/30 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-surface-variant/30">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                  Ficha Comercial Activa
                </span>
                <h3 className="font-display font-bold text-lg text-on-surface">
                  {activeClient.name}
                </h3>
                <span className="text-xs text-outline font-medium">
                  ID Cliente: {activeClient.id} • Cuenta Corporativa
                </span>
              </div>
              <span
                className="inline-flex items-center p-2 rounded-xl bg-primary-container text-on-primary"
                title="Conexión telemétrica en vivo"
              >
                <span className="material-symbols-outlined text-lg">sensors</span>
              </span>
            </div>

            {/* Verified Contact Details Module */}
            <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-variant/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-outline">
                  Contacto Principal
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-primary font-bold">
                  <span className="material-symbols-outlined text-xs">verified</span> Verificado
                </span>
              </div>
              <span className="font-bold text-sm text-on-surface">{activeClient.contactName}</span>
              <span className="text-xs text-on-surface-variant">{activeClient.contactRole}</span>

              <div className="mt-1 flex flex-col gap-1 text-xs text-on-surface">
                <a
                  href={`mailto:${activeClient.email}`}
                  className="inline-flex items-center gap-1.5 text-secondary hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  <span>{activeClient.email}</span>
                </a>
                <a
                  href={`tel:${activeClient.phone}`}
                  className="inline-flex items-center gap-1.5 text-on-surface hover:text-secondary"
                >
                  <span className="material-symbols-outlined text-sm">phone</span>
                  <span>{activeClient.phone}</span>
                </a>
              </div>
            </div>

            {/* Shipping & Accessible Logistics */}
            <div className="mt-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-outline">
                  Dirección de Despacho &amp; Logística Accesible
                </span>
                <span className="material-symbols-outlined text-base text-primary">
                  assist_walker
                </span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container border border-surface-variant/30">
                <p className="text-xs font-bold text-on-surface leading-snug">
                  {activeClient.address}
                </p>
                <div className="mt-2 pt-2 border-t border-surface-variant/30 flex flex-col gap-1 text-[11px] text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">
                      check_circle
                    </span>
                    <span>Rampa de descarga sin desnivel (Aprobada transporte pesado)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">
                      check_circle
                    </span>
                    <span>Puertas con apertura mínima de 120 cm (Pasaje directo)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware & Sensor Telemetry */}
            <div className="mt-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-outline">
                  Parque de Dispositivos Smart Bin IA
                </span>
                <span className="text-xs font-bold text-primary">
                  {activeClient.binCount} Unidades
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-surface-container flex flex-col border border-surface-variant/30">
                  <span className="text-[10px] text-outline font-medium">Capacidad Actual</span>
                  <span className="font-bold text-sm text-on-surface">
                    {activeClient.currentCapacity}
                  </span>
                  <span className="text-[10px] text-primary font-semibold">
                    Recolección programada
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container flex flex-col border border-surface-variant/30">
                  <span className="text-[10px] text-outline font-medium">Sensor Óptico IA</span>
                  <span className="font-bold text-sm text-on-surface">
                    {activeClient.opticalSensorHealth}
                  </span>
                  <span className="text-[10px] text-secondary font-semibold">
                    {activeClient.firmware}
                  </span>
                </div>
              </div>
            </div>

            {/* Ethical Cross-Selling / Advisory */}
            <div className="mt-4 p-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed shadow-sm border border-tertiary/30">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-lg text-tertiary">lightbulb</span>
                <span className="font-bold text-xs text-on-tertiary-fixed">
                  {activeClient.opportunity.title}
                </span>
              </div>
              <p className="text-xs text-on-tertiary-fixed leading-relaxed mb-3">
                {activeClient.opportunity.description}
              </p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-on-tertiary-fixed">
                  {activeClient.opportunity.badge}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActionSuccessNotice(
                      `Cotización sugerida (${activeClient.opportunity.badge}) enviada a ${activeClient.email}.`
                    );
                    speakText('Cotización enviada al correo del cliente.');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-on-tertiary-fixed text-surface text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                >
                  Enviar Cotización
                </button>
              </div>
            </div>

            {/* Interaction Log */}
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-outline">
                Bitácora de Interacciones CRM
              </span>
              <div className="flex flex-col gap-2 mt-1">
                <div className="p-2.5 rounded-xl bg-surface-container-low flex items-start gap-2 border border-surface-variant/30 text-xs">
                  <span className="material-symbols-outlined text-base text-primary mt-0.5">
                    call_received
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface">
                      Llamada de Onboarding &amp; Calibración
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Realizada con {activeClient.contactName}. Se verificó umbral de detección de PET.
                    </span>
                    <span className="text-[10px] text-outline mt-0.5">Ayer a las 16:30 hrs</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-surface-container-low flex items-start gap-2 border border-surface-variant/30 text-xs">
                  <span className="material-symbols-outlined text-base text-secondary mt-0.5">
                    mark_email_read
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface">
                      Confirmación de Despacho Inicial
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Guía #99283 enviada y confirmada con acuse de recibo de rampa médica.
                    </span>
                    <span className="text-[10px] text-outline mt-0.5">14 Octubre, 11:15 hrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-surface-variant/30 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowCallModal(true)}
                className="flex-1 py-2 px-3 rounded-xl bg-surface-container text-secondary font-bold text-xs hover:bg-surface-container-high transition-colors text-center cursor-pointer"
              >
                Registrar Llamada
              </button>
              <button
                type="button"
                onClick={() => setShowTicketModal(true)}
                className="flex-1 py-2 px-3 rounded-xl bg-surface-container text-secondary font-bold text-xs hover:bg-surface-container-high transition-colors text-center cursor-pointer"
              >
                Crear Ticket SLA
              </button>
            </div>
          </div>
        </aside>
      </section>

      {/* Log Call Modal */}
      {showCallModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/70 backdrop-blur-sm p-4 animate-fadeIn"
        >
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-xl p-6 border border-surface-variant/40 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant/30">
              <h3 className="font-display font-bold text-lg text-on-surface">
                Registrar Llamada con {activeClient.contactName}
              </h3>
              <button
                type="button"
                onClick={() => setShowCallModal(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleLogCall} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Notas de la Conversación
                </label>
                <textarea
                  rows={3}
                  required
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="Detalles sobre telemetría, sugerencia de sensores o satisfacción de servicio..."
                  className="w-full p-3 rounded-xl bg-surface-container-low text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCallModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow hover:bg-primary-container"
                >
                  Guardar en Bitácora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SLA Ticket Modal */}
      {showTicketModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/70 backdrop-blur-sm p-4 animate-fadeIn"
        >
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-xl p-6 border border-surface-variant/40 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant/30">
              <h3 className="font-display font-bold text-lg text-on-surface">
                Generar Ticket SLA para {activeClient.name}
              </h3>
              <button
                type="button"
                onClick={() => setShowTicketModal(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Descripción del Incidente / Mantenimiento
                </label>
                <textarea
                  rows={3}
                  required
                  value={ticketIssue}
                  onChange={(e) => setTicketIssue(e.target.value)}
                  placeholder="Ej: Calibración óptica de compuerta 2 y reemplazo de sello..."
                  className="w-full p-3 rounded-xl bg-surface-container-low text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow hover:bg-primary-container"
                >
                  Emitir Ticket SLA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
