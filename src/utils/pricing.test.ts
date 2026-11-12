import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderPricing,
  calculateDynamicShipping,
  formatCurrency,
  isValidEmail,
  isValidSmartBinSerial,
  filterClientRecords,
  ClientRecord,
} from './pricing';

test('calculateOrderPricing computes standard single item without maintenance correctly', () => {
  const result = calculateOrderPricing({
    basePrice: 1190,
    quantity: 2,
    maintenanceFeePerUnit: 38,
    hasMaintenance: false,
    shippingCost: 45,
  });

  assert.equal(result.hardwareSubtotal, 2380);
  assert.equal(result.volumeDiscountRate, 0);
  assert.equal(result.discountAmount, 0);
  assert.equal(result.discountedHardware, 2380);
  assert.equal(result.maintenanceMonthlyTotal, 0);
  assert.equal(result.taxableSubtotal, 2425);
  assert.equal(result.vatAmount, 509.25);
  assert.equal(result.grandTotal, 2934.25);
  assert.equal(result.formattedGrandTotal, '€ 2.934,25');
});

test('calculateOrderPricing applies 12% fleet discount for 5 or more units and includes maintenance', () => {
  const result = calculateOrderPricing({
    basePrice: 1000,
    quantity: 5,
    maintenanceFeePerUnit: 50,
    hasMaintenance: true,
    shippingCost: 60,
  });

  assert.equal(result.hardwareSubtotal, 5000);
  assert.equal(result.volumeDiscountRate, 0.12);
  assert.equal(result.discountAmount, 600);
  assert.equal(result.discountedHardware, 4400);
  assert.equal(result.maintenanceMonthlyTotal, 250);
  assert.equal(result.taxableSubtotal, 4460);
  assert.equal(result.vatAmount, 936.6);
  assert.equal(result.grandTotal, 5396.6);
});

test('calculateDynamicShipping estimates based on zip code and units', () => {
  assert.equal(calculateDynamicShipping('123', 2), 45);
  assert.equal(calculateDynamicShipping('28001', 1), 40);
  assert.equal(calculateDynamicShipping('28001', 3), 50);
});

test('formatCurrency formats spanish currency format with dot thousands and comma decimals', () => {
  assert.equal(formatCurrency(2890), '€ 2.890,00');
  assert.equal(formatCurrency(149.5), '€ 149,50');
  assert.equal(formatCurrency(0), '€ 0,00');
});

test('isValidEmail validates standard formats correctly', () => {
  assert.equal(isValidEmail('compras@angeles.mx'), true);
  assert.equal(isValidEmail('user.name+tag@sub.domain.co'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('missing@dot'), false);
  assert.equal(isValidEmail(''), false);
});

test('isValidSmartBinSerial validates serial IDs', () => {
  assert.equal(isValidSmartBinSerial('SB-IA-2024-9841'), true);
  assert.equal(isValidSmartBinSerial('CL-9021'), true);
  assert.equal(isValidSmartBinSerial('123'), false);
  assert.equal(isValidSmartBinSerial(''), false);
});

test('filterClientRecords filters properly by query and maintenance status', () => {
  const mockClients: ClientRecord[] = [
    {
      id: 'CL-1',
      name: 'Hospital Ángeles',
      category: 'Salud',
      contactName: 'Dra. Claudia',
      contactRole: 'Directora',
      email: 'compras@angeles.mx',
      phone: '555-1111',
      address: 'Calle Hospital 1',
      binCount: 14,
      modelName: 'Enterprise',
      hasMaintenance: true,
      pendingDispatch: false,
      verifiedAddress: true,
      accessibilityNotes: 'Rampa',
      currentCapacity: '70%',
      opticalSensorHealth: '99%',
      firmware: 'v3',
      opportunity: { title: 'Test', description: 'Desc', badge: 'B' },
    },
    {
      id: 'CL-2',
      name: 'Tech University',
      category: 'Educación',
      contactName: 'Ing. Mateo',
      contactRole: 'Coordinador',
      email: 'eco@tech.edu',
      phone: '555-2222',
      address: 'Av Campus 2',
      binCount: 28,
      modelName: 'Campus',
      hasMaintenance: false,
      pendingDispatch: true,
      verifiedAddress: true,
      accessibilityNotes: 'Nivel piso',
      currentCapacity: '40%',
      opticalSensorHealth: '99%',
      firmware: 'v3',
      opportunity: { title: 'Test', description: 'Desc', badge: 'B' },
    },
  ];

  const withMaint = filterClientRecords(mockClients, 'with-maintenance', '');
  assert.equal(withMaint.length, 1);
  assert.equal(withMaint[0].id, 'CL-1');

  const withoutMaint = filterClientRecords(mockClients, 'without-maintenance', '');
  assert.equal(withoutMaint.length, 1);
  assert.equal(withoutMaint[0].id, 'CL-2');

  const searchResults = filterClientRecords(mockClients, 'all', 'tech');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'CL-2');
});
