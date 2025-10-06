"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Tabs, Tab } from "@heroui/tabs";
import { EquipmentContactCard } from "@/components/equipment-contact-card";
import type { EquipmentData, EquipmentSubcategory, EquipmentCategory } from "@/types/equipment";
import equipmentData from "@/data/equipment.json";
import { use } from "react";

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
  
  // Find category and product
  const category = data.categories.find((cat) => cat.id === categoryId);
  if (!category) {
    notFound();
  }
  
  const product = category.subcategories.find((sub) => sub.id === productId);
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-8 md:py-12 bg-gradient-to-b from-default-100 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-6">
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
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                {product.manufacturer && (
                  <Chip color="primary" size="lg" variant="flat">
                    🏭 {product.manufacturer}
                  </Chip>
                )}
                <Chip color="secondary" size="lg" variant="flat">
                  📁 {category.name}
                </Chip>
                {product.partNumbers && product.partNumbers.length > 0 && (
                  <Chip color="success" size="lg" variant="flat">
                    🔖 {product.partNumbers[0]}
                  </Chip>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Details - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Overview Card */}
            <Card>
              <CardBody className="p-6">
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Image Gallery */}
                  <div className="md:col-span-2">
                    <div className="relative aspect-square w-full overflow-hidden bg-default-100 rounded-lg mb-4">
                      <Image
                        alt={product.name}
                        className="object-contain w-full h-full"
                        fallbackSrc="https://via.placeholder.com/600x600?text=Product+Image"
                        src={product.image}
                      />
                    </div>
                    
                    {/* Additional Images */}
                    {product.images && product.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {product.images.slice(1, 5).map((img, idx) => (
                          <div key={idx} className="aspect-square bg-default-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary">
                            <Image
                              alt={`${product.name} view ${idx + 2}`}
                              className="object-cover w-full h-full"
                              src={img}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Summary */}
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-3">Product Overview</h2>
                      <p className="text-default-600 text-lg leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <Divider />

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Request Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                          as={Link}
                          color="primary"
                          href={`mailto:${data.contactInfo.email}?subject=Quote Request: ${product.name}&body=Please provide pricing and availability for ${product.name}${product.partNumbers && product.partNumbers.length > 0 ? ` (Part #: ${product.partNumbers[0]})` : ''}`}
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

            {/* Detailed Specifications Tabs */}
            <Card>
              <CardBody className="p-6">
                <Tabs aria-label="Product information" color="primary" size="lg">
                  {/* Specifications Tab */}
                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <Tab key="specifications" title="📋 Specifications">
                      <div className="py-4">
                        <h3 className="text-2xl font-bold mb-4">Technical Specifications</h3>
                        <div className="space-y-2">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-3 gap-4 p-3 rounded-lg hover:bg-default-100">
                              <div className="col-span-1 font-semibold text-default-700">{key}</div>
                              <div className="col-span-2 text-default-600">
                                {Array.isArray(value) ? value.join(', ') : value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tab>
                  )}

                  {/* Features Tab */}
                  {product.features && product.features.length > 0 && (
                    <Tab key="features" title="⭐ Features">
                      <div className="py-4">
                        <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                        <ul className="space-y-3">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-default-100">
                              <span className="text-primary text-xl mt-0.5">✓</span>
                              <span className="text-default-600 flex-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Tab>
                  )}

                  {/* Dimensions Tab */}
                  {product.dimensions && Object.values(product.dimensions).some(v => v) && (
                    <Tab key="dimensions" title="📏 Dimensions">
                      <div className="py-4">
                        <h3 className="text-2xl font-bold mb-4">Physical Specifications</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {product.dimensions.width && (
                            <Card>
                              <CardBody className="text-center p-6">
                                <div className="text-3xl mb-2">↔️</div>
                                <div className="text-sm text-default-500 mb-1">Width</div>
                                <div className="text-xl font-bold">{product.dimensions.width}</div>
                              </CardBody>
                            </Card>
                          )}
                          {product.dimensions.height && (
                            <Card>
                              <CardBody className="text-center p-6">
                                <div className="text-3xl mb-2">↕️</div>
                                <div className="text-sm text-default-500 mb-1">Height</div>
                                <div className="text-xl font-bold">{product.dimensions.height}</div>
                              </CardBody>
                            </Card>
                          )}
                          {product.dimensions.depth && (
                            <Card>
                              <CardBody className="text-center p-6">
                                <div className="text-3xl mb-2">⬌</div>
                                <div className="text-sm text-default-500 mb-1">Depth</div>
                                <div className="text-xl font-bold">{product.dimensions.depth}</div>
                              </CardBody>
                            </Card>
                          )}
                          {product.dimensions.weight && (
                            <Card>
                              <CardBody className="text-center p-6">
                                <div className="text-3xl mb-2">⚖️</div>
                                <div className="text-sm text-default-500 mb-1">Weight</div>
                                <div className="text-xl font-bold">{product.dimensions.weight}</div>
                              </CardBody>
                            </Card>
                          )}
                        </div>
                      </div>
                    </Tab>
                  )}

                  {/* Compatibility Tab */}
                  {product.compatibility && product.compatibility.length > 0 && (
                    <Tab key="compatibility" title="🔗 Compatibility">
                      <div className="py-4">
                        <h3 className="text-2xl font-bold mb-4">Compatibility Information</h3>
                        <ul className="space-y-2">
                          {product.compatibility.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-default-50">
                              <span className="text-success text-xl">✓</span>
                              <span className="text-default-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Tab>
                  )}

                  {/* Documents Tab */}
                  {product.documents && product.documents.length > 0 && (
                    <Tab key="documents" title="📄 Documents">
                      <div className="py-4">
                        <h3 className="text-2xl font-bold mb-4">Available Documents</h3>
                        <div className="grid gap-3">
                          {product.documents.map((doc, idx) => (
                            <Button
                              key={idx}
                              as={Link}
                              href={doc.url}
                              isExternal
                              variant="flat"
                              className="justify-start h-auto py-4"
                            >
                              <div className="flex items-center gap-3 w-full">
                                <span className="text-2xl">
                                  {doc.type === 'manual' ? '📖' : doc.type === 'brochure' ? '📰' : '📄'}
                                </span>
                                <div className="text-left flex-1">
                                  <div className="font-semibold">{doc.name}</div>
                                  <div className="text-sm text-default-500 capitalize">{doc.type}</div>
                                </div>
                                <span className="text-default-400">→</span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </Tab>
                  )}
                </Tabs>
              </CardBody>
            </Card>

            {/* Part Numbers */}
            {product.partNumbers && product.partNumbers.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">Part Numbers</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    {product.partNumbers.map((partNum, idx) => (
                      <Chip key={idx} color="primary" variant="bordered" size="lg">
                        <span className="font-mono">{partNum}</span>
                      </Chip>
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
            {/* Contact Information */}
            <EquipmentContactCard contactInfo={data.contactInfo} />

            {/* Pricing & Ordering */}
            <Card className="bg-gradient-to-br from-success-50 to-primary-50">
              <CardBody className="space-y-3">
                <h3 className="text-lg font-semibold">💰 Pricing & Ordering</h3>
                {product.pricing?.msrp ? (
                  <div className="p-4 bg-white rounded-lg">
                    <div className="text-sm text-default-500 mb-1">MSRP</div>
                    <div className="text-3xl font-bold text-primary">{product.pricing.msrp}</div>
                    {product.pricing.note && (
                      <div className="text-sm text-default-500 mt-2">{product.pricing.note}</div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-lg">
                    <div className="text-sm text-default-500 mb-2">Pricing Information</div>
                    <p className="text-default-600">Contact our sales team for current pricing and availability</p>
                  </div>
                )}
                <Divider />
                <div className="text-sm text-default-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Competitive pricing available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Volume discounts offered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Flexible payment terms</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
              <CardBody className="space-y-3">
                <h3 className="text-lg font-semibold">📞 Get Expert Help</h3>
                <p className="text-sm text-default-600">
                  Our team can assist you with:
                </p>
                <ul className="text-sm text-default-600 space-y-1">
                  <li>• Technical specifications</li>
                  <li>• Installation requirements</li>
                  <li>• Compatibility verification</li>
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
