"use server";

import initPocketbase from "@/lib/pocketbase-server";
import { isActionError, ServerActionResponse } from "@/lib/utils";
import { TSignIn } from "@/schema/sign-in";
import { basicSignupSchema, TBasicSignup } from "@/schema/sign-up";
import { RecordModel } from "pocketbase";

export const login = async (e: TSignIn): Promise<ServerActionResponse> => {
  try {
    const pb = await initPocketbase();
    const u = await pb
      .collection("users")
      .authWithPassword(e.email, e.password);

    return { message: "Login successful" };
  } catch (error) {
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
      const user = await pb.collection("users").create({
        email: e.email,
        password: e.passwords.password,
        passwordConfirm: e.passwords.confirmPassword,
        verified: false,
        emailVisibility: true,
      });

      await pb.collection("users").requestVerification(e.email);

      return {
        message: "Signup successful",
      };
    }

    if (res && res.user) {
      return {
        error: "User already exists",
      };
    }
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const checkUser = async (
  email: string,
): Promise<
  ServerActionResponse<{ message: string; user: RecordModel | null }>
> => {
  try {
    const pb = await initPocketbase();
    const user = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    if (user) {
      return {
        message: "User exists",
        user,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "User does not exist",
      user: null,
    };
  }
};

export const verifyUser = async (
  token: string,
): Promise<ServerActionResponse<{ success: boolean }>> => {
  const pb = await initPocketbase();

  try {
    const res = await pb.collection("users").confirmVerification(token);
    if (res) {
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
