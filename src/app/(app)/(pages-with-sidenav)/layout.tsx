import { SideNav } from "@/components/custom";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={cn(
        "flex md:flex-row flex-col-reverse justify-start items-start",
        "h-fit md:pl-4 pl-1 md:gap-4"
      )}
    >
      <SideNav />
      <section className="w-full">{children}</section>
    </main>
  );
}
