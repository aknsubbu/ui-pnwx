import CatalogPage from "@/components/catalog-page";
import type { EquipmentData } from "@/types/equipment";
import suppliesData from "@/data/supplies.json";

/**
 * Supplies Page
 * 
 * Uses the generic CatalogPage component with supplies-specific configuration.
 */
export default function SuppliesPage() {
  const data = suppliesData as EquipmentData;

  return (
    <CatalogPage
      data={data}
      baseUrl="supplies"
      title="X-Ray Consumable Supplies"
      subtitle="Essential Medical Imaging Supplies"
      description="Complete range of consumable supplies for radiology departments including cleaning products, protective covers, labels, envelopes, and more."
      benefitsTitle="Quality Supplies for Your Facility"
      benefits={[
        {
          icon: "🧪",
          title: "Medical Grade",
          description: "All supplies meet medical industry standards and specifications",
        },
        {
          icon: "📦",
          title: "Bulk Options",
          description: "Competitive pricing on bulk orders and regular supply contracts",
        },
        {
          icon: "🚀",
          title: "Fast Shipping",
          description: "Quick turnaround on commonly stocked consumable items",
        },
      ]}
    />
  );
}
