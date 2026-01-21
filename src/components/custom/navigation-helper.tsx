"use client";

import { useGlobalAppStore } from "@/store/global-app-store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePrevious, useWindowSize } from "@uidotdev/usehooks";

export default function NavigationHelper() {
  const { setIsSideNavOpen, setIsSidebarMinimized, isSidebarMinimized } =
    useGlobalAppStore();
  const windowDimension = useWindowSize();
  const previousWindowDimension = usePrevious(windowDimension);
  const pathname = usePathname();

  useEffect(() => {
    setIsSideNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (
      windowDimension?.width! > previousWindowDimension?.width! &&
      windowDimension?.width! >= 1024 &&
      windowDimension?.width! <= 1080
    ) {
      console.log("here increase");
      setIsSidebarMinimized(false);
    }
    if (
      windowDimension?.width! < previousWindowDimension?.width! &&
      windowDimension?.width! >= 1024 &&
      windowDimension?.width! <= 1080
    ) {
      console.log("here2 decrease");
      setIsSidebarMinimized(true);
    }
  }, [windowDimension, previousWindowDimension]);

  // useEffect(() => {
  //   setIsSidebarMinimized(true);
  // }, []);

  useEffect(() => {
    localStorage.setItem("isSidebarMinimized", String(isSidebarMinimized));
    console.log("isSidebarMinimized", isSidebarMinimized);
  }, [isSidebarMinimized]);

  return null;
}
