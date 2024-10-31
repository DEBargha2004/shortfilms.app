import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { ThemeProvider } from "@/provider/theme-provider";
import "./globals.css";
import { Navbar, NavigationHelper } from "@/components/custom";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/provider/auth-provider";

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
  post,
}: {
  children: React.ReactNode;
  post: React.ReactNode;
}) {
  return (
    <AuthProvider>
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
            <div className="h-fit">
              {children}
              {post}
            </div>
            <NavigationHelper />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
