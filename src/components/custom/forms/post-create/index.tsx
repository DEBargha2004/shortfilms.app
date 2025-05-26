import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormDefaultProps } from "@/types/form-props";
import BasicDetails from "./basic-details";
import VideoData from "./video-data";
import Metadata from "./metadata";
import Categories from "./categories";
import Credits from "./credits";
import Thumbnail from "./thumbnail";
import Honors from "./honors";
import Press from "./press";
import PublishOptions from "./publish";
import Gallery from "./gallery";

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
            <CardContent className="space-y-6">
              <Gallery form={form} />
            </CardContent>
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
          <Card className="@4xl:sticky @4xl:top-24">
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
