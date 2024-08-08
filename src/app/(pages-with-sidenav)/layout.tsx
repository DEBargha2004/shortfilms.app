import { SideNav } from "@/components/custom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex md:flex-row flex-col-reverse justify-start items-start h-full md:pl-4 pl-1 md:gap-4">
      <SideNav className="shrink-0 " />
      {children}
    </main>
  );
}
