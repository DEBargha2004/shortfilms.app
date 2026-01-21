import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TResetPasswordSchema } from "@/schema/reset-password";
import { TFormDefaultProps } from "@/types/form-props";
import { useState } from "react";
import IconInput from "../icon-input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResetPasswordForm({
  form,
  onSubmit,
}: TFormDefaultProps<TResetPasswordSchema>) {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const togglePasswordVisibility = (type: keyof typeof showPassword) => () => {
    setShowPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
            <Loader2 className="animate-spin" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
