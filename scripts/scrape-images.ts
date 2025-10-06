/**
 * Image Scraper for PNWX Product Images
 * 
 * This script:
 * 1. Scrapes product pages from PNWX website
 * 2. Extracts all product images
 * 3. Downloads images to /public/images/
 * 4. Updates JSON files with local image paths
 * 
 * Usage: npx tsx scripts/scrape-images.ts
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import { load } from 'cheerio';

interface Product {
  id: string;
  name: string;
  description: string;
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

/**
 * Downloads an image from a URL to a local path
 */
async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        if (response.headers.location) {
          downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
          return;
        }
      }
      
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      require('fs').unlink(filepath, () => {}); // Delete the file async
      reject(err);
    });
  });
}

/**
 * Fetches HTML from a URL
 */
async function fetchHTML(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Extract image URLs from HTML using cheerio
 */
function extractImageUrls(html: string, baseUrl: string): string[] {
  const $ = load(html);
  const urls: string[] = [];
  
  $('img').each((_, elem) => {
    let src = $(elem).attr('src');
    if (!src) return;
    
    // Convert relative URLs to absolute
    if (src.startsWith('/')) {
      src = baseUrl + src;
    } else if (!src.startsWith('http')) {
      src = baseUrl + '/' + src;
    }
    
    // Skip tiny images and icons
    const width = $(elem).attr('width');
    const height = $(elem).attr('height');
    if (width && height && (parseInt(width) < 50 || parseInt(height) < 50)) {
      return;
    }
    
    // Skip common non-product images
    if (src.includes('spacer') || src.includes('pixel') || src.includes('icon')) {
      return;
    }
    
    urls.push(src);
  });
  
  return Array.from(new Set(urls)); // Remove duplicates
}

/**
 * Generate a safe filename from URL
 */
function getFilenameFromUrl(url: string, productId: string): string {
  const urlObj = new URL(url);
  const ext = path.extname(urlObj.pathname) || '.jpg';
  const basename = path.basename(urlObj.pathname, ext);
  const safeName = basename.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  return `${productId}-${safeName}${ext}`;
}

/**
 * Main scraping function
 */
async function scrapeProductImages() {
  console.log('🖼️  PNWX Product Image Scraper\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const publicDir = path.join(process.cwd(), 'public', 'images');
  const files = ['equipment.json', 'accessories.json', 'supplies.json', 'parts.json'];
  
  // Create images directory
  await fs.mkdir(publicDir, { recursive: true });
  
  let totalDownloaded = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  
  for (const filename of files) {
    console.log(`\n📄 Processing ${filename}...`);
    const filePath = path.join(dataDir, filename);
    const data: DataFile = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    
    let fileModified = false;
    
    for (const category of data.categories) {
      console.log(`  📁 ${category.name}`);
      
      for (const product of category.subcategories) {
        // Skip if no URL to scrape from
        if (!product.url || product.url.includes('placeholder')) {
          totalSkipped++;
          continue;
        }
        
        // Skip if already has local images
        if (product.image && product.image.startsWith('/images/')) {
          console.log(`    ⏭️  ${product.name} (already has local images)`);
          totalSkipped++;
          continue;
        }
        
        console.log(`    🔍 ${product.name}`);
        
        try {
          // Fetch the product page
          const html = await fetchHTML(product.url);
          const imageUrls = extractImageUrls(html, 'https://www.pnwx.com');
          
          if (imageUrls.length === 0) {
            console.log(`      ⚠️  No images found`);
            totalSkipped++;
            continue;
          }
          
          const downloadedImages: string[] = [];
          
          // Download first 3 images (main + gallery)
          for (let i = 0; i < Math.min(3, imageUrls.length); i++) {
            const imageUrl = imageUrls[i];
            const filename = getFilenameFromUrl(imageUrl, product.id);
            const filepath = path.join(publicDir, filename);
            const localPath = `/images/${filename}`;
            
            try {
              await downloadImage(imageUrl, filepath);
              downloadedImages.push(localPath);
              console.log(`      ✅ Downloaded image ${i + 1}`);
              totalDownloaded++;
            } catch (error: any) {
              console.log(`      ❌ Failed to download: ${error.message}`);
              totalFailed++;
            }
          }
          
          // Update product data
          if (downloadedImages.length > 0) {
            product.image = downloadedImages[0];
            product.images = downloadedImages;
            fileModified = true;
          }
          
          // Rate limiting - wait 500ms between requests
          await new Promise(resolve => setTimeout(resolve, 500));
          
        } catch (error: any) {
          console.log(`      ❌ Error: ${error.message}`);
          totalFailed++;
        }
      }
    }
    
    // Save updated data
    if (fileModified) {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`  💾 Updated ${filename}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ Downloaded: ${totalDownloaded} images`);
  console.log(`   ❌ Failed: ${totalFailed}`);
  console.log(`   ⏭️  Skipped: ${totalSkipped}`);
  console.log('='.repeat(60));
}

// Run the scraper
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🚀 Starting PNWX image scraper...\n');
  console.log('This will:');
  console.log('  1. Visit each product page on pnwx.com');
  console.log('  2. Extract product images');
  console.log('  3. Download images to /public/images/');
  console.log('  4. Update JSON files with local paths\n');
  console.log('⏱️  This may take several minutes...\n');
  
  scrapeProductImages().catch(console.error);
}
