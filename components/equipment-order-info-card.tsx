"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import type { OrderingInfo } from "@/types/equipment";

interface EquipmentOrderInfoCardProps {
  orderingInfo: OrderingInfo;
}

/**
 * EquipmentOrderInfoCard Component
 * 
 * Principles Applied:
 * - Recognition over recall (all ordering info visible)
 * - Error prevention (clear requirements stated upfront)
 * - User control (multiple ordering options)
 * - Consistency (matches payment info patterns)
 */
export const EquipmentOrderInfoCard = ({
  orderingInfo,
}: EquipmentOrderInfoCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-bold">Ordering Information</h3>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-4">
        {/* Minimum Order Requirements */}
        <div className="space-y-3">
          <div className="bg-success-50 dark:bg-success-950 p-3 rounded-lg">
            <p className="text-small font-semibold text-success-700 dark:text-success-300">
              Standard Minimum Order
            </p>
            <p className="text-2xl font-bold text-success-800 dark:text-success-200">
              ${orderingInfo.minimumOrder}
            </p>
            <p className="text-tiny text-success-600 dark:text-success-400">
              For cash, credit card orders
            </p>
          </div>

          <div className="bg-warning-50 dark:bg-warning-950 p-3 rounded-lg">
            <p className="text-small font-semibold text-warning-700 dark:text-warning-300">
              Purchase Order Minimum
            </p>
            <p className="text-2xl font-bold text-warning-800 dark:text-warning-200">
              ${orderingInfo.poMinimumOrder}
            </p>
            <p className="text-tiny text-warning-600 dark:text-warning-400">
              Opening order for new charge accounts
            </p>
          </div>
        </div>

        <Divider />

        {/* Accepted Payment Methods */}
        <div>
          <p className="text-small font-semibold mb-2">
            Accepted Payment Methods
          </p>
          <div className="flex flex-wrap gap-2">
            {orderingInfo.acceptedPayments.map((payment) => (
              <Chip key={payment} color="primary" size="sm" variant="flat">
                {payment}
              </Chip>
            ))}
          </div>
          {orderingInfo.creditApprovalRequired && (
            <p className="text-tiny text-default-500 mt-2">
              * Purchase Orders accepted upon credit approval
            </p>
          )}
        </div>

        <Divider />

        {/* Download Order Form */}
        <div className="space-y-2">
          <p className="text-small font-semibold">Order Form</p>
          <p className="text-tiny text-default-600">
            Download our order form and fax it 24/7 to complete your purchase.
          </p>
          <Button
            as={Link}
            className="w-full"
            color="primary"
            href={orderingInfo.orderFormUrl}
            startContent={<span>📄</span>}
            variant="flat"
          >
            Download Order Form (PDF)
          </Button>
        </div>

        {/* Important Notes */}
        <div className="bg-default-100 dark:bg-default-50 p-3 rounded-lg">
          <p className="text-tiny font-semibold mb-1">Important Notes:</p>
          <ul className="text-tiny text-default-600 space-y-1 list-disc list-inside">
            <li>All prices subject to change without notice</li>
            <li>Credit approval required for new accounts</li>
            <li>Orders processed during business hours</li>
            <li>Fax orders accepted 24/7</li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};
