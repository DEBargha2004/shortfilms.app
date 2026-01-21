import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { creditRoles } from "@/constants/general";
import { hrefs } from "@/constants/hrefs";
import { queryKey } from "@/constants/query";
import { getAcronym, getCreditRole, tryCatch } from "@/lib/utils";
import { TPostCreateSchema } from "@/schema/post-create";
import { ErrorResponse } from "@/types/response";
import { TUserSearch } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Command as CommandPrimitive } from "cmdk";
import { Loader2, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import SafeRemove from "../../safe-remove";

const publisherTypes: string[] = ["School", "Studio", "Softwares"];

export default function Credits() {
  const [creditInputs, setCreditInputs] = useState<{
    selectedUser?: TUserSearch;
    role: string;
    popoverState: boolean;
    search: string;
  }>({
    selectedUser: undefined,
    role: "",
    popoverState: false,
    search: "",
  });

  const deboundedSearchInput = useDebounce(creditInputs.search, 300);
  const form = useFormContext<TPostCreateSchema>();
  const users = useQuery({
    queryKey: [queryKey.userSearch, deboundedSearchInput],
    queryFn: async () => {
      const [res, err] = await tryCatch<
        AxiosResponse<TUserSearch[]>,
        AxiosError<ErrorResponse>
      >(axios.get(hrefs.api.user.search(deboundedSearchInput)));

      if (err) {
        toast.error(err.response?.data.code, {
          description: err.response?.data.message,
        });
        return [];
      }
      if (res) {
        console.log(res.data);
        return res.data;
      }
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "credits",
  });

  const handleSelect = (user: TUserSearch) => () => {
    console.log({ user });
    setCreditInputs((prev) => ({
      ...prev,
      selectedUser: user,
      popoverState: false,
    }));
  };

  const handleCreditInputChange =
    (key: keyof typeof creditInputs) =>
    (e: (typeof creditInputs)[typeof key]) => {
      setCreditInputs((prev) => ({ ...prev, [key]: e }));
    };

  const handleAddToCredit = () => {
    if (!creditInputs.selectedUser) return;
    form.setValue("credits", [
      ...form.getValues("credits"),
      {
        id: creditInputs.selectedUser._id,
        name: creditInputs.selectedUser.name,
        role: creditInputs.role,
        image: creditInputs.selectedUser.image,
      },
    ]);

    setCreditInputs((prev) => ({ ...prev, selectedUser: undefined, role: "" }));
  };

  const handleDeleteCredit = (index: number) => () => {
    form.setValue(
      "credits",
      form.getValues("credits").filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <section className="flex justify-start items-end gap-4">
        <section className="flex-1 space-y-2">
          <Label>Name</Label>
          <Popover
            open={creditInputs.popoverState}
            onOpenChange={handleCreditInputChange("popoverState")}
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className="w-full flex justify-start items-center gap-2 font-normal"
              >
                {creditInputs.selectedUser
                  ? creditInputs.selectedUser.name
                  : "Search User"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  value={creditInputs.search}
                  onValueChange={handleCreditInputChange("search")}
                />
                <CommandList>
                  {!users.isLoading && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                  {users.isLoading && (
                    <CommandPrimitive.Loading className="h-10 flex justify-center items-center">
                      <Loader2 className="animate-spin" />
                    </CommandPrimitive.Loading>
                  )}
                  <CommandGroup>
                    {users.data?.map((user) => (
                      <CommandItem
                        key={user._id}
                        onSelect={handleSelect(user)}
                        className="flex items-start gap-2"
                      >
                        <Avatar>
                          <AvatarImage src={user.image} />
                          <AvatarFallback>
                            {getAcronym(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </section>

        <section className="flex-1 space-y-2">
          <Label>Role</Label>
          <Select
            value={creditInputs.role}
            onValueChange={handleCreditInputChange("role")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {creditRoles.map((grp) => (
                <SelectGroup key={grp.group_name}>
                  <SelectLabel className="pl-4">{grp.group_name}</SelectLabel>
                  {grp.elements.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </section>
        <Button type="button" size={"icon"} onClick={handleAddToCredit}>
          <Plus />
        </Button>
      </section>

      <section className="space-y-5">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex justify-start items-center [&>div]:flex-1 first:pt-5"
          >
            <div className="flex justify-start items-center gap-2">
              <Avatar>
                <AvatarImage src={field.image} className="object-cover" />
                <AvatarFallback>{getAcronym(field.name)}</AvatarFallback>
              </Avatar>
              <span>{field.name}</span>
            </div>
            <div>{getCreditRole(field.role)?.label}</div>
            <SafeRemove action={handleDeleteCredit(index)}>
              <Button
                size={"icon"}
                className=""
                type="button"
                variant={"destructive"}
              >
                <Trash2 size={20} />
              </Button>
            </SafeRemove>
          </div>
        ))}
      </section>
    </>
  );
}
