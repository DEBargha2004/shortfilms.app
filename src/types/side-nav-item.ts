import { HTMLProps } from "react";
import { Icon, IconProps } from "./icon";
import { TUser } from "@/provider/auth-provider";

export type SideNavItem =
  | {
      id: string;
      type: "app-section-link";
      title: string;
      href: string;
      Icon: Icon;
      catchRoutes?: string[];
      canView: (role: TUser["role"]) => boolean;
    }
  | {
      id: string;
      type: "profile-section-link";
      title: string;
      href: string;
      url: string;
      catchRoutes?: string[];
      canView: (role: TUser["role"]) => boolean;
    }
  | {
      id: string;
      type: "app-section-element";
      href?: string;
      Element: React.FC<{ iconProps?: IconProps } & HTMLProps<HTMLDivElement>>;
      canView: (role: TUser["role"]) => boolean;
    }
  | {
      id: string;
      type: "app-section-item";
      title: string;
      Icon: Icon;
      canView: (role: TUser["role"]) => boolean;
    }
  | {
      type: "separator";
    };
