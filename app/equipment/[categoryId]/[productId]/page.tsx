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
import type { EquipmentData, EquipmentSubcategory, EquipmentCategory } from "@/types/equipment";
import equipmentData from "@/data/equipment.json";
import { use, useState } from "react";

interface ProductPageProps {
  params: Promise<{
    categoryId: string;
    productId: string;
  }>;
}

/**
 * Comprehensive Equipment Product Detail Page - Standalone Version
 * Displays all product specifications without redirecting to external site
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
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-6 md:py-10 bg-gradient-to-b from-default-100 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-4">
              <ol className="flex items-center gap-2 text-sm flex-wrap">
                <li>
                  <Link href="/" className="text-default-500 hover:text-default-900">
                    Home
                  </Link>
                </li>
                <li className="text-default-400">/</li>
                <li>
                  <Link href="/equipment" className="text-default-500 hover:text-default-900">
                    Equipment
                  </Link>
                </li>
                <li className="text-default-400">/</li>
                <li>
                  <Link href={`/equipment/${categoryId}`} className="text-default-500 hover:text-default-900">
                    {category.name}
                  </Link>
                </li>
                <li className="text-default-400">/</li>
                <li className="text-default-900 font-medium">{product.name}</li>
              </ol>
            </nav>

            {/* Product Title Section */}
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
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
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Details - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Overview Card with Image Gallery */}
            <Card>
              <CardBody className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image Gallery */}
                  <div className="space-y-3">
                    <div className="relative aspect-square w-full overflow-hidden bg-default-100 rounded-lg">
                      <Image
                        alt={product.name}
                        className="object-contain w-full h-full p-4"
                        fallbackSrc="https://via.placeholder.com/600x600/4A5568/FFFFFF?text=Product+Image+Unavailable"
                        src={allImages[selectedImage]}
                        onError={() => setImageError(true)}
                      />
                      {imageError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-default-100 text-default-500 text-sm p-4 text-center">
                          Image loading from PNWX...
                        </div>
                      )}
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    {allImages.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {allImages.slice(0, 4).map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`aspect-square bg-default-100 rounded-lg overflow-hidden cursor-pointer transition-all ${
                              selectedImage === idx ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-default-300'
                            }`}
                          >
                            <Image
                              alt={`${product.name} view ${idx + 1}`}
                              className="object-cover w-full h-full"
                              src={img}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-3">Product Overview</h2>
                      <p className="text-default-600 leading-relaxed">{product.description}</p>
                    </div>

                    <Divider />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Quick Actions</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          as={Link}
                          color="primary"
                          href={`mailto:${data.contactInfo.email}?subject=Quote: ${product.name}${product.partNumbers?.[0] ? ` (${product.partNumbers[0]})` : ''}`}
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
                </div>
              </CardBody>
            </Card>

            {/* Technical Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">📋 Technical Specifications</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-1">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-5 gap-4 p-3 rounded-lg hover:bg-default-50">
                        <div className="col-span-2 font-semibold text-default-700">{key}</div>
                        <div className="col-span-3 text-default-600">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Features & Benefits */}
            {product.features && product.features.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">⭐ Key Features</h2>
                </CardHeader>
                <CardBody>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-default-50">
                        <span className="text-primary text-xl shrink-0 mt-0.5">✓</span>
                        <span className="text-default-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            )}

            {/* Dimensions & Physical Specs */}
            {product.dimensions && Object.values(product.dimensions).some(v => v) && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">📏 Dimensions & Weight</h2>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.dimensions.width && (
                      <div className="text-center p-4 bg-default-50 rounded-lg">
                        <div className="text-3xl mb-2">↔️</div>
                        <div className="text-sm text-default-500 mb-1">Width</div>
                        <div className="text-xl font-bold">{product.dimensions.width}</div>
                      </div>
                    )}
                    {product.dimensions.height && (
                      <div className="text-center p-4 bg-default-50 rounded-lg">
                        <div className="text-3xl mb-2">↕️</div>
                        <div className="text-sm text-default-500 mb-1">Height</div>
                        <div className="text-xl font-bold">{product.dimensions.height}</div>
                      </div>
                    )}
                    {product.dimensions.depth && (
                      <div className="text-center p-4 bg-default-50 rounded-lg">
                        <div className="text-3xl mb-2">⬌</div>
                        <div className="text-sm text-default-500 mb-1">Depth</div>
                        <div className="text-xl font-bold">{product.dimensions.depth}</div>
                      </div>
                    )}
                    {product.dimensions.weight && (
                      <div className="text-center p-4 bg-default-50 rounded-lg">
                        <div className="text-3xl mb-2">⚖️</div>
                        <div className="text-sm text-default-500 mb-1">Weight</div>
                        <div className="text-xl font-bold">{product.dimensions.weight}</div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Compatibility */}
            {product.compatibility && product.compatibility.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">🔗 Compatibility</h2>
                </CardHeader>
                <CardBody>
                  <ul className="space-y-2">
                    {product.compatibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-success-50">
                        <span className="text-success text-xl shrink-0">✓</span>
                        <span className="text-default-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            )}

            {/* Part Numbers */}
            {product.partNumbers && product.partNumbers.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">🔖 Part Numbers</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-3">
                    {product.partNumbers.map((partNum, idx) => (
                      <Chip key={idx} color="primary" variant="bordered" size="lg" className="font-mono">
                        {partNum}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Documents & Downloads */}
            {product.documents && product.documents.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">📄 Documents & Resources</h2>
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
                        className="justify-start h-auto py-4"
                        startContent={
                          <span className="text-2xl">
                            {doc.type === 'manual' ? '📖' : doc.type === 'brochure' ? '📰' : '📄'}
                          </span>
                        }
                      >
                        <div className="text-left flex-1">
                          <div className="font-semibold">{doc.name}</div>
                          <div className="text-sm text-default-500 capitalize">{doc.type}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Related Products */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">More from {category.name}</h2>
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
                        <Card isPressable isHoverable>
                          <CardBody className="p-3">
                            <div className="aspect-square bg-default-100 rounded-lg mb-2 overflow-hidden">
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

          {/* Sidebar - 1/3 width */}
          <aside className="space-y-6">
            {/* Pricing & Ordering */}
            {product.pricing?.msrp ? (
              <Card className="bg-gradient-to-br from-success-50 to-primary-50 border-2 border-success">
                <CardBody className="space-y-3">
                  <h3 className="text-lg font-semibold">💰 Pricing</h3>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="text-sm text-default-500 mb-1">MSRP</div>
                    <div className="text-3xl font-bold text-primary">{product.pricing.msrp}</div>
                    {product.pricing.note && (
                      <div className="text-sm text-default-500 mt-2">{product.pricing.note}</div>
                    )}
                  </div>
                  <div className="text-sm text-default-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Volume discounts available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Flexible payment terms</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-success-50 to-primary-50">
                <CardBody className="space-y-3">
                  <h3 className="text-lg font-semibold">💰 Pricing & Ordering</h3>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-default-600 mb-2">Contact us for pricing</p>
                    <div className="text-sm text-default-500 space-y-1">
                      <div>• Competitive pricing</div>
                      <div>• Volume discounts</div>
                      <div>• Flexible payment terms</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Contact Information */}
            <EquipmentContactCard contactInfo={data.contactInfo} />

            {/* Get Expert Help */}
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
              <CardBody className="space-y-3">
                <h3 className="text-lg font-semibold">📞 Get Expert Help</h3>
                <p className="text-sm text-default-600">
                  Our team can assist you with:
                </p>
                <ul className="text-sm text-default-600 space-y-1">
                  <li>• Technical specifications</li>
                  <li>• Installation requirements</li>
                  <li>• Compatibility questions</li>
                  <li>• Custom configurations</li>
                </ul>
                <Divider />
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
                    color="default"
                    href={`mailto:${data.contactInfo.email}?subject=Inquiry: ${product.name}`}
                    size="sm"
                    startContent={<span>📧</span>}
                    variant="bordered"
                  >
                    Send Email
                  </Button>
                </div>
                <p className="text-xs text-default-500 pt-2">
                  {data.contactInfo.hours}
                </p>
              </CardBody>
            </Card>

            {/* Navigation */}
            <Card>
              <CardBody className="space-y-3">
                <h3 className="text-lg font-semibold">Browse</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    as={Link}
                    color="default"
                    href={`/equipment/${categoryId}`}
                    size="sm"
                    startContent={<span>←</span>}
                    variant="flat"
                  >
                    Back to {category.name}
                  </Button>
                  <Button
                    as={Link}
                    color="default"
                    href="/equipment"
                    size="sm"
                    variant="flat"
                  >
                    All Equipment
                  </Button>
                </div>
              </CardBody>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
