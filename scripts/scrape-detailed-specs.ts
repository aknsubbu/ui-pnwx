/**
 * Enhanced Product Specification Scraper for PNWX
 * 
 * This script scrapes detailed product specifications from PNWX.com
 * to create a complete standalone catalog with all technical details.
 * 
 * Usage:
 *   npx tsx scripts/scrape-detailed-specs.ts
 */

import * as cheerio from 'cheerio';
import * as fs from 'fs/promises';
import * as path from 'path';

// Disable type checking for cheerio callbacks
/* eslint-disable @typescript-eslint/no-explicit-any */

interface DetailedProduct {
  id: string;
  name: string;
  description: string;
  url: string;
  image?: string;
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

/**
 * Fetch and parse a product page from PNWX
 */
async function scrapeProductPage(url: string): Promise<Partial<DetailedProduct>> {
  try {
    console.log(`Scraping: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const productData: Partial<DetailedProduct> = {
      url,
      specifications: {},
      features: [],
      technicalDetails: [],
      images: [],
      documents: [],
      compatibility: [],
      partNumbers: [],
    };
    
    // Extract product name (multiple possible selectors)
    productData.name = 
      $('h1').first().text().trim() ||
      $('title').text().split('|')[0].trim() ||
      $('.product-title').text().trim() ||
      $('.page-title').text().trim();
    
    // Extract main description
    const descriptionSelectors = [
      '.product-description',
      '.description',
      'p:first-of-type',
      '.content p',
    ];
    
    for (const selector of descriptionSelectors) {
      const text = $(selector).text().trim();
      if (text && text.length > 20) {
        productData.description = text;
        break;
      }
    }
    
    // Extract manufacturer
    $('td, p, div, span').each((_index: any, el: any) => {
      const text = $(el).text();
      if (text.includes('Manufacturer:') || text.includes('Brand:')) {
        const manufacturer = text.split(':')[1]?.trim();
        if (manufacturer && !productData.manufacturer) {
          productData.manufacturer = manufacturer;
        }
      }
    });
    
    // Extract all images
    $('img').each((_index: any, el: any) => {
      const src = $(el).attr('src');
      if (src && !src.includes('spacer') && !src.includes('blank')) {
        const fullUrl = src.startsWith('http') ? src : new URL(src, url).href;
        if (!productData.images?.includes(fullUrl)) {
          productData.images?.push(fullUrl);
        }
      }
    });
    
    // Set primary image
    if (productData.images && productData.images.length > 0) {
      productData.image = productData.images[0];
    }
    
    // Extract specifications from tables
    $('table').each((_index: any, table: any) => {
      $(table).find('tr').each((_idx: any, row: any) => {
        const cells = $(row).find('td, th');
        if (cells.length >= 2) {
          const key = $(cells[0]).text().trim();
          const value = $(cells[1]).text().trim();
          
          if (key && value && key.length < 100) {
            productData.specifications![key] = value;
          }
        }
      });
    });
    
    // Extract features (bullet points, lists)
    $('ul li, ol li').each((_index: any, li: any) => {
      const text = $(li).text().trim();
      if (text && text.length > 10 && text.length < 500) {
        productData.features?.push(text);
      }
    });
    
    // Extract dimensions
    const dimensionPatterns = {
      width: /width[:\s]+([0-9.]+\s*(?:in|cm|mm|inches)?)/i,
      height: /height[:\s]+([0-9.]+\s*(?:in|cm|mm|inches)?)/i,
      depth: /depth[:\s]+([0-9.]+\s*(?:in|cm|mm|inches)?)/i,
      weight: /weight[:\s]+([0-9.]+\s*(?:lbs?|kg|pounds)?)/i,
    };
    
    const fullText = $('body').text();
    productData.dimensions = {};
    
    Object.entries(dimensionPatterns).forEach(([key, pattern]) => {
      const match = fullText.match(pattern);
      if (match) {
        productData.dimensions![key as keyof typeof productData.dimensions] = match[1];
      }
    });
    
    // Extract part numbers
    const partNumberPattern = /(?:part\s*#?|model\s*#?|sku)[:\s]+([A-Z0-9-]+)/gi;
    let match;
    while ((match = partNumberPattern.exec(fullText)) !== null) {
      const partNum = match[1].trim();
      if (partNum && !productData.partNumbers?.includes(partNum)) {
        productData.partNumbers?.push(partNum);
      }
    }
    
    // Extract document links (PDFs, manuals, etc.)
    $('a').each((_index: any, link: any) => {
      const href = $(link).attr('href');
      const text = $(link).text().trim();
      
      if (href && (href.endsWith('.pdf') || href.toLowerCase().includes('manual') || 
          href.toLowerCase().includes('spec') || href.toLowerCase().includes('datasheet'))) {
        const fullUrl = href.startsWith('http') ? href : new URL(href, url).href;
        
        let type: 'pdf' | 'doc' | 'manual' | 'brochure' = 'pdf';
        const lowerText = text.toLowerCase();
        if (lowerText.includes('manual')) type = 'manual';
        else if (lowerText.includes('brochure')) type = 'brochure';
        
        productData.documents?.push({
          name: text || 'Document',
          url: fullUrl,
          type,
        });
      }
    });
    
    // Extract compatibility information
    const compatibilityKeywords = ['compatible with', 'works with', 'fits', 'designed for'];
    $('p, li, div').each((_index: any, el: any) => {
      const text = $(el).text().toLowerCase();
      compatibilityKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
          const compatText = $(el).text().trim();
          if (compatText.length < 500 && !productData.compatibility?.includes(compatText)) {
            productData.compatibility?.push(compatText);
          }
        }
      });
    });
    
    // Extract pricing information
    const pricePattern = /\$([0-9,]+(?:\.[0-9]{2})?)/;
    const priceMatch = fullText.match(pricePattern);
    if (priceMatch) {
      productData.pricing = {
        msrp: priceMatch[0],
        note: 'Contact for current pricing',
      };
    }
    
    // Clean up empty arrays
    if (productData.features?.length === 0) delete productData.features;
    if (productData.images?.length === 0) delete productData.images;
    if (productData.documents?.length === 0) delete productData.documents;
    if (productData.compatibility?.length === 0) delete productData.compatibility;
    if (productData.partNumbers?.length === 0) delete productData.partNumbers;
    if (Object.keys(productData.specifications || {}).length === 0) delete productData.specifications;
    
    return productData;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return { url };
  }
}

/**
 * Process all products in a JSON file
 */
async function enhanceDataFile(filePath: string) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  let processedCount = 0;
  let errorCount = 0;
  
  for (const category of data.categories) {
    console.log(`\n📁 Category: ${category.name}`);
    
    for (const product of category.subcategories) {
      if (!product.url) {
        console.log(`  ⚠️  Skipping ${product.name} (no URL)`);
        continue;
      }
      
      try {
        // Rate limiting - wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const detailedData = await scrapeProductPage(product.url);
        
        // Merge scraped data with existing product data
        Object.assign(product, {
          ...product,
          ...detailedData,
        });
        
        processedCount++;
        console.log(`  ✅ ${product.name}`);
      } catch (error) {
        errorCount++;
        console.error(`  ❌ ${product.name}:`, error);
      }
    }
  }
  
  // Save enhanced data
  const outputPath = filePath.replace('.json', '-detailed.json');
  await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
  
  console.log(`\n✨ Saved enhanced data to: ${outputPath}`);
  console.log(`📊 Processed: ${processedCount} products`);
  console.log(`❌ Errors: ${errorCount} products`);
  
  return { processedCount, errorCount };
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting detailed specification scraping...\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const files = ['equipment.json', 'accessories.json', 'supplies.json', 'parts.json'];
  
  const results = {
    totalProcessed: 0,
    totalErrors: 0,
  };
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    
    try {
      const { processedCount, errorCount } = await enhanceDataFile(filePath);
      results.totalProcessed += processedCount;
      results.totalErrors += errorCount;
    } catch (error) {
      console.error(`Failed to process ${file}:`, error);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Scraping complete!');
  console.log(`📊 Total products processed: ${results.totalProcessed}`);
  console.log(`❌ Total errors: ${results.totalErrors}`);
  console.log('='.repeat(60));
  console.log('\n💡 Next steps:');
  console.log('1. Review the *-detailed.json files');
  console.log('2. Replace original JSON files if satisfied');
  console.log('3. Update product pages to display all specifications');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { scrapeProductPage, enhanceDataFile };
export type { DetailedProduct };
