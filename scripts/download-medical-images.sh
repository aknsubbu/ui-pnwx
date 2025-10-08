#!/bin/bash

# Medical Equipment Image Downloader
# Downloads medical equipment images from Unsplash and updates JSON files

echo "🏥 Medical Equipment Image Downloader"
echo "====================================="
echo ""

# Create images directory
mkdir -p public/images
echo "✅ Created public/images/ directory"

# Download medical equipment images from Unsplash (free to use)
echo ""
echo "📥 Downloading medical equipment images..."

# Image 1: Medical imaging equipment
echo "  1/10 Medical imaging equipment..."
curl -L -s -o public/images/medical-1.jpg "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-1.jpg" || echo "      ❌ Failed"
sleep 1

# Image 2: X-ray machine
echo "  2/10 X-ray machine..."
curl -L -s -o public/images/medical-2.jpg "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-2.jpg" || echo "      ❌ Failed"
sleep 1

# Image 3: Medical devices
echo "  3/10 Medical devices..."
curl -L -s -o public/images/medical-3.jpg "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-3.jpg" || echo "      ❌ Failed"
sleep 1

# Image 4: Hospital equipment
echo "  4/10 Hospital equipment..."
curl -L -s -o public/images/medical-4.jpg "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-4.jpg" || echo "      ❌ Failed"
sleep 1

# Image 5: Medical technology
echo "  5/10 Medical technology..."
curl -L -s -o public/images/medical-5.jpg "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-5.jpg" || echo "      ❌ Failed"
sleep 1

# Image 6: Radiology equipment
echo "  6/10 Radiology equipment..."
curl -L -s -o public/images/medical-6.jpg "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-6.jpg" || echo "      ❌ Failed"
sleep 1

# Image 7: Medical imaging system
echo "  7/10 Medical imaging system..."
curl -L -s -o public/images/medical-7.jpg "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-7.jpg" || echo "      ❌ Failed"
sleep 1

# Image 8: Healthcare technology
echo "  8/10 Healthcare technology..."
curl -L -s -o public/images/medical-8.jpg "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-8.jpg" || echo "      ❌ Failed"
sleep 1

# Image 9: Medical apparatus
echo "  9/10 Medical apparatus..."
curl -L -s -o public/images/medical-9.jpg "https://images.unsplash.com/photo-1666214280594-3e972e2d5c8d?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-9.jpg" || echo "      ❌ Failed"
sleep 1

# Image 10: X-ray imaging equipment
echo "  10/10 X-ray imaging equipment..."
curl -L -s -o public/images/medical-10.jpg "https://images.unsplash.com/photo-1576091160507-bbe1b99b8aa9?w=800&h=600&fit=crop&crop=center" && echo "      ✅ medical-10.jpg" || echo "      ❌ Failed"

echo ""
echo "📊 Image download complete!"
echo ""
echo "Now run the TypeScript script to update JSON files:"
echo "npx tsx scripts/update-json-with-images.ts"
echo ""
