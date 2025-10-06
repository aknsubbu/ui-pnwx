# Standalone Product Pages with Complete Specifications

## Overview

This guide explains how to transform your product pages from preview cards into comprehensive standalone pages with all technical specifications, features, dimensions, and documentation.

## Current State vs. Goal

### Before (Preview Mode)
- Basic product info (name, description, manufacturer)
- "View on PNWX" redirect button
- Limited local data

### After (Standalone Mode)
- Complete technical specifications
- Detailed features and benefits
- Dimensions and physical specs
- Compatibility information  
- Part numbers
- Documentation downloads
- Image galleries
- Pricing information
- **NO external redirects needed**

## Data Structure Enhancement

### Enhanced TypeScript Interface

The `EquipmentSubcategory` interface now supports comprehensive product data:

```typescript
export interface EquipmentSubcategory {
  // Basic Information
  id: string;
  name: string;
  description: string;
  url: string;  // Original PNWX URL (for reference)
  image: string;
  manufacturer?: string;
  
  // NEW: Technical Specifications
  specifications?: {
    [key: string]: string | string[];
  };
  
  // NEW: Features
  features?: string[];
  technicalDetails?: string[];
  
  // NEW: Physical Dimensions
  dimensions?: {
    width?: string;
    height?: string;
    depth?: string;
    weight?: string;
  };
  
  // NEW: Pricing
  pricing?: {
    msrp?: string;
    note?: string;
  };
  
  // NEW: Compatibility
  compatibility?: string[];
  
  // NEW: Part Numbers
  partNumbers?: string[];
  
  // NEW: Documentation
  documents?: Array<{
    name: string;
    url: string;
    type: 'pdf' | 'doc' | 'manual' | 'brochure';
  }>;
  
  // NEW: Image Gallery
  images?: string[];
  
  // NEW: Additional Information
  additionalInfo?: string;
}
```

## How to Add Detailed Specifications

### Option 1: Manual Addition (Recommended for Quality)

Edit your JSON files (`data/equipment.json`, etc.) and add detailed specs for each product:

```json
{
  "id": "film-processors",
  "name": "Film Processor",
  "description": "Professional film processing equipment by Protec",
  "url": "https://www.pnwx.com/Equipment/FilmProc/Protec/",
  "image": "https://www.pnwx.com/Equipment/FilmProc/Protec/protec-logo.gif",
  "manufacturer": "Protec",
  
  "specifications": {
    "Processing Speed": "90 seconds dry-to-dry",
    "Film Sizes": ["8x10\"", "10x12\"", "14x17\""],
    "Developer Tank Capacity": "3.5 gallons",
    "Fixer Tank Capacity": "5.0 gallons",
    "Power Requirements": "115V, 20A",
    "Operating Temperature": "68-75°F"
  },
  
  "features": [
    "Fully automatic processing with consistent results",
    "Digital temperature control with ±0.5°F accuracy",
    "Low maintenance design with easy-access panels",
    "Energy efficient with standby mode",
    "Compatible with all standard X-ray films",
    "Built-in replenishment system",
    "Stainless steel construction for durability"
  ],
  
  "dimensions": {
    "width": "24 inches",
    "height": "36 inches",
    "depth": "30 inches",
    "weight": "185 lbs"
  },
  
  "pricing": {
    "msrp": "$8,995",
    "note": "Installation and training included"
  },
  
  "partNumbers": ["PROTEC-FP-100", "FP100-STD"],
  
  "compatibility": [
    "Compatible with all standard X-ray films",
    "Works with Kodak, Fuji, and Agfa chemistry",
    "Fits standard 24-inch wide spaces"
  ],
  
  "images": [
    "https://www.pnwx.com/Equipment/FilmProc/Protec/protec-front.jpg",
    "https://www.pnwx.com/Equipment/FilmProc/Protec/protec-side.jpg",
    "https://www.pnwx.com/Equipment/FilmProc/Protec/protec-interior.jpg"
  ],
  
  "documents": [
    {
      "name": "User Manual",
      "url": "https://www.pnwx.com/docs/protec-fp100-manual.pdf",
      "type": "manual"
    },
    {
      "name": "Technical Specifications",
      "url": "https://www.pnwx.com/docs/protec-fp100-specs.pdf",
      "type": "pdf"
    }
  ]
}
```

### Option 2: Automated Scraping (Faster but Needs Verification)

We've created a scraping script that attempts to extract specifications from PNWX pages:

```bash
# Install dependencies (if not already installed)
npm install cheerio

# Run the scraper
npx tsx scripts/scrape-detailed-specs.ts
```

**Important Notes:**
- The scraper creates `*-detailed.json` files
- Review the output before replacing original files
- Manual verification is recommended
- Some data may need cleanup
- Not all PNWX pages have consistent structure

### Option 3: Hybrid Approach (Best Balance)

1. **Run the scraper** to get initial data
2. **Review and enhance** the scraped data manually
3. **Add missing information** that the scraper couldn't capture
4. **Verify accuracy** against PNWX original pages

## Product Page Features

The new standalone product pages include:

### 1. Image Gallery
- Main product image (large)
- Up to 4 thumbnail images
- Click to switch views
- High-quality zoom

### 2. Technical Specifications Table
```
📋 Technical Specifications
─────────────────────────────
Processing Speed    90 seconds dry-to-dry
Film Sizes          8x10", 10x12", 14x17"
Power Requirements  115V, 20A
...
```

### 3. Key Features List
```
⭐ Key Features
✓ Fully automatic processing
✓ Digital temperature control
✓ Low maintenance design
✓ Energy efficient
...
```

### 4. Dimensions Display
```
📏 Dimensions & Weight
┌──────────┬──────────┬──────────┬──────────┐
│  ↔️      │  ↕️      │  ⬌      │  ⚖️      │
│  Width   │  Height  │  Depth   │  Weight  │
│  24"     │  36"     │  30"     │  185 lbs │
└──────────┴──────────┴──────────┴──────────┘
```

### 5. Compatibility Information
```
🔗 Compatibility
✓ Compatible with all standard X-ray films
✓ Works with Kodak, Fuji, and Agfa chemistry
✓ Fits standard 24-inch wide spaces
```

### 6. Part Numbers
```
🔖 Part Numbers
[PROTEC-FP-100]  [FP100-STD]  [FP100-DLX]
```

### 7. Documents & Downloads
```
📄 Documents & Resources
📖 User Manual → Download
📄 Technical Specifications → Download
📰 Product Brochure → Download
```

### 8. Pricing Display
```
💰 Pricing
MSRP: $8,995
Installation and training included

✓ Volume discounts available
✓ Flexible payment terms
```

## Implementation Checklist

### For Each Product:

- [ ] **Basic Info** (Already done)
  - [ ] Name
  - [ ] Description  
  - [ ] Image
  - [ ] Manufacturer

- [ ] **Specifications** (Add these)
  - [ ] Key technical specs as key-value pairs
  - [ ] Operating requirements
  - [ ] Performance metrics

- [ ] **Features** (Add these)
  - [ ] 5-10 key features/benefits
  - [ ] What makes it special
  - [ ] Advantages over competitors

- [ ] **Dimensions** (Add these)
  - [ ] Width
  - [ ] Height
  - [ ] Depth
  - [ ] Weight

- [ ] **Pricing** (Optional)
  - [ ] MSRP (if available)
  - [ ] Pricing note

- [ ] **Part Numbers** (Add these)
  - [ ] Model numbers
  - [ ] SKUs
  - [ ] Variant codes

- [ ] **Compatibility** (Add these)
  - [ ] Compatible equipment
  - [ ] Compatible supplies
  - [ ] Installation requirements

- [ ] **Images** (Add more)
  - [ ] Front view
  - [ ] Side view
  - [ ] Interior view
  - [ ] In-use photos

- [ ] **Documents** (Link these)
  - [ ] User manual PDF
  - [ ] Technical spec sheet
  - [ ] Product brochure
  - [ ] Installation guide

## Applying to Other Sections

The equipment product page is now complete. To apply the same structure to Accessories, Supplies, and Parts:

### Quick Copy Approach

1. **Copy the enhanced equipment page**:
```bash
cp app/equipment/[categoryId]/[productId]/page.tsx \
   app/accessories/[categoryId]/[productId]/page.tsx
```

2. **Update imports and data source**:
```typescript
// Change this:
import equipmentData from "@/data/equipment.json";

// To this:
import accessoriesData from "@/data/accessories.json";

// And update the data reference:
const data = accessoriesData as EquipmentData;
```

3. **Update breadcrumb and links**:
```typescript
// Change "/equipment" to "/accessories", etc.
<Link href="/accessories">Accessories</Link>
```

4. **Repeat for supplies and parts**

## Example: Complete Product Entry

Here's a fully populated product example:

```json
{
  "id": "portable-xray-hf80",
  "name": "HF80 Portable X-Ray System",
  "description": "High-frequency portable X-ray system designed for bedside imaging in hospitals, nursing homes, and mobile medical facilities. Lightweight yet powerful, delivering consistent high-quality images.",
  "url": "https://www.pnwx.com/Equipment/Portable/HF80/",
  "image": "https://www.pnwx.com/Equipment/Portable/HF80/hf80-main.jpg",
  "manufacturer": "MinXray",
  
  "specifications": {
    "Generator Type": "High Frequency",
    "Power Output": "80 kHp @ 100 kV",
    "Exposure Time Range": "0.001 - 6.3 seconds",
    "kVp Range": "40 - 100 kVp (1 kVp steps)",
    "mA Settings": "20, 32, 50, 63, 80, 100, 125 mA",
    "mAs Range": "0.02 - 800 mAs",
    "Focal Spot Size": "1.0mm (IEC 336)",
    "Inherent Filtration": "0.6mm Al equivalent",
    "Additional Filtration": "2.5mm Al + 0.1mm Cu",
    "Generator Frequency": "40 kHz",
    "Input Power": "120V, 60Hz, 20A or 240V, 50/60Hz, 10A",
    "Battery Capacity": "200 exposures per charge",
    "Charge Time": "4-6 hours",
    "Operating Temperature": "50-104°F (10-40°C)",
    "Storage Temperature": "14-122°F (-10-50°C)",
    "Humidity Range": "10-90% non-condensing"
  },
  
  "features": [
    "High-frequency generator for superior image quality",
    "Lightweight portable design at only 35 lbs",
    "Built-in rechargeable battery for true portability",
    "LCD display with intuitive controls",
    "Anatomical programming for quick setup",
    "Automatic exposure termination (AET)",
    "Digital interface ready",
    "Collapsible handle and wheels for easy transport",
    "Compact storage - fits in standard car trunk",
    "CE marked and FDA approved",
    "3-year manufacturer warranty",
    "24/7 technical support available"
  ],
  
  "dimensions": {
    "width": "14.5 inches",
    "height": "17 inches",
    "depth": "19 inches",
    "weight": "35 lbs (16 kg)"
  },
  
  "pricing": {
    "msrp": "$24,995",
    "note": "Price includes carrying case, battery charger, and 1-year warranty. Extended warranties available."
  },
  
  "partNumbers": ["HF80-115V-US", "HF80-240V-INTL", "HF80-UPGRADE"],
  
  "compatibility": [
    "Compatible with all standard X-ray cassettes (CR, DR, Film)",
    "Works with portable grid cassettes",
    "Interfaces with most PACS systems",
    "Compatible with Fuji, Carestream, Agfa CR readers",
    "Supports DICOM protocol"
  ],
  
  "images": [
    "https://www.pnwx.com/Equipment/Portable/HF80/hf80-main.jpg",
    "https://www.pnwx.com/Equipment/Portable/HF80/hf80-side.jpg",
    "https://www.pnwx.com/Equipment/Portable/HF80/hf80-controls.jpg",
    "https://www.pnwx.com/Equipment/Portable/HF80/hf80-inuse.jpg"
  ],
  
  "documents": [
    {
      "name": "HF80 User Manual",
      "url": "https://www.pnwx.com/docs/hf80-user-manual.pdf",
      "type": "manual"
    },
    {
      "name": "Technical Specifications Sheet",
      "url": "https://www.pnwx.com/docs/hf80-specs.pdf",
      "type": "pdf"
    },
    {
      "name": "Product Brochure",
      "url": "https://www.pnwx.com/docs/hf80-brochure.pdf",
      "type": "brochure"
    },
    {
      "name": "Installation Guide",
      "url": "https://www.pnwx.com/docs/hf80-installation.pdf",
      "type": "pdf"
    }
  ],
  
  "additionalInfo": "The HF80 is ideal for facilities requiring mobile imaging capabilities. Popular applications include emergency departments, intensive care units, nursing homes, and mobile medical vans. Requires minimal maintenance and includes automatic self-diagnostics."
}
```

## Benefits of Standalone Approach

### For Users
✅ All information in one place
✅ No need to leave your site
✅ Faster browsing experience
✅ Better mobile experience
✅ Printable product pages
✅ Better for comparison shopping

### For Your Business
✅ Complete control over presentation
✅ Can add custom features
✅ Better SEO (all content indexed)
✅ Track user behavior
✅ No dependency on external site
✅ Professional appearance
✅ Can integrate with inventory system

### For Development
✅ No external API calls needed
✅ Faster page loads
✅ Works offline (PWA potential)
✅ Easier to maintain
✅ Better caching
✅ More predictable behavior

## Next Steps

1. **Choose your approach** (manual, automated, or hybrid)
2. **Start with high-priority products** (best sellers, featured items)
3. **Add detailed specs** section by section
4. **Test the product pages** to ensure all data displays correctly
5. **Apply to other sections** (Accessories, Supplies, Parts)
6. **Continue adding data** over time
7. **Keep it updated** as products change

## Tips for Success

### Data Collection
- **Start with categories that have the most traffic**
- **Use the original PNWX pages as reference**
- **Take screenshots** for image extraction
- **Copy spec tables** directly from PNWX
- **Verify part numbers** carefully

### Data Quality
- **Be consistent** with units (inches vs. cm)
- **Use proper formatting** (e.g., "115V, 60Hz, 20A")
- **Keep descriptions clear** and concise
- **Verify compatibility** claims
- **Update pricing** regularly (or remove if outdated)

### Presentation
- **High-quality images** are crucial
- **Organize specs logically** (most important first)
- **Use bullet points** for features
- **Keep consistency** across products
- **Make it scannable** (users often skim)

## Maintenance

### Regular Updates
- Review product data quarterly
- Update pricing as needed
- Add new products as they come in
- Remove discontinued items
- Refresh images periodically

### Quality Checks
- Test all document links
- Verify image loading
- Check for typos
- Validate technical specs
- Ensure consistency

## Support

If you need help:
1. Refer to the example JSON above
2. Check the TypeScript interface in `types/equipment.ts`
3. Look at the enhanced product page component
4. Test with a few products first before doing bulk updates

---

**Remember:** Quality over quantity. Start with your most important products and ensure they have complete, accurate information before moving to others.
