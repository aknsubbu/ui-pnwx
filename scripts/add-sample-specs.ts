/**
 * Add Sample Detailed Specifications to Products
 * 
 * This script adds example detailed specifications to demonstrate
 * the standalone product page features.
 * 
 * Usage:
 *   npx tsx scripts/add-sample-specs.ts
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

// Sample specifications for different product types
const sampleSpecsByType: Record<string, Partial<Product>> = {
  'film-processor': {
    specifications: {
      'Processing Speed': '90 seconds dry-to-dry',
      'Film Sizes': ['8x10"', '10x12"', '14x17"'],
      'Developer Tank Capacity': '3.5 gallons',
      'Fixer Tank Capacity': '5.0 gallons',
      'Power Requirements': '115V, 20A',
      'Operating Temperature': '68-75°F (20-24°C)',
      'Dimensions': '24" W x 36" H x 30" D',
      'Weight': '185 lbs (84 kg)',
    },
    features: [
      'Fully automatic processing with consistent results',
      'Digital temperature control with ±0.5°F accuracy',
      'Low maintenance design with easy-access panels',
      'Energy efficient with standby mode',
      'Compatible with all standard X-ray films',
      'Built-in replenishment system',
      'Stainless steel construction for durability',
    ],
    dimensions: {
      width: '24 inches',
      height: '36 inches',
      depth: '30 inches',
      weight: '185 lbs',
    },
    compatibility: [
      'Compatible with all standard X-ray films',
      'Works with Kodak, Fuji, and Agfa chemistry',
      'Fits standard 24-inch wide spaces',
    ],
    partNumbers: ['FP-100', 'FP-100-STD'],
  },
  'portable-xray': {
    specifications: {
      'Generator Type': 'High Frequency',
      'Power Output': '80 kHp @ 100 kV',
      'kVp Range': '40-100 kVp (1 kVp steps)',
      'mA Settings': '20, 32, 50, 63, 80, 100, 125 mA',
      'mAs Range': '0.02 - 800 mAs',
      'Focal Spot Size': '1.0mm (IEC 336)',
      'Input Power': '120V, 60Hz, 20A',
      'Battery Capacity': '200 exposures per charge',
    },
    features: [
      'High-frequency generator for superior image quality',
      'Lightweight portable design',
      'Built-in rechargeable battery for true portability',
      'LCD display with intuitive controls',
      'Anatomical programming for quick setup',
      'Digital interface ready',
      'CE marked and FDA approved',
    ],
    dimensions: {
      width: '14.5 inches',
      height: '17 inches',
      depth: '19 inches',
      weight: '35 lbs',
    },
    partNumbers: ['HF80-115V', 'HF80-240V'],
  },
  'default': {
    specifications: {
      'Type': 'Medical Imaging Equipment',
      'Compatibility': 'Standard medical imaging systems',
      'Power': '115V AC',
      'Certification': 'FDA Approved',
    },
    features: [
      'High-quality construction for reliability',
      'Easy to install and operate',
      'Low maintenance requirements',
      'Compatible with standard equipment',
      'Professional-grade performance',
    ],
    dimensions: {
      weight: 'Contact for specifications',
    },
  },
};

/**
 * Enhance a product with sample specifications
 */
function enhanceProduct(product: Product): Product {
  // If already has specs, keep them
  if (product.specifications && Object.keys(product.specifications).length > 3) {
    return product;
  }

  // Determine product type based on name/id
  let specs: Partial<Product>;
  const name = product.name.toLowerCase();
  const id = product.id.toLowerCase();

  if (name.includes('processor') || id.includes('processor')) {
    specs = sampleSpecsByType['film-processor'];
  } else if (name.includes('portable') || name.includes('x-ray') || id.includes('portable')) {
    specs = sampleSpecsByType['portable-xray'];
  } else {
    specs = sampleSpecsByType['default'];
  }

  // Merge specifications with existing data
  return {
    ...product,
    specifications: specs.specifications || product.specifications,
    features: specs.features || product.features,
    dimensions: specs.dimensions || product.dimensions,
    compatibility: specs.compatibility || product.compatibility,
    partNumbers: product.partNumbers || specs.partNumbers || [product.id.toUpperCase()],
    // Add more images if we only have one
    images: product.images || (product.image ? [product.image] : []),
  };
}

/**
 * Process a data file
 */
async function processDataFile(filePath: string): Promise<void> {
  console.log(`\n📄 Processing: ${path.basename(filePath)}`);
  
  const content = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  let enhancedCount = 0;
  
  for (const category of data.categories) {
    console.log(`  📁 ${category.name}`);
    
    for (let i = 0; i < category.subcategories.length; i++) {
      const product = category.subcategories[i];
      const enhanced = enhanceProduct(product);
      
      if (enhanced !== product) {
        category.subcategories[i] = enhanced;
        enhancedCount++;
        console.log(`    ✅ ${product.name}`);
      } else {
        console.log(`    ⏭️  ${product.name} (already has specs)`);
      }
    }
  }
  
  // Save enhanced data
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  
  console.log(`\n  💾 Saved ${enhancedCount} enhanced products to ${path.basename(filePath)}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Adding sample specifications to products...\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const files = ['equipment.json', 'accessories.json', 'supplies.json', 'parts.json'];
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    
    try {
      await processDataFile(filePath);
    } catch (error) {
      console.error(`❌ Failed to process ${file}:`, error);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ Done! Sample specifications added to all products.');
  console.log('='.repeat(60));
  console.log('\n💡 Next steps:');
  console.log('1. Review the updated JSON files');
  console.log('2. Customize specifications for specific products');
  console.log('3. Add real data by manually editing the JSON files');
  console.log('4. Test product pages to see the new specifications');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { enhanceProduct, processDataFile };
