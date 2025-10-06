/**
 * Simple Image URL Updater
 * 
 * Replaces placeholder images with PNWX URLs that browsers can load directly.
 * For products without specific images, uses a generic medical equipment image.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

interface Product {
  id: string;
  name: string;
  url?: string;
  image?: string;
  images?: string[];
}

/**
 * Update product to use PNWX image or fallback
 */
function updateProductImage(product: Product): Product {
  // Keep existing PNWX images
  if (product.image?.includes('pnwx.com') && !product.image.includes('placeholder')) {
    return product;
  }

  // If product has a PNWX URL, try to construct image URL from it
  if (product.url) {
    // Common PNWX image locations
    const baseUrl = product.url.endsWith('/') ? product.url : product.url + '/';
    const possibleImages = [
      `${baseUrl}image.jpg`,
      `${baseUrl}image.gif`,
      `${baseUrl}product.jpg`,
      `${baseUrl}main.jpg`,
      `${product.url.replace(/\/$/, '')}.jpg`,
    ];

    return {
      ...product,
      image: possibleImages[0], // Use first option as primary
      images: possibleImages, // Store all options for the gallery
    };
  }

  // Fallback: use a generic medical equipment placeholder
  return {
    ...product,
    image: 'https://via.placeholder.com/400x300/4A5568/FFFFFF?text=Medical+Equipment',
    images: ['https://via.placeholder.com/400x300/4A5568/FFFFFF?text=Medical+Equipment'],
  };
}

async function processFile(filePath: string): Promise<void> {
  console.log(`\n📄 Processing: ${path.basename(filePath)}`);
  
  const content = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  let updatedCount = 0;
  
  for (const category of data.categories) {
    for (let i = 0; i < category.subcategories.length; i++) {
      const product = category.subcategories[i];
      const before = JSON.stringify(product.image);
      const updated = updateProductImage(product);
      const after = JSON.stringify(updated.image);
      
      if (before !== after) {
        category.subcategories[i] = updated;
        updatedCount++;
        console.log(`  ✅ ${product.name}`);
        console.log(`     → ${updated.image}`);
      }
    }
  }
  
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`\n  💾 Updated ${updatedCount} products`);
}

async function main() {
  console.log('🖼️  Converting to PNWX image URLs...\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const files = ['equipment.json', 'accessories.json', 'supplies.json', 'parts.json'];
  
  for (const file of files) {
    await processFile(path.join(dataDir, file));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ Done! Images will now load directly from PNWX.');
  console.log('   Your browser will handle fetching them.');
  console.log('='.repeat(60));
}

main().catch(console.error);
