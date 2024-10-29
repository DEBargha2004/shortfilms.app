"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CloseWindowButton({ children, ...props }: ButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => router.back()}
      {...props}
    >
      {children}
    </Button>
  );
}
