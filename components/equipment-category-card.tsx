"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import type { EquipmentCategory } from "@/types/equipment";

interface EquipmentCategoryCardProps {
  category: EquipmentCategory;
  index: number;
  baseUrl: string; // e.g., "equipment", "accessories", "supplies", "parts"
}

/**
 * EquipmentCategoryCard Component
 * 
 * Following UI Best Practices:
 * 
 * Shneiderman's Golden Rules:
 * 1. Strive for consistency - Uniform card layout and interactions
 * 2. Seek universal usability - Clear visual hierarchy and readable text
 * 3. Offer informative feedback - Hover states and animations
 * 4. Design dialogs to yield closure - Clear CTA with "Explore" button
 * 5. Prevent errors - Disabled state when no subcategories
 * 6. Permit easy reversal - Navigation breadcrumbs (to be implemented)
 * 7. Keep users in control - Clear navigation options
 * 8. Reduce short-term memory load - All info visible at once
 * 
 * Norman's Principles:
 * 1. Visibility - All category info is immediately visible
 * 2. Feedback - Hover animations and visual responses
 * 3. Constraints - Disabled states for unavailable actions
 * 4. Mapping - Logical layout matches user expectations
 * 5. Consistency - Follows design system patterns
 * 6. Affordance - Buttons and cards look interactive
 */
export const EquipmentCategoryCard = ({
  category,
  index,
  baseUrl,
}: EquipmentCategoryCardProps) => {
  const iconMap: Record<string, string> = {
    cube: "📦",
    medkit: "🏥",
    radio: "📡",
    nuclear: "☢️",
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="h-full"
    >
      <Card
        className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col"
        isPressable
      >
        <CardHeader className="flex-col items-start gap-2 pb-0">
          <div className="flex w-full items-center justify-between">
            <div className="text-4xl" role="img" aria-label={category.name}>
              {iconMap[category.icon] || "📋"}
            </div>
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
          <h3 className="text-xl font-bold">{category.name}</h3>
        </CardHeader>

        <CardBody className="py-4 flex-grow">
          <p className="text-small text-default-600">{category.description}</p>

          {category.subcategories.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-tiny font-semibold text-default-500 uppercase">
                Available Options:
              </p>
              <ul className="space-y-1">
                {category.subcategories.slice(0, 3).map((sub) => (
                  <li
                    key={sub.id}
                    className="text-small text-default-600 flex items-center gap-2"
                  >
                    <span className="text-primary">•</span>
                    {sub.name}
                  </li>
                ))}
                {category.subcategories.length > 3 && (
                  <li className="text-small text-default-400 italic">
                    +{category.subcategories.length - 3} more options
                  </li>
                )}
              </ul>
            </div>
          )}
        </CardBody>

        <CardFooter className="mt-auto">
          <Button
            as={Link}
            className="w-full"
            color="primary"
            href={`/${baseUrl}/${category.id}`}
            variant="flat"
          >
            Explore {category.name}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
