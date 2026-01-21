type TPattern = {
  pattern: RegExp;
  test: (url: string) => boolean;
  getVideoId: (url: string) => string;
  getEmbedUrl: (id: string) => string;
  getThumbnailUrl: (id: string) => string;
};

const getYtEmbedUrl = (id: string) => {
  return `https://www.youtube.com/embed/${id}`;
};
const getYtThumbnailUrl = (id: string) => {
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
};

const getDmEmbedUrl = (id: string) => {
  return `https://www.dailymotion.com/embed/video/${id}`;
};
const getDmThumbnailUrl = (id: string) => {
  return `https://www.dailymotion.com/thumbnail/video/${id}`;
};

const getVimeoEmbedUrl = (id: string) => {
  return `https://player.vimeo.com/video/${id}`;
};
const getVimeoThumbnailUrl = (id: string) => {
  return `https://i.vimeocdn.com/video/${id}_640.jpg`;
};

export const patterns: TPattern[] = [
  // Youtube
  {
    pattern: /https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w\-]+/,
    test(url) {
      return this.pattern.test(url);
    },
    getVideoId(url) {
      const urlFormatted = new URL(url);
      return urlFormatted.searchParams.get("v")!;
    },
    getEmbedUrl(id) {
      return getYtEmbedUrl(id);
    },
    getThumbnailUrl(id) {
      return getYtThumbnailUrl(id);
    },
  },
  {
    pattern: /https?:\/\/youtu\.be\/[\w\-]+/,
    test(url) {
      return this.pattern.test(url);
    },
    getVideoId(url) {
      const urlFormatted = new URL(url);
      return url.replace(`/${urlFormatted.origin}`, "");
    },
    getEmbedUrl(id) {
      return getYtEmbedUrl(id);
    },
    getThumbnailUrl(id) {
      return getYtThumbnailUrl(id);
    },
  },
  {
    pattern: /https?:\/\/(www\.)?youtube\.com\/embed\/[\w\-]+/,
    test(url) {
      return this.pattern.test(url);
    },
    getVideoId(url) {
      return url.split("/").pop()!;
    },
    getEmbedUrl(id) {
      return getYtEmbedUrl(id);
    },
    getThumbnailUrl(id) {
      return getYtThumbnailUrl(id);
    },
  },
  // Dailymotion
  {
    pattern:
      /https?:\/\/(www\.)?dailymotion\.com\/(video|embed\/video)\/([\w\-]+)|https?:\/\/dai\.ly\/([\w\-]+)/,
    test(url) {
      return this.pattern.test(url);
    },
    getVideoId(url) {
      return url.split("/").pop()!;
    },
    getEmbedUrl(id) {
      return getDmEmbedUrl(id);
    },
    getThumbnailUrl(id) {
      return getDmThumbnailUrl(id);
    },
  },
  //Vimeo
  {
    pattern:
      /https?:\/\/(www\.)?vimeo\.com\/(\d+)|https?:\/\/player\.vimeo\.com\/video\/(\d+)/,
    test(url) {
      return this.pattern.test(url);
    },
    getVideoId(url) {
      return url.split("/").pop()!;
    },
    getEmbedUrl(id) {
      return getVimeoEmbedUrl(id);
    },
    getThumbnailUrl(id) {
      return getVimeoThumbnailUrl(id);
    },
  },
  // Rumble
  //   {
  //     pattern: /https?:\/\/rumble\.com\/video\/([\w\-]+)/,
  //     test(url) {
  //       return this.pattern.test(url);
  //     },
  //     getVideoId(url) {
  //       return url.split("/").pop()!;
  //     },
  //     getEmbedUrl(id) {
  //       return `https://rumble.com/embed/video/${id}`;
  //     },
  //   },
];
