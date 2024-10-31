"use server";

import { pbAdmin } from "@/lib/pocketbase";
import { initPocketbase } from "@/lib/pocketbase-server";
import { isActionError, ServerActionResponse } from "@/lib/utils";
import {
  forgetPasswordSchema,
  forgetPasswordSetPasswordSchema,
  TForgetPassword,
  TForgetPasswordSetPassword,
} from "@/schema/forget-password";
import { TSignIn } from "@/schema/sign-in";
import {
  basicSignupSchema,
  profileDetailsSchema,
  TBasicSignup,
  TProfileDetails,
} from "@/schema/sign-up";
import { cookies } from "next/headers";
import Client, { AuthModel, RecordAuthResponse, RecordModel } from "pocketbase";

export const login = async (
  e: TSignIn,
): Promise<ServerActionResponse<{ data: RecordAuthResponse<RecordModel> }>> => {
  try {
    const pb = await initPocketbase();
    const u = await pb
      .collection("users")
      .authWithPassword(e.email, e.password);

    cookies().set("pb_auth", pb.authStore.exportToCookie());

    console.dir(u);
    return { data: u };
  } catch (error) {
    console.log(error);
    return { error: "Invalid credentials" };
  }
};

export const signup = async (
  e: TBasicSignup,
): Promise<ServerActionResponse> => {
  try {
    const pb = await initPocketbase();

    const isDataParsed = basicSignupSchema.safeParse(e);
    if (isDataParsed.error) throw new Error(isDataParsed.error.message);

    const res = await checkUser(e.email);

    if (isActionError(res)) {
      return {
        error: res.error,
      };
    }

    if (res && !res.user) {
      const isCreated = await createUser(e, pb);

      console.log({ isCreated });

      if (isCreated) await pb.collection("users").requestVerification(e.email);

      return {
        message: isCreated ? "Signup successful" : "Something went wrong",
      };
    }

    if (res && res.user) {
      console.log(res.user);
      if (res.user.verified) {
        return {
          error: "User already exists",
        };
      }

      await pbAdmin.collection("users").delete(res.user.id);

      const isCreated = await createUser(e, pb);
      if (isCreated) await pb.collection("users").requestVerification(e.email);

      return {
        message: isCreated
          ? "Signup successful"
          : "Something went wrong while registering",
      };
    }
  } catch (error) {
    console.dir(error, "in the signup action");
    return {
      error: "Something went wrong",
    };
  }
};

const createUser = async (e: TBasicSignup, pb: Client): Promise<boolean> => {
  try {
    const user = await pb.collection("users").create({
      email: e.email,
      password: e.passwords.password,
      passwordConfirm: e.passwords.confirmPassword,
      verified: false,
      emailVisibility: true,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkUser = async (
  email: string,
): Promise<ServerActionResponse<{ user: RecordModel | null }>> => {
  try {
    const pb = await initPocketbase();
    const user = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    if (user) {
      return {
        user,
      };
    }
  } catch (error) {
    //@ts-ignore
    if (error?.status === 404) return { user: null };
    return {
      error: "Something went wrong",
    };
  }
};

export const verifyUser = async (
  token: string,
): Promise<ServerActionResponse<{ success: boolean }>> => {
  const pb = await initPocketbase();

  try {
    const res = await pb.collection("users").confirmVerification(token);
    const cookieStore = cookies();

    console.log({ cookie: pb.authStore.exportToCookie() });

    if (res) {
      cookieStore.set("pb_auth", pb.authStore.exportToCookie());
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const checkIfProfileComplete = async (
  userId: string,
): Promise<ServerActionResponse<{ profileComplete: boolean }>> => {
  try {
    const pb = await initPocketbase();
    const user = await pb.collection("users").getOne(userId);
    if (user.isProfileComplete) {
      return {
        profileComplete: true,
      };
    }
    return {
      profileComplete: false,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const getUser = async (): Promise<
  ServerActionResponse<{ user: AuthModel | null }>
> => {
  try {
    console.log(cookies().get("pb_auth"));
    const pb = await initPocketbase();
    const user = pb.authStore.model;

    return {
      user,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const logout = async (): Promise<
  ServerActionResponse<{ success: boolean }>
> => {
  try {
    const pb = await initPocketbase();
    pb.authStore.clear();
    cookies().delete("pb_auth");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const createProfile = async (
  e: TProfileDetails,
): Promise<ServerActionResponse<{ data: RecordModel | null }>> => {
  try {
    const isParsed = profileDetailsSchema.safeParse(e);
    if (!isParsed.success) throw new Error(isParsed.error.message);

    const pb = await initPocketbase();

    const user = await pb.collection("users").update(pb.authStore.model?.id, {
      username: e.username,
      avatar: e.avatar,
      about: e.about,
      link: e.link,
      location: e.location,
      phone: e.phone,
      profileType: e.profileType,
      isProfileComplete: true,
    });

    return { data: user };
  } catch (error) {
    return {
      error: "Something went wrong",
      data: null,
    };
  }
};

export const sendPasswordResetEmail = async (
  e: TForgetPassword,
): Promise<ServerActionResponse<{ success: boolean }>> => {
  try {
    const { success } = forgetPasswordSchema.safeParse(e);
    if (!success) throw new Error("Schema Invalidation Error");

    const user = await checkUser(e.email);
    if (isActionError(user)) {
      return {
        error: user.error,
      };
    }
    if (!user || (user && !user.user)) {
      return {
        error: "User not found",
      };
    }
    await pbAdmin.collection("users").requestPasswordReset(e.email);
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const confirmPasswordReset = async (
  e: TForgetPasswordSetPassword,
  token: string,
): Promise<ServerActionResponse<{ success: boolean }>> => {
  try {
    const { success } = forgetPasswordSetPasswordSchema.safeParse(e);
    if (!success) throw new Error("Schema Invalidation Error");

    const res = await pbAdmin
      .collection("users")
      .confirmPasswordReset(token, e.password, e.confirmPassword);

    return {
      success: res,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};
