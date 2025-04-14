import { languages } from "@/constants/lang";
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
