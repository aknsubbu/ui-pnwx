"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { EquipmentSubcategoryCard } from "@/components/equipment-subcategory-card";
import { EquipmentContactCard } from "@/components/equipment-contact-card";
import { EquipmentOrderInfoCard } from "@/components/equipment-order-info-card";
import type { EquipmentData } from "@/types/equipment";
import equipmentData from "@/data/equipment.json";
import { use } from "react";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

/**
 * Enhanced Equipment Category Page
 *
 * Redesigned to match product page styling with:
 * - Compact hero section with better visual hierarchy
 * - Enhanced cards with shadows and borders
 * - Sticky sidebar for persistent access
 * - Improved color-coded sections
 * - Better mobile responsiveness
 */
export default function EquipmentCategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = use(params);
  const data = equipmentData as EquipmentData;
  const category = data.categories.find((cat) => cat.id === categoryId);

  if (!category) {
    notFound();
  }

  const iconMap: Record<string, string> = {
    cube: "📦",
    medkit: "🏥",
    radio: "📡",
    nuclear: "☢️",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact like product page */}
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
                <li className="font-medium">{category.name}</li>
              </ol>
            </nav>

            {/* Category Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-4">
                <div
                  className="text-5xl md:text-6xl"
                  role="img"
                  aria-label={category.name}
                >
                  {iconMap[category.icon] || "📋"}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    {category.name}
                  </h1>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {category.featured && (
                      <Chip color="primary" size="md" variant="flat">
                        ⭐ Featured
                      </Chip>
                    )}
                    <Chip color="secondary" size="md" variant="flat">
                      📦 {category.itemCount} items
                    </Chip>
                  </div>
                  <p className="text-base text-foreground/70 max-w-2xl">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Desktop Quick Actions */}
              <div className="hidden md:flex gap-2">
                {category.externalUrl && (
                  <Button
                    as={Link}
                    color="default"
                    href={category.externalUrl}
                    isExternal
                    showAnchorIcon
                    variant="bordered"
                  >
                    View on PNWX
                  </Button>
                )}
                <Button
                  as={Link}
                  color="primary"
                  href={`mailto:${data.contactInfo.email}`}
                  startContent={<span>📧</span>}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Products Grid - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {category.subcategories.length > 0 ? (
              <Card className="shadow-lg border-l-4 border-l-blue-500">
                <CardHeader className="border-b border-foreground/10 p-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-blue-500">📦</span>
                    Available Products ({category.subcategories.length})
                  </h2>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.subcategories.map((subcategory, index) => (
                      <EquipmentSubcategoryCard
                        key={subcategory.id}
                        categoryId={categoryId}
                        index={index}
                        sectionPath="equipment"
                        subcategory={subcategory}
                      />
                    ))}
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardBody className="text-center py-16">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-2xl font-bold mb-2">
                    No products available
                  </h3>
                  <p className="text-foreground/60 mb-4">
                    Please check back later or contact us for availability.
                  </p>
                  <Button
                    as={Link}
                    color="primary"
                    href={`mailto:${data.contactInfo.email}`}
                  >
                    Contact Sales
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* Category Information Card */}
            <Card className="shadow-lg border-l-4 border-l-emerald-500">
              <CardHeader className="border-b border-foreground/10 p-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-emerald-500">ℹ️</span>
                  About {category.name}
                </h2>
              </CardHeader>
              <CardBody className="p-6">
                <p className="text-foreground/70 leading-relaxed mb-4">
                  {category.description}
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="text-center p-4 bg-emerald-500/5 rounded-xl border-2 border-emerald-500/20">
                    <div className="text-3xl mb-2">📦</div>
                    <div className="text-sm text-foreground/60 mb-1 font-medium">
                      Products
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {category.itemCount}
                    </div>
                  </div>
                  {category.featured && (
                    <div className="text-center p-4 bg-emerald-500/5 rounded-xl border-2 border-emerald-500/20">
                      <div className="text-3xl mb-2">⭐</div>
                      <div className="text-sm text-foreground/60 mb-1 font-medium">
                        Status
                      </div>
                      <div className="text-lg font-bold text-emerald-600">
                        Featured
                      </div>
                    </div>
                  )}
                  <div className="text-center p-4 bg-emerald-500/5 rounded-xl border-2 border-emerald-500/20">
                    <div className="text-3xl mb-2">✓</div>
                    <div className="text-sm text-foreground/60 mb-1 font-medium">
                      Availability
                    </div>
                    <div className="text-lg font-bold text-emerald-600">
                      In Stock
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sticky Sidebar - 1/4 width */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Quick Actions Card */}
              <Card className="shadow-lg bg-blue-500/5 border-2 border-blue-500/30">
                <CardBody className="p-5">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <span className="text-blue-500">⚡</span>
                    Quick Actions
                  </h3>
                  <div className="flex flex-col gap-2">
                    <Button
                      as={Link}
                      color="primary"
                      href={`mailto:${data.contactInfo.email}?subject=Quote: ${category.name}`}
                      size="sm"
                      startContent={<span>📧</span>}
                      className="w-full"
                    >
                      Request Quote
                    </Button>
                    <Button
                      as={Link}
                      color="primary"
                      href={`tel:${data.contactInfo.phone}`}
                      size="sm"
                      variant="bordered"
                      startContent={<span>📞</span>}
                      className="w-full"
                    >
                      Call Us
                    </Button>
                    {category.externalUrl && (
                      <Button
                        as={Link}
                        color="default"
                        href={category.externalUrl}
                        isExternal
                        showAnchorIcon
                        size="sm"
                        variant="flat"
                        className="w-full"
                      >
                        View on PNWX
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>

              {/* Contact Information */}
              <EquipmentContactCard contactInfo={data.contactInfo} />

              {/* Ordering Information */}
              <EquipmentOrderInfoCard orderingInfo={data.orderingInfo} />

              {/* Expert Help Card */}
              <Card className="shadow-lg bg-purple-500/5 border-2 border-purple-500/20">
                <CardBody className="p-5">
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="font-bold mb-2">Need Expert Help?</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Our specialists can help you choose the right equipment:
                  </p>
                  <ul className="text-sm text-foreground/70 space-y-1 mb-4">
                    <li>• Product selection</li>
                    <li>• Technical specs</li>
                    <li>• Volume pricing</li>
                    <li>• Custom solutions</li>
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

              {/* Quick Links */}
              {/* <Card className="shadow-lg">
                <CardBody className="p-5">
                  <h3 className="font-bold mb-3">Browse Categories</h3>
                  <div className="flex flex-col gap-2">
                    <Button
                      as={Link}
                      color="default"
                      href="/equipment"
                      size="sm"
                      startContent={<span>←</span>}
                      variant="flat"
                    >
                      All Equipment
                    </Button>
                    <Button
                      as={Link}
                      color="default"
                      href="/accessories"
                      size="sm"
                      variant="flat"
                    >
                      Accessories
                    </Button>
                    <Button
                      as={Link}
                      color="default"
                      href="/supplies"
                      size="sm"
                      variant="flat"
                    >
                      Supplies
                    </Button>
                  </div>
                </CardBody>
              </Card> */}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
