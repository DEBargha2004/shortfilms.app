import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { TPostCreateSchema } from "@/schema/post-create";
import { Crop, ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import CropperComponent from "../../cropper";
import { useEffect, useRef, useState } from "react";
import { ReactCropperElement } from "react-cropper";
import { useFormContext, useWatch } from "react-hook-form";
import useFileUpload from "@/hooks/use-file-upload";
import { hrefs } from "@/constants/hrefs";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Thumbnail() {
  const [dialogState, setDialogState] = useState({
    thumbnail: false,
  });
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const { control, setValue } = useFormContext<TPostCreateSchema>();
  const cropperRef = useRef<ReactCropperElement>(null);
  const { upload, isUploading } = useFileUpload({
    requestPresigner: hrefs.api.presignedUrl.post.thumbnail.invoke,
  });
  const form = useFormContext<TPostCreateSchema>();
  const thumbnailPath = useWatch({
    control: form.control,
    name: "thumbnail",
  });

  const thumbnail = useWatch({
    control,
    name: "thumbnail",
  });
  const thumbnailDropzone = useDropzone({
    async onDrop(acceptedFiles, fileRejections, event) {
      upload(acceptedFiles[0]).then((v) => {
        setValue("thumbnail", v.path);
      });
    },
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const removeThumbnail = () => {
    setValue("thumbnail", "");
  };

  const handleCrop = () => {
    if (!cropperRef.current) return;
    const url = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    setValue("thumbnail", url);

    setDialogState((prev) => ({
      ...prev,
      thumbnail: false,
    }));
  };

  useEffect(() => {
    hrefs.api.signedUrl
      .invoke(thumbnailPath)
      .then((res) => setThumbnailUrl(res.data));
  }, [thumbnailPath]);
  return (
    <>
      <input type="file" {...thumbnailDropzone.getInputProps()} />
      <FormField
        control={control}
        name="thumbnail"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div
                className={cn(
                  "w-full aspect-video bg-muted/50 flex justify-center items-center",
                  thumbnailDropzone.isDragActive && "bg-muted"
                )}
                {...(field.value ? {} : thumbnailDropzone.getRootProps())}
              >
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt="thumbnail"
                    height={200}
                    width={400}
                    className="w-full aspect-video object-cover"
                  />
                ) : thumbnailDropzone.isDragActive ? (
                  <p>Drop Image</p>
                ) : (
                  <ImageIcon />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <section
        className={cn(
          "grid gap-2 mt-6",
          thumbnail ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        <Button
          className="w-full space-x-2"
          type="button"
          {...thumbnailDropzone.getRootProps()}
        >
          {isUploading ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </>
          )}
        </Button>
        {thumbnail ? (
          <>
            <Dialog
              open={dialogState.thumbnail}
              onOpenChange={(e) =>
                setDialogState((prev) => ({
                  ...prev,
                  thumbnail: e,
                }))
              }
            >
              <DialogTrigger asChild>
                <Button
                  className="w-full space-x-2"
                  type="button"
                  variant={"outline"}
                >
                  <Crop className="w-4 h-4" />
                  <span>Crop</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[800px] bg-card pb-0">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
                <CropperComponent
                  ref={cropperRef}
                  style={{
                    height: "100%",
                    aspectRatio: 16 / 9,
                  }}
                  className="object-contain cropper overflow-hidden"
                  aspectRatio={16 / 9}
                  src={thumbnail}
                  initialAspectRatio={16 / 9}
                  preview=".img-preview"
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />

                <div className="w-full p-3 grid place-content-center">
                  <Button
                    className="min-w-24"
                    variant={"outline"}
                    onClick={handleCrop}
                  >
                    <Crop className="h-4" />
                    <span>Crop</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant={"destructive"}
              type="button"
              className="w-full col-span-2 shrink-0 space-x-2"
              onClick={removeThumbnail}
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </Button>
          </>
        ) : null}
      </section>
    </>
  );
}
