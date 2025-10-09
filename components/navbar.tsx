"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import {
  XRayIcon,
  UltrasoundIcon,
  MRIIcon,
  CardiologyIcon,
  OrthopedicIcon,
  RadiologyIcon,
  EmergencyIcon,
  CTScanIcon,
  ChevronDownIcon,
} from "@/components/icons";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

export const Navbar = () => {
  const productIcons = {
    equipment: <XRayIcon className="text-primary" />,
    accessories: <UltrasoundIcon className="text-secondary" />,
    supplies: <MRIIcon className="text-success" />,
    parts: <CTScanIcon className="text-warning" />,
  };

  const solutionIcons = {
    cardiology: <CardiologyIcon className="text-danger" />,
    orthopedic: <OrthopedicIcon className="text-primary" />,
    radiology: <RadiologyIcon className="text-warning" />,
    emergency: <EmergencyIcon className="text-success" />,
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">PNWX</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2 items-center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              {item.hasDropdown ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                      endContent={<ChevronDownIcon />}
                      radius="sm"
                      variant="light"
                    >
                      {item.label}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label={`${item.label} menu`}
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    {item.label === "Products" ? (
                      <>
                        <DropdownItem
                          key="equipment"
                          description="X-Ray/Radiology/Medical Equipment Main Directory "
                          startContent={productIcons.equipment}
                          href="/products/equipment"
                        >
                          Equipment
                        </DropdownItem>
                        <DropdownItem
                          key="accessories"
                          description="X-Ray/Radiology Accessories Main Directory"
                          startContent={productIcons.accessories}
                          href="/products/accessories"
                        >
                          Accessories
                        </DropdownItem>
                        <DropdownItem
                          key="supplies"
                          description="X-Ray Consumable Supplies"
                          startContent={productIcons.supplies}
                          href="/products/supplies"
                        >
                          Supplies
                        </DropdownItem>
                        <DropdownItem
                          key="parts"
                          description="X-Ray Parts and Components"
                          startContent={productIcons.parts}
                          href="/products/parts"
                        >
                          Parts
                        </DropdownItem>
                      </>
                    ) : (
                      <>
                        <DropdownItem
                          key="cardiology"
                          description="Comprehensive cardiac imaging solutions"
                          startContent={solutionIcons.cardiology}
                          href="/solutions/cardiology"
                        >
                          Cardiology
                        </DropdownItem>
                        <DropdownItem
                          key="orthopedic"
                          description="Bone and joint imaging systems"
                          startContent={solutionIcons.orthopedic}
                          href="/solutions/orthopedic"
                        >
                          Orthopedic
                        </DropdownItem>
                        <DropdownItem
                          key="radiology"
                          description="Complete radiology department solutions"
                          startContent={solutionIcons.radiology}
                          href="/solutions/radiology"
                        >
                          Radiology
                        </DropdownItem>
                        <DropdownItem
                          key="emergency"
                          description="Fast, portable emergency imaging"
                          startContent={solutionIcons.emergency}
                          href="/solutions/emergency"
                        >
                          Emergency Care
                        </DropdownItem>
                      </>
                    )}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              )}
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link> */}
          <ThemeSwitch />
        </NavbarItem>

        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
