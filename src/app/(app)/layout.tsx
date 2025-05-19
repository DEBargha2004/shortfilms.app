import { Navbar } from "@/components/custom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh h-fit">
      <Navbar className="sticky top-0 z-50 bg-background border-b" />
      {children}
    </main>
  );
}
