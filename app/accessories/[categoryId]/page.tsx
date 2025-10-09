"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import { EquipmentSubcategoryCard } from "@/components/equipment-subcategory-card";
import { EquipmentContactCard } from "@/components/equipment-contact-card";
import { EquipmentOrderInfoCard } from "@/components/equipment-order-info-card";
import type { EquipmentData } from "@/types/equipment";
import accessoriesData from "@/data/accessories.json";
import { use } from "react";

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

/**
 * Dynamic Accessories Category Page
 */
export default function AccessoriesCategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = use(params);
  const data = accessoriesData as EquipmentData;
  const category = data.categories.find((cat) => cat.id === categoryId);

  if (!category) {
    notFound();
  }

  const iconMap: Record<string, string> = {
    cube: "📦",
    medkit: "🏥",
    radio: "📡",
    nuclear: "☢️",
    tag: "🏷️",
    folder: "📁",
    magnet: "🧲",
    people: "👥",
    flask: "🧪",
    chair: "💺",
    tools: "🔧",
    shield: "🛡️",
    wave: "〰️",
    paw: "🐾",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-default-50 to-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-primary-50/30 via-default-100/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-default-600 hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-default-400">›</li>
                <li>
                  <Link
                    href="/accessories"
                    className="text-default-600 hover:text-primary transition-colors"
                  >
                    Accessories
                  </Link>
                </li>
                <li className="text-default-400">›</li>
                <li className="text-default-900 font-medium">
                  {category.name}
                </li>
              </ol>
            </nav>

            {/* Category Header */}
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              <div
                className="text-6xl sm:text-7xl shrink-0"
                role="img"
                aria-label={category.name}
              >
                {iconMap[category.icon] || "📋"}
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-default-900 to-default-700 bg-clip-text text-transparent">
                    {category.name}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {category.featured && (
                      <Chip
                        color="primary"
                        size="sm"
                        variant="flat"
                        className="font-medium"
                      >
                        ⭐ Featured
                      </Chip>
                    )}
                    {category.badge && (
                      <Chip
                        color="success"
                        size="sm"
                        variant="flat"
                        className="font-medium"
                      >
                        {category.badge}
                      </Chip>
                    )}
                    <Chip
                      color="default"
                      size="sm"
                      variant="flat"
                      className="font-medium"
                    >
                      {category.itemCount} items
                    </Chip>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-default-600 leading-relaxed mb-6">
                  {category.description}
                </p>
                {category.externalUrl && (
                  <Button
                    as={Link}
                    color="primary"
                    href={category.externalUrl}
                    isExternal
                    showAnchorIcon
                    size="md"
                    variant="flat"
                    className="font-medium"
                  >
                    View on PNWX.com
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Products Grid - Spans 8 columns on large screens */}
          <div className="lg:col-span-8 w-full">
            {category.subcategories.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Available Products
                  </h2>
                  <Chip
                    color="primary"
                    variant="flat"
                    size="lg"
                    className="font-semibold"
                  >
                    {category.subcategories.length}{" "}
                    {category.subcategories.length === 1
                      ? "Product"
                      : "Products"}
                  </Chip>
                </div>

                {/* Grid with proper spacing and no overlap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {category.subcategories.map((subcategory, index) => (
                    <div key={subcategory.id} className="h-full">
                      <EquipmentSubcategoryCard
                        categoryId={categoryId}
                        index={index}
                        sectionPath="accessories"
                        subcategory={subcategory}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardBody className="text-center py-16 px-6">
                  <div className="text-7xl mb-6">📦</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    No Products Available
                  </h3>
                  <p className="text-default-600 text-lg mb-6 max-w-md mx-auto">
                    Products are currently unavailable. Please check back later
                    or contact our sales team.
                  </p>
                  <Button
                    as={Link}
                    color="primary"
                    href={`mailto:${data.contactInfo.email}`}
                    size="lg"
                    className="font-medium"
                  >
                    Contact Sales Team
                  </Button>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Sidebar - Spans 4 columns on large screens, sticky positioning */}
          <aside className="lg:col-span-4 w-full space-y-6 lg:sticky lg:top-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <EquipmentContactCard contactInfo={data.contactInfo} />
            </motion.div>

            {/* Ordering Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <EquipmentOrderInfoCard orderingInfo={data.orderingInfo} />
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardBody className="space-y-4 p-5">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span>🔗</span>
                    Quick Navigation
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    <Button
                      as={Link}
                      color="default"
                      href="/accessories"
                      size="md"
                      startContent={<span>←</span>}
                      variant="flat"
                      className="justify-start font-medium"
                    >
                      Back to All Accessories
                    </Button>
                    <Button
                      as={Link}
                      color="default"
                      href="/equipment"
                      size="md"
                      startContent={<span>🔧</span>}
                      variant="flat"
                      className="justify-start font-medium"
                    >
                      Browse Equipment
                    </Button>
                    <Button
                      as={Link}
                      color="default"
                      href="/supplies"
                      size="md"
                      startContent={<span>📦</span>}
                      variant="flat"
                      className="justify-start font-medium"
                    >
                      Browse Supplies
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
}
