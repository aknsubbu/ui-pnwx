/**
 * Medical Equipment Image Updater
 * 
 * Cycles downloaded medical equipment images across all products
 */

import * as fs from 'fs/promises';
import * as path from 'path';

interface Product {
  id: string;
  name: string;
  url?: string;
  image?: string;
  images?: string[];
  [key: string]: any;
}

interface DataFile {
  categories: Array<{
    name: string;
    id: string;
    subcategories: Product[];
  }>;
}

// Downloaded medical equipment images
const MEDICAL_IMAGES = [
  '/images/xray-machine.jpg',
  '/images/radiology-equipment.jpg',
  '/images/portable-equipment.jpg',
  '/images/mobile-xray.jpg',
  '/images/lab-equipment.jpg',
  '/images/medical-cart.jpg',
  '/images/exam-equipment.jpg',
];

/**
 * Get a medical image for a product (cycling through available images)
 */
function getImageForProduct(productIndex: number): string {
  return MEDICAL_IMAGES[productIndex % MEDICAL_IMAGES.length];
}

/**
 * Update product with downloaded medical equipment image
 */
function updateProductImage(product: Product, productIndex: number): Product {
  const selectedImage = getImageForProduct(productIndex);
  
  return {
    ...product,
    image: selectedImage,
    images: [selectedImage], // Single image for now
  };
}

async function processFile(filePath: string): Promise<void> {
  console.log(`\n📄 Processing: ${path.basename(filePath)}`);
  
  const content = await fs.readFile(filePath, 'utf-8');
  const data: DataFile = JSON.parse(content);
  
  let updatedCount = 0;
  let productIndex = 0;
  
  for (const category of data.categories) {
    console.log(`  📁 ${category.name}`);
    
    for (let i = 0; i < category.subcategories.length; i++) {
      const product = category.subcategories[i];
      const updated = updateProductImage(product, productIndex);
      
      category.subcategories[i] = updated;
      updatedCount++;
      productIndex++;
      
      console.log(`    ✅ ${product.name} → ${updated.image}`);
    }
  }
  
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`\n  💾 Updated ${updatedCount} products in ${path.basename(filePath)}`);
}

async function main() {
  console.log('🖼️  Updating products with medical equipment images...\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const files = ['equipment.json', 'accessories.json', 'supplies.json', 'parts.json'];
  
  let totalUpdated = 0;
  
  for (const file of files) {
    await processFile(path.join(dataDir, file));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ Done! All products now have medical equipment images.');
  console.log(`   Images cycle through ${MEDICAL_IMAGES.length} downloaded photos.`);
  console.log('\n📋 Next steps:');
  console.log('   1. npm run dev');
  console.log('   2. Visit: http://localhost:3003');
  console.log('   3. Browse any product page to see the images!');
  console.log('='.repeat(60));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
