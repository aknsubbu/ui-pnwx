"use client";

import { useState, useMemo } from "react";
import { EquipmentHero } from "@/components/equipment-hero";
import { EquipmentFilterBar } from "@/components/equipment-filter-bar";
import { EquipmentCategoryCard } from "@/components/equipment-category-card";
import { EquipmentContactCard } from "@/components/equipment-contact-card";
import { EquipmentOrderInfoCard } from "@/components/equipment-order-info-card";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import type { EquipmentData } from "@/types/equipment";

interface CatalogPageProps {
  data: EquipmentData;
  baseUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  benefitsTitle?: string;
  benefits?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

/**
 * Enhanced Catalog Page Component
 *
 * Improvements:
 * - Better visual hierarchy with sticky sidebar
 * - Integrated contact and order info
 * - Stats section for quick insights
 * - Enhanced empty state
 * - Improved spacing and layout
 * - Result count and status indicators
 */
export default function CatalogPage({
  data,
  baseUrl,
  title,
  subtitle,
  description,
  benefitsTitle = "Why Choose Pacific Northwest X-Ray?",
  benefits = [
    {
      icon: "🏆",
      title: "Quality Products",
      description: "Professional-grade equipment from trusted manufacturers",
    },
    {
      icon: "🤝",
      title: "Expert Support",
      description: "Knowledgeable team ready to assist with your needs",
    },
    {
      icon: "🚚",
      title: "Reliable Service",
      description: "Over 25 years serving the medical imaging community",
    },
  ],
}: CatalogPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Memoized filtered categories for performance
  const filteredCategories = useMemo(() => {
    return data.categories.filter((category) => {
      const matchesSearch =
        searchTerm === "" ||
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.subcategories.some(
          (sub) =>
            sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFeatured = !featuredOnly || category.featured;

      return matchesSearch && matchesFeatured;
    });
  }, [data.categories, searchTerm, featuredOnly]);

  // Calculate stats
  const totalCategories = data.categories.length;
  const featuredCount = data.categories.filter((c) => c.featured).length;
  const totalSubcategories = data.categories.reduce(
    (acc, cat) => acc + cat.subcategories.length,
    0
  );

  const handleFilterChange = (search: string, featured: boolean) => {
    setSearchTerm(search);
    setFeaturedOnly(featured);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <EquipmentHero
        title={title}
        subtitle={subtitle}
        description={description}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {/* Stats Bar - Quick Overview */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-md border-l-4 border-l-blue-500">
            <CardBody className="p-4">
              <p className="text-sm text-foreground/60 mb-1">Categories</p>
              <p className="text-2xl font-bold">{totalCategories}</p>
            </CardBody>
          </Card>
          <Card className="shadow-md border-l-4 border-l-emerald-500">
            <CardBody className="p-4">
              <p className="text-sm text-foreground/60 mb-1">Featured</p>
              <p className="text-2xl font-bold">{featuredCount}</p>
            </CardBody>
          </Card>
          <Card className="shadow-md border-l-4 border-l-purple-500">
            <CardBody className="p-4">
              <p className="text-sm text-foreground/60 mb-1">Subcategories</p>
              <p className="text-2xl font-bold">{totalSubcategories}</p>
            </CardBody>
          </Card>
          <Card className="shadow-md border-l-4 border-l-orange-500">
            <CardBody className="p-4">
              <p className="text-sm text-foreground/60 mb-1">Min. Order</p>
              <p className="text-2xl font-bold">
                ${data.orderingInfo.minimumOrder}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <EquipmentFilterBar
            categories={filteredCategories}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Results Counter */}
        {(searchTerm || featuredOnly) && (
          <div className="mb-6 flex items-center gap-3">
            <Chip color="primary" variant="flat" size="lg">
              {filteredCategories.length}{" "}
              {filteredCategories.length === 1 ? "result" : "results"}
            </Chip>
            {searchTerm && (
              <Chip
                color="default"
                variant="flat"
                onClose={() => setSearchTerm("")}
              >
                Search: {searchTerm}
              </Chip>
            )}
            {featuredOnly && (
              <Chip
                color="warning"
                variant="flat"
                onClose={() => setFeaturedOnly(false)}
              >
                Featured only
              </Chip>
            )}
          </div>
        )}

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Categories - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCategories.map((category, index) => (
                  <EquipmentCategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                    baseUrl={baseUrl}
                  />
                ))}
              </div>
            ) : (
              // Enhanced No Results State
              <Card className="shadow-lg">
                <CardBody className="text-center py-16">
                  <div className="text-7xl mb-4 opacity-50">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">
                    No categories found
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    Try adjusting your search or filters to find what you're
                    looking for
                  </p>
                  {(searchTerm || featuredOnly) && (
                    <div className="flex gap-2 justify-center">
                      {searchTerm && (
                        <Chip
                          color="primary"
                          variant="flat"
                          onClose={() => setSearchTerm("")}
                        >
                          Clear search
                        </Chip>
                      )}
                      {featuredOnly && (
                        <Chip
                          color="warning"
                          variant="flat"
                          onClose={() => setFeaturedOnly(false)}
                        >
                          Show all
                        </Chip>
                      )}
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>

          {/* Sidebar - 1/4 width */}
          <div className="lg:col-span-1">
            <div className="flex flex-col">
              {/* Contact Card */}
              <div className="w-full mb-6">
                <EquipmentContactCard contactInfo={data.contactInfo} />
              </div>

              {/* Order Info Card */}
              <div className="w-full mb-6">
                <EquipmentOrderInfoCard orderingInfo={data.orderingInfo} />
              </div>

              {/* Quick Stats Card */}
              <div className="w-full mb-6">
                <Card className="shadow-lg">
                  <CardBody className="p-5">
                    <h3 className="font-bold text-lg mb-4">Quick Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                        <span className="text-foreground/70">Total Products</span>
                        <span className="font-semibold">
                          {totalSubcategories}+
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                        <span className="text-foreground/70">Categories</span>
                        <span className="font-semibold">{totalCategories}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                        <span className="text-foreground/70">Min Order</span>
                        <span className="font-semibold text-emerald-500">
                          ${data.orderingInfo.minimumOrder}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Delivery</span>
                        <span className="font-semibold">Nationwide</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Help Card */}
              <div className="w-full mb-6">
                <Card className="shadow-lg bg-blue-500/5 border-2 border-blue-500/20">
                  <CardBody className="p-5">
                    <div className="text-3xl mb-3">💡</div>
                    <h3 className="font-bold mb-2">Need Help?</h3>
                    <p className="text-sm text-foreground/70 mb-3">
                      Our experts are ready to help you find the right equipment
                      for your needs.
                    </p>
                    <p className="text-sm font-semibold text-blue-500">
                      Call: 1-503-667-3000
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section - Full Width */}
        <section className="mt-16">
          <Card className="shadow-lg">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {benefitsTitle}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center space-y-3 p-4 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors"
                  >
                    <div className="text-4xl">{benefit.icon}</div>
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-foreground/70">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Additional Info Bar */}
        <div className="mt-8 p-4 bg-foreground/5 rounded-lg border border-foreground/10">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-foreground/70">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-foreground/70">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-foreground/70">Expert Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-foreground/70">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
