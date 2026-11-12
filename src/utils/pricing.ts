/**
 * Pure calculation and validation logic for Ecosphere Smart Bin IA
 */

export interface PricingParams {
  basePrice: number;
  quantity: number;
  maintenanceFeePerUnit: number;
  hasMaintenance: boolean;
  shippingCost?: number;
}

export interface PricingResult {
  hardwareSubtotal: number;
  volumeDiscountRate: number;
  discountAmount: number;
  discountedHardware: number;
  maintenanceMonthlyTotal: number;
  shippingCost: number;
  taxableSubtotal: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  formattedGrandTotal: string;
}

/**
 * Calculates complete order pricing, applicable discounts (12% for >= 5 units),
 * monthly maintenance fees, and 21% VAT.
 */
export function calculateOrderPricing(params: PricingParams): PricingResult {
  const qty = Math.max(1, Math.floor(params.quantity || 1));
  const base = Math.max(0, params.basePrice || 0);
  const hardwareSubtotal = base * qty;

  // 12% fleet discount from 5 units or more
  const volumeDiscountRate = qty >= 5 ? 0.12 : 0;
  const discountAmount = Math.round(hardwareSubtotal * volumeDiscountRate * 100) / 100;
  const discountedHardware = hardwareSubtotal - discountAmount;

  const maintenanceMonthlyTotal = params.hasMaintenance
    ? qty * Math.max(0, params.maintenanceFeePerUnit || 0)
    : 0;

  const shipping = params.shippingCost !== undefined ? params.shippingCost : 45.0;
  const taxableSubtotal = Math.round((discountedHardware + shipping) * 100) / 100;
  const vatRate = 0.21;
  const vatAmount = Math.round(taxableSubtotal * vatRate * 100) / 100;
  const grandTotal = Math.round((taxableSubtotal + vatAmount) * 100) / 100;

  return {
    hardwareSubtotal,
    volumeDiscountRate,
    discountAmount,
    discountedHardware,
    maintenanceMonthlyTotal,
    shippingCost: shipping,
    taxableSubtotal,
    vatRate,
    vatAmount,
    grandTotal,
    formattedGrandTotal: formatCurrency(grandTotal),
  };
}

/**
 * Calculate dynamic shipping estimate based on postal code length and weight/units
 */
export function calculateDynamicShipping(zipCode: string, quantity: number): number {
  const cleanZip = (zipCode || '').trim();
  const qty = Math.max(1, quantity || 1);
  if (cleanZip.length >= 4) {
    return 35.0 + qty * 5.0;
  }
  return 45.0;
}

/**
 * Format number into Euro currency standard
 */
export function formatCurrency(amount: number, prefix: string = '€'): string {
  const parts = Number(amount || 0).toFixed(2).split('.');
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decPart = parts[1];
  return `${prefix} ${intPart},${decPart}`;
}

/**
 * Validates business email address
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/**
 * Validates Smart Bin serial number
 */
export function isValidSmartBinSerial(serial: string): boolean {
  if (!serial || typeof serial !== 'string') return false;
  const clean = serial.trim().toUpperCase();
  return clean.length >= 6 && /^(SB-)?[A-Z0-9-]+$/.test(clean);
}

/**
 * Client data model
 */
export interface ClientRecord {
  id: string;
  name: string;
  category: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  address: string;
  binCount: number;
  modelName: string;
  hasMaintenance: boolean;
  maintenanceSla?: string;
  pendingDispatch: boolean;
  verifiedAddress: boolean;
  accessibilityNotes: string;
  currentCapacity: string;
  opticalSensorHealth: string;
  firmware: string;
  opportunity: {
    title: string;
    description: string;
    badge: string;
  };
}

/**
 * Filter clients based on search query and status filter pill
 */
export function filterClientRecords(
  clients: ClientRecord[],
  filter: 'all' | 'with-maintenance' | 'without-maintenance' | 'verified-address' | 'pending-dispatch',
  searchQuery: string
): ClientRecord[] {
  const q = (searchQuery || '').toLowerCase().trim();

  return clients.filter((client) => {
    // Search match
    if (q) {
      const matchName = client.name.toLowerCase().includes(q);
      const matchEmail = client.email.toLowerCase().includes(q);
      const matchId = client.id.toLowerCase().includes(q);
      const matchAddr = client.address.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchId && !matchAddr) {
        return false;
      }
    }

    // Filter type
    if (filter === 'with-maintenance') return client.hasMaintenance;
    if (filter === 'without-maintenance') return !client.hasMaintenance;
    if (filter === 'verified-address') return client.verifiedAddress;
    if (filter === 'pending-dispatch') return client.pendingDispatch;
    return true;
  });
}
