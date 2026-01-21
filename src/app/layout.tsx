import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { ThemeProvider } from "@/provider/theme-provider";
import "./globals.css";
import { NavigationHelper } from "@/components/custom";
import { cn } from "@/lib/utils";
import QueryProvider from "@/provider/query-provider";
import AuthProvider from "@/provider/auth-provider";
import { Toaster } from "@/components/ui/sonner";

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
          <AuthProvider>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <NavigationHelper />
                <Toaster />
              </ThemeProvider>
            </QueryProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
