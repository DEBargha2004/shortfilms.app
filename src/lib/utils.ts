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

export async function tryCatch<R extends AxiosResponse, E extends AxiosError>(
  res: Promise<R>
): Promise<[R] | [undefined, E]> {
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
