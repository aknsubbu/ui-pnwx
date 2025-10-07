"use client";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import {
  Mail,
  Call,
  Document,
  LocationSharp,
  InformationCircle,
  Time,
  Card as CardIcon,
  Checkmark,
} from "react-ionicons";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-3">About & Contact</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Quick Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Phone */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <Call color="#10b981" width="24px" height="24px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground/60 mb-1">
                    Call Us
                  </h3>
                  <p className="text-lg font-bold truncate">503-667-3000</p>
                  <p className="text-xs text-foreground/50 mt-1">
                    Mon-Fri 9AM-5PM PST
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Toll Free */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <Call color="#3b82f6" width="24px" height="24px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground/60 mb-1">
                    Toll-Free
                  </h3>
                  <p className="text-lg font-bold truncate">800-827-9729</p>
                  <p className="text-xs text-foreground/50 mt-1">US & Canada</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Fax */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500/10 rounded-xl">
                  <Document color="#f97316" width="24px" height="24px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground/60 mb-1">
                    Fax 24/7
                  </h3>
                  <p className="text-lg font-bold truncate">503-666-8855</p>
                  <p className="text-xs text-foreground/50 mt-1">
                    Orders anytime
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Email */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-xl">
                  <Mail color="#a855f7" width="24px" height="24px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground/60 mb-1">
                    Email Sales
                  </h3>
                  <Button
                    as={Link}
                    href="mailto:sales@example.com"
                    size="sm"
                    color="secondary"
                    variant="flat"
                    className="mt-1 h-8"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Ordering Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ordering Requirements */}
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-2xl">
                    <Document color="#3b82f6" width="32px" height="32px" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">How to Order</h2>
                    <p className="text-foreground/70">
                      Multiple convenient ways to place your order
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* Standard Orders */}
                  <div className="bg-emerald-500/5 p-4 rounded-xl border-2 border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <Checkmark color="#10b981" width="20px" height="20px" />
                      <h3 className="font-bold text-emerald-600">
                        Standard Orders
                      </h3>
                    </div>
                    <div className="mb-2">
                      <p className="text-3xl font-bold text-emerald-500">$30</p>
                      <p className="text-sm text-foreground/60">
                        Minimum order
                      </p>
                    </div>
                    <p className="text-xs text-foreground/70">
                      For cash, credit card, and PayPal orders
                    </p>
                  </div>

                  {/* Purchase Orders */}
                  <div className="bg-orange-500/5 p-4 rounded-xl border-2 border-orange-500/20 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <CardIcon color="#f97316" width="20px" height="20px" />
                      <h3 className="font-bold text-orange-600">
                        Purchase Orders
                      </h3>
                    </div>
                    <div className="mb-2">
                      <p className="text-3xl font-bold text-orange-500">$500</p>
                      <p className="text-sm text-foreground/60">
                        Opening order minimum
                      </p>
                    </div>
                    <p className="text-xs text-foreground/70">
                      Credit approval required for new accounts
                    </p>
                  </div>
                </div>

                <Divider className="my-6" />

                {/* Payment Methods */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">
                    Accepted Payment Methods
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "PayPal",
                      "Visa",
                      "MasterCard",
                      "American Express",
                      "Discover",
                      "Purchase Orders",
                    ].map((method) => (
                      <Chip
                        key={method}
                        color="primary"
                        variant="flat"
                        size="lg"
                      >
                        {method}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* Download Form */}
                <Button
                  as={Link}
                  href="#"
                  color="primary"
                  size="lg"
                  className="w-full"
                  startContent={
                    <Document color="currentColor" width="20px" height="20px" />
                  }
                >
                  Download Order Form (PDF)
                </Button>
              </CardBody>
            </Card>

            {/* Important Information */}
            <Card className="shadow-lg border-l-4 border-l-amber-500">
              <CardBody className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl flex-shrink-0">
                    <InformationCircle
                      color="#f59e0b"
                      width="28px"
                      height="28px"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      Important Information
                    </h2>
                    <p className="text-sm text-foreground/70">
                      Please read before placing your order
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="bg-foreground/5 p-4 rounded-lg border border-foreground/10">
                    <p className="font-semibold mb-2">
                      📱 This Website is Our Catalog
                    </p>
                    <p className="text-foreground/70">
                      No printed catalog is available. Please check back
                      regularly as we update prices and products daily.
                    </p>
                  </div>

                  <div className="bg-foreground/5 p-4 rounded-lg border border-foreground/10">
                    <p className="font-semibold mb-2">💰 Price Accuracy</p>
                    <p className="text-foreground/70">
                      While we strive to keep all prices current, they are
                      subject to change without notice due to manufacturer
                      updates.
                    </p>
                  </div>

                  <div className="bg-foreground/5 p-4 rounded-lg border border-foreground/10">
                    <p className="font-semibold mb-2">⏰ Order Processing</p>
                    <p className="text-foreground/70">
                      Orders are processed during business hours (Mon-Fri
                      9AM-5PM PST). Fax orders accepted 24/7.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Contact & Location */}
          <div className="space-y-6">
            {/* Business Hours */}
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-xl">
                    <Time color="#3b82f6" width="24px" height="24px" />
                  </div>
                  <h3 className="text-xl font-bold">Business Hours</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-foreground/5 rounded-lg border border-foreground/10">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-blue-500 font-semibold">
                      9AM - 5PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-foreground/5 rounded-lg border border-foreground/10">
                    <span className="font-medium">Saturday - Sunday</span>
                    <span className="text-foreground/50">Closed</span>
                  </div>
                  <div className="p-3 bg-emerald-500/5 rounded-lg border-2 border-emerald-500/20">
                    <p className="text-xs text-emerald-600 font-medium">
                      📠 Fax orders accepted 24/7 at 503-666-8855
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Mailing Address */}
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-xl">
                    <LocationSharp color="#a855f7" width="24px" height="24px" />
                  </div>
                  <h3 className="text-xl font-bold">Mailing Address</h3>
                </div>
                <div className="bg-foreground/5 p-4 rounded-lg border border-foreground/10">
                  <p className="font-semibold text-lg mb-2">
                    Equipment Supply Co.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    P.O. Box 625
                    <br />
                    Gresham, OR 97030
                    <br />
                    United States
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Quick Links */}
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    as={Link}
                    href="mailto:sales@example.com"
                    variant="flat"
                    color="primary"
                    className="w-full justify-start"
                    startContent={
                      <Mail color="currentColor" width="18px" height="18px" />
                    }
                  >
                    Request a Quote
                  </Button>
                  <Button
                    as={Link}
                    href="#"
                    variant="flat"
                    color="secondary"
                    className="w-full justify-start"
                    startContent={
                      <Document
                        color="currentColor"
                        width="18px"
                        height="18px"
                      />
                    }
                  >
                    Download Catalog
                  </Button>
                  <Button
                    as={Link}
                    href="tel:5036673000"
                    variant="flat"
                    color="success"
                    className="w-full justify-start"
                    startContent={
                      <Call color="currentColor" width="18px" height="18px" />
                    }
                  >
                    Call Now
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
