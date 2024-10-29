import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export default function FormWrapper({
  children,
  className,
  heading,
  ...props
}: HTMLProps<HTMLDivElement> & { heading?: string }) {
  return (
    <Card
      className={cn(
        "lg:w-[500px] md:w-[400px] sm:w-[450px] w-[calc(100svw-10px)]",
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
