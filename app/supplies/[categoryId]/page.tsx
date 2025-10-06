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
import suppliesData from "@/data/supplies.json";
import { use } from "react";

interface CategoryPageProps {
  params: Promise<{ categoryId: string; }>;
}

/**
 * Dynamic Supplies Category Page
 */
export default function SuppliesCategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = use(params);
  const data = suppliesData as EquipmentData;
  const category = data.categories.find((cat) => cat.id === categoryId);

  if (!category) {
    notFound();
  }

  const iconMap: Record<string, string> = {
    hand: "✋",
    shield: "🛡️",
    sparkles: "✨",
    disc: "💿",
    shirt: "👕",
    tag: "🏷️",
    mail: "✉️",
    medical: "🏥",
    ear: "👂",
    nuclear: "☢️",
    droplet: "💧",
    clean: "🧼",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-default-100 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-default-500 hover:text-default-900">
                    Home
                  </Link>
                </li>
                <li className="text-default-400">/</li>
                <li>
                  <Link href="/supplies" className="text-default-500 hover:text-default-900">
                    Supplies
                  </Link>
                </li>
                <li className="text-default-400">/</li>
                <li className="text-default-900 font-medium">{category.name}</li>
              </ol>
            </nav>

            {/* Category Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-6xl" role="img" aria-label={category.name}>
                {iconMap[category.icon] || "📋"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {category.name}
                  </h1>
                  <div className="flex gap-2">
                    {category.featured && (
                      <Chip color="primary" size="sm" variant="flat">
                        Featured
                      </Chip>
                    )}
                    <Chip color="default" size="sm" variant="flat">
                      {category.itemCount} items
                    </Chip>
                  </div>
                </div>
                <p className="text-lg text-default-600 mb-4">
                  {category.description}
                </p>
                {category.externalUrl && (
                  <Button
                    as={Link}
                    color="default"
                    href={category.externalUrl}
                    isExternal
                    showAnchorIcon
                    size="sm"
                    variant="bordered"
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
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Grid - 2/3 width */}
          <div className="lg:col-span-2">
            {category.subcategories.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mb-6">
                  Available Products ({category.subcategories.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
                  {category.subcategories.map((subcategory, index) => (
                    <EquipmentSubcategoryCard
                      key={subcategory.id}
                      categoryId={categoryId}
                      index={index}
                      sectionPath="supplies"
                      subcategory={subcategory}
                    />
                  ))}
                </div>
              </>
            ) : (
              <Card>
                <CardBody className="text-center py-16">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-2xl font-bold mb-2">
                    No products available
                  </h3>
                  <p className="text-default-600 mb-4">
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
          </div>

          {/* Sidebar - 1/3 width */}
          <aside className="space-y-6">
            {/* Contact Information */}
            <EquipmentContactCard contactInfo={data.contactInfo} />

            {/* Ordering Information */}
            <EquipmentOrderInfoCard orderingInfo={data.orderingInfo} />

            {/* Quick Links */}
            <Card>
              <CardBody className="space-y-3">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    as={Link}
                    color="default"
                    href="/supplies"
                    size="sm"
                    startContent={<span>←</span>}
                    variant="flat"
                  >
                    Back to All Supplies
                  </Button>
                  <Button
                    as={Link}
                    color="default"
                    href="/equipment"
                    size="sm"
                    variant="flat"
                  >
                    Browse Equipment
                  </Button>
                  <Button
                    as={Link}
                    color="default"
                    href="/accessories"
                    size="sm"
                    variant="flat"
                  >
                    Browse Accessories
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
