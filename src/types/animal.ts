export type ConservationStatusCode = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD';

export interface ConservationStatus {
  code: ConservationStatusCode;
  labelVi: string;
  labelEn: string;
  description: string;
  color: string;
  badgeBg: string;
}

export interface AnimalTaxonomy {
  kingdom: string;   // Giới (Animalia)
  phylum: string;    // Ngành (Chordata)
  class: string;     // Lớp (Mammalia)
  order: string;     // Bộ (Carnivora)
  family: string;    // Họ (Felidae)
  genus: string;     // Chi (Panthera)
  species: string;   // Loài (Panthera leo)
}

export interface AnimalBioMetrics {
  averageLength: string;      // Kích thước chiều dài
  averageWeight: string;      // Cân nặng
  lifespanInWild: string;     // Tuổi thọ ngoài tự nhiên
  lifespanInCaptivity: string;// Tuổi thọ nuôi nhốt
  topSpeed: string;           // Tốc độ tối đa
  dietType: string;           // Ăn thịt, ăn cỏ, ăn tạp...
  activeTime: string;         // Ban ngày, ban đêm, hoàng hôn...
}

export interface AnimalProfile {
  id: string;
  commonNameVi: string;
  commonNameEn: string;
  scientificName: string;
  otherNames?: string[];
  tagline: string;
  summary: string;
  conservationStatus: ConservationStatus;
  taxonomy: AnimalTaxonomy;
  metrics: AnimalBioMetrics;
  habitat: {
    biomes: string[];
    regions: string[];
    description: string;
  };
  physicalCharacteristics: {
    description: string;
    keyFeatures: string[];
    camouflageOrDefenses?: string;
  };
  behaviorAndEcology: {
    socialStructure: string;
    huntingOrForaging: string;
    communication: string;
    specialAdaptations?: string;
  };
  diet: {
    category: string;
    primaryFoods: string[];
    description: string;
  };
  reproduction: {
    gestationPeriod: string;
    litterSize: string;
    parentalCare: string;
  };
  threatsAndConservation: {
    mainThreats: string[];
    conservationEfforts: string[];
    populationTrend: 'Tăng' | 'Ổn định' | 'Suy giảm' | 'Chưa xác định' | string;
  };
  funFacts: string[];
  humanComparison: {
    weightVsHuman: string;
    speedVsHuman: string;
    lifespanVsHuman: string;
    sizeScaleText: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  imageUrl?: string;
  imageCaption?: string;
  imageSource?: string;
  galleryImages?: { url: string; title: string; source?: string }[];
}

export interface SearchHistoryItem {
  id: string;
  nameVi: string;
  nameEn: string;
  scientificName: string;
  statusBadge: string;
  timestamp: number;
}
