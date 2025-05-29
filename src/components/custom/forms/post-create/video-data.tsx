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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoUploadType, videoUploadTypes } from "@/constants/general";
import { generateVideoEmbedUrl, isValidVideoUrl } from "@/functions/url-format";
import useFileReader from "@/hooks/use-file-reader";
import { cn } from "@/lib/utils";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { Link2, Upload } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useWatch } from "react-hook-form";

export default function VideoData({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  const { read } = useFileReader();
  const video = useWatch({
    control: form.control,
    name: "video",
  });
  const trailer = useWatch({
    control: form.control,
    name: "trailer",
  });

  const videoDropzone = useDropzone({
    async onDrop(acceptedFiles, fileRejections, event) {
      const url = await read(acceptedFiles[0]);
      if (url) {
        form.setValue("video", {
          type: "video",
          payload: url,
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
          type: "video",
          payload: url,
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
          control={form.control}
          name="video.payload"
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
          control={form.control}
          name="video.payload"
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
          control={form.control}
          name="video.payload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <div className="border-2 rounded-lg border-dashed">
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
      )}

      <h2 className="text-lg pt-6 font-medium">Trailer</h2>
      <FormField
        control={form.control}
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
          control={form.control}
          name="trailer.payload"
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
          control={form.control}
          name="trailer.payload"
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
          control={form.control}
          name="trailer.payload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <div className="border-2 rounded-lg border-dashed">
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
      )}
    </>
  );
}
