"use server";

import { cookies } from "next/headers";
import Pocketbase from "pocketbase";

const initPocketbase = async () => {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  const cookieStore = cookies();

  pb.authStore.loadFromCookie(cookieStore.get("pb_auth")?.value || "");

  pb.authStore.onChange(() => {
    cookieStore.set("pb_auth", pb.authStore.exportToCookie());
  });

  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (error) {
    pb.authStore.clear();
  }

  return pb;
};

export { initPocketbase };
