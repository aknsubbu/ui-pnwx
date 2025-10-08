/**
 * Update JSON files with downloaded medical images
 * 
 * Cycles through the 10 medical images and assigns them to products
 */

import * as fs from 'fs/promises';
import * as path from 'path';

interface Product {
  id: string;
  name: string;
  image?: string;
  images?: string[];
  [key: string]: any;
}

interface DataFile {
  categories: Array<{
    name: string;
    subcategories: Product[];
  }>;
}

// The 10 medical images we downloaded
const MEDICAL_IMAGES = [
  '/images/medical-1.jpg',
  '/images/medical-2.jpg',
  '/images/medical-3.jpg',
  '/images/medical-4.jpg',
  '/images/medical-5.jpg',
  '/images/medical-6.jpg',
  '/images/medical-7.jpg',
  '/images/medical-8.jpg',
  '/images/medical-9.jpg',
  '/images/medical-10.jpg'
];

async function updateJSONFiles() {
  console.log('🔄 Updating product JSON files with medical images...\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const files = ['equipment.json', 'accessories.json', 'supplies.json', 'parts.json'];
  
  let imageIndex = 0;
  let totalUpdated = 0;
  
  for (const filename of files) {
    console.log(`📄 Processing ${filename}...`);
    const filePath = path.join(dataDir, filename);
    const data: DataFile = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    
    let fileCount = 0;
    
    for (const category of data.categories) {
      for (const product of category.subcategories) {
        // Cycle through images
        const mainImage = MEDICAL_IMAGES[imageIndex % MEDICAL_IMAGES.length];
        const secondImage = MEDICAL_IMAGES[(imageIndex + 1) % MEDICAL_IMAGES.length];
        const thirdImage = MEDICAL_IMAGES[(imageIndex + 2) % MEDICAL_IMAGES.length];
        
        product.image = mainImage;
        product.images = [mainImage, secondImage, thirdImage];
        
        imageIndex++;
        fileCount++;
        totalUpdated++;
      }
    }
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`  ✅ Updated ${fileCount} products`);
  }
  
  console.log(`\n🎉 Total: ${totalUpdated} products updated with medical images`);
  console.log('🌐 Start dev server: npm run dev');
  console.log('🔗 Visit: http://localhost:3003');
}

updateJSONFiles().catch(console.error);
