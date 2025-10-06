import CatalogPage from "@/components/catalog-page";
import type { EquipmentData } from "@/types/equipment";
import equipmentData from "@/data/equipment.json";

/**
 * Equipment Page
 * 
 * Uses the generic CatalogPage component with equipment-specific configuration.
 */
export default function EquipmentPage() {
  const data = equipmentData as EquipmentData;

  return (
    <CatalogPage
      data={data}
      baseUrl="equipment"
      title="Medical Equipment & Radiology Solutions"
      subtitle="Professional X-Ray Equipment & Accessories"
      description="Comprehensive selection of medical imaging equipment, darkroom supplies, and radiation measurement tools for healthcare facilities."
      benefitsTitle="Why Choose Pacific Northwest X-Ray?"
      benefits={[
        {
          icon: "🏆",
          title: "Quality Equipment",
          description: "Professional-grade equipment from trusted manufacturers",
        },
        {
          icon: "🤝",
          title: "Expert Support",
          description: "Knowledgeable team ready to assist with your equipment needs",
        },
        {
          icon: "🚚",
          title: "Reliable Service",
          description: "Over 25 years serving the medical imaging community",
        },
      ]}
    />
  );
}
