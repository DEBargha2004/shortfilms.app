import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { TForgetPasswordOtp } from "@/schema/forget-password";
import { useForm } from "react-hook-form";
import "./style.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function ForgetPasswordOtpForm({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<TForgetPasswordOtp>>;
  onSubmit: (e: TForgetPasswordOtp) => void;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup
                    className={cn(
                      "w-full grid grid-cols-6 xxs:gap-2 xs:gap-6",
                      "[&>*]:aspect-square [&>*]:w-full [&>*]:rounded [&>*]:max-w-16",
                    )}
                  >
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full space-x-2">
          {form.formState.isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  );
}
