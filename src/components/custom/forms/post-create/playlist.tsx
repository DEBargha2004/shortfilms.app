import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { hrefs } from "@/constants/hrefs";
import { tryCatch } from "@/lib/utils";
import {
  defaultValues,
  playlistSchema,
  TPlaylistSchema,
} from "@/schema/playlist";
import { TPostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { DefaultSuccessResponse, ErrorResponse } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";
import PlaylistCreateForm from "../playlist";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Playlist = {
  id: string;
  name: string;
};

export default function Playlist() {
  const [isPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { control, getValues, setValue } = useFormContext<TPostCreateSchema>();
  const playlistForm = useForm<TPlaylistSchema>({
    resolver: zodResolver(playlistSchema),
    defaultValues: defaultValues(),
  });
  const playlistFormValues = useWatch({ control, name: "playlist" });
  const getPlaylistByIdFromLocal = (value: string) => {
    return playlists.find((p) => p.name === value);
  };
  const playlistLabal =
    playlistFormValues.length > 0
      ? playlistFormValues.length === 1
        ? getPlaylistByIdFromLocal(playlistFormValues[0])?.name
        : `${playlistFormValues.length} Playlists`
      : "Add Playlist";

  const onPlaylistCreate = async (data: TPlaylistSchema) => {
    const [res, err] = await tryCatch<
      AxiosResponse<DefaultSuccessResponse<Playlist>>,
      AxiosError<ErrorResponse>
    >(hrefs.api.playlist.create.action(hrefs.api.playlist.create.url, data));

    if (err) {
      return toast.error(err.response?.data?.code, {
        description: err.response?.data?.message,
      });
    }

    if (res) {
      toast.success(res.data.message);
      setIsPlaylistDialogOpen(false);
      setPlaylists((prev) => [res.data.data, ...prev]);
      setValue("playlist", [...playlistFormValues, res.data.data.name]);
    }
  };

  const toggleCheckbox = (value: string) => {
    const playlists = getValues("playlist");
    if (playlists.includes(value)) {
      setValue(
        "playlist",
        playlists.filter((p) => p !== value)
      );
    } else {
      setValue("playlist", [...playlists, value]);
    }
  };

  useEffect(() => {
    tryCatch<AxiosResponse<{ data: Playlist[] }>, AxiosError<ErrorResponse>>(
      hrefs.api.playlist.getAll.action(hrefs.api.playlist.getAll.url)
    ).then(([res, err]) => {
      if (err) {
        return;
      }
      if (res) setPlaylists(res.data.data);
    });
  }, []);

  return (
    <FormField
      control={control}
      name="playlist"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Playlist</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className="h-9 px-2.5 w-full justify-between font-normal"
                >
                  <span>{playlistLabal}</span>
                  <ChevronDown className="text-muted-foreground" size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                <Command>
                  <CommandInput />
                  <CommandList>
                    <CommandEmpty className="border-b">
                      No playlist found.
                    </CommandEmpty>
                    <CommandGroup className="border-b max-h-52 overflow-y-auto scroller">
                      {playlists?.map((playlist) => (
                        <CommandItem
                          key={playlist.id}
                          value={playlist.name}
                          className="gap-2"
                          onSelect={(value) => toggleCheckbox(value)}
                        >
                          <Checkbox
                            id={playlist.id}
                            checked={field.value?.includes(playlist.name)}
                          />
                          <Label htmlFor={playlist.id}>{playlist.name}</Label>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                  <div className="p-2">
                    <Dialog
                      open={isPlaylistDialogOpen}
                      onOpenChange={setIsPlaylistDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant={"secondary"}
                          className="h-8"
                          type="button"
                        >
                          New Playlist
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Playlist</DialogTitle>
                        </DialogHeader>
                        <PlaylistCreateForm
                          form={playlistForm}
                          onSubmit={onPlaylistCreate}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
