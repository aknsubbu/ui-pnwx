/**
 * Image Status Report Generator
 * 
 * Generates a markdown report showing which products have images
 * and which need them.
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

interface DataFile {
  categories: Array<{
    name: string;
    id: string;
    subcategories: Product[];
  }>;
}

async function generateReport() {
  console.log('📊 Generating Image Status Report...\n');
  
  const dataDir = path.join(process.cwd(), 'data');
  const files = ['equipment', 'accessories', 'supplies', 'parts'];
  
  let report = '# Product Image Status Report\n\n';
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  report += '## Summary\n\n';
  
  let totalProducts = 0;
  let withImages = 0;
  let needsImages = 0;
  
  const details: string[] = [];
  
  for (const file of files) {
    const filePath = path.join(dataDir, `${file}.json`);
    const data: DataFile = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    
    let fileWithImages = 0;
    let fileNeedsImages = 0;
    
    details.push(`\n## ${file.charAt(0).toUpperCase() + file.slice(1)}\n`);
    
    for (const category of data.categories) {
      details.push(`\n### ${category.name}\n\n`);
      details.push('| Status | Product | Image Path | PNWX URL |\n');
      details.push('|--------|---------|------------|----------|\n');
      
      for (const product of category.subcategories) {
        totalProducts++;
        
        const hasLocalImage = product.image && product.image.startsWith('/images/');
        const hasPlaceholder = product.image && product.image.includes('placeholder');
        const hasImage = hasLocalImage || (!hasPlaceholder && product.image && product.image.startsWith('http'));
        
        if (hasImage) {
          withImages++;
          fileWithImages++;
          details.push(`| ✅ | ${product.name} | \`${product.image}\` | [View](${product.url}) |\n`);
        } else {
          needsImages++;
          fileNeedsImages++;
          const imageInfo = hasPlaceholder ? 'Placeholder' : 'None';
          details.push(`| ⭕ | ${product.name} | ${imageInfo} | [View](${product.url}) |\n`);
        }
      }
    }
    
    report += `- **${file}**: ${fileWithImages}/${fileWithImages + fileNeedsImages} have images\n`;
  }
  
  report += `\n**Total**: ${withImages}/${totalProducts} products have images (${Math.round(withImages/totalProducts*100)}%)\n`;
  report += `**Need images**: ${needsImages} products\n\n`;
  
  report += '---\n\n';
  report += details.join('');
  
  report += '\n\n---\n\n';
  report += '## How to Add Images\n\n';
  report += '1. Visit the PNWX URL for a product\n';
  report += '2. Right-click and save product images to `/public/images/`\n';
  report += '3. Use this command to update:\n';
  report += '   ```bash\n';
  report += '   npx tsx scripts/update-image-paths.ts update <file> <product-id> /images/<filename>\n';
  report += '   ```\n\n';
  report += 'Example:\n';
  report += '```bash\n';
  report += 'npx tsx scripts/update-image-paths.ts update equipment film-processor /images/film-processor.jpg\n';
  report += '```\n';
  
  // Save report
  const reportPath = path.join(process.cwd(), 'docs', 'IMAGE_STATUS_REPORT.md');
  await fs.writeFile(reportPath, report);
  
  console.log(`✅ Report generated: docs/IMAGE_STATUS_REPORT.md\n`);
  console.log('Summary:');
  console.log(`  📦 Total products: ${totalProducts}`);
  console.log(`  ✅ With images: ${withImages} (${Math.round(withImages/totalProducts*100)}%)`);
  console.log(`  ⭕ Need images: ${needsImages}`);
}

generateReport().catch(console.error);
