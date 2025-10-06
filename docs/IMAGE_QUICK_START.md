# Product Images - Quick Start Guide

## Current Status

- **Total Products**: 169
- **With Images**: 1 (Film Processor) 
- **Need Images**: 168

## Why Automated Scraping Doesn't Work

The PNWX website uses outdated SSL/TLS settings that prevent Node.js from connecting. While `curl` and browsers work fine, automated Node.js scraping fails with:
```
Error: write EPROTO ... dh key too small
```

## ✅ Recommended Solution: Manual Download

This is actually better for quality control!

### Option 1: Browser Right-Click (Easiest)

1. Visit product page on PNWX (URLs are in the JSON files)
2. Right-click on product image → "Save Image As..."
3. Save to `/public/images/` folder
4. Name it: `{product-id}.jpg` (e.g., `film-processor.jpg`)
5. Update the JSON:
   ```bash
   npx tsx scripts/update-image-paths.ts update equipment film-processor /images/film-processor.jpg
   ```

### Option 2: Curl Command (Semi-Automated)

```bash
# Download a single image
curl -k -L -o public/images/film-processor.jpg "https://www.pnwx.com/path/to/image.jpg"

# Then update JSON
npx tsx scripts/update-image-paths.ts update equipment film-processor /images/film-processor.jpg
```

### Option 3: Batch Download Script

Edit `/scripts/download-images.sh` and add:
```bash
download_image "https://www.pnwx.com/image.jpg" "product-name.jpg"
```

Then run:
```bash
./scripts/download-images.sh
```

## 🛠️ Helper Tools Created

### 1. Image Path Updater
```bash
# Update a single image
npx tsx scripts/update-image-paths.ts update equipment film-processor /images/film-processor.jpg

# Update with multiple images (gallery)
npx tsx scripts/update-image-paths.ts update equipment film-processor /images/fp-1.jpg /images/fp-2.jpg /images/fp-3.jpg

# List all products in a file
npx tsx scripts/update-image-paths.ts list equipment
npx tsx scripts/update-image-paths.ts list accessories
```

### 2. Image Status Report Generator
```bash
npx tsx scripts/generate-image-report.ts
```
Creates `/docs/IMAGE_STATUS_REPORT.md` showing which products need images.

### 3. Download Images Script
```bash
./scripts/download-images.sh
```
Edit the script to add image URLs, then run it.

## 📋 Priority Products (Do These First)

Based on typical user interest, prioritize these:

### High Priority
1. **Film Processors** ✅ (Already has image)
2. **Portable X-Ray Equipment** (5 products)
3. **Lead Aprons** (Radiation Protection)
4. **Cassettes & Screens**
5. **Ultrasound Gel**

### Medium Priority
6. Darkroom equipment (chemical mixers, safelights)
7. Exam room equipment (stretchers, cabinets)
8. MRI accessories
9. Phantoms

### Lower Priority
10. Miscellaneous supplies
11. Small parts and accessories

## 📊 Track Your Progress

Run this command anytime to see status:
```bash
npx tsx scripts/generate-image-report.ts
```

Or list products in a specific file:
```bash
npx tsx scripts/update-image-paths.ts list equipment
```

## 🎯 Workflow Example

Let's say you want to add images for "Chemical Mixers":

1. **Find the product ID**:
   ```bash
   npx tsx scripts/update-image-paths.ts list equipment
   ```
   Output shows: `chemical-mixers`

2. **Visit PNWX**:
   Open the URL from the JSON file (or report)

3. **Download image**:
   - Right-click → Save Image As... → `/public/images/chemical-mixers.jpg`
   
   OR
   
   ```bash
   curl -k -L -o public/images/chemical-mixers.jpg "https://www.pnwx.com/Equipment/DarkEquip/ChemMixers/image.jpg"
   ```

4. **Update JSON**:
   ```bash
   npx tsx scripts/update-image-paths.ts update equipment chemical-mixers /images/chemical-mixers.jpg
   ```

5. **Verify**:
   Visit `http://localhost:3003/equipment/darkroom-equipment-and-accessories/chemical-mixers`

6. **Done!** ✅

## 💡 Tips

- **Image Size**: Aim for 800x600px to 1200x900px
- **Format**: JPG for photos, PNG if transparency needed
- **File Size**: Keep under 500KB (use compression tools)
- **Naming**: Use product ID from JSON: `{product-id}.jpg`
- **Multiple Images**: Name them `{product-id}-1.jpg`, `{product-id}-2.jpg`, etc.

## 🚀 Quick Start for 10 Products

Want to get started quickly? Here's a plan for 10 key products:

```bash
# 1. Portable X-Rays (already have URLs)
npx tsx scripts/update-image-paths.ts list equipment

# 2. Download images for these IDs:
#    - film-processor ✅
#    - jpi-portables-podiatric
#    - minxray-hf-portables
#    - source-ray-portables-podiatric
#    - chemical-mixers
#    - stretchers
#    - lead-aprons (in accessories)
#    - cassettes-with-screens
#    - ultrasound-gel (in supplies)
#    - focused-x-ray-grids (in parts)
```

## 📚 Documentation

- `/docs/IMAGE_MANAGEMENT_GUIDE.md` - Detailed guide
- `/docs/IMAGE_STATUS_REPORT.md` - Current status report
- `/docs/CURRENT_STATUS.md` - Overall project status

## 🤔 Questions?

**Q: Do I need images for all 169 products right now?**
A: No! Start with the high-priority items. The placeholders work fine for development.

**Q: Can I use stock photos?**
A: Yes! Unsplash, Pexels, and Pixabay have free medical equipment photos.

**Q: What if I can't find images on PNWX?**
A: Some products may not have good images. Use placeholders or generic stock photos.

**Q: How do I add multiple images for a gallery?**
A: Use the update command with multiple paths:
```bash
npx tsx scripts/update-image-paths.ts update equipment film-processor \
  /images/fp-main.jpg \
  /images/fp-side.jpg \
  /images/fp-controls.jpg
```

---

**Ready to start?** Download your first image and test the workflow! 🎉
