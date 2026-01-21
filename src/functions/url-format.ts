/**
 *
 * @param url - video url
 *
 * @returns boolean
 * @classdesc Check if video url is valid vimeo or youtube url
 */

export function isValidVideoUrl(url: string) {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("vimeo.com")
  );
}

export function isValidYoutubeUrl(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

export function isValidVimeoUrl(url: string) {
  return url.includes("vimeo.com");
}

export function generateYoutubeEmbedUrl(url: string) {
  const videoId = url
    .replace("https://www.youtube.com/watch?v=", "")
    .replace("www.youtube.com/watch?v=", "")
    .replace("youtube.com/watch?v=", "")
    .replace("https://youtu.be/", "")
    .replace("youtu.be/", "");

  return `https://www.youtube.com/embed/${videoId}`;
}

export function generateVimeoEmbedUrl(url: string) {
  const videoId = url
    .replace("https://vimeo.com/", "")
    .replace("vimeo.com/", "");
  return `https://player.vimeo.com/video/${videoId}`;
}

export function generateVideoEmbedUrl(url: string) {
  if (isValidYoutubeUrl(url)) {
    return generateYoutubeEmbedUrl(url);
  } else if (isValidVimeoUrl(url)) {
    return generateVimeoEmbedUrl(url);
  }

  return url;
}
