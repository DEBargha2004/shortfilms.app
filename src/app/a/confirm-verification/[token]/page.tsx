"use client";

import { verifyUser } from "@/actions/auth";
import { cn, isActionError } from "@/lib/utils";
import Center from "../../_components/center";
import { CircleCheck, Info } from "lucide-react";
import CloseWindowButton from "../../_components/close-window-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { hrefs } from "@/constants/hrefs";
import { useEffect, useState } from "react";

const className = {
  dimension: "lg:w-[500px] md:w-[400px] sm:w-[450px] w-[calc(100svw-10px)]",
  "card-destructive": cn(
    "w-full p-4 flex justify-start items-center gap-10",
    "bg-destructive/30 border border-destructive rounded",
  ),
  "card-success": cn(
    "w-full p-4 flex justify-start items-center gap-10",
    "bg-success/30 border border-success rounded",
  ),
};

export default function Page({
  params: { token },
}: {
  params: { token: string };
}) {
  const [res, setRes] = useState<{
    result: Awaited<ReturnType<typeof verifyUser>>;
    fetching: boolean;
  }>({ fetching: true, result: undefined });

  useEffect(() => {
    verifyUser(token).then((resp) => {
      setRes({ fetching: false, result: resp });
    });
  }, []);

  if (res.fetching) {
    return;
  }

  if (isActionError(res)) {
    return (
      <Center>
        <div
          className={cn(
            className["card-destructive"],
            className["dimension"],
            "justify-center",
          )}
        >
          <p>Something went wrong, please try again</p>
        </div>
      </Center>
    );
  }

  if (!res) {
    return (
      <Center className="flex-col gap-4">
        <div className={cn(className["dimension"], "space-y-4")}>
          <div className={className["card-destructive"]}>
            <Info className="h-5 w-5" />
            <p>Invalid or expired token</p>
          </div>
          <CloseWindowButton>Close</CloseWindowButton>
        </div>
      </Center>
    );
  }

  return (
    <Center className="flex-col gap-4">
      <div className={cn(className["dimension"], "space-y-4")}>
        <div className={className["card-success"]}>
          <CircleCheck className="h-5 w-5" />
          <p>Successfully verified email address.</p>
        </div>
        <Link href={hrefs.createProfile} className="inline-block w-full">
          <Button className="w-full" variant={"outline"}>
            Complete profile
          </Button>
        </Link>
      </div>
    </Center>
  );
}
