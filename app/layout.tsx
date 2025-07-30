import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Divider } from "@heroui/divider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className=" text-white py-12 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">MedSource</h3>
                    <p className="text-default-400 mb-4">
                      Your trusted partner in medical imaging solutions for over
                      20 years.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Products</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Equipment
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Accessories
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Supplies
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Parts
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Solutions</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Radiology
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Cardiology
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Orthopedics
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Emergency Care
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Support</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-default-400 hover:text-white"
                        >
                          Terms of Service
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <Divider className="my-8 bg-default-700" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-default-400">
                    © 2024 MedSource. All rights reserved.
                  </p>
                  <div className="flex gap-6 mt-4 md:mt-0">
                    <Link
                      href="#"
                      className="text-default-400 hover:text-white text-sm"
                    >
                      About Us
                    </Link>
                    <Link
                      href="#"
                      className="text-default-400 hover:text-white text-sm"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="#"
                      className="text-default-400 hover:text-white text-sm"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="#"
                      className="text-default-400 hover:text-white text-sm"
                    >
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
