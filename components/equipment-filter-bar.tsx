"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useState } from "react";
import type { EquipmentCategory } from "@/types/equipment";

interface EquipmentFilterBarProps {
  categories: EquipmentCategory[];
  onFilterChange: (searchTerm: string, featuredOnly: boolean) => void;
}

/**
 * EquipmentFilterBar Component
 * 
 * Best Practices:
 * - Immediate feedback on search input
 * - Clear filter indication
 * - Easy reset functionality
 * - Accessible filter controls
 * - Visual feedback on active filters
 */
export const EquipmentFilterBar = ({
  categories,
  onFilterChange,
}: EquipmentFilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange(value, featuredOnly);
  };

  const handleFeaturedToggle = () => {
    const newFeaturedValue = !featuredOnly;
    setFeaturedOnly(newFeaturedValue);
    onFilterChange(searchTerm, newFeaturedValue);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFeaturedOnly(false);
    onFilterChange("", false);
  };

  const totalItems = categories.reduce(
    (acc, cat) => acc + cat.itemCount,
    0
  );
  const featuredCount = categories.filter((cat) => cat.featured).length;

  return (
    <div className="w-full space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          aria-label="Search equipment categories"
          className="flex-1"
          placeholder="Search equipment categories..."
          type="search"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          startContent={<span className="text-default-400">🔍</span>}
          isClearable
          onClear={() => handleSearchChange("")}
        />

        <div className="flex gap-2">
          <Button
            color={featuredOnly ? "primary" : "default"}
            variant={featuredOnly ? "solid" : "bordered"}
            onPress={handleFeaturedToggle}
          >
            {featuredOnly ? "✓ " : ""}Featured Only
          </Button>

          {(searchTerm || featuredOnly) && (
            <Button color="danger" variant="light" onPress={handleReset}>
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters & Stats */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-small text-default-600">
          {categories.length} categories • {totalItems} total items
        </span>

        {searchTerm && (
          <Chip
            color="primary"
            size="sm"
            variant="flat"
            onClose={() => handleSearchChange("")}
          >
            Search: {searchTerm}
          </Chip>
        )}

        {featuredOnly && (
          <Chip
            color="primary"
            size="sm"
            variant="flat"
            onClose={handleFeaturedToggle}
          >
            Featured ({featuredCount})
          </Chip>
        )}
      </div>
    </div>
  );
};
