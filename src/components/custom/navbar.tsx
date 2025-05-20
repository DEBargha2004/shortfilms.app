"use client";

import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SideNavFullView } from "./side-nav";
import ProductLogo from "./product-logo";
import { SearchInput } from "./search-input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NotificationBell from "./notification-bell";
import { useGlobalAppStore } from "@/store/global-app-store";
import Link from "next/link";
import { hrefs } from "@/constants/hrefs";
import { usePathname } from "next/navigation";
import { HTMLProps, useMemo } from "react";
import { pagesWithoutSideNav } from "@/constants/pages";
import micromatch from "micromatch";
import { cn, getAcronym } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/provider/auth-provider";
import { toast } from "sonner";
import ModeToggle from "./mode-toggle";

export default function Navbar({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  const {
    isSideNavOpen,
    setIsSideNavOpen,
    setIsSidebarMinimized,
    isSidebarMinimized,
  } = useGlobalAppStore();
  const pathname = usePathname();

  const showOnlySideNavSheet = useMemo(() => {
    return pagesWithoutSideNav.some((page) =>
      micromatch.isMatch(pathname, page)
    );
  }, [pathname]);

  const { signout, user } = useAuth();
  const handleSignout = async () => {
    await signout({
      onError(error) {
        toast.error(error?.message || "Signout failed");
      },
      onSuccess(response) {
        toast.success(response?.message);
      },
    });
  };

  return (
    <div
      className={cn(
        "h-16 w-full md:px-4 px-2 flex justify-between items-center gap-2",
        className
      )}
      {...props}
    >
      <div className="flex justify-start items-center gap-2">
        <Button
          variant={"outline"}
          className={cn(
            showOnlySideNavSheet ? "hidden" : "px-1.5 h-3/4 md:block hidden"
          )}
          onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
        >
          <Menu className="h-5" />
        </Button>
        <Sheet open={isSideNavOpen} onOpenChange={setIsSideNavOpen}>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "px-1.5 h-3/4 ",
                showOnlySideNavSheet ? "block" : "md:hidden block"
              )}
            >
              <Menu className="h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-fit p-0 py-2">
            <SideNavFullView />
          </SheetContent>
        </Sheet>
        <Link href={hrefs.home}>
          <ProductLogo className="h-8 w-fit object-contain" />
        </Link>
      </div>
      <div className="w-2/5 shrink-0">
        <SearchInput />
      </div>
      <div className="flex justify-start items-center gap-3">
        {user && <NotificationBell count={23} />}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{getAcronym(user.name ?? "")}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="[&>div]:gap-2 [&>div>svg]:size-4"
            >
              <DropdownMenuItem onClick={handleSignout}>
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
