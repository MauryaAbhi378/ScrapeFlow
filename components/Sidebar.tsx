"use client";

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  Menu,
  ShieldCheckIcon,
} from "lucide-react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import UserAvailableCreditsBadge from "./UserAvailableCreditsBadge";

function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/home",
      label: "Home",
      icon: HomeIcon,
    },
    {
      href: "/workflows",
      label: "Workflows",
      icon: Layers2Icon,
    },
    {
      href: "/credentials",
      label: "Credentials",
      icon: ShieldCheckIcon,
    },
    {
      href: "/billing",
      label: "Billing",
      icon: CoinsIcon,
    },
  ];

  return (
    <div className="hidden relative md:block min-w-70 max-w-70 h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b border-separate p-4">
        <Logo />
      </div>
      <div className="p-3 text-sm">
        <UserAvailableCreditsBadge />
      </div>
      <div className="flex flex-col gap-4 p-4">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.href;
          return (
            <Link key={route.href} href={route.href} className="w-full">
              <Button
                variant={isActive ? "emerald" : "emerald-ghost"}
                className="w-full justify-start text-base"
                asChild
              >
                <span>
                  <Icon className="mr-2" size={24} />
                  {route.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: HomeIcon,
    },
    {
      href: "/workflows",
      label: "Workflows",
      icon: Layers2Icon,
    },
    {
      href: "/credentials",
      label: "Credentials",
      icon: ShieldCheckIcon,
    },
    {
      href: "/billing",
      label: "Billing",
      icon: CoinsIcon,
    },
  ];
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2" aria-label="Open navigation menu">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-70 p-0 flex flex-col">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex items-center justify-between border-b border-separate p-4">
          <Logo fontSize="xl" iconSize={24} />
          <UserAvailableCreditsBadge />
        </div>
        <div className="flex flex-col gap-4 p-4 flex-1">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;
            return (
              <SheetClose asChild key={route.href}>
                <Link href={route.href} className="w-full">
                  <Button
                    variant={isActive ? "emerald" : "emerald-ghost"}
                    className="w-full justify-start text-base"
                    asChild
                  >
                    <span>
                      <Icon className="mr-2" size={24} />
                      {route.label}
                    </span>
                  </Button>
                </Link>
              </SheetClose>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
