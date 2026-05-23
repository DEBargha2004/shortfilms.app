import { cn } from "@/lib/utils";
import { SideNavItem } from "@/types/side-nav-item";
import {
  Boxes,
  CirclePlus,
  Clapperboard,
  Compass,
  Film,
  Home,
  ListVideo,
  ShieldCheck,
} from "lucide-react";
import { hrefs } from "./hrefs";

export const bottomNavMiniViewItems: SideNavItem[] = [
  // {
  //   type: "app-section-link",
  //   title: "Home",
  //   href: hrefs.home,
  //   Icon: Home,
  // },
  {
    id: "content",
    type: "app-section-link",
    title: "Content",
    href: hrefs.content,
    Icon: Clapperboard,
    canView: () => true,
  },
  {
    id: "explore",
    type: "app-section-link",
    title: "Explore",
    href: hrefs.explore,
    Icon: Compass,
    canView: () => true,
  },
  {
    id: "create",
    type: "app-section-element",
    Element: ({ className, iconProps, ...props }) => (
      <div
        className={cn("w-full grid place-content-center", className)}
        {...props}
      >
        <CirclePlus
          className={cn("w-10 h-10 font-extralight", iconProps?.className)}
          {...iconProps}
        />
      </div>
    ),
    canView: () => true,
  },
  {
    id: "subscriptions",
    type: "app-section-link",
    title: "Subscriptions",
    href: hrefs.subscriptions,
    Icon: ListVideo,
    canView: () => true,
  },
  {
    id: "library",
    type: "app-section-link",
    title: "Library",
    href: hrefs.library,
    Icon: Film,
    canView: () => true,
  },
];

export const sideNavMiniViewItems: SideNavItem[] = [
  {
    id: "home",
    type: "app-section-link",
    title: "Home",
    href: hrefs.home,
    Icon: Home,
    canView: () => true,
  },
  {
    id: "content",
    type: "app-section-link",
    title: "Content",
    href: hrefs.content,
    Icon: Clapperboard,
    canView: () => true,
  },
  {
    id: "explore",
    type: "app-section-link",
    title: "Explore",
    href: hrefs.explore,
    Icon: Compass,
    canView: () => true,
  },
  {
    id: "library",
    type: "app-section-link",
    title: "Library",
    href: hrefs.library,
    Icon: Film,
    canView: () => true,
  },
];

export const sideNavFullViewItems: SideNavItem[] = [
  {
    id: "home",
    type: "app-section-link",
    title: "Home",
    href: hrefs.home,
    Icon: Home,
    canView: () => true,
  },
  {
    id: "content",
    type: "app-section-link",
    title: "Content",
    href: hrefs.content,
    Icon: Clapperboard,
    canView: () => true,
  },
  {
    id: "genres",
    type: "app-section-link",
    title: "Genres",
    href: hrefs.genres,
    Icon: Boxes,
    canView: (role: string) => role === "admin",
  },
  {
    id: "techniques",
    type: "app-section-link",
    title: "Techniques",
    href: hrefs.techniques,
    Icon: Boxes,
    canView: (role: string) => role === "admin",
  },
  {
    id: "verification",
    type: "app-section-link",
    title: "Verification",
    href: hrefs.verification,
    Icon: ShieldCheck,
    canView: (role: string) => role === "admin",
  },
  {
    id: "shorts",
    type: "app-section-link",
    title: "Shorts",
    href: hrefs.shorts,
    Icon: Clapperboard,
    canView: () => true,
  },
  {
    id: "subscriptions",
    type: "app-section-link",
    title: "Subscriptions",
    href: hrefs.subscriptions,
    Icon: ListVideo,
    canView: () => true,
  },
  {
    type: "separator",
  },
];
