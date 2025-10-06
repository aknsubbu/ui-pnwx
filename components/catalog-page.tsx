"use client";

import { useState, useMemo } from "react";
import { EquipmentHero } from "@/components/equipment-hero";
import { EquipmentFilterBar } from "@/components/equipment-filter-bar";
import { EquipmentCategoryCard } from "@/components/equipment-category-card";
import { EquipmentContactCard } from "@/components/equipment-contact-card";
import { EquipmentOrderInfoCard } from "@/components/equipment-order-info-card";
import type { EquipmentData } from "@/types/equipment";

interface CatalogPageProps {
  data: EquipmentData;
  baseUrl: string; // e.g., "equipment", "accessories", "supplies", "parts"
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
 * Generic Catalog Page Component
 * 
 * This component can be reused for Equipment, Accessories, and Supplies pages.
 * It provides a consistent user experience across all catalog sections.
 * 
 * Features:
 * - Reusable across multiple catalog types
 * - Configurable hero section
 * - Consistent filtering and search
 * - Responsive layout
 * - Customizable benefits section
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
        {/* Filter Bar */}
        <div className="mb-8">
          <EquipmentFilterBar
            categories={filteredCategories}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Categories - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category Cards Grid */}
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
              // No Results State
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No categories found</h3>
                <p className="text-default-600">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <aside className="space-y-6">
            {/* Contact Information */}
            <EquipmentContactCard contactInfo={data.contactInfo} />

            {/* Ordering Information */}
            <EquipmentOrderInfoCard orderingInfo={data.orderingInfo} />
          </aside>
        </div>

        {/* Additional Information Section */}
        <section className="mt-16 bg-default-100 dark:bg-default-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">{benefitsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl">{benefit.icon}</div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="text-small text-default-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
