"use client";

import {
  confirmPasswordReset,
  createProfile,
  getUser,
  login,
  logout,
  sendPasswordResetEmail,
  signup,
} from "@/actions/auth";
import { hrefs } from "@/constants/hrefs";
import { isActionError } from "@/lib/utils";
import {
  TForgetPassword,
  TForgetPasswordSetPassword,
} from "@/schema/forget-password";
import { TSignIn } from "@/schema/sign-in";
import { TBasicSignup, TProfileDetails } from "@/schema/sign-up";
import { produce } from "immer";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
} & TProfileDetails;

type State = {
  user: User | null;
};
type Actions = {
  setUser: (user: User | null) => void;
  updateUser: (fn: (user: State) => void) => void;
  login: (e: TSignIn) => ReturnType<typeof login>;
  signup: (e: TBasicSignup) => ReturnType<typeof signup>;
  createProfile: (e: TProfileDetails) => ReturnType<typeof createProfile>;
  forgetPasswordGetMail: (
    e: TForgetPassword,
  ) => ReturnType<typeof sendPasswordResetEmail>;
  resetPassword: (
    e: TForgetPasswordSetPassword,
    token: string,
  ) => ReturnType<typeof confirmPasswordReset>;
  logout: () => ReturnType<typeof logout>;
};

const AuthContext = createContext<(Actions & State) | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({
    user: null,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const setUser = (user: User | null) => {
    setState((state) => ({ ...state, user }));
  };
  const updateUser: Actions["updateUser"] = (fn: (user: State) => void) => {
    setState(produce((state: State) => fn(state)));
  };
  const clientLogin: Actions["login"] = async (e: TSignIn) => {
    const res = await login(e);

    if (isActionError(res)) {
      return res;
    }

    const token = res?.data.token;
    if (token) {
      setUser({
        id: res.data.record.id,
        username: res.data.record.username,
        email: res.data.record.email,
        about: res.data.record.about,
        avatar: res.data.record.avatar,
        profileType: res.data.record.profileType,
        link: res.data.record.link,
        location: res.data.record.location,
        phone: res.data.record.phone,
      });
    }

    return res;
  };
  const clientLogout: Actions["logout"] = async () => {
    const res = await logout();
    if (isActionError(res)) {
      return res;
    }
    setUser(null);

    return res;
  };
  const clientSignup: Actions["signup"] = async (e: TBasicSignup) => {
    const res = await signup(e);
    if (isActionError(res)) {
      return res;
    }

    return res;
  };
  const clientCreateProfile: Actions["createProfile"] = async (
    e: TProfileDetails,
  ) => {
    const res = await createProfile(e);

    if (isActionError(res)) return res;

    if (res && res.data) {
      updateUser((state) => {
        state.user = {
          ...(state.user || {}),
          id: res.data!.id,
          username: res.data?.username,
          email: res.data?.email,
          about: res.data?.about,
          avatar: res.data?.avatar,
          profileType: res.data?.profileType,
          link: res.data?.link,
          location: res.data?.location,
          phone: res.data?.phone,
        };
      });
    }

    return res;
  };
  const clientResetPasswordGetMail = async (e: TForgetPassword) => {
    const res = await sendPasswordResetEmail(e);
    return res;
  };
  const clientResetPassword = async (
    e: TForgetPasswordSetPassword,
    token: string,
  ) => {
    const res = await confirmPasswordReset(e, token);
    return res;
  };

  useEffect(() => {
    getUser().then((res) => {
      console.log({ res });
      if (isActionError(res)) return;

      if (res && res.user) {
        return setUser({
          id: res.user.id,
          username: res.user.username,
          email: res.user.email,
          about: res.user.about,
          avatar: res.user.avatar,
          profileType: res.user.profileType,
          link: res.user.link,
          location: res.user.location,
          phone: res.user.phone,
        });
      }

      document.cookie =
        "pb_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setUser(null);
      const pathname = window.location.pathname;
      if (!pathname.startsWith("/a"))
        return (window.location.href = hrefs.auth.signIn);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        createProfile: clientCreateProfile,
        login: clientLogin,
        logout: clientLogout,
        signup: clientSignup,
        forgetPasswordGetMail: clientResetPasswordGetMail,
        resetPassword: clientResetPassword,
        setUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthStore must be used within <AuthProvider>");
  }
  return context;
};

export { useAuth, AuthProvider };
