#!/bin/bash

# Download PNWX Product Images
# Using actual PNWX image URLs from links.txt

echo "🖼️  Downloading PNWX Product Images"
echo "═══════════════════════════════════════"

# Create images directory
mkdir -p public/images
echo "✅ Created public/images/ directory"
echo ""

# Read URLs from links.txt and download each image
counter=1
while IFS= read -r url; do
    # Skip empty lines
    if [[ -z "$url" ]]; then
        continue
    fi
    
    # Extract filename from URL (get the last part after the last slash)
    filename=$(basename "$url")
    # Remove any query parameters
    filename="${filename%%\?*}"
    
    # Create a more descriptive filename with counter
    ext="${filename##*.}"
    new_filename="pnwx-product-${counter}.${ext}"
    
    echo "📥 Downloading image $counter: $new_filename"
    echo "   From: $url"
    
    if curl -k -L -o "public/images/$new_filename" "$url" 2>/dev/null; then
        echo "   ✅ Success"
    else
        echo "   ❌ Failed"
    fi
    
    ((counter++))
    echo ""
done < public/images/links.txt

echo "════════════════════════════════════════"
echo "✅ Download complete! Images saved to public/images/"
echo ""
echo "Next step: Run the update script to assign images to products"
echo "  npx tsx scripts/use-pnwx-images.ts"
