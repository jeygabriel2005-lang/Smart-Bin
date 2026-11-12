import { ClientRecord } from '../utils/pricing';

export interface ModelProduct {
  id: string;
  key: 'office' | 'enterprise' | 'industrial';
  name: string;
  badge: string;
  targetAudience: string;
  description: string;
  basePrice: number;
  featured?: boolean;
  image: string;
  specs: {
    capacity: string;
    separation: string;
    sensors: string;
    chassis: string;
  };
  delivery: string;
}

export const CATALOG_MODELS: ModelProduct[] = [
  {
    id: 'MOD-OFFICE',
    key: 'office',
    name: 'Smart Bin IA Office',
    badge: '2 Compartimentos',
    targetAudience: 'Oficinas / Retail',
    description: 'Optimizado para oficinas corporativas, recepciones y áreas de coworking con separación ágil de residuo común y envases.',
    basePrice: 1280,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFV-aYA2GKP3_PE6r4nU90W3Fxkk3n48Mqt0bQilOUrUQXNwF7AhjHP43disnx5WeCcCAFCH2kIab-CYiGncZBvjEoI5RxiIhAUrOEWC_Sq9i92dPjJbPjOBBm_RHDyP_EW_e_T2YIiwzm275C5jKhLYwSTRAooa0nvLOQLoYD4oWp_VIGWeMfdZckDod-b85EbiHdQHAJ5X9-ahRxfa8pi_2TEDZZQ_3DEB_LOAU',
    specs: {
      capacity: '60 Litros (2x30L)',
      separation: 'Orgánico • PET/Envase',
      sensors: 'Doble Tapa Asíncrona',
      chassis: '72h Batería / Cable Red',
    },
    delivery: 'Entrega Inmediata (48h)',
  },
  {
    id: 'MOD-ENTERPRISE',
    key: 'enterprise',
    name: 'Smart Bin IA Enterprise',
    badge: '4 Compartimentos',
    targetAudience: 'Sedes & Universidades',
    description: 'El sistema completo de 4 flujos sincronizados: orgánico, plástico PET certificado, metales/envases y papel/cartón.',
    basePrice: 2890,
    featured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzi2RgLTn_UNaUBfuL6yOyRwlvo8UEHifjqaFL4vWmR53cOeYI_3_9xvrcBdqjrqitVXB6RWbe-pMyrOODa-3joM4xLdg5moAITpmkFohNw-SbrKC9rQt4oRhk44Uq54qCMm3cif4Q3eTFwjBNMnEaOVx6FF48KvLXZYxdvUkJO5Ox-6cz31TMHX8GJ6ey4lzpNUirYiAA8b58qHuzZDqfa6vOUefTqKpsXssEwoA',
    specs: {
      capacity: '180 Litros (4x45L)',
      separation: 'Orgánico, PET, Latas, Papel',
      sensors: 'Ultrasónico 4x canales',
      chassis: 'Pantalla E-Ink feedback visual',
    },
    delivery: 'Garantía 3 Años',
  },
  {
    id: 'MOD-INDUSTRIAL',
    key: 'industrial',
    name: 'Smart Bin IA Industrial',
    badge: 'Heavy Duty',
    targetAudience: 'Centros Logísticos & Puertos',
    description: 'Construcción de uso rudo con compactador electromecánico interno con ratio 5:1 para grandes volúmenes y logística pesada.',
    basePrice: 4750,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJgxd4NGfcsVDIMEHZ6NlO-5UYkWM6hvS4SPVjrmSuOHmQhvi3JnwhX6Jj-pis9CW29CLmmN0E0vyPHHvRwqthkzHDUYRrf3CJKO39Un1eHahWDzeR0VQFB-PeHDRUt6odFFWGFxZGsDllKE6-reatf8DFrQTdzgY-KhMri6ui-X1cnyvHwxpmW5kjlw8sS6WRLmbHdni9ScvZyFgjwGicrqBwgDjBFFpXJ6k3ZU8',
    specs: {
      capacity: '450L (Compactado 5:1)',
      separation: 'Prensa 600 kg integrada',
      sensors: 'Blindaje IK10 / IP66',
      chassis: 'GPS + Acelerómetro activo',
    },
    delivery: 'Renting Disponible',
  },
];

export interface SparePart {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: string;
  image: string;
}

export const SPARE_PARTS: SparePart[] = [
  {
    id: 'part-1',
    sku: 'ECO-CAM-4K-AI',
    name: 'Módulo Óptico / Cámara AI 4K',
    description: 'Unidad de visión computacional con acelerador NPU integrado de 4 TOPS, lente gran angular antiempañante y sellado IP65.',
    price: 280.0,
    stock: 'En Stock (48h)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJpkVWxHeZYnNYEregmOgAKtV_RxlYiw8iFfpd3eipZNzqCvup3ZkNwX844VsKx-YuMghyodw8d1pKIypr-IKuu3faIWdZGo2YrTqChBkQ77rYUy6Yg7xvU-uERUfWrSfn3NkaZdEdHDMnVOlP_ngCSowlQqU5TqY9cJycyrkb_pK4Q4EOQf0m8-wbknc4PzMLjwNa4ZtBSPXJVRgvNEqPKIz4OWjGcdw8jJe994',
  },
  {
    id: 'part-2',
    sku: 'ECO-SRV-LOWP',
    name: 'Servomotores de Compuerta',
    description: 'Motorreductor brushless de bajo consumo (12V) con engranes de acero templado y ciclo estimado en 2.5 millones de aperturas.',
    price: 115.0,
    stock: 'En Stock (24h)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNTmn9BwiGsBx00Mza4xiCJoBj4uHsa6dXZqoJKew9pD9rG5thy2rRADrMIuAFk95KLwHoZzECxsJJAr-lfpZvhius9DY_AZUtRHtr3JKe2THHtiLhp0OumBbITJd49BjcmteRJ1aar9zmPR8p-q2KQy_Hu2uALkJyUeb9WaywxQc8y2WgMZcQPrG-eS9EF2KxTFv5cq-AgziRDDkxcysk8FAbjQysLnJf8pvzT5k',
  },
  {
    id: 'part-3',
    sku: 'ECO-SEN-USPROX',
    name: 'Sensores Ultrasónicos & Proximidad',
    description: 'Kit de transductores dobles para medición volumétrica de llenado en tiempo real y detección de manos sin contacto físico.',
    price: 85.0,
    stock: 'En Stock (24h)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCij41zZMvlTmf7si-S9IjcxMn2EXhOu2DiSiJBd63-5XpCYLPjytxxMS_6lfCO7JYdlw0agnISUd-V6fyGZFOqTNCyanaLwbkl3lvfjtV1EcdFomxi35QqMuJFbXkYZWvolpmUX3FZQBSW_uaSMdyiF_Oh1ZipFZYgizAX8CmlhHKYyFK5s83Sh8IKjnI6nXigfVGspY6XPdenlbqP4EA0v75emON9gYbVwnU8Sw',
  },
  {
    id: 'part-4',
    sku: 'ECO-PWR-LIFEP4',
    name: 'Batería de Respaldo LiFePO4',
    description: 'Módulo de energía autónomo con regulador solar inteligente, autonomía de hasta 72 horas continuas sin conexión a la red.',
    price: 195.0,
    stock: 'Bajo Pedido (72h)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA17cjUao5-R9bmI6nePxkW23jk2rCdWzqL-vx-Z5IJ-JwKZ8NMBI_M3SkjWpUedwj5QUBzY4GW47mJE9HKqL-PvZbNAUYUY9ANRLdrVpaei-NalEJI08SvDpnR0Gdfim-QQk661Hr5fnqo_5iR59u9CPu-NG8ofoQiuM00XzfIvgrxUDSBkXXVryE_84ZUE1pObIhJvqk8Y2fRKWvmOrWV4ke-MxGC4ue04Qvb_GE',
  },
];

export const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: 'CL-9021',
    name: 'Hospital Ángeles Metropolitano',
    category: 'Salud & Sanidad Privada',
    contactName: 'Dra. Claudia Fuentes V.',
    contactRole: 'Directora de Operaciones & ESG',
    email: 'compras.medicas@angeles-metro.mx',
    phone: '+52 (55) 5424-7200 ext. 410',
    address: 'Vialidad de la Barranca 24, Edificio Central, Huixquilucan, Edo. Méx., C.P. 52763',
    binCount: 14,
    modelName: 'Mod. UltraClean 120L (PET + Org)',
    hasMaintenance: true,
    maintenanceSla: 'SLA 4h In-Situ',
    pendingDispatch: false,
    verifiedAddress: true,
    accessibilityNotes: 'Rampa Médica Aislada • Elevador Montacargas Carga #2 • Pasillo ancho sin desniveles',
    currentCapacity: '73.4% Promedio',
    opticalSensorHealth: '99.8% Online',
    firmware: 'v3.4.1 Stable',
    opportunity: {
      title: 'Oportunidad Ética de Servicio',
      description: 'Este cliente genera un alto volumen de residuos biológicos inertes. Recomendar recambio trimestral del filtro HEPA de olores y extensión del SLA de mantenimiento preventivo a 2 horas.',
      badge: '+ 4 Sensores Odor-Guard',
    },
  },
  {
    id: 'CL-8442',
    name: 'Universidad Tecnológica del Valle',
    category: 'Educación Superior',
    contactName: 'Ing. Mateo Sandoval',
    contactRole: 'Coordinador de Infraestructura Verde',
    email: 'sustentabilidad@utvalle.edu.mx',
    phone: '+52 (55) 7890-1122',
    address: 'Av. Instituto Politécnico 3400, Gustavo A. Madero, CDMX, C.P. 07360',
    binCount: 28,
    modelName: 'Mod. Campus 240L Tri-Fila',
    hasMaintenance: false,
    maintenanceSla: 'Garantía Estándar 12 meses',
    pendingDispatch: true,
    verifiedAddress: true,
    accessibilityNotes: 'Acceso vehicular nivel de piso • Requiere confirmación SMS previa para descarga de muelle',
    currentCapacity: '41.2% Promedio',
    opticalSensorHealth: '99.4% Online',
    firmware: 'v3.4.0',
    opportunity: {
      title: 'Propuesta de Expansión de Campus',
      description: 'La tasa de llenado de PET los viernes supera el 90%. Se recomienda agregar 6 módulos satélite en áreas deportivas.',
      badge: '+ 6 Bins Satélite',
    },
  },
  {
    id: 'CL-7210',
    name: 'GreenHub Cowork Polanco',
    category: 'Workplace & Oficinas Compartidas',
    contactName: 'Lic. Sandra Morales',
    contactRole: 'Jefa de Workplace & Facilities',
    email: 'facilities@greenhub-mex.io',
    phone: '+52 (55) 9138-0050',
    address: 'Campos Elíseos 204, Polanco V Sección, Miguel Hidalgo, CDMX, C.P. 11560',
    binCount: 6,
    modelName: 'Mod. Executive Compact 60L',
    hasMaintenance: true,
    maintenanceSla: 'SLA 8h Remoto/Sitio',
    pendingDispatch: false,
    verifiedAddress: true,
    accessibilityNotes: 'Rampa certificada WCAG, elevador de carga con señalética Braille y audio-guía',
    currentCapacity: '88.1% Promedio',
    opticalSensorHealth: '99.9% Online',
    firmware: 'v3.4.1 Stable',
    opportunity: {
      title: 'Certificación Zero-Waste Corporate',
      description: 'GreenHub está a 2% de alcanzar su meta mensual de reciclaje con 99.2% de pureza. Califica para sello verde.',
      badge: 'Sello Auditoría ESG',
    },
  },
  {
    id: 'CL-6119',
    name: 'Operadora Logística Tlalnepantla',
    category: 'Industrial & Almacén Distribución',
    contactName: 'Armando Carrillo R.',
    contactRole: 'Gerente General de Planta',
    email: 'compras@oplogistica-mex.com',
    phone: '+52 (55) 5390-8800',
    address: 'Vía Dr. Gustavo Baz 2160, Tlalnepantla de Baz, Edo. Méx., C.P. 54000',
    binCount: 10,
    modelName: 'Mod. HeavyDuty Industrial 360L',
    hasMaintenance: false,
    maintenanceSla: 'Garantía Estándar Fábrica',
    pendingDispatch: false,
    verifiedAddress: true,
    accessibilityNotes: 'Andén con rampa electro-hidráulica • Caseta de seguridad con lector audible y semáforo visual',
    currentCapacity: '62.0% Promedio',
    opticalSensorHealth: '98.9% Online',
    firmware: 'v3.3.8',
    opportunity: {
      title: 'Mantenimiento Preventivo de Compactador',
      description: 'El actuador hidráulico alcanzó 150,000 ciclos de compresión. Se sugiere inspección de fluido y sellos.',
      badge: 'Kit Hidráulico Sugerido',
    },
  },
];

export interface SystemAlert {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  detail: string;
  time: string;
  binSerial?: string;
}

export const INITIAL_ALERTS: SystemAlert[] = [
  {
    id: 'alt-1',
    type: 'warning',
    title: 'Lente óptico con polvo detectado',
    detail: 'Smart Bin SB-IA-2024-9841 en Hospital Ángeles reporta aberración leve (0.6%). Se programó autolimpieza.',
    time: 'Hace 6 min',
    binSerial: 'SB-IA-2024-9841',
  },
  {
    id: 'alt-2',
    type: 'info',
    title: 'Actualización OTA de Red Neural',
    detail: 'Modelo v4.8 desplegado con éxito en 84 contenedores activos. Nueva categoría detectada: Vasos PLA biodegradables.',
    time: 'Hace 22 min',
  },
  {
    id: 'alt-3',
    type: 'success',
    title: 'Ruta de Recolección Optimizada',
    detail: 'Algoritmo de llenado redujo la necesidad de traslados en 31% para la zona norte metropolitana.',
    time: 'Hace 1 hora',
  },
];
