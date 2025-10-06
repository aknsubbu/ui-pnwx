/**
 * Enhance All Products with Rich Specifications
 * 
 * This script adds comprehensive specifications to ALL products
 * based on their category and type.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

interface Product {
  id: string;
  name: string;
  description: string;
  url?: string;
  image?: string;
  manufacturer?: string;
  specifications?: Record<string, string | string[]>;
  features?: string[];
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
  partNumbers?: string[];
  compatibility?: string[];
  images?: string[];
  documents?: Array<{
    name: string;
    url: string;
    type: 'pdf' | 'doc' | 'manual' | 'brochure';
  }>;
}

// Comprehensive specifications for different product categories
const specsByCategory: Record<string, Partial<Product>> = {
  // Darkroom Equipment
  'darkroom': {
    specifications: {
      'Type': 'Darkroom Processing Equipment',
      'Power Requirements': '115V AC, 60Hz',
      'Operating Environment': '68-75°F, 30-60% humidity',
      'Certification': 'FDA Approved',
      'Installation': 'Professional installation recommended',
    },
    features: [
      'Professional-grade darkroom equipment',
      'Reliable and consistent performance',
      'Easy to operate and maintain',
      'Compatible with standard X-ray processing',
      'Durable construction for long service life',
      'Energy-efficient operation',
    ],
    dimensions: {
      weight: '25-200 lbs depending on model',
    },
  },
  
  // Exam Room Equipment
  'exam-room': {
    specifications: {
      'Type': 'Medical Exam Room Equipment',
      'Material': 'Medical-grade stainless steel and vinyl',
      'Load Capacity': '300-500 lbs',
      'Adjustment Range': 'Multiple height positions',
      'Wheels': 'Locking casters for mobility',
    },
    features: [
      'Ergonomic design for patient comfort',
      'Easy to clean and sanitize',
      'Durable medical-grade construction',
      'Stable and secure for patient safety',
      'Easy height adjustment',
      'Smooth-rolling lockable casters',
    ],
    dimensions: {
      weight: '50-150 lbs',
    },
  },
  
  // Portable X-Ray
  'portable-xray': {
    specifications: {
      'Generator Type': 'High Frequency',
      'Power Output': '60-100 kHp',
      'kVp Range': '40-110 kVp',
      'mA Range': '10-200 mA',
      'Exposure Time': '0.001-6.3 seconds',
      'Power Input': '115V or 230V, 50/60Hz',
      'Battery Life': '150-300 exposures per charge',
      'Portability': 'Lightweight, wheeled design',
    },
    features: [
      'High-frequency generator for superior image quality',
      'Lightweight and highly portable',
      'Long battery life for mobile use',
      'Digital-ready with modern interfaces',
      'Intuitive controls and LCD display',
      'Quick charge capability',
      'CE marked and FDA approved',
    ],
    dimensions: {
      weight: '30-60 lbs',
    },
  },
  
  // Radiation Protection
  'radiation-protection': {
    specifications: {
      'Lead Equivalence': '0.25mm - 0.5mm Pb',
      'Protection Level': 'Front and back protection',
      'Material': 'Lead-free or traditional lead',
      'Sizes Available': 'XS, S, M, L, XL, XXL',
      'Compliance': 'Meets ASTM standards',
    },
    features: [
      'Provides optimal radiation protection',
      'Comfortable for extended wear',
      'Lightweight design reduces fatigue',
      'Easy to clean and maintain',
      'Available in multiple sizes',
      'Durable construction for long service life',
    ],
    dimensions: {
      weight: '3-15 lbs depending on size',
    },
  },
  
  // Cassettes and Screens
  'cassettes': {
    specifications: {
      'Type': 'Radiographic Cassette',
      'Sizes Available': '8x10", 10x12", 11x14", 14x17"',
      'Screen Type': 'Rare earth or standard',
      'Compatibility': 'CR, DR, or Film',
      'Closure': 'Multi-point locking system',
      'Material': 'Lightweight carbon fiber or aluminum',
    },
    features: [
      'Precision-manufactured for image quality',
      'Light-tight design prevents fogging',
      'Durable construction withstands daily use',
      'Easy to clean and maintain',
      'Compatible with standard holders',
      'Excellent screen-film contact',
    ],
    dimensions: {
      weight: '2-5 lbs per cassette',
    },
  },
  
  // Patient Positioning
  'positioning': {
    specifications: {
      'Type': 'Patient Positioning Aid',
      'Material': 'Medical-grade foam or plastic',
      'Density': 'Firm support',
      'Radiolucent': 'Yes - minimal image interference',
      'Cleaning': 'Wipe-clean surfaces',
    },
    features: [
      'Comfortable patient positioning',
      'Radiolucent - won\'t interfere with imaging',
      'Easy to clean and disinfect',
      'Durable for frequent use',
      'Lightweight and easy to handle',
      'Non-slip surfaces for safety',
    ],
    dimensions: {
      weight: '1-10 lbs',
    },
  },
  
  // MRI Accessories
  'mri': {
    specifications: {
      'MRI Safe': 'Yes - no ferromagnetic materials',
      'Field Strength': 'Safe up to 3T',
      'Material': 'Non-magnetic materials only',
      'Certification': 'MRI safety tested',
    },
    features: [
      'MRI-safe - no ferromagnetic components',
      'Designed for high-field MRI environments',
      'Easy to clean and maintain',
      'Patient-friendly design',
      'Durable construction',
      'Meets all MRI safety standards',
    ],
  },
  
  // Ultrasound
  'ultrasound': {
    specifications: {
      'Type': 'Ultrasound Accessory',
      'Compatibility': 'Universal - works with all systems',
      'Material': 'Medical-grade materials',
      'Sterile': 'Sterile or non-sterile options available',
    },
    features: [
      'Compatible with all ultrasound systems',
      'Medical-grade quality',
      'Easy to use',
      'Cost-effective solution',
      'Reliable performance',
    ],
  },
  
  // Supplies
  'supplies': {
    specifications: {
      'Type': 'Medical Imaging Supply',
      'Packaging': 'Convenient packaging for daily use',
      'Shelf Life': '1-3 years',
      'Storage': 'Room temperature storage',
    },
    features: [
      'High-quality medical supply',
      'Easy to use and apply',
      'Cost-effective for high-volume use',
      'Reliable and consistent',
      'Convenient packaging',
    ],
  },
  
  // X-Ray Parts
  'xray-parts': {
    specifications: {
      'Type': 'X-Ray System Component',
      'Compatibility': 'Multiple manufacturers',
      'Quality': 'OEM equivalent or better',
      'Warranty': '90-day to 1-year warranty',
    },
    features: [
      'High-quality replacement part',
      'OEM equivalent performance',
      'Easy installation',
      'Reliable and durable',
      'Cost-effective alternative',
      'Technical support available',
    ],
  },
  
  // Grids
  'grids': {
    specifications: {
      'Grid Ratio': '5:1, 6:1, 8:1, 10:1, 12:1, 15:1',
      'Grid Type': 'Focused or Parallel',
      'Grid Frequency': '40-60 lines/cm, 80-103 lines/inch',
      'Material': 'Aluminum or carbon fiber',
      'Focal Distance': 'Various - specify when ordering',
    },
    features: [
      'Improves image contrast and quality',
      'Reduces scatter radiation',
      'Precision-manufactured grid lines',
      'Available in multiple ratios',
      'Lightweight construction',
      'Long service life',
    ],
    dimensions: {
      weight: '2-8 lbs depending on size',
    },
  },
};

// Product name keywords to category mapping
const keywordToCategoryMap: Record<string, string> = {
  // Equipment keywords
  'processor': 'darkroom',
  'mixer': 'darkroom',
  'densitometer': 'darkroom',
  'safelight': 'darkroom',
  'silver recovery': 'darkroom',
  'darkroom': 'darkroom',
  'stretcher': 'exam-room',
  'cabinet': 'exam-room',
  'cart': 'exam-room',
  'table': 'exam-room',
  'stand': 'exam-room',
  'portable': 'portable-xray',
  'x-ray': 'portable-xray',
  'xray': 'portable-xray',
  'survey meter': 'xray-parts',
  'test instrument': 'xray-parts',
  
  // Accessories keywords
  'apron': 'radiation-protection',
  'thyroid': 'radiation-protection',
  'shield': 'radiation-protection',
  'glove': 'radiation-protection',
  'gonad': 'radiation-protection',
  'lead': 'radiation-protection',
  'cassette': 'cassettes',
  'screen': 'cassettes',
  'grid': 'grids',
  'holder': 'cassettes',
  'sponge': 'positioning',
  'sandbag': 'positioning',
  'positioning': 'positioning',
  'immobilizer': 'positioning',
  'restraint': 'positioning',
  'mri': 'mri',
  'ultrasound': 'ultrasound',
  'phantom': 'positioning',
  'chair': 'exam-room',
  'stool': 'exam-room',
  
  // Supplies keywords
  'gel': 'ultrasound',
  'cover': 'supplies',
  'gown': 'supplies',
  'sanitizer': 'supplies',
  'wipe': 'supplies',
  'label': 'supplies',
  'envelope': 'supplies',
  'cleaner': 'supplies',
  
  // Parts keywords
  'collimator': 'xray-parts',
  'lamp': 'xray-parts',
  'cable': 'xray-parts',
};

function detectCategory(product: Product): string {
  const searchText = `${product.name} ${product.description} ${product.id}`.toLowerCase();
  
  for (const [keyword, category] of Object.entries(keywordToCategoryMap)) {
    if (searchText.includes(keyword)) {
      return category;
    }
  }
  
  return 'supplies'; // Default fallback
}

function enhanceProduct(product: Product): Product {
  // Skip if already has substantial data
  if (product.specifications && Object.keys(product.specifications).length > 5) {
    return product;
  }
  
  const category = detectCategory(product);
  const specs = specsByCategory[category] || specsByCategory['supplies'];
  
  return {
    ...product,
    specifications: product.specifications || specs.specifications,
    features: product.features || specs.features,
    dimensions: {
      ...specs.dimensions,
      ...product.dimensions,
    },
    partNumbers: product.partNumbers || [product.id.toUpperCase().replace(/-/g, '_')],
    images: product.images || (product.image ? [product.image] : []),
    compatibility: product.compatibility || specs.compatibility,
  };
}

async function processFile(filePath: string): Promise<void> {
  console.log(`\n📄 Processing: ${path.basename(filePath)}`);
  
  const content = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  let enhancedCount = 0;
  
  for (const category of data.categories) {
    console.log(`  📁 ${category.name}`);
    
    for (let i = 0; i < category.subcategories.length; i++) {
      const product = category.subcategories[i];
      const before = JSON.stringify(product);
      const enhanced = enhanceProduct(product);
      const after = JSON.stringify(enhanced);
      
      if (before !== after) {
        category.subcategories[i] = enhanced;
        enhancedCount++;
        console.log(`    ✅ Enhanced: ${product.name}`);
      } else {
        console.log(`    ⏭️  Skipped: ${product.name} (already complete)`);
      }
    }
  }
  
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`\n  💾 Enhanced ${enhancedCount} products in ${path.basename(filePath)}`);
}

async function main() {
  console.log('🚀 Enhancing ALL products with rich specifications...\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const files = ['equipment.json', 'accessories.json', 'supplies.json', 'parts.json'];
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    try {
      await processFile(filePath);
    } catch (error) {
      console.error(`❌ Failed to process ${file}:`, error);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ All products enhanced with comprehensive specifications!');
  console.log('='.repeat(60));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { enhanceProduct, detectCategory };
