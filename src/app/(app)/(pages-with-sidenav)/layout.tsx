"use client";

import { useEffect, useState } from "react";
import { SideNav } from "@/components/custom";
import { cn } from "@/lib/utils";

function SafeHydrate({
  children,
  render,
}: {
  children?: React.ReactNode;
  render?: boolean;
}) {
  return <>{render ? children : null}</>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <SafeHydrate render={render}>
      <main
        className={cn(
          "flex md:flex-row flex-col-reverse justify-start items-start",
          "h-fit md:pl-4 pl-1 md:gap-4",
        )}
      >
        <SideNav />
        <section className="w-full">{children}</section>
      </main>
    </SafeHydrate>
  );
}
