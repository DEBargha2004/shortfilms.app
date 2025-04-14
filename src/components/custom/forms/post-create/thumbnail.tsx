import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useFileReader from "@/hooks/use-file-reader";
import { cn } from "@/lib/utils";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { Crop, ImageIcon, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import CropperComponent from "../../cropper";
import { useRef, useState } from "react";
import { ReactCropperElement } from "react-cropper";

export default function Thumbnail({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  const [dialogState, setDialogState] = useState({
    thumbnail: false,
  });

  const { read } = useFileReader();
  const cropperRef = useRef<ReactCropperElement>(null);

  const thumbnailDropzone = useDropzone({
    async onDrop(acceptedFiles, fileRejections, event) {
      const url = await read(acceptedFiles[0]);
      if (url) {
        form.setValue("thumbnail", url);
      }
    },
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const removeThumbnail = () => {
    form.setValue("thumbnail", "");
  };

  const handleCrop = () => {
    if (!cropperRef.current) return;
    const url = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    form.setValue("thumbnail", url);

    setDialogState((prev) => ({
      ...prev,
      thumbnail: false,
    }));
  };
  return (
    <>
      <input type="file" {...thumbnailDropzone.getInputProps()} />
      <FormField
        control={form.control}
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
                {field.value ? (
                  <Image
                    src={field.value}
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
          form.watch("thumbnail") ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        <Button
          className="w-full space-x-2"
          type="button"
          {...thumbnailDropzone.getRootProps()}
        >
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </Button>
        {form.watch("thumbnail") ? (
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
                <CropperComponent
                  ref={cropperRef}
                  style={{
                    height: "100%",
                    aspectRatio: 16 / 9,
                  }}
                  className="object-contain cropper overflow-hidden"
                  aspectRatio={16 / 9}
                  src={form.watch("thumbnail")}
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
