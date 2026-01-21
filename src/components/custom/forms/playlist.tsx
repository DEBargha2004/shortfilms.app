import { Button } from "@/components/ui/button";
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
import { TPlaylistSchema } from "@/schema/playlist";
import { TFormDefaultProps } from "@/types/form-props";
import { Loader2 } from "lucide-react";
import React from "react";

export default function PlaylistCreateForm({
  form,
  onSubmit,
}: TFormDefaultProps<TPlaylistSchema>) {
  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
                <Textarea
                  {...field}
                  style={
                    {
                      fieldSizing: "content",
                      resize: "none",
                    } as React.CSSProperties
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="button"
          onClick={form.handleSubmit(onSubmit)}
        >
          {form.formState.isSubmitting ? <Loader2 /> : "Create Playlist"}
        </Button>
      </form>
    </Form>
  );
}
