#!/bin/bash

# Image Download Helper
# This script helps download images from PNWX using curl (which works with their old SSL)

echo "🖼️  PNWX Image Downloader"
echo "════════════════════════════════════════"
echo ""

# Create images directory
mkdir -p public/images
echo "✅ Created public/images/ directory"
echo ""

# Function to download an image
download_image() {
    local url=$1
    local filename=$2
    
    echo "📥 Downloading: $filename"
    if curl -k -L -o "public/images/$filename" "$url" 2>/dev/null; then
        echo "   ✅ Success"
    else
        echo "   ❌ Failed"
    fi
}

echo "This script will help you download images from PNWX."
echo ""
echo "Usage:"
echo "  1. Find image URLs on PNWX website"
echo "  2. Edit this script and add download_image commands"
echo "  3. Run: ./scripts/download-images.sh"
echo ""
echo "Example commands to add:"
echo '  download_image "https://www.pnwx.com/path/to/image.jpg" "product-name.jpg"'
echo ""
echo "Alternative: Use browser"
echo "  1. Visit PNWX product page"
echo "  2. Right-click image → Save Image As..."
echo "  3. Save to public/images/"
echo ""

# Example downloads (uncomment and modify):
# download_image "https://www.pnwx.com/Equipment/FilmProc/Protec/protec-logo.gif" "film-processor-protec.gif"
# download_image "URL_HERE" "filename-here.jpg"

echo "════════════════════════════════════════"
echo "To add images, edit this script and uncomment the download_image lines"
echo "Then run: chmod +x scripts/download-images.sh && ./scripts/download-images.sh"
