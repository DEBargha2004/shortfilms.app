import { creditRoles } from "@/constants/general";
import { languages } from "@/constants/lang";
import { AxiosError, AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLanguageName(code: string) {
  return languages.find((lang) => lang.code === code)?.language;
}

export function getLanguageCode(name: string) {
  return languages.find((lang) => lang.language === name)?.code;
}

export async function tryCatch<
  R extends any = AxiosResponse,
  E extends any = AxiosError
>(res: Promise<R>): Promise<[R] | [undefined, E]> {
  try {
    const data = await res;
    return [data] as [R];
  } catch (error) {
    return [undefined, error] as [undefined, E];
  }
}

export function getAcronym(val: string) {
  return val
    .trim()
    .split(" ")
    .filter((v) => v)
    .map((v) => v.charAt(0).toUpperCase())
    .join("");
}

export const getCreditRole = (id: string) => {
  for (let i = 0; i < creditRoles.length; i++) {
    const role = creditRoles[i].elements.find((e) => e.value === id);
    if (role) return role;
  }
};

export function formatNumLength(val: number) {
  return val.toString().padStart(2, "0");
}

export function formatSeconds(duration: number) {
  const seconds = Math.floor(duration) % 60;
  const min = Math.floor(duration / 60);
  const hour = Math.floor(min / 60);

  if (hour !== 0)
    return `${formatNumLength(hour)}:${formatNumLength(min)}:${formatNumLength(
      seconds
    )}`;
  return `${formatNumLength(min)}:${formatNumLength(seconds)}`;
}
