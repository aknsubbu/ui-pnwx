"use client";
import { title } from "@/components/primitives";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import {
  Mail,
  Call,
  Document,
  Time,
  Card as CardIcon,
  LocationSharp,
  InformationCircle,
} from "react-ionicons";

export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="w-full py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-3">
            About & Contact
          </h1>
          <p className="text-lg text-default-600">
            Get in touch with us for quotes, orders, and support
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {/* E-Mail Sales - Standard */}
          <Card className="shadow-lg rounded-3xl border-0 bg-gradient-to-br  hover:shadow-xl transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3  rounded-2xl">
                  <Mail color="#0070f0" width="28px" height="28px" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">E-Mail Sales</h2>
                  <p className="text-sm text-default-600 mb-4">
                    For quotes, delivery, and current prices
                  </p>
                  <Button
                    as={Link}
                    href="#"
                    color="primary"
                    variant="flat"
                    size="sm"
                    className="rounded-xl"
                  >
                    Send Email
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Telephone - Standard */}
          <Card className="shadow-lg rounded-3xl border-0 bg-gradient-to-br  hover:shadow-xl transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3  rounded-2xl">
                  <Call color="#10b981" width="28px" height="28px" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">Telephone</h2>
                  <p className="text-xs text-default-500 mb-2">
                    9am - 5pm Mon-Fri (Pacific)
                  </p>
                  <p className="text-lg font-bold text-foreground mb-1">
                    1-503-667-3000
                  </p>
                  <p className="text-sm text-default-600">
                    Toll-Free: 800-827-9729
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Mailing Address - Standard */}
          <Card className="shadow-lg rounded-3xl border-0 bg-gradient-to-br  hover:shadow-xl transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3  rounded-2xl">
                  <LocationSharp color="#a855f7" width="28px" height="28px" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-3">Mailing Address</h2>
                  <p className="text-sm font-medium text-default-700 leading-relaxed">
                    P.O. Box 625
                    <br />
                    Gresham, OR 97030
                    <br />
                    U.S.A.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Order Form - Wide */}
          <Card className="md:col-span-2 shadow-lg rounded-3xl border-0 bg-gradient-to-br  hover:shadow-xl transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3  rounded-2xl">
                  <Document color="#f97316" width="28px" height="28px" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">
                    Download Our Order Form
                  </h2>
                  <p className="text-sm text-default-600 mb-4">
                    Fax your order 24 hours a day:{" "}
                    <span className="font-semibold">1-503-666-8855</span>
                  </p>
                  <Button
                    as={Link}
                    href="#"
                    color="warning"
                    variant="flat"
                    size="sm"
                    className="rounded-xl"
                    startContent={
                      <Document
                        color="currentColor"
                        width="18px"
                        height="18px"
                      />
                    }
                  >
                    Download Form
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Payment Methods - Standard */}
          <Card className="shadow-lg rounded-3xl border-0 bg-gradient-to-br hover:shadow-xl transition-shadow">
            <CardBody className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3  rounded-2xl">
                    <CardIcon color="#ec4899" width="28px" height="28px" />
                  </div>
                  <h2 className="text-xl font-bold">Payment Methods</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="px-3 py-2  border border-default-200 rounded-xl text-center text-sm font-medium">
                    PayPal
                  </div>
                  <div className="px-3 py-2  border border-default-200 rounded-xl text-center text-sm font-medium">
                    Visa
                  </div>
                  <div className="px-3 py-2  border border-default-200 rounded-xl text-center text-sm font-medium">
                    MasterCard
                  </div>
                  <div className="px-3 py-2  border border-default-200 rounded-xl text-center text-sm font-medium">
                    Amex
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Important Notice - Full Width */}
          <Card className="lg:col-span-3 shadow-lg rounded-3xl border-0 bg-gradient-to-br  hover:shadow-xl transition-shadow border-l-4 border-l-yellow-400">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3  rounded-2xl flex-shrink-0">
                  <InformationCircle
                    color="#eab308"
                    width="28px"
                    height="28px"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-3">
                    Important Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-default-700">
                    <div>
                      <p className="mb-2">
                        <span className="font-semibold">
                          This web site is our catalog, no printed catalog is
                          available.
                        </span>{" "}
                        Please keep checking back, changes to this site are made
                        daily.
                      </p>
                      <p>
                        Every effort is made on our part to keep all posted
                        prices up to date, however we cannot guarantee the
                        accuracy due to notification delays by the
                        manufacturers.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2">
                        Purchase Orders accepted only upon approval of credit -
                        Min. $500 opening order for new open CHARGE accounts.
                      </p>
                      <p className="font-semibold">
                        All other orders (Cash, Credit Card, etc) subject only
                        to a $30 product minimum order!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
