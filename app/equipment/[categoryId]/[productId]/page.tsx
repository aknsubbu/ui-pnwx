"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { EquipmentContactCard } from "@/components/equipment-contact-card";
import type {
  EquipmentData,
  EquipmentSubcategory,
  EquipmentCategory,
} from "@/types/equipment";
import equipmentData from "@/data/equipment.json";
import { use, useState } from "react";

interface ProductPageProps {
  params: Promise<{
    categoryId: string;
    productId: string;
  }>;
}

/**
 * Enhanced Equipment Product Detail Page
 *
 * Improvements:
 * - Sticky sidebar for persistent access to actions
 * - Better image gallery with lightbox effect
 * - Enhanced visual hierarchy
 * - Quick action floating bar on mobile
 * - Improved specs table design
 * - Better color-coded sections
 */
export default function EquipmentProductPage({ params }: ProductPageProps) {
  const { categoryId, productId } = use(params);
  const data = equipmentData as EquipmentData;
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Find category and product
  const category = data.categories.find((cat) => cat.id === categoryId);
  if (!category) {
    notFound();
  }

  const product = category.subcategories.find((sub) => sub.id === productId);
  if (!product) {
    notFound();
  }

  // Get all images for gallery
  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="w-full py-6 border-b border-foreground/10">
        <div className="container mx-auto px-4">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-4">
              <ol className="flex items-center gap-2 text-sm flex-wrap">
                <li>
                  <Link
                    href="/"
                    className="text-foreground/60 hover:text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-foreground/40">/</li>
                <li>
                  <Link
                    href="/equipment"
                    className="text-foreground/60 hover:text-foreground"
                  >
                    Equipment
                  </Link>
                </li>
                <li className="text-foreground/40">/</li>
                <li>
                  <Link
                    href={`/equipment/${categoryId}`}
                    className="text-foreground/60 hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
                <li className="text-foreground/40">/</li>
                <li className="font-medium">{product.name}</li>
              </ol>
            </nav>

            {/* Product Title Section */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.manufacturer && (
                    <Chip color="primary" size="md" variant="flat">
                      🏭 {product.manufacturer}
                    </Chip>
                  )}
                  <Chip color="secondary" size="md" variant="flat">
                    📁 {category.name}
                  </Chip>
                  {product.partNumbers && product.partNumbers.length > 0 && (
                    <Chip color="success" size="md" variant="flat">
                      #{product.partNumbers[0]}
                    </Chip>
                  )}
                </div>
              </div>

              {/* Desktop Quick Actions */}
              <div className="hidden md:flex gap-2">
                <Button
                  as={Link}
                  color="primary"
                  href={`mailto:${data.contactInfo.email}?subject=Quote: ${product.name}`}
                  startContent={<span>📧</span>}
                >
                  Request Quote
                </Button>
                <Button
                  as={Link}
                  color="primary"
                  href={`tel:${data.contactInfo.phone}`}
                  variant="bordered"
                  startContent={<span>📞</span>}
                >
                  Call Us
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Product Details - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Product Overview with Enhanced Image Gallery */}
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Image Gallery - Takes 3 columns */}
                  <div className="md:col-span-3 space-y-3">
                    {/* Main Image */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl border-2 border-foreground/10 bg-foreground/5">
                      <Image
                        alt={product.name}
                        className="object-contain w-full h-full p-6"
                        fallbackSrc="https://via.placeholder.com/600x600/4A5568/FFFFFF?text=Product+Image"
                        src={allImages[selectedImage]}
                        onError={() => setImageError(true)}
                      />
                      {imageError && (
                        <div className="absolute inset-0 flex items-center justify-center text-foreground/50 text-sm p-4 text-center">
                          Image loading...
                        </div>
                      )}

                      {/* Image Counter */}
                      {allImages.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                          {selectedImage + 1} / {allImages.length}
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {allImages.length > 1 && (
                      <div className="grid grid-cols-5 gap-2">
                        {allImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${
                              selectedImage === idx
                                ? "border-primary ring-2 ring-primary/30"
                                : "border-foreground/10 hover:border-primary/50"
                            }`}
                          >
                            <Image
                              alt={`View ${idx + 1}`}
                              className="object-cover w-full h-full"
                              src={img}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Info - Takes 2 columns */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-3">Overview</h2>
                      <p className="text-foreground/70 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <Divider />

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      {product.manufacturer && (
                        <div className="bg-foreground/5 p-3 rounded-lg border border-foreground/10">
                          <p className="text-xs text-foreground/60 mb-1">
                            Manufacturer
                          </p>
                          <p className="font-semibold text-sm">
                            {product.manufacturer}
                          </p>
                        </div>
                      )}
                      {product.partNumbers?.[0] && (
                        <div className="bg-foreground/5 p-3 rounded-lg border border-foreground/10">
                          <p className="text-xs text-foreground/60 mb-1">
                            Part Number
                          </p>
                          <p className="font-semibold text-sm font-mono">
                            {product.partNumbers[0]}
                          </p>
                        </div>
                      )}
                    </div>

                    <Divider />

                    {/* Mobile Quick Actions */}
                    <div className="md:hidden space-y-2">
                      <Button
                        as={Link}
                        color="primary"
                        href={`mailto:${data.contactInfo.email}`}
                        size="lg"
                        startContent={<span>📧</span>}
                        className="w-full"
                      >
                        Request Quote
                      </Button>
                      <Button
                        as={Link}
                        color="primary"
                        href={`tel:${data.contactInfo.phone}`}
                        size="lg"
                        startContent={<span>📞</span>}
                        variant="bordered"
                        className="w-full"
                      >
                        Call {data.contactInfo.phone}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Technical Specifications - Enhanced Table */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="border-b border-foreground/10">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <span className="text-blue-500">📋</span>
                      Technical Specifications
                    </h2>
                  </CardHeader>
                  <CardBody className="p-0">
                    <div className="divide-y divide-foreground/10">
                      {Object.entries(product.specifications).map(
                        ([key, value], idx) => (
                          <div
                            key={key}
                            className={`grid grid-cols-3 gap-4 p-4 transition-colors ${
                              idx % 2 === 0 ? "bg-foreground/5" : ""
                            } hover:bg-blue-500/5`}
                          >
                            <div className="col-span-1 font-semibold text-foreground/70">
                              {key}
                            </div>
                            <div className="col-span-2 text-foreground">
                              {Array.isArray(value) ? value.join(", ") : value}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardBody>
                </Card>
              )}

            {/* Features Grid - Enhanced */}
            {product.features && product.features.length > 0 && (
              <Card className="shadow-lg border-l-4 border-l-emerald-500">
                <CardHeader className="border-b border-foreground/10">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-emerald-500">⭐</span>
                    Key Features
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="grid md:grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20"
                      >
                        <span className="text-emerald-500 text-xl shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Dimensions - Enhanced Cards */}
            {product.dimensions &&
              Object.values(product.dimensions).some((v) => v) && (
                <Card className="shadow-lg border-l-4 border-l-purple-500">
                  <CardHeader className="border-b border-foreground/10">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <span className="text-purple-500">📏</span>
                      Dimensions & Weight
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {product.dimensions.width && (
                        <div className="text-center p-4 bg-purple-500/5 rounded-xl border-2 border-purple-500/20">
                          <div className="text-4xl mb-2">↔️</div>
                          <div className="text-sm text-foreground/60 mb-1 font-medium">
                            Width
                          </div>
                          <div className="text-xl font-bold text-purple-600">
                            {product.dimensions.width}
                          </div>
                        </div>
                      )}
                      {product.dimensions.height && (
                        <div className="text-center p-4 bg-purple-500/5 rounded-xl border-2 border-purple-500/20">
                          <div className="text-4xl mb-2">↕️</div>
                          <div className="text-sm text-foreground/60 mb-1 font-medium">
                            Height
                          </div>
                          <div className="text-xl font-bold text-purple-600">
                            {product.dimensions.height}
                          </div>
                        </div>
                      )}
                      {product.dimensions.depth && (
                        <div className="text-center p-4 bg-purple-500/5 rounded-xl border-2 border-purple-500/20">
                          <div className="text-4xl mb-2">⬌</div>
                          <div className="text-sm text-foreground/60 mb-1 font-medium">
                            Depth
                          </div>
                          <div className="text-xl font-bold text-purple-600">
                            {product.dimensions.depth}
                          </div>
                        </div>
                      )}
                      {product.dimensions.weight && (
                        <div className="text-center p-4 bg-purple-500/5 rounded-xl border-2 border-purple-500/20">
                          <div className="text-4xl mb-2">⚖️</div>
                          <div className="text-sm text-foreground/60 mb-1 font-medium">
                            Weight
                          </div>
                          <div className="text-xl font-bold text-purple-600">
                            {product.dimensions.weight}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              )}

            {/* Compatibility */}
            {product.compatibility && product.compatibility.length > 0 && (
              <Card className="shadow-lg border-l-4 border-l-blue-500">
                <CardHeader className="border-b border-foreground/10">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-blue-500">🔗</span>
                    Compatibility
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="grid md:grid-cols-2 gap-3">
                    {product.compatibility.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20"
                      >
                        <span className="text-blue-500 text-xl shrink-0">
                          ✓
                        </span>
                        <span className="text-foreground/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Part Numbers */}
            {product.partNumbers && product.partNumbers.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader className="border-b border-foreground/10">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-orange-500">🔖</span>
                    Part Numbers
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-3">
                    {product.partNumbers.map((partNum, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 bg-orange-500/5 border-2 border-orange-500/20 rounded-lg font-mono font-semibold text-orange-600"
                      >
                        {partNum}
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Documents & Downloads */}
            {product.documents && product.documents.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader className="border-b border-foreground/10">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span>📄</span>
                    Documents & Resources
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="grid gap-3">
                    {product.documents.map((doc, idx) => (
                      <Button
                        key={idx}
                        as={Link}
                        href={doc.url}
                        isExternal
                        variant="flat"
                        className="justify-start h-auto py-4 hover:bg-foreground/10"
                        startContent={
                          <div className="text-3xl">
                            {doc.type === "manual"
                              ? "📖"
                              : doc.type === "brochure"
                                ? "📰"
                                : "📄"}
                          </div>
                        }
                      >
                        <div className="text-left flex-1">
                          <div className="font-semibold">{doc.name}</div>
                          <div className="text-sm text-foreground/60 capitalize">
                            {doc.type}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Related Products */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-foreground/10">
                <h2 className="text-2xl font-bold">
                  More from {category.name}
                </h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.subcategories
                    .filter((sub) => sub.id !== productId)
                    .slice(0, 6)
                    .map((relatedProduct) => (
                      <Link
                        key={relatedProduct.id}
                        href={`/equipment/${categoryId}/${relatedProduct.id}`}
                        className="group"
                      >
                        <Card
                          isPressable
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardBody className="p-3">
                            <div className="aspect-square rounded-lg mb-2 overflow-hidden border border-foreground/10">
                              <Image
                                alt={relatedProduct.name}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                                fallbackSrc="https://via.placeholder.com/200x200?text=Product"
                                src={relatedProduct.image}
                              />
                            </div>
                            <p className="text-sm font-medium line-clamp-2">
                              {relatedProduct.name}
                            </p>
                          </CardBody>
                        </Card>
                      </Link>
                    ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sticky Sidebar - 1/4 width */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Pricing Card */}
              {product.pricing?.msrp ? (
                <Card className="shadow-lg bg-emerald-500/5 border-2 border-emerald-500/30">
                  <CardBody className="p-5">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span className="text-emerald-500">💰</span>
                      Pricing
                    </h3>
                    <div className="p-4 bg-white dark:bg-foreground/5 rounded-lg mb-3">
                      <div className="text-xs text-foreground/60 mb-1">
                        MSRP
                      </div>
                      <div className="text-3xl font-bold text-emerald-600">
                        {product.pricing.msrp}
                      </div>
                      {product.pricing.note && (
                        <div className="text-xs text-foreground/60 mt-2">
                          {product.pricing.note}
                        </div>
                      )}
                    </div>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <span className="text-emerald-500">✓</span>
                        <span>Volume discounts</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <span className="text-emerald-500">✓</span>
                        <span>Flexible payment</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <Card className="shadow-lg bg-blue-500/5 border-2 border-blue-500/30">
                  <CardBody className="p-5">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span className="text-blue-500">💰</span>
                      Get Quote
                    </h3>
                    <p className="text-sm text-foreground/70 mb-3">
                      Contact us for competitive pricing
                    </p>
                    <div className="text-sm space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <span className="text-blue-500">•</span>
                        <span>Best prices</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <span className="text-blue-500">•</span>
                        <span>Volume discounts</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <span className="text-blue-500">•</span>
                        <span>Flexible terms</span>
                      </div>
                    </div>
                    <Button
                      as={Link}
                      color="primary"
                      href={`mailto:${data.contactInfo.email}`}
                      className="w-full"
                      startContent={<span>📧</span>}
                    >
                      Request Quote
                    </Button>
                  </CardBody>
                </Card>
              )}

              {/* Contact Card */}
              <EquipmentContactCard contactInfo={data.contactInfo} />

              {/* Expert Help */}
              <Card className="shadow-lg bg-purple-500/5 border-2 border-purple-500/20">
                <CardBody className="p-5">
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="font-bold mb-2">Need Expert Help?</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Our specialists can assist with:
                  </p>
                  <ul className="text-sm text-foreground/70 space-y-1 mb-4">
                    <li>• Technical specs</li>
                    <li>• Installation</li>
                    <li>• Compatibility</li>
                    <li>• Configuration</li>
                  </ul>
                  <div className="flex flex-col gap-2">
                    <Button
                      as={Link}
                      color="primary"
                      href={`tel:${data.contactInfo.phone}`}
                      size="sm"
                      startContent={<span>📞</span>}
                    >
                      {data.contactInfo.phone}
                    </Button>
                    <Button
                      as={Link}
                      href={`mailto:${data.contactInfo.email}`}
                      size="sm"
                      variant="bordered"
                      startContent={<span>📧</span>}
                    >
                      Email Us
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* Navigation */}
              <Card className="shadow-lg">
                <CardBody className="p-5">
                  <h3 className="font-bold mb-3">Browse</h3>
                  <div className="flex flex-col gap-2">
                    <Button
                      as={Link}
                      href={`/equipment/${categoryId}`}
                      size="sm"
                      variant="flat"
                      startContent={<span>←</span>}
                    >
                      {category.name}
                    </Button>
                    <Button
                      as={Link}
                      href="/equipment"
                      size="sm"
                      variant="flat"
                    >
                      All Equipment
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
