import { patterns } from "./url-patterns";

export const getEmbedUrl = (url: string) => {
  const patternObj = patterns.find((pattern) => pattern.test(url));
  if (patternObj) {
    return patternObj.getEmbedUrl(patternObj.getVideoId(url));
  }
};

export const getThumbnailUrl = (videoId: string) => {
  return `https://${process.env.NEXT_PUBLIC_PULLZONE_URL}/${videoId}/thumbnail.jpg`;
};
