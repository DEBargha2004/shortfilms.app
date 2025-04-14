import { useForm } from "react-hook-form";

export type TFormDefaultProps<T extends Record<string, any>> = {
  form: ReturnType<typeof useForm<T>>;
  onSubmit: (data: T) => void;
};

export type TFormChildrenDefaultProps<T extends Record<string, any>> = {
  form: ReturnType<typeof useForm<T>>;
};
