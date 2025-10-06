# Image Scraping Guide for PNWX Website

## Overview
This guide explains how to download and integrate images from the PNWX website into your application.

## Method 1: Browser DevTools (Recommended for Small Batches)

### Steps:

1. **Open the PNWX website in your browser:**
   ```
   https://www.pnwx.com/Equipment/
   https://www.pnwx.com/Accessories/
   https://www.pnwx.com/Supplies/
   ```

2. **Open DevTools (F12 or Right-click → Inspect)**

3. **Navigate to Network Tab:**
   - Click on "Network" tab
   - Filter by "Img" to show only images
   - Refresh the page to capture all image requests

4. **Browse through categories:**
   - Click on different product categories
   - Let images load completely
   - All image URLs will appear in Network tab

5. **Download Images:**
   - Right-click on image URLs
   - Select "Open in new tab"
   - Right-click image → "Save image as..."
   - Save to `public/equipment/`, `public/accessories/`, or `public/supplies/`

## Method 2: Using the Scraper Script

### Setup:

1. **Update the script** at `scripts/scrape-images.ts`:

```typescript
const imagesToDownload: ImageDownload[] = [
  {
    url: 'https://www.pnwx.com/path/to/image.jpg',
    filename: 'descriptive-name.jpg',
    category: 'equipment' // or 'accessories' or 'supplies'
  },
  // Add more images...
];
```

2. **Run the script:**
```bash
npx ts-node scripts/scrape-images.ts
```

## Method 3: Using wget (Command Line)

### Download entire image directory:

```bash
# Create directory structure
mkdir -p public/equipment public/accessories public/supplies

# Download equipment images
wget -r -l 2 -A jpg,jpeg,png,gif -nd -P public/equipment https://www.pnwx.com/Equipment/

# Download accessories images
wget -r -l 2 -A jpg,jpeg,png,gif -nd -P public/accessories https://www.pnwx.com/Accessories/

# Download supplies images
wget -r -l 2 -A jpg,jpeg,png,gif -nd -P public/supplies https://www.pnwx.com/Supplies/
```

Options explained:
- `-r`: Recursive download
- `-l 2`: Max recursion depth of 2 levels
- `-A jpg,jpeg,png,gif`: Accept only image files
- `-nd`: No directories (flat structure)
- `-P`: Prefix directory

## Method 4: Browser Extension

Use a browser extension like "Download All Images" or "Image Downloader":

1. Install extension from Chrome Web Store or Firefox Add-ons
2. Navigate to PNWX page
3. Click extension icon
4. Select images to download
5. Save to appropriate directory

## Updating Data Files with Real Images

After downloading images, update the JSON files:

### Equipment (`data/equipment.json`):

```json
{
  "subcategories": [
    {
      "id": "film-processors",
      "name": "Film Processor",
      "image": "/equipment/film-processor-protec.jpg"  // Update this
    }
  ]
}
```

### Accessories (`data/accessories.json`):

```json
{
  "subcategories": [
    {
      "id": "lead-aprons",
      "name": "Lead Aprons",
      "image": "/accessories/lead-apron-front.jpg"  // Update this
    }
  ]
}
```

### Supplies (`data/supplies.json`):

```json
{
  "subcategories": [
    {
      "id": "ultrasound-gel",
      "name": "Ultrasound Gel",
      "image": "/supplies/ultrasound-gel-bottle.jpg"  // Update this
    }
  ]
}
```

## Naming Conventions

Use descriptive, lowercase filenames with hyphens:

✅ Good:
- `portable-xray-minxray-hf120.jpg`
- `lead-apron-0.5mm-vest.jpg`
- `ultrasound-gel-5l-jug.jpg`

❌ Bad:
- `IMG_1234.jpg`
- `product.jpg`
- `Photo Jan 15, 3 45 PM.jpg`

## Directory Structure

```
public/
├── equipment/
│   ├── film-processor-protec.jpg
│   ├── chemical-mixer-automatic.jpg
│   ├── minxray-hf-portable.jpg
│   ├── jpi-podiatric-xray.jpg
│   └── ...
├── accessories/
│   ├── lead-apron-front-back.jpg
│   ├── thyroid-collar-0.5mm.jpg
│   ├── mri-wheelchair.jpg
│   ├── cassette-storage-rack.jpg
│   └── ...
└── supplies/
    ├── hand-sanitizer-bottle.jpg
    ├── ct-gantry-cover.jpg
    ├── ultrasound-gel-bottle.jpg
    ├── sanitizing-wipes-canister.jpg
    └── ...
```

## Image Optimization

After downloading, optimize images for web:

### Using ImageOptim (Mac):
1. Download ImageOptim: https://imageoptim.com/
2. Drag and drop image folders
3. Let it compress without quality loss

### Using TinyPNG (Online):
1. Go to https://tinypng.com/
2. Upload images (up to 20 at a time)
3. Download optimized versions

### Using Sharp (Command Line):
```bash
npm install -g sharp-cli

# Optimize all images in a directory
for file in public/equipment/*.jpg; do
  sharp -i "$file" -o "${file%.jpg}-optimized.jpg" resize 800 600
done
```

## Fallback Images

The current implementation uses placeholder images from https://via.placeholder.com/.

These will automatically be replaced when you update the JSON files with real image paths.

## Legal Considerations

⚠️ **Important**: Make sure you have permission to use these images.

- Images from PNWX.com are owned by Pacific Northwest X-Ray Inc.
- For production use, obtain written permission
- Consider using manufacturer-provided product images
- Attribute image sources where required

## Troubleshooting

### Images not loading:
1. Check file path in JSON matches actual file location
2. Ensure filename case matches exactly (case-sensitive on some systems)
3. Verify image is in `public/` directory
4. Check browser console for 404 errors

### Images too large:
1. Resize images to max 800x600px for thumbnails
2. Use WebP format for better compression
3. Consider lazy loading for performance

### Missing images:
1. Placeholder will show automatically
2. Update JSON with correct path when image is available
3. No broken images will display (fallback is built-in)

## Next Steps

1. **Download key product images first** (featured items, bestsellers)
2. **Update JSON files** with real image paths
3. **Test locally** to ensure images load correctly
4. **Optimize images** for web delivery
5. **Gradually add more images** as time permits

## Automation Script (Advanced)

For bulk operations, consider creating a custom script:

```typescript
// scripts/bulk-image-processor.ts
import { promises as fs } from 'fs';
import path from 'path';

async function updateImagePaths() {
  const equipmentData = JSON.parse(
    await fs.readFile('data/equipment.json', 'utf-8')
  );
  
  // Get list of downloaded images
  const images = await fs.readdir('public/equipment');
  
  // Match images to products by name similarity
  // Update JSON accordingly
  // ...
  
  await fs.writeFile(
    'data/equipment.json',
    JSON.stringify(equipmentData, null, 2)
  );
}
```

---

**Remember**: Start with high-priority images (featured products, category headers) and expand gradually. The placeholder system ensures the site looks good even with missing images.
