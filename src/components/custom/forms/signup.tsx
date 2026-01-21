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
import { TSignUpSchema } from "@/schema/signup";
import { TFormDefaultProps } from "@/types/form-props";
import { Eye, EyeOff, Loader2, UserRound } from "lucide-react";
import IconInput from "../icon-input";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFileReader from "@/hooks/use-file-reader";
import { FileVerification } from "@/schema/file-verification";
import { toast } from "sonner";

export default function SignUpForm({
  form,
  onSubmit,
}: TFormDefaultProps<TSignUpSchema>) {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const avatarRef = useRef<HTMLInputElement>(null);
  const { read } = useFileReader();

  const togglePasswordVisibility = (type: keyof typeof showPassword) => () => {
    setShowPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const verification = new FileVerification(file);

      verification.setMaxSize(1 * 1024 * 1024);
      verification.setAllowedFileType("image");

      verification
        .verify()
        .then((res) => {
          if (!res?.status) throw new Error(res.message);
        })
        .then(() => read(file))
        .then((url) => url && form.setValue("avatar", url))
        .catch((err) => toast.error((err as Error).message))
        .finally(() => (target.value = ""));
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center">
          <input
            type="file"
            ref={avatarRef}
            hidden
            onChange={handleAvatarUpload}
          />

          <Avatar
            className="size-20"
            onClick={() => avatarRef.current?.click()}
          >
            <AvatarImage src={form.watch("avatar")} className="object-cover" />
            <AvatarFallback>
              <UserRound size={40} className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <IconInput
                  {...field}
                  type={showPassword.password ? "text" : "password"}
                  endIcon={
                    <div onClick={togglePasswordVisibility("password")}>
                      {showPassword.password ? <EyeOff /> : <Eye />}
                    </div>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <IconInput
                  {...field}
                  type={showPassword.confirmPassword ? "text" : "password"}
                  endIcon={
                    <div onClick={togglePasswordVisibility("confirmPassword")}>
                      {showPassword.confirmPassword ? <EyeOff /> : <Eye />}
                    </div>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Sign Up</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
