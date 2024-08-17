"use client";

import { useEffect, useState } from "react";
import { SideNav } from "@/components/custom";

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
      <main className="flex md:flex-row flex-col-reverse justify-start items-start h-full md:pl-4 pl-1 md:gap-4">
        <SideNav className="md:h-full h-16 md:w-fit w-full shrink-0" />
        <section className="md:h-full h-[calc(100%-64px)] overflow-y-auto scroller w-full">
          {children}
        </section>
      </main>
    </SafeHydrate>
  );
}
