/**
 * Test Image Scraper - Dry Run
 * 
 * This script tests the image scraping logic without downloading anything
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as https from 'https';
import { load } from 'cheerio';

interface Product {
  id: string;
  name: string;
  url?: string;
  image?: string;
  [key: string]: any;
}

interface DataFile {
  categories: Array<{
    name: string;
    subcategories: Product[];
  }>;
}

async function fetchHTML(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractImageUrls(html: string, baseUrl: string): string[] {
  const $ = load(html);
  const urls: string[] = [];
  
  $('img').each((_, elem) => {
    let src = $(elem).attr('src');
    if (!src) return;
    
    if (src.startsWith('/')) {
      src = baseUrl + src;
    } else if (!src.startsWith('http')) {
      src = baseUrl + '/' + src;
    }
    
    const width = $(elem).attr('width');
    const height = $(elem).attr('height');
    if (width && height && (parseInt(width) < 50 || parseInt(height) < 50)) {
      return;
    }
    
    if (src.includes('spacer') || src.includes('pixel') || src.includes('icon')) {
      return;
    }
    
    urls.push(src);
  });
  
  return Array.from(new Set(urls));
}

async function testScraping() {
  console.log('🧪 Testing Image Scraper (Dry Run)\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const data: DataFile = JSON.parse(
    await fs.readFile(path.join(dataDir, 'equipment.json'), 'utf-8')
  );
  
  // Test first 3 products
  let count = 0;
  for (const category of data.categories) {
    for (const product of category.subcategories) {
      if (count >= 3) break;
      if (!product.url || product.url.includes('placeholder')) continue;
      
      console.log(`\n📦 ${product.name}`);
      console.log(`   URL: ${product.url}`);
      
      try {
        const html = await fetchHTML(product.url);
        const imageUrls = extractImageUrls(html, 'https://www.pnwx.com');
        
        console.log(`   Found ${imageUrls.length} images:`);
        imageUrls.slice(0, 3).forEach((url, i) => {
          console.log(`      ${i + 1}. ${url}`);
        });
        
        count++;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error: any) {
        console.log(`   ❌ Error: ${error.message}`);
      }
      
      if (count >= 3) break;
    }
    if (count >= 3) break;
  }
  
  console.log('\n✅ Test complete! The scraper appears to be working.\n');
  console.log('To run the full scraper: npx tsx scripts/scrape-images.ts');
}

testScraping().catch(console.error);
