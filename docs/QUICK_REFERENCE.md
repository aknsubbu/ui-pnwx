# Quick Reference Cheat Sheet

## 🚀 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

## 📁 File Locations

| What | Where |
|------|-------|
| Equipment Page | `app/equipment/page.tsx` |
| Equipment Product | `app/equipment/[categoryId]/[productId]/page.tsx` |
| Accessories Page | `app/accessories/page.tsx` |
| Accessories Product | `app/accessories/[categoryId]/[productId]/page.tsx` |
| Supplies Page | `app/supplies/page.tsx` |
| Supplies Product | `app/supplies/[categoryId]/[productId]/page.tsx` |
| Parts Page | `app/parts/page.tsx` |
| Parts Product | `app/parts/[categoryId]/[productId]/page.tsx` |
| Generic Catalog | `components/catalog-page.tsx` |
| Equipment Data | `data/equipment.json` |
| Accessories Data | `data/accessories.json` |
| Supplies Data | `data/supplies.json` |
| Parts Data | `data/parts.json` |
| Type Definitions | `types/equipment.ts` |
| Navigation Config | `config/site.ts` |

## 🔗 URLs

| Page | URL |
|------|-----|
| Equipment | http://localhost:3000/equipment |
| Equipment Category | http://localhost:3000/equipment/[categoryId] |
| Equipment Product | http://localhost:3000/equipment/[categoryId]/[productId] |
| Accessories | http://localhost:3000/accessories |
| Accessories Category | http://localhost:3000/accessories/[categoryId] |
| Accessories Product | http://localhost:3000/accessories/[categoryId]/[productId] |
| Supplies | http://localhost:3000/supplies |
| Supplies Category | http://localhost:3000/supplies/[categoryId] |
| Supplies Product | http://localhost:3000/supplies/[categoryId]/[productId] |
| Parts | http://localhost:3000/parts |
| Parts Category | http://localhost:3000/parts/[categoryId] |
| Parts Product | http://localhost:3000/parts/[categoryId]/[productId] |

## 📝 Quick Edits

### Add New Category

Edit `data/[section].json`:

```json
{
  "categories": [
    {
      "id": "unique-id",
      "name": "Category Name",
      "description": "Description here",
      "icon": "cube",
      "itemCount": 5,
      "featured": true,
      "externalUrl": "https://www.pnwx.com/Path/",
      "subcategories": [...]
    }
  ]
}
```

### Add New Product

Add to `subcategories` array:

```json
{
  "id": "product-id",
  "name": "Product Name",
  "description": "Product description",
  "url": "https://www.pnwx.com/Product/",
  "image": "/section/product-image.jpg",
  "manufacturer": "Brand"
}
```

### Change Page Title/Description

Edit page file (`app/[section]/page.tsx`):

```typescript
<CatalogPage
  data={data}
  title="Your Custom Title"
  subtitle="Your Custom Subtitle"
  description="Your custom description"
/>
```

## 🎨 Available Icons

Use these in category `icon` field:

- `cube` - 📦 (Equipment, packages)
- `medkit` - 🏥 (Medical, exam room)
- `radio` - 📡 (X-ray, portables)
- `nuclear` - ☢️ (Radiation, safety)
- `tag` - 🏷️ (Labels, markers)
- `folder` - 📁 (Storage, files)
- `magnet` - 🧲 (MRI equipment)
- `people` - 👥 (Patient care)
- `flask` - 🧪 (Testing, phantoms)
- `chair` - 💺 (Seating)
- `tools` - 🔧 (Technologist aids)
- `shield` - 🛡️ (Protection)
- `wave` - 〰️ (Ultrasound)
- `paw` - 🐾 (Veterinary)

## 📸 Image Paths

| Section | Directory | Example |
|---------|-----------|---------|
| Equipment | `public/equipment/` | `/equipment/xray-machine.jpg` |
| Accessories | `public/accessories/` | `/accessories/lead-apron.jpg` |
| Supplies | `public/supplies/` | `/supplies/ultrasound-gel.jpg` |

## 🔍 Common Patterns

### Search Filter Logic

```typescript
const filteredCategories = useMemo(() => {
  return data.categories.filter((category) => {
    const matchesSearch = searchTerm === "" || 
      category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !featuredOnly || category.featured;
    return matchesSearch && matchesFeatured;
  });
}, [data.categories, searchTerm, featuredOnly]);
```

### External Link Check

```typescript
// In component
href={category.externalUrl || `/internal/path`}
isExternal={!!category.externalUrl}

// Or check URL
isExternal={url.startsWith("http")}
```

### Conditional Rendering

```typescript
{category.badge && (
  <Chip size="sm" color="primary">
    {category.badge}
  </Chip>
)}
```

## 🐛 Debug Checklist

### Page not loading:
- [ ] File exists in `app/[section]/page.tsx`
- [ ] JSON data file exists in `data/`
- [ ] No syntax errors in JSON
- [ ] Dev server is running

### Data not showing:
- [ ] JSON is valid (use JSON validator)
- [ ] Import path is correct
- [ ] Type assertion is correct (`as EquipmentData`)
- [ ] Check browser console for errors

### Images not loading:
- [ ] Image exists in `public/` directory
- [ ] Path in JSON starts with `/`
- [ ] Filename matches exactly (case-sensitive)
- [ ] Fallback URL works

### Search not working:
- [ ] `useState` properly initialized
- [ ] `useMemo` has correct dependencies
- [ ] Filter logic is correct
- [ ] State updates are triggering re-renders

## 📊 Data Structure

```
EquipmentData
├── metadata
│   ├── lastUpdated
│   ├── source
│   ├── version
│   └── pageType
├── categories[]
│   ├── id
│   ├── name
│   ├── description
│   ├── icon
│   ├── itemCount
│   ├── featured
│   ├── externalUrl (optional)
│   ├── badge (optional)
│   └── subcategories[]
│       ├── id
│       ├── name
│       ├── description
│       ├── url
│       ├── image
│       ├── manufacturer (optional)
│       └── badge (optional)
├── contactInfo
│   ├── phone
│   ├── tollFree
│   ├── fax
│   ├── email
│   ├── hours
│   └── address
│       ├── street
│       ├── city
│       ├── state
│       ├── zip
│       └── country
└── orderingInfo
    ├── minimumOrder
    ├── poMinimumOrder
    ├── orderFormUrl
    ├── acceptedPayments[]
    └── creditApprovalRequired
```

## 🎯 Quick Stats

### Equipment
- 4 categories
- 30+ subcategories
- Featured: Darkroom, Exam Room, Portable X-Ray

### Accessories
- 12 categories
- 200+ subcategories
- Featured: Darkroom, Exam Room, Film ID, Cassettes, MRI, Radiation Protection

### Supplies
- 14 categories
- Essential consumables
- Featured: Hand Sanitizer, CT Covers, CR Cleaning, Film Storage, Cleaners, Ultrasound Gel, Wipes

## 🔄 Update Workflow

1. **Edit JSON** - Add/modify data
2. **Save file** - Changes are immediate
3. **Refresh browser** - See updates
4. **Commit changes** - `git commit -m "Update products"`

## 💡 Pro Tips

- Start with featured products
- Use placeholders for missing images
- Test mobile layout first
- Keep JSON files formatted (use Prettier)
- Document custom changes
- Back up before major updates

## 📞 Contact Info (Hardcoded)

```
Phone: 1-503-667-3000
Toll-Free: 800-827-9729
Fax: 1-503-666-8855
Email: SalesD@pnwx.com
Hours: 8am-5pm Mon-Fri (Pacific)
Address: P.O. Box 625, Gresham, OR 97030
```

## 🎨 Component Styling

All components use HeroUI + Tailwind CSS:

```typescript
// Card with hover effect
<Card className="hover:shadow-lg transition-shadow">

// Primary button
<Button color="primary" variant="flat">

// Status chip
<Chip color="success" size="sm" variant="flat">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## 🚦 Status Indicators

### Build Status
```bash
npm run build
# ✅ Success = all good
# ❌ Error = check console
```

### Lint Status
```bash
npm run lint
# ✅ No issues = clean code
# ⚠️ Warnings = should fix
# ❌ Errors = must fix
```

## 🎯 Recent Enhancements

### Product Page Improvements (Latest)
All product detail pages now include:
- ✅ Enhanced hero section with better layout
- ✅ Prominent "Complete Specifications" alert linking to PNWX
- ✅ Key Information section with category, manufacturer, pricing info
- ✅ "Why Choose PNWX?" value proposition
- ✅ Enhanced sidebar with multiple contact methods
- ✅ Better call-to-action buttons

**See full details**: `docs/PRODUCT_PAGE_ENHANCEMENTS.md`

### Routing Structure
- Main catalog: `/[section]` (Equipment, Accessories, Supplies, Parts)
- Category page: `/[section]/[categoryId]`
- Product page: `/[section]/[categoryId]/[productId]`

### Navigation Flow
1. Main catalog page → Browse categories
2. Category page → See all products in category
3. Product page → View details + link to PNWX for full specs

## 📚 Documentation Files

| Document | Purpose |
|----------|---------|
| `QUICK_REFERENCE.md` | This file - quick lookup |
| `PRODUCT_PAGE_ENHANCEMENTS.md` | Product page enhancement details |
| `EQUIPMENT_PAGE_DESIGN.md` | Original equipment page design |
| `EQUIPMENT_PAGE_QUICKSTART.md` | Equipment setup guide |
| `IMAGE_SCRAPING_GUIDE.md` | Image download instructions |
| `IMPLEMENTATION_GUIDE.md` | Detailed implementation docs |
| `ISSUE_FIXES.md` | Bug fixes and solutions |

## 🔧 Troubleshooting Quick Fixes

### Development Server Won't Start
```bash
npm run lint
# ✅ No errors = clean code
# ⚠️ Warnings = optional fixes
# ❌ Errors = must fix
```

---

**Keep this file handy for quick reference!** 📌

For detailed info, see:
- `docs/IMPLEMENTATION_GUIDE.md` - Complete guide
- `docs/IMAGE_SCRAPING_GUIDE.md` - Image downloads
- `docs/EQUIPMENT_PAGE_DESIGN.md` - Design philosophy
