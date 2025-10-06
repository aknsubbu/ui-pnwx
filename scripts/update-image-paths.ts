/**
 * Image Path Updater
 * 
 * Helper tool to update image paths in JSON data files
 * 
 * Usage:
 *   npx tsx scripts/update-image-paths.ts equipment film-processor /images/film-processor.jpg
 *   npx tsx scripts/update-image-paths.ts accessories lead-aprons /images/lead-apron-1.jpg /images/lead-apron-2.jpg
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
    id: string;
    subcategories: Product[];
  }>;
}

async function updateImagePaths(
  dataFile: string,
  productId: string,
  imagePaths: string[]
) {
  const filePath = path.join(process.cwd(), 'data', `${dataFile}.json`);
  
  try {
    const data: DataFile = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    let found = false;
    
    for (const category of data.categories) {
      for (const product of category.subcategories) {
        if (product.id === productId) {
          product.image = imagePaths[0];
          product.images = imagePaths;
          found = true;
          
          console.log(`✅ Updated: ${product.name}`);
          console.log(`   Main image: ${imagePaths[0]}`);
          if (imagePaths.length > 1) {
            console.log(`   Gallery: ${imagePaths.length} images`);
          }
          break;
        }
      }
      if (found) break;
    }
    
    if (!found) {
      console.log(`❌ Product not found: ${productId}`);
      console.log(`   File: ${dataFile}.json`);
      return;
    }
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`💾 Saved ${dataFile}.json`);
    
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function listProducts(dataFile: string) {
  const filePath = path.join(process.cwd(), 'data', `${dataFile}.json`);
  
  try {
    const data: DataFile = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    
    console.log(`\n📦 Products in ${dataFile}.json:\n`);
    
    for (const category of data.categories) {
      console.log(`  📁 ${category.name}`);
      for (const product of category.subcategories) {
        const hasImage = product.image && !product.image.includes('placeholder');
        const icon = hasImage ? '✅' : '⭕';
        console.log(`     ${icon} ${product.id}`);
        console.log(`        ${product.name}`);
      }
      console.log('');
    }
    
    console.log('Legend: ✅ = Has image | ⭕ = Needs image\n');
    
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
  }
}

// CLI Interface
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
🖼️  Image Path Updater
═══════════════════════════════════════════════════════════════

Usage:
  npx tsx scripts/update-image-paths.ts <command> [options]

Commands:

  update <file> <product-id> <image-path> [image-path-2] [...]
    Update image paths for a product
    
    Examples:
      npx tsx scripts/update-image-paths.ts update equipment film-processor /images/film-processor.jpg
      npx tsx scripts/update-image-paths.ts update accessories lead-aprons /images/apron-1.jpg /images/apron-2.jpg

  list <file>
    List all products and their image status
    
    Examples:
      npx tsx scripts/update-image-paths.ts list equipment
      npx tsx scripts/update-image-paths.ts list accessories

Files:
  equipment, accessories, supplies, parts

═══════════════════════════════════════════════════════════════
`);
  process.exit(0);
}

const command = args[0];

if (command === 'update') {
  if (args.length < 4) {
    console.error('❌ Error: update requires <file> <product-id> <image-path>');
    process.exit(1);
  }
  
  const dataFile = args[1];
  const productId = args[2];
  const imagePaths = args.slice(3);
  
  updateImagePaths(dataFile, productId, imagePaths).catch(console.error);
  
} else if (command === 'list') {
  if (args.length < 2) {
    console.error('❌ Error: list requires <file>');
    process.exit(1);
  }
  
  const dataFile = args[1];
  listProducts(dataFile).catch(console.error);
  
} else {
  console.error(`❌ Unknown command: ${command}`);
  console.error('   Run without arguments to see usage');
  process.exit(1);
}
