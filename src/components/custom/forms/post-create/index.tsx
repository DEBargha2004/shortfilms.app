import {
  UploadButton,
  UploadButtonDescription,
  UploadButtonTitle,
} from "@/app/(app)/(pages-with-sidenav)/content/_components/upload-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectItemProps,
} from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  generateVideoEmbedUrl,
  isValidVideoUrl,
  isValidVimeoUrl,
  isValidYoutubeUrl,
} from "@/functions/url-format";
import { cn } from "@/lib/utils";
import { PostCreateSchema } from "@/schema/post-create";
import { Crop, ImageIcon, Link2, Plus, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ReactCropperElement } from "react-cropper";
import { useDropzone } from "react-dropzone";
import { useForm, useWatch } from "react-hook-form";
import CropperComponent from "@/components/custom/cropper";
import { Checkbox } from "@/components/ui/checkbox";
import { getCodeList, getName } from "country-list";
import { languages } from "@/constants/lang";
import {
  ageRating,
  genres,
  premiereStatus,
  techniques,
} from "@/constants/general";
import { Label } from "@/components/ui/label";
import { TFormDefaultProps } from "@/types/form-props";
import FileSelector from "@/components/custom/file-selector";
import BasicDetails from "./basic-details";
import useFileReader from "@/hooks/use-file-reader";
import VideoData from "./video-data";
import Metadata from "./metadata";
import Categories from "./categories";
import Credits from "./credits";
import Thumbnail from "./thumbnail";
import Honors from "./honors";
import Press from "./press";
import PublishOptions from "./publish";

const playlists: MultiSelectItemProps[] = [
  "Playlist 1",
  "Playlist 2",
  "Playlist 3",
  "Playlist 4",
];

const tags: MultiSelectItemProps[] = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"];

const publisherTypes: string[] = ["School", "Studio", "Softwares"];

const MAX_SELECTABLE_GENRES = 2;
const MAX_SELECTABLE_TECHNIQUES = 3;

export default function PostCreateForm({
  form,
  onSubmit,
}: TFormDefaultProps<PostCreateSchema>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 @4xl:grid-cols-3 lg:gap-8"
      >
        <div
          className={cn(
            "grid auto-rows-max items-start gap-4 @4xl:col-span-2 @7xl:col-span-2 lg:gap-8",
            "@container"
          )}
        >
          <Card>
            <CardContent className="space-y-4 pt-4">
              <BasicDetails form={form} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Video</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
              <VideoData form={form} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Metadata form={form} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Honors</CardTitle>
              <CardDescription>
                List festival screenings and awards here. Honors will be listed
                in order. The highest-ranked Top Festival laurel will appear on
                the film thumbnail.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Honors form={form} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Press</CardTitle>
              <CardDescription>
                List articles and media coverage of your film.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Press form={form} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Categories form={form} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>
                Add stills, poster, and behind-the-scenes content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6"></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Credits form={form} />
            </CardContent>
          </Card>
        </div>
        <div className="grid @7xl:w-4/5 auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              <Thumbnail form={form} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 space-y-4">
              <PublishOptions form={form} />
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
  );
}
