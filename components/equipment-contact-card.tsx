"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import type { ContactInfo } from "@/types/equipment";

interface EquipmentContactCardProps {
  contactInfo: ContactInfo;
}

/**
 * EquipmentContactCard Component
 * 
 * Best Practices Applied:
 * - Clear call-to-action hierarchy
 * - Multiple contact methods for accessibility
 * - Semantic HTML for screen readers
 * - Visual grouping of related information
 * - Mobile-friendly layout with proper spacing
 */
export const EquipmentContactCard = ({
  contactInfo,
}: EquipmentContactCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-bold">Contact Us</h3>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-4">
        {/* Business Hours */}
        <div className="bg-primary-50 dark:bg-primary-950 p-3 rounded-lg">
          <p className="text-small font-semibold text-primary">
            Business Hours
          </p>
          <p className="text-small text-default-700">{contactInfo.hours}</p>
        </div>

        {/* Phone Contact */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">📞</span>
            <div>
              <p className="text-small font-semibold">Phone</p>
              <Link
                className="text-small"
                href={`tel:${contactInfo.phone.replace(/[^0-9]/g, "")}`}
              >
                {contactInfo.phone}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg">☎️</span>
            <div>
              <p className="text-small font-semibold">Toll-Free (US)</p>
              <Link
                className="text-small"
                href={`tel:${contactInfo.tollFree.replace(/[^0-9]/g, "")}`}
              >
                {contactInfo.tollFree}
              </Link>
            </div>
          </div>
        </div>

        <Divider />

        {/* Email & Fax */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">✉️</span>
            <div>
              <p className="text-small font-semibold">Email</p>
              <Link
                className="text-small"
                href={`mailto:${contactInfo.email}`}
              >
                {contactInfo.email}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg">📠</span>
            <div>
              <p className="text-small font-semibold">Fax (24/7)</p>
              <p className="text-small">{contactInfo.fax}</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* Address */}
        <div className="flex items-start gap-2">
          <span className="text-lg">📍</span>
          <div>
            <p className="text-small font-semibold">Address</p>
            <address className="text-small not-italic text-default-600">
              {contactInfo.address.street}
              <br />
              {contactInfo.address.city}, {contactInfo.address.state}{" "}
              {contactInfo.address.zip}
              <br />
              {contactInfo.address.country}
            </address>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            as={Link}
            color="primary"
            href={`mailto:${contactInfo.email}`}
            size="lg"
          >
            Email Sales Team
          </Button>
          <Button
            as={Link}
            color="default"
            href={`tel:${contactInfo.phone.replace(/[^0-9]/g, "")}`}
            size="lg"
            variant="bordered"
          >
            Call Now
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
