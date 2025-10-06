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
import type { EquipmentData } from "@/types/equipment";
import accessoriesData from "@/data/accessories.json";
import { use } from "react";

interface ProductPageProps {
  params: Promise<{
    categoryId: string;
    productId: string;
  }>;
}

export default function AccessoriesProductPage({ params }: ProductPageProps) {
  const { categoryId, productId } = use(params);
  const data = accessoriesData as EquipmentData;
  
  const category = data.categories.find((cat) => cat.id === categoryId);
  if (!category) notFound();
  
  const product = category.subcategories.find((sub) => sub.id === productId);
  if (!product) notFound();

  return (
    <div className="min-h-screen">
      <section className="w-full py-8 md:py-12 bg-gradient-to-b from-default-100 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm flex-wrap">
                <li><Link href="/" className="text-default-500 hover:text-default-900">Home</Link></li>
                <li className="text-default-400">/</li>
                <li><Link href="/accessories" className="text-default-500 hover:text-default-900">Accessories</Link></li>
                <li className="text-default-400">/</li>
                <li><Link href={`/accessories/${categoryId}`} className="text-default-500 hover:text-default-900">{category.name}</Link></li>
                <li className="text-default-400">/</li>
                <li className="text-default-900 font-medium">{product.name}</li>
              </ol>
            </nav>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardBody className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative aspect-square w-full overflow-hidden bg-default-100 rounded-lg">
                    <Image
                      alt={product.name}
                      className="object-cover w-full h-full"
                      fallbackSrc="https://via.placeholder.com/600x600?text=Product+Image"
                      src={product.image}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                      {product.manufacturer && (
                        <Chip color="primary" size="sm" variant="flat">
                          {product.manufacturer}
                        </Chip>
                      )}
                    </div>

                    <Divider />

                    <div>
                      <h2 className="text-lg font-semibold mb-2">Overview</h2>
                      <p className="text-default-600">{product.description}</p>
                    </div>

                    <Divider />

                    <div className="space-y-3">
                      <h2 className="text-lg font-semibold">Get Started</h2>
                      <div className="flex flex-col gap-2">
                        <Button
                          as={Link}
                          color="primary"
                          href={`mailto:${data.contactInfo.email}?subject=Inquiry about ${product.name}`}
                          size="lg"
                          startContent={<span>📧</span>}
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
                        >
                          Call Sales
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Complete Specifications Alert */}
            {product.url && (
              <Card className="border-2 border-primary">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">📋</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Complete Technical Specifications Available</h3>
                      <p className="text-default-600 mb-4">
                        For detailed technical specifications, measurements, compatibility information, 
                        installation requirements, and pricing, please visit the complete product page on PNWX.com.
                      </p>
                      <Button
                        as={Link}
                        color="primary"
                        href={product.url}
                        isExternal
                        showAnchorIcon
                        size="lg"
                      >
                        View Full Specifications on PNWX.com
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Key Information */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Key Information</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-default-100 rounded-lg">
                      <span className="text-2xl">📁</span>
                      <div>
                        <p className="text-sm font-semibold text-default-500">Category</p>
                        <Link href={`/accessories/${categoryId}`} className="text-primary font-medium">
                          {category.name}
                        </Link>
                      </div>
                    </div>
                    
                    {product.manufacturer && (
                      <div className="flex items-start gap-3 p-3 bg-default-100 rounded-lg">
                        <span className="text-2xl">🏭</span>
                        <div>
                          <p className="text-sm font-semibold text-default-500">Manufacturer</p>
                          <p className="font-medium">{product.manufacturer}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-default-100 rounded-lg">
                      <span className="text-2xl">💰</span>
                      <div>
                        <p className="text-sm font-semibold text-default-500">Pricing</p>
                        <p className="text-sm text-default-600">Contact sales for quote</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-default-100 rounded-lg">
                      <span className="text-2xl">📦</span>
                      <div>
                        <p className="text-sm font-semibold text-default-500">Availability</p>
                        <p className="text-sm text-default-600">Contact for stock status</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Why Choose Pacific Northwest X-Ray?</h3>
                  <ul className="space-y-2 text-default-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Expert guidance in selecting the right accessories for your equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Competitive pricing on all medical imaging accessories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Fast shipping and delivery options available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Ongoing technical support and consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Over 25 years serving the medical imaging community</span>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            {/* Related Products */}
            <Card>
              <CardHeader><h2 className="text-2xl font-bold">More from {category.name}</h2></CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.subcategories.filter((sub) => sub.id !== productId).slice(0, 6).map((relatedProduct) => (
                    <Link key={relatedProduct.id} href={`/accessories/${categoryId}/${relatedProduct.id}`} className="group">
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
                          <p className="text-sm font-medium line-clamp-2">{relatedProduct.name}</p>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          <aside className="space-y-6">
            {/* Contact Information */}
            <EquipmentContactCard contactInfo={data.contactInfo} />

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
              <CardBody className="space-y-3">
                <h3 className="text-lg font-semibold">Need Assistance?</h3>
                <p className="text-sm text-default-600">
                  Our experienced sales team can help you with:
                </p>
                <ul className="text-sm text-default-600 space-y-1">
                  <li>• Product selection & compatibility</li>
                  <li>• Technical specifications</li>
                  <li>• Pricing & availability</li>
                  <li>• Installation services</li>
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
                  {product.url && (
                    <Button
                      as={Link}
                      color="secondary"
                      href={product.url}
                      isExternal
                      showAnchorIcon
                      size="sm"
                      variant="flat"
                    >
                      Full Specs
                    </Button>
                  )}
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
                    href={`/accessories/${categoryId}`}
                    size="sm"
                    startContent={<span>←</span>}
                    variant="flat"
                  >
                    Back to {category.name}
                  </Button>
                  <Button
                    as={Link}
                    color="default"
                    href="/accessories"
                    size="sm"
                    variant="flat"
                  >
                    All Accessories
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
