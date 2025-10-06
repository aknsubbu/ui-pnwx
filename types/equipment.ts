export interface EquipmentSubcategory {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  manufacturer?: string;
  specifications?: {
    [key: string]: string | string[];
  };
  features?: string[];
  technicalDetails?: string[];
  dimensions?: {
    width?: string;
    height?: string;
    depth?: string;
    weight?: string;
  };
  pricing?: {
    msrp?: string;
    note?: string;
  };
  compatibility?: string[];
  partNumbers?: string[];
  documents?: Array<{
    name: string;
    url: string;
    type: 'pdf' | 'doc' | 'manual' | 'brochure';
  }>;
  images?: string[];
  additionalInfo?: string;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  itemCount: number;
  featured: boolean;
  externalUrl?: string;
  badge?: string;
  subcategories: EquipmentSubcategory[];
}

export interface ContactInfo {
  phone: string;
  tollFree: string;
  fax: string;
  email: string;
  hours: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface OrderingInfo {
  minimumOrder: number;
  poMinimumOrder: number;
  orderFormUrl: string;
  acceptedPayments: string[];
  creditApprovalRequired: boolean;
}

export interface EquipmentData {
  metadata: {
    lastUpdated: string;
    source: string;
    version: string;
  };
  categories: EquipmentCategory[];
  contactInfo: ContactInfo;
  orderingInfo: OrderingInfo;
}
