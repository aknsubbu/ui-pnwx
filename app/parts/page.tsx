import CatalogPage from "@/components/catalog-page";
import type { EquipmentData } from "@/types/equipment";
import partsData from "@/data/parts.json";

/**
 * Parts Page
 * 
 * Uses the generic CatalogPage component with parts-specific configuration.
 */
export default function PartsPage() {
  const data = partsData as EquipmentData;

  return (
    <CatalogPage
      data={data}
      baseUrl="parts"
      title="X-Ray Parts & Components"
      subtitle="Quality Replacement Parts & Components"
      description="Comprehensive selection of X-ray parts including grids, collimators, lamps, and high voltage cables for medical imaging systems."
      benefitsTitle="Reliable Parts & Components"
      benefits={[
        {
          icon: "⚙️",
          title: "OEM Quality",
          description: "Original equipment manufacturer quality parts and replacements",
        },
        {
          icon: "📦",
          title: "Ready Stock",
          description: "Many commonly needed parts available for immediate shipping",
        },
        {
          icon: "🔧",
          title: "Technical Support",
          description: "Expert assistance to help identify the right parts for your system",
        },
      ]}
    />
  );
}
