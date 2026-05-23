import {
  UploadButton,
  UploadButtonDescription,
  UploadButtonTitle,
} from "@/app/(app)/(pages-with-sidenav)/content/_components/upload-button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoUploadType, videoUploadTypes } from "@/constants/general";
import { hrefs } from "@/constants/hrefs";
import useFileReader from "@/hooks/use-file-reader";
import useVideoUpload from "@/hooks/use-video-upload";
import { cn } from "@/lib/utils";
import { TPostCreateSchema } from "@/schema/post-create";
import { CheckCircle2, Link2, Loader2, Upload } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext, useWatch } from "react-hook-form";

export default function VideoData() {
  const { control, setValue } = useFormContext<TPostCreateSchema>();
  const video = useWatch({
    control: control,
    name: "video",
  });
  const trailer = useWatch({
    control: control,
    name: "trailer",
  });
  const {
    upload: uploadVideoBody,
    uploadPercentage: videoUploadPercentage,
    uploadState: videoUploadState,
  } = useVideoUpload();

  const {
    upload: uploadVideoTrailer,
    uploadPercentage: videoTrailerUploadPercentage,
    uploadState: videoTrailerUploadState,
  } = useVideoUpload();

  const videoDropzone = useDropzone({
    async onDrop(acceptedFiles, fileRejections, event) {
      if (acceptedFiles.length) {
        const info = await uploadVideoBody(
          acceptedFiles[0],
          hrefs.api.presignedUrl.post.shortfilm,
        );
        if (info)
          setValue("video", {
            type: "file",
            path: info.videoId,
            libraryId: info.libraryId,
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
      if (acceptedFiles.length) {
        const info = await uploadVideoTrailer(
          acceptedFiles[0],
          hrefs.api.presignedUrl.post.trailer,
        );
        if (info)
          setValue("trailer", {
            type: "file",
            path: info.videoId,
            libraryId: info.libraryId,
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
        control={control}
        name="video.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Upload Type</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Upload Type" />
                </SelectTrigger>
                <SelectContent>
                  {videoUploadTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {(video!.type as VideoUploadType) === "link" && (
        <FormField
          control={control}
          name="video.href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://.." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {(video!.type as VideoUploadType) === "drive" && (
        <FormField
          control={control}
          name="video.href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Drive Link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://.." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {(video!.type as VideoUploadType) === "file" && (
        <FormField
          control={control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <div className="border-2 rounded-lg border-dashed">
                  {videoUploadState.isUploading && (
                    <UploadButton className="min-h-28 p-0 gap-4 justify-center ">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <p className="text-sm text-muted-foreground">
                        Uploading {videoUploadPercentage}%
                      </p>
                    </UploadButton>
                  )}
                  {videoUploadState.isUploaded && (
                    <UploadButton className="min-h-28 p-0 gap-4 justify-center">
                      <CheckCircle2 className="text-success" />
                      <p className="text-sm text-muted-foreground">
                        Video Uploaded Successfully
                      </p>
                    </UploadButton>
                  )}
                  {!videoUploadState.hasUploadStarted && (
                    <>
                      <input type="file" {...videoDropzone.getInputProps()} />
                      <UploadButton {...videoDropzone.getRootProps()}>
                        <Upload className="h-5 w-5 mb-3" />
                        <UploadButtonTitle>Upload</UploadButtonTitle>
                        <UploadButtonDescription>
                          Upload a video
                        </UploadButtonDescription>
                      </UploadButton>
                    </>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {video.path && video.libraryId && (
        <VideoPreview path={video.path} libraryId={video.libraryId} />
      )}

      {video.href && video.type === "link" && (
        <YoutubePreview url={video.href ?? ""} />
      )}

      <h2 className="text-lg pt-6 font-medium">Trailer</h2>
      <FormField
        control={control}
        name="trailer.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Upload Type</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Upload Type" />
                </SelectTrigger>
                <SelectContent>
                  {videoUploadTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {(trailer!.type as VideoUploadType) === "link" && (
        <FormField
          control={control}
          name="trailer.href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://.." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {(trailer!.type as VideoUploadType) === "drive" && (
        <FormField
          control={control}
          name="trailer.href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Drive Link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://.." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {(trailer!.type as VideoUploadType) === "file" && (
        <FormField
          control={control}
          name="trailer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <div className="border-2 rounded-lg border-dashed">
                  {videoTrailerUploadState.isUploading && (
                    <UploadButton className="min-h-28 p-0 gap-4 justify-center ">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <p className="text-sm text-muted-foreground">
                        Uploading {videoTrailerUploadPercentage}%
                      </p>
                    </UploadButton>
                  )}
                  {videoTrailerUploadState.isUploaded && (
                    <UploadButton className="min-h-28 p-0 gap-4 justify-center">
                      <CheckCircle2 className="text-success" />
                      <p className="text-sm text-muted-foreground">
                        Video Uploaded Successfully
                      </p>
                    </UploadButton>
                  )}
                  {!videoTrailerUploadState.hasUploadStarted && (
                    <>
                      <input type="file" {...trailerDropzone.getInputProps()} />
                      <UploadButton {...trailerDropzone.getRootProps()}>
                        <Upload className="h-5 w-5 mb-3" />
                        <UploadButtonTitle>Upload</UploadButtonTitle>
                        <UploadButtonDescription>
                          Upload a video
                        </UploadButtonDescription>
                      </UploadButton>
                    </>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {trailer.path && trailer.libraryId && (
        <VideoPreview path={trailer.path} libraryId={trailer.libraryId} />
      )}

      {trailer.href && trailer.type === "link" && (
        <YoutubePreview url={trailer.href ?? ""} />
      )}
    </>
  );
}

const buildUrl = (path: string, libraryId: string) =>
  `https://iframe.mediadelivery.net/embed/${libraryId}/${path}`;

function VideoPreview({
  path,
  libraryId,
}: {
  path: string;
  libraryId: string;
}) {
  const [url, setUrl] = useState(buildUrl(path, libraryId));

  useEffect(() => {
    setUrl(buildUrl(path, libraryId));
  }, [path]);

  return (
    <iframe
      src={url}
      loading="lazy"
      style={{ border: "none" }}
      allowFullScreen={true}
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      className="size-full w-[calc(100%-2px)] aspect-video"
    ></iframe>
  );
}

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // youtu.be/<id>
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }

    // youtube.com/watch?v=<id>
    const v = parsed.searchParams.get("v");
    if (v) {
      return v;
    }

    // youtube.com/embed/<id>
    const embedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/);
    if (embedMatch) {
      return embedMatch[1];
    }

    // youtube.com/shorts/<id>
    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch) {
      return shortsMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function YoutubePreview({ url }: { url: string }) {
  const embedUrl = useMemo(() => {
    const id = extractYouTubeVideoId(url);
    if (id) return getYouTubeEmbedUrl(id);
    return "";
  }, [url]);

  return (
    <iframe
      src={embedUrl}
      loading="lazy"
      style={{ border: "none" }}
      allowFullScreen={true}
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      className="size-full w-[calc(100%-2px)] aspect-video"
    ></iframe>
  );
}
