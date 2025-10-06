"use client";

import { motion } from "framer-motion";

interface EquipmentHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

/**
 * EquipmentHero Component
 * 
 * Best Practices:
 * - Clear visual hierarchy
 * - Engaging animation on load
 * - Responsive typography
 * - Semantic HTML structure
 * - Accessibility with ARIA labels
 */
export const EquipmentHero = ({
  title = "Medical Equipment & Radiology Solutions",
  subtitle = "Professional X-Ray Equipment & Accessories",
  description = "Comprehensive selection of medical imaging equipment, darkroom supplies, and radiation measurement tools for healthcare facilities.",
}: EquipmentHeroProps) => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20" aria-label="Equipment page hero section">
      <div className="container mx-auto px-4">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-default-600 font-medium">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-default-500 max-w-3xl mx-auto">
            {description}
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="h-1 w-12 bg-primary-400 rounded-full" />
            <div className="h-1 w-8 bg-primary-300 rounded-full" />
            <div className="h-1 w-4 bg-primary-200 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
