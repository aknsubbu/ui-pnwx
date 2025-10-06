/**
 * Update Product Images to Use PNWX URLs Directly
 * 
 * This script updates placeholder images to use actual PNWX image URLs.
 * The browser will fetch these images directly, avoiding Node.js SSL issues.
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

interface Category {
  name: string;
  subcategories: Product[];
}

interface DataFile {
  categories: Category[];
}

/**
 * Generate likely image URLs based on PNWX URL patterns
 */
function generateImageUrls(product: Product): string[] {
  const imageUrls: string[] = [];
  
  if (!product.url) {
    return imageUrls;
  }

  // Common PNWX image patterns
  const baseUrl = product.url.replace(/\/$/, ''); // Remove trailing slash
  
  // Pattern 1: Direct image in the same directory
  const possibleImages = [
    `${baseUrl}/${product.id}.jpg`,
    `${baseUrl}/${product.id}.gif`,
    `${baseUrl}/${product.id}.png`,
    `${baseUrl}/image.jpg`,
    `${baseUrl}/image.gif`,
    `${baseUrl}/product.jpg`,
    `${baseUrl}/main.jpg`,
  ];

  // Pattern 2: Common subdirectories
  const subdirs = ['images', 'img', 'photos', 'pics'];
  for (const subdir of subdirs) {
    possibleImages.push(
      `${baseUrl}/${subdir}/${product.id}.jpg`,
      `${baseUrl}/${subdir}/image.jpg`,
      `${baseUrl}/${subdir}/product.jpg`
    );
  }

  // Pattern 3: Use the product URL path as image base
  const urlPath = product.url.replace('https://www.pnwx.com', '');
  const pathParts = urlPath.split('/').filter(p => p);
  if (pathParts.length > 0) {
    const lastPart = pathParts[pathParts.length - 1];
    possibleImages.push(
      `https://www.pnwx.com${urlPath}${lastPart}.jpg`,
      `https://www.pnwx.com${urlPath}${lastPart}.gif`,
      `https://www.pnwx.com${urlPath}image.jpg`
    );
  }

  // Remove duplicates
  const uniqueImages = Array.from(new Set(possibleImages));
  return uniqueImages;
}

/**
 * Update a product's image fields
 */
function updateProductImages(product: Product): Product {
  // Skip if already has a real PNWX image (not placeholder)
  if (product.image && 
      product.image.includes('pnwx.com') && 
      !product.image.includes('placeholder')) {
    console.log(`  ✓ Already has PNWX image: ${product.name}`);
    return product;
  }

  // Generate possible image URLs
  const imageUrls = generateImageUrls(product);
  
  if (imageUrls.length === 0) {
    console.log(`  ⚠ No URL available: ${product.name}`);
    return product;
  }

  // Use the first likely URL as the main image
  const mainImage = imageUrls[0];
  
  return {
    ...product,
    image: mainImage,
    images: imageUrls.slice(0, 5) // Include up to 5 possible images
  };
}

/**
 * Process a single JSON file
 */
async function processFile(filePath: string): Promise<void> {
  console.log(`\n📄 Processing: ${path.basename(filePath)}`);
  
  const content = await fs.readFile(filePath, 'utf-8');
  const data: DataFile = JSON.parse(content);
  
  let updatedCount = 0;
  
  for (const category of data.categories) {
    console.log(`  📁 ${category.name}`);
    
    for (let i = 0; i < category.subcategories.length; i++) {
      const product = category.subcategories[i];
      const updated = updateProductImages(product);
      
      if (JSON.stringify(product) !== JSON.stringify(updated)) {
        category.subcategories[i] = updated;
        updatedCount++;
        console.log(`    ✅ Updated: ${product.name}`);
        console.log(`       Main: ${updated.image}`);
      }
    }
  }
  
  // Save the updated file
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`\n  💾 Updated ${updatedCount} products in ${path.basename(filePath)}`);
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Updating product images to use PNWX URLs...\n');
  
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
  console.log('✨ Image URLs updated! Browser will fetch from PNWX.');
  console.log('='.repeat(60));
  console.log('\n📝 Note: Some images may 404 if PNWX structure differs.');
  console.log('   Check browser console and update URLs as needed.\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { updateProductImages, generateImageUrls };
