"use client";

import { TSigninSchema } from "@/schema/signin";
import { TSignUpSchema } from "@/schema/signup";
import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DefaultSuccessResponse, ErrorResponse } from "@/types/response";
import { FileVerification } from "@/schema/file-verification";
import { hrefs } from "@/constants/hrefs";
import { tryCatch } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { TOtpSchema } from "@/schema/otp";

type AuthOptions = {
  onSuccess?: (response?: DefaultSuccessResponse) => void;
  onError?: (error?: ErrorResponse) => void;
};

type User = {
  id: string;
  avatar?: string;
  name: string;
  email: string;
};

type State = {
  user?: User;
};
type Actions = {
  signup: (
    formdata: TSignUpSchema,
    options?: Partial<AuthOptions>
  ) => Promise<void>;
  signin: (
    formdata: TSigninSchema,
    options?: Partial<AuthOptions>
  ) => Promise<void>;
  verifyAccount: (
    token: TOtpSchema,
    options?: Partial<AuthOptions>
  ) => Promise<void>;
  signout: (options?: Partial<AuthOptions>) => Promise<void>;
};

const authContext = createContext<(State & Actions) | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>();
  const { push } = useRouter();

  const signup = async (
    formdata: TSignUpSchema,
    options?: Partial<AuthOptions>
  ) => {
    if (FileVerification.isBase64(formdata.avatar)) {
      const [res, err] = await tryCatch<
        AxiosResponse<{ url: string; path: string }>,
        AxiosError<ErrorResponse>
      >(axios.get(hrefs.api.presignedUrl.userAvatar("image/webp")));

      if (err) {
        options?.onError?.(err.response?.data);
        formdata.avatar = "";
      }
      if (res) {
        const blob = FileVerification.base64toBlob(
          formdata.avatar!,
          "image/webp"
        );
        await axios.put(res.data.url, blob, {
          headers: { "Content-Type": "image/webp" },
        });
        formdata.avatar = res.data.path;
      }
    }

    const [res, error] = await tryCatch<
      AxiosResponse<DefaultSuccessResponse>,
      AxiosError<ErrorResponse>
    >(
      axios.post(hrefs.api.auth.signup, {
        email: formdata.email,
        password: formdata.password,
        name: formdata.name,
        image: formdata.avatar,
      })
    );

    if (error) {
      return options?.onError?.(error.response?.data);
    }

    if (res) {
      push(hrefs.auth.verifyAccount);
      return options?.onSuccess?.(res?.data);
    }
  };
  const signin = async (
    formdata: TSigninSchema,
    options?: Partial<AuthOptions>
  ) => {
    const [res, error] = await tryCatch<
      AxiosResponse<DefaultSuccessResponse & { data: User }>,
      AxiosError<ErrorResponse>
    >(
      axios.post(hrefs.api.auth.signin, {
        email: formdata.email,
        password: formdata.password,
      })
    );
    if (error) {
      return options?.onError?.(error.response?.data);
    }
    if (res) {
      setUser(res.data.data);
      return options?.onSuccess?.({ message: res?.data?.message });
    }
  };

  const verifyAccount = async (
    formdata: TOtpSchema,
    options?: Partial<AuthOptions>
  ) => {
    const [res, error] = await tryCatch<
      AxiosResponse<DefaultSuccessResponse>,
      AxiosError<ErrorResponse>
    >(axios.post(hrefs.api.auth.verifyAccount, { token: formdata.otp }));

    if (error) {
      return options?.onError?.(error.response?.data);
    }

    if (res) {
      push(hrefs.auth.signin);
      return options?.onSuccess?.(res?.data);
    }
  };
  const signout = async (options?: Partial<AuthOptions>) => {
    const [res, err] = await tryCatch<
      AxiosResponse<DefaultSuccessResponse & { data: User }>,
      AxiosError<ErrorResponse>
    >(axios.post(hrefs.api.auth.signout));

    if (err) {
      return options?.onError?.(err.response?.data);
    }

    if (res) {
      setUser(res.data.data);
      push(hrefs.home);
      return options?.onSuccess?.(res?.data);
    }
  };

  useEffect(() => {
    tryCatch<AxiosResponse<User>, AxiosError<ErrorResponse>>(
      axios.get(hrefs.api.user.currentUser)
    ).then(([res, err]) => {
      if (res) {
        setUser(res.data);
      }
    });
  }, []);

  console.log(user);

  return (
    <authContext.Provider
      value={{ signin, signout, signup, verifyAccount, user }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within a <AuthProvider />");
  }

  return context;
};
