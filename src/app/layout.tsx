import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { ThemeProvider } from "@/provider/theme-provider";
import "./globals.css";
import { Navbar, NavigationHelper } from "@/components/custom";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Short Films",
  description: "Short Films Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(roboto.className, "scroller")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar className="sticky top-0 z-50 bg-background border-b" />
            {children}
            <NavigationHelper />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
