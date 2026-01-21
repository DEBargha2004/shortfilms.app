import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SafeRemove from "../../safe-remove";
import { Loader2, X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { TPostCreateSchema } from "@/schema/post-create";
import { useState } from "react";
import { z } from "zod";
import { tryCatch } from "@/lib/utils";
import { hrefs } from "@/constants/hrefs";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

type SiteMeta = {
  title: string;
  url: string;
  description?: string;
  image?: string;
};

export default function Press() {
  const form = useFormContext<TPostCreateSchema>();
  const press = useWatch({
    control: form.control,
    name: "press",
  });
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { error } = z.string().url().safeParse(url);
  const isValidUrl = !error;

  const canRequest = !isLoading && url && isValidUrl;

  const handleFetchSite = async () => {
    if (!canRequest) return;
    setIsLoading(true);
    const [res, err] = await tryCatch<AxiosResponse<SiteMeta>>(
      hrefs.api.siteMeta.fetch.action(hrefs.api.siteMeta.fetch.url(url))
    );
    setIsLoading(false);

    if (err) {
      return toast.error(err.message);
    }

    form.setValue("press", [
      ...(form.getValues("press") ?? []),
      {
        title: res!.data.title,
        url: res!.data.url,
        description: res!.data.description,
        logo: res!.data.image,
      },
    ]);

    setUrl("");
  };

  const handleRemoveMetadata = (idx: number) => {
    form.setValue(
      "press",
      form.getValues("press").filter((_, _idx) => idx !== _idx)
    );
  };

  return (
    <>
      <div className="space-y-1">
        <Label>Press Link</Label>
        <div className="flex justify-between items-center gap-2">
          <Input
            placeholder="https://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            variant={"secondary"}
            type="button"
            onClick={handleFetchSite}
            disabled={!canRequest}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Add"}
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-4">
        {press?.map((item, i) => (
          <div key={i} className="flex justify-start items-center gap-6">
            <section className="h-28 aspect-square border shrink-0">
              {item.logo && (
                <img src={item.logo} className="size-full object-cover" />
              )}
            </section>
            <section className="w-4/5 flex flex-col justify-center items-start gap-1">
              <h3 className="text-sm text-muted-foreground hover:underline">
                <a href={item.url} target="_blank">
                  {item.url}
                </a>
              </h3>
              <h1 className="font-semibold text-lg">{item.title}</h1>
              <h2 className="line-clamp-2 text-muted-foreground">
                {item.description}
              </h2>
            </section>
            <SafeRemove
              action={() => {
                handleRemoveMetadata(i);
              }}
            >
              <Button
                type="button"
                variant={"light_ghost"}
                size={"icon"}
                className="ml-auto"
              >
                <X size={16} />
              </Button>
            </SafeRemove>
          </div>
        ))}
      </div>
    </>
  );
}
