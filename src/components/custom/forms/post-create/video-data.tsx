import {
  UploadButton,
  UploadButtonDescription,
  UploadButtonTitle,
} from "@/app/(app)/(pages-with-sidenav)/content/_components/upload-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateVideoEmbedUrl, isValidVideoUrl } from "@/functions/url-format";
import useFileReader from "@/hooks/use-file-reader";
import { cn } from "@/lib/utils";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { Link2, Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function VideoData({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  const [links, setLinks] = useState({
    trailer: "",
    video: "",
  });
  const [dialogState, setDialogState] = useState({
    videoLink: false,
    trailerLink: false,
  });
  const { read } = useFileReader();

  const videoDropzone = useDropzone({
    async onDrop(acceptedFiles, fileRejections, event) {
      const url = await read(acceptedFiles[0]);
      if (url) {
        form.setValue("video", {
          type: "custom",
          url,
        });
      }
    },
    accept: {
      "video/*": [],
    },
    multiple: false,
  });

  const trailerDropzone = useDropzone({
    async onDrop(acceptedFiles, fileRejections, event) {
      const url = await read(acceptedFiles[0]);
      if (url) {
        form.setValue("trailer", {
          type: "custom",
          url,
        });
      }
    },
    accept: {
      "video/*": [],
    },
    multiple: false,
  });

  return (
    <>
      <FormField
        control={form.control}
        name="video"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Video</FormLabel>
            <FormControl>
              <div
                className={cn(
                  "grid @lg:grid-cols-2 p-4 rounded border-2 border-dashed",
                  "divide-y @lg:divide-y-0 @lg:divide-x"
                )}
              >
                <Dialog
                  open={dialogState.videoLink}
                  onOpenChange={(e) =>
                    setDialogState((prev) => ({
                      ...prev,
                      videoLink: e,
                    }))
                  }
                >
                  <DialogTrigger asChild>
                    <UploadButton>
                      <Link2 className="w-5 h-5 mb-3" />
                      <UploadButtonTitle>Embed</UploadButtonTitle>
                      <UploadButtonDescription>
                        Paste a YouTube or Vimeo link
                      </UploadButtonDescription>
                    </UploadButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Embed</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Paste a YouTube or Vimeo link
                    </DialogDescription>
                    <Input
                      value={links.video}
                      onChange={(e) =>
                        setLinks((prev) => ({
                          ...prev,
                          video: e.target.value,
                        }))
                      }
                    />
                    <DialogFooter>
                      <Button
                        type="button"
                        disabled={!isValidVideoUrl(links.video)}
                        onClick={() => {
                          form.setValue("video", {
                            type: "link",
                            url: links.video,
                          });

                          setDialogState((prev) => ({
                            ...prev,
                            videoLink: false,
                          }));
                        }}
                      >
                        Embed
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <input type="file" {...videoDropzone.getInputProps()} />
                <UploadButton {...videoDropzone.getRootProps()}>
                  <Upload className="h-5 w-5 mb-3" />
                  <UploadButtonTitle>Upload</UploadButtonTitle>
                  <UploadButtonDescription>
                    Upload a video
                  </UploadButtonDescription>
                </UploadButton>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("video.url") &&
        (form.watch("video.type") === "link" ? (
          <iframe
            src={generateVideoEmbedUrl(form.watch("video.url"))}
            className="w-full aspect-video"
          />
        ) : (
          <video
            src={form.watch("video.url")}
            className="w-full aspect-video"
            controls
          />
        ))}

      <FormField
        control={form.control}
        name="trailer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trailer</FormLabel>
            <FormControl>
              <div
                className={cn(
                  "grid @lg:grid-cols-2 p-4 rounded border-2 border-dashed",
                  "divide-y @lg:divide-y-0 @lg:divide-x"
                )}
              >
                <Dialog
                  open={dialogState.trailerLink}
                  onOpenChange={(e) =>
                    setDialogState((prev) => ({
                      ...prev,
                      trailerLink: e,
                    }))
                  }
                >
                  <DialogTrigger asChild>
                    <UploadButton>
                      <Link2 className="w-5 h-5 mb-3" />
                      <UploadButtonTitle>Embed</UploadButtonTitle>
                      <UploadButtonDescription>
                        Paste a YouTube or Vimeo link
                      </UploadButtonDescription>
                    </UploadButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Embed</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Paste a YouTube or Vimeo link
                    </DialogDescription>
                    <Input
                      value={links.trailer}
                      onChange={(e) =>
                        setLinks((prev) => ({
                          ...prev,
                          trailer: e.target.value,
                        }))
                      }
                    />
                    <DialogFooter>
                      <Button
                        type="button"
                        disabled={!isValidVideoUrl(links.trailer)}
                        onClick={() => {
                          form.setValue("trailer", {
                            type: "link",
                            url: links.trailer,
                          });

                          setDialogState((prev) => ({
                            ...prev,
                            trailerLink: false,
                          }));
                        }}
                      >
                        Embed
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <input type="file" {...trailerDropzone.getInputProps()} />
                <UploadButton {...trailerDropzone.getRootProps()}>
                  <Upload className="h-5 w-5 mb-3" />
                  <UploadButtonTitle>Upload</UploadButtonTitle>
                  <UploadButtonDescription>
                    Upload a video
                  </UploadButtonDescription>
                </UploadButton>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("trailer.url") &&
        (form.watch("trailer.type") === "link" ? (
          <iframe
            src={generateVideoEmbedUrl(form.watch("trailer.url"))}
            className="w-full aspect-video"
          />
        ) : (
          <video
            src={form.watch("trailer.url")}
            className="w-full aspect-video"
            controls
          />
        ))}
    </>
  );
}
