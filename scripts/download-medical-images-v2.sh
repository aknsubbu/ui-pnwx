#!/bin/bash

# Medical Equipment Image Downloader v2
# Downloads actual X-ray equipment images, not photos of people

echo "🏥 Medical Equipment Image Downloader v2"
echo "========================================"
echo ""

# Create images directory
mkdir -p public/images
echo "✅ Created public/images/ directory"
echo ""

# Function to download an image with better error handling
download_image() {
    local url=$1
    local filename=$2
    local description=$3
    
    echo "📥 $description"
    echo "   → $filename"
    
    if curl -L -f -s -o "public/images/$filename" "$url"; then
        # Check if file was actually downloaded and has content
        if [ -s "public/images/$filename" ]; then
            echo "   ✅ Success"
        else
            echo "   ❌ Empty file"
            rm -f "public/images/$filename"
        fi
    else
        echo "   ❌ Download failed"
    fi
    echo ""
}

echo "🔍 Downloading actual medical equipment images..."
echo ""

# Better medical equipment images - actual equipment, not people
# These URLs point to real medical equipment photos

# X-ray machines and imaging equipment
download_image "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center&auto=format" "xray-machine.jpg" "X-Ray Machine"

download_image "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center&auto=format" "medical-imaging.jpg" "Medical Imaging Equipment"

download_image "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop&crop=center&auto=format" "radiology-equipment.jpg" "Radiology Equipment"

# Portable and mobile equipment
download_image "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop&crop=center&auto=format" "portable-equipment.jpg" "Portable Medical Equipment"

download_image "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800&h=600&fit=crop&crop=center&auto=format" "mobile-xray.jpg" "Mobile X-Ray Unit"

# Laboratory and processing equipment
download_image "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center&auto=format" "lab-equipment.jpg" "Laboratory Equipment"

download_image "https://images.unsplash.com/photo-1584362917165-526f968f8f83?w=800&h=600&fit=crop&crop=center&auto=format" "processing-equipment.jpg" "Processing Equipment"

# Medical carts and furniture
download_image "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop&crop=center&auto=format" "medical-cart.jpg" "Medical Cart"

download_image "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&crop=center&auto=format" "exam-equipment.jpg" "Exam Room Equipment"

# Monitoring and diagnostic equipment
download_image "https://images.unsplash.com/photo-1582560469781-1998083c53b3?w=800&h=600&fit=crop&crop=center&auto=format" "diagnostic-equipment.jpg" "Diagnostic Equipment"

echo "========================================"
echo "📊 Summary:"
echo ""

# Count successfully downloaded images
successful_downloads=$(ls -1 public/images/*.jpg 2>/dev/null | wc -l | tr -d ' ')

echo "   ✅ Downloaded: $successful_downloads images"
echo "   📁 Location: public/images/"
echo ""

if [ "$successful_downloads" -gt 0 ]; then
    echo "🎉 Success! Now update the JSON files:"
    echo ""
    echo "   npx tsx scripts/use-pnwx-images.ts"
    echo ""
    echo "Then start the dev server:"
    echo "   npm run dev"
    echo ""
    echo "View at: http://localhost:3003"
else
    echo "❌ No images downloaded successfully."
    echo "   Check your internet connection and try again."
fi

echo "========================================"
