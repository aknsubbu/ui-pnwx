import CatalogPage from "@/components/catalog-page";
import type { EquipmentData } from "@/types/equipment";
import accessoriesData from "@/data/accessories.json";

/**
 * Accessories Page
 * 
 * Uses the generic CatalogPage component with accessories-specific configuration.
 */
export default function AccessoriesPage() {
  const data = accessoriesData as EquipmentData;

  return (
    <CatalogPage
      data={data}
      baseUrl="accessories"
      title="X-Ray & Radiology Accessories"
      subtitle="Complete Accessory Solutions"
      description="Comprehensive range of radiology accessories including darkroom products, exam room equipment, MRI accessories, radiation protection, and more."
      benefitsTitle="Comprehensive Accessory Solutions"
      benefits={[
        {
          icon: "🛡️",
          title: "Safety First",
          description: "Complete radiation protection products and safety equipment",
        },
        {
          icon: "📦",
          title: "Wide Selection",
          description: "Over 200 different accessories for every radiology need",
        },
        {
          icon: "💯",
          title: "Quality Assured",
          description: "Premium accessories from leading medical equipment manufacturers",
        },
      ]}
    />
  );
}
