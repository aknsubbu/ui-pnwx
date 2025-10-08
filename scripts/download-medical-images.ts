/**
 * Medical Equipment Image Downloader
 * 
 * Downloads medical equipment images from Unsplash and cycles them through products
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as https from 'https';

interface Product {
  id: string;
  name: string;
  description: string;
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

// Medical equipment images from Unsplash (free to use)
const MEDICAL_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-1.jpg',
    alt: 'Medical imaging equipment'
  },
  {
    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-2.jpg',
    alt: 'X-ray machine'
  },
  {
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-3.jpg',
    alt: 'Medical devices'
  },
  {
    url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-4.jpg',
    alt: 'Hospital equipment'
  },
  {
    url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-5.jpg',
    alt: 'Medical technology'
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-6.jpg',
    alt: 'Radiology equipment'
  },
  {
    url: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-7.jpg',
    alt: 'Medical imaging system'
  },
  {
    url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-8.jpg',
    alt: 'Healthcare technology'
  },
  {
    url: 'https://images.unsplash.com/photo-1666214280594-3e972e2d5c8d?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-9.jpg',
    alt: 'Medical apparatus'
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160507-bbe1b99b8aa9?w=800&h=600&fit=crop&crop=center',
    filename: 'medical-10.jpg',
    alt: 'X-ray imaging equipment'
  }
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
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
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function downloadAllImages(): Promise<string[]> {
  console.log('📥 Downloading medical equipment images from Unsplash...\n');
  
  // Create images directory
  const publicDir = path.join(process.cwd(), 'public', 'images');
  await fs.mkdir(publicDir, { recursive: true });
  
  const downloadedImages: string[] = [];
  
  for (let i = 0; i < MEDICAL_IMAGES.length; i++) {
    const image = MEDICAL_IMAGES[i];
    const filepath = path.join(publicDir, image.filename);
    const localPath = `/images/${image.filename}`;
    
    try {
      console.log(`  ${i + 1}/${MEDICAL_IMAGES.length} ${image.alt}...`);
      await downloadImage(image.url, filepath);
      downloadedImages.push(localPath);
      console.log(`      ✅ ${image.filename}`);
      
      // Rate limiting - be nice to Unsplash
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error: any) {
      console.log(`      ❌ Failed: ${error.message}`);
    }
  }
  
  return downloadedImages;
}

async function updateProducts(imagePool: string[]): Promise<void> {
  if (imagePool.length === 0) {
    throw new Error('No images downloaded');
  }
  
  console.log(`\n🔄 Cycling ${imagePool.length} images through products...\n`);
  
  const dataDir = path.join(process.cwd(), 'data');
  const files = ['equipment.json', 'accessories.json', 'supplies.json', 'parts.json'];
  
  let imageIndex = 0;
  let totalUpdated = 0;
  
  for (const filename of files) {
    console.log(`📄 ${filename}...`);
    const filePath = path.join(dataDir, filename);
    const data: DataFile = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    
    let fileCount = 0;
    
    for (const category of data.categories) {
      for (const product of category.subcategories) {
        // Assign images in cycling order
        const mainImage = imagePool[imageIndex % imagePool.length];
        const secondImage = imagePool[(imageIndex + 1) % imagePool.length];
        const thirdImage = imagePool[(imageIndex + 2) % imagePool.length];
        
        product.image = mainImage;
        product.images = [mainImage, secondImage, thirdImage];
        
        imageIndex++;
        fileCount++;
        totalUpdated++;
      }
    }
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`  ✅ ${fileCount} products updated`);
  }
  
  console.log(`\n🎉 Total: ${totalUpdated} products updated`);
}

async function main() {
  console.log('🏥 Medical Equipment Image Downloader\n');
  console.log('This will:');
  console.log('  • Download 10 medical images from Unsplash');
  console.log('  • Save them to /public/images/');
  console.log('  • Cycle them through all 169 products');
  console.log('  • Give each product 3 images (main + gallery)\n');
  
  try {
    const images = await downloadAllImages();
    
    if (images.length === 0) {
      console.log('❌ No images downloaded successfully');
      return;
    }
    
    await updateProducts(images);
    
    console.log('\n' + '='.repeat(50));
    console.log('✨ Complete!');
    console.log(`📊 Downloaded: ${images.length} images`);
    console.log('🌐 Run: npm run dev');
    console.log('🔗 Visit: http://localhost:3003');
    console.log('='.repeat(50));
    
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
  }
}

main().catch(console.error);
