"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isRendered, setIsRendered] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    setIsRendered(true);
  }, []);
  return (
    <Button
      size={"icon"}
      className={cn("rounded-full size-9 shrink-0")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isRendered ? isDark ? <Moon /> : <Sun /> : null}
    </Button>
  );
}
