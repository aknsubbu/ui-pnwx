"use client";

import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import type { EquipmentSubcategory } from "@/types/equipment";
import { Image } from "@heroui/image";

interface EquipmentSubcategoryCardProps {
  subcategory: EquipmentSubcategory;
  index: number;
  categoryId: string; // For building internal product URL
  sectionPath: string; // e.g., "equipment", "accessories", "supplies", "parts"
}

/**
 * EquipmentSubcategoryCard Component
 * 
 * Designed for product listing with focus on:
 * - Visual hierarchy (image, title, description, CTA)
 * - Scannability (clean layout, adequate spacing)
 * - Progressive disclosure (essential info first)
 * - Clear affordances (interactive elements are obvious)
 */
export const EquipmentSubcategoryCard = ({
  subcategory,
  index,
  categoryId,
  sectionPath,
}: EquipmentSubcategoryCardProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        className="h-full hover:shadow-xl transition-all duration-300 flex flex-col min-h-[400px]"
        isPressable
      >
        <CardBody className="p-0 flex flex-col h-full">
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <Image
            src={subcategory.image || '/placeholder-equipment.jpg'}
            alt={subcategory.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            classNames={{
              img: "h-full w-full object-cover"
            }}
          />
        </div>

          <div className="p-4 space-y-3 flex flex-col flex-grow">
            <h4 className="text-lg font-semibold line-clamp-2">
              {subcategory.name}
            </h4>
            <p className="text-small text-default-600 line-clamp-3 flex-grow">
              {subcategory.description}
            </p>

            <div className="flex gap-2 mt-auto">
              <Button
                as={Link}
                className="flex-1"
                color="primary"
                href={`/${sectionPath}/${categoryId}/${subcategory.id}`}
                size="sm"
                variant="flat"
              >
                View Details
              </Button>
              {subcategory.url && (
                <Button
                  as={Link}
                  className="flex-1"
                  color="default"
                  href={subcategory.url}
                  isExternal
                  showAnchorIcon
                  size="sm"
                  variant="bordered"
                >
                  PNWX
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
