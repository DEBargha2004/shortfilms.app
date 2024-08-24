"use client";

import { postCreateSchema, PostCreateSchema } from "@/schema/post-create";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  UploadButton,
  UploadButtonDescription,
  UploadButtonTitle,
} from "../_components/upload-button";
import { Link2, Upload, Image as ImageIcon, Crop, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { ReactCropperElement } from "react-cropper";
import CropperComponent from "@/components/custom/cropper";
import {
  MultiSelect,
  MultiSelectItemProps,
} from "@/components/ui/multi-select";
import {
  generateVideoEmbedUrl,
  isValidVimeoUrl,
  isValidYoutubeUrl,
} from "@/functions/url-format";

const playlists: MultiSelectItemProps[] = [
  { label: "Playlist 1", value: "1" },
  { label: "Playlist 2", value: "2" },
  { label: "Playlist 3", value: "3" },
  { label: "Playlist 4", value: "4" },
];

const tags: MultiSelectItemProps[] = [
  { label: "Tag 1", value: "1" },
  { label: "Tag 2", value: "2" },
  { label: "Tag 3", value: "3" },
  { label: "Tag 4", value: "4" },
];

export default function Page() {
  const form = useForm<PostCreateSchema>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      isPaid: false,
      publishToSocialNetworks: false,
      playlist: [],
      tags: [],
    },
  });

  const [dialogState, setDialogState] = useState({
    thumbnail: false,
    videoLink: false,
    trailerLink: false,
  });

  const [links, setLinks] = useState({
    trailer: "",
    video: "",
  });

  const cropperRef = useRef<ReactCropperElement>(null);
  const processMedia = (file: File) => {
    if (!file) return;
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const videoDropzone = useDropzone({
    async onDrop(acceptedFiles, fileRejections, event) {
      const url = await processMedia(acceptedFiles[0]);
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
      const url = await processMedia(acceptedFiles[0]);
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

  const thumbnailDropzone = useDropzone({
    async onDrop(acceptedFiles, fileRejections, event) {
      const url = await processMedia(acceptedFiles[0]);
      if (url) {
        form.setValue("thumbnail", url);
      }
    },
    accept: {
      "images/*": [],
    },
    multiple: false,
  });

  const onSubmit = async (data: PostCreateSchema) => {
    console.log(data);
  };

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
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full flex-col sm:gap-4 sm:py-4">
        <header
          className="sm:flex hidden z-40 lg:h-14 items-center gap-4 border-b px-4 sm:h-auto 
        sm:border-0 sm:bg-darkAccent sm:px-6"
        >
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Post</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid flex-1 auto-rows-max gap-4 @container">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 @4xl:grid-cols-3 lg:gap-8"
              >
                <div className="grid auto-rows-max items-start gap-4 @4xl:col-span-2 @7xl:col-span-2 lg:gap-8">
                  <Card className="@container">
                    <CardContent className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={6} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  <Card className="@container">
                    <CardContent className="space-y-4 pt-4">
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
                                      <UploadButtonTitle>
                                        Embed
                                      </UploadButtonTitle>
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
                                        disabled={
                                          !isValidVimeoUrl(links.video) &&
                                          !isValidYoutubeUrl(links.video)
                                        }
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
                                <input
                                  type="file"
                                  {...videoDropzone.getInputProps()}
                                />
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
                                      <UploadButtonTitle>
                                        Embed
                                      </UploadButtonTitle>
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
                                        disabled={
                                          !isValidVimeoUrl(links.trailer) &&
                                          !isValidYoutubeUrl(links.trailer)
                                        }
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
                                <input
                                  type="file"
                                  {...trailerDropzone.getInputProps()}
                                />
                                <UploadButton
                                  {...trailerDropzone.getRootProps()}
                                >
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
                            src={generateVideoEmbedUrl(
                              form.watch("trailer.url")
                            )}
                            className="w-full aspect-video"
                          />
                        ) : (
                          <video
                            src={form.watch("trailer.url")}
                            className="w-full aspect-video"
                            controls
                          />
                        ))}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="isPaid"
                        render={({ field }) => (
                          <FormItem className="flex justify-start items-center gap-4 space-y-0">
                            <FormLabel>Paid</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="playlist"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Playlist</FormLabel>
                            <FormControl>
                              <MultiSelect
                                onValueChange={field.onChange}
                                options={playlists}
                                selectedValues={field.value}
                                placeholder="Select Playlists"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <MultiSelect
                                options={tags}
                                onValueChange={field.onChange}
                                selectedValues={field.value}
                                placeholder="Select Tags"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="grid @7xl:w-4/5 auto-rows-max items-start gap-4 lg:gap-8">
                  <Card>
                    <CardContent className="pt-4">
                      <input
                        type="file"
                        {...thumbnailDropzone.getInputProps()}
                      />
                      <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thumbnail</FormLabel>
                            <FormControl>
                              <div
                                className={cn(
                                  "w-full aspect-video bg-muted/50 flex justify-center items-center",
                                  thumbnailDropzone.isDragActive && "bg-muted"
                                )}
                                {...(field.value
                                  ? {}
                                  : thumbnailDropzone.getRootProps())}
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
                    </CardContent>
                    <CardFooter
                      className={cn(
                        "grid gap-2",
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
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <FormField
                        control={form.control}
                        name="publishToSocialNetworks"
                        render={({ field }) => (
                          <FormItem
                            className={cn(
                              "space-y-0",
                              "flex flex-row-reverse items-center justify-end gap-4"
                            )}
                          >
                            <FormLabel>
                              Publish to other social networks
                            </FormLabel>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button variant={"success"} className="w-full">
                        Publish
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}
