/**
 * PNWX Image Updater
 *
 * Distributes the downloaded PNWX product images across all products
 * by cycling through them and updating JSON files.
 */

import * as fs from "fs/promises";
import * as path from "path";

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

async function updateProductsWithPNWXImages() {
  console.log("🖼️  Updating products with PNWX images...\n");

  const dataDir = path.join(process.cwd(), "data");
  const files = [
    "equipment.json",
    "accessories.json",
    "supplies.json",
    "parts.json",
  ];

  // List of downloaded PNWX images (based on 9 URLs from links.txt)
  const pnwxImages = [
    "/images/pnwx-product-1.jpg", // Lead apron
    "/images/pnwx-product-2.jpg", // Fluoroscopy phantom
    "/images/pnwx-product-3.jpg", // Lead gloves
    "/images/pnwx-product-4.jpg", // Pet positioning aid
    "/images/pnwx-product-5.jpg", // Table pad
    "/images/pnwx-product-6.jpg", // X-ray grid
    "/images/pnwx-product-7.jpg", // Film duplicator
    "/images/pnwx-product-8.jpg", // Chemical processing equipment
  ];

  let totalUpdated = 0;
  let imageIndex = 0;

  for (const filename of files) {
    console.log(`📄 Processing ${filename}...`);
    const filePath = path.join(dataDir, filename);
    const data: DataFile = JSON.parse(await fs.readFile(filePath, "utf-8"));

    let fileUpdated = 0;

    for (const category of data.categories) {
      console.log(`  📁 ${category.name}`);

      for (const product of category.subcategories) {
        // Cycle through PNWX images
        const currentImage = pnwxImages[imageIndex % pnwxImages.length];

        // Update product with PNWX image
        product.image = currentImage;
        product.images = [currentImage];

        console.log(`    ✅ ${product.name} → ${currentImage}`);

        imageIndex++;
        fileUpdated++;
        totalUpdated++;
      }
    }

    // Save updated data
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`  💾 Updated ${fileUpdated} products in ${filename}\n`);
  }

  console.log("═".repeat(60));
  console.log(`✨ Complete! Updated ${totalUpdated} products with PNWX images`);
  console.log(
    `🔄 Images cycled ${Math.ceil(totalUpdated / pnwxImages.length)} times`
  );
  console.log("═".repeat(60));
  console.log("\n🚀 Next steps:");
  console.log("  1. Start dev server: npm run dev");
  console.log(
    "  2. Visit: http://localhost:3000/equipment/darkroom-equipment-and-accessories/film-processor"
  );
  console.log("  3. Check that images are loading properly");
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  updateProductsWithPNWXImages().catch(console.error);
}

export { updateProductsWithPNWXImages };
