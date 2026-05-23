import axios from "axios";
import { Post } from "../../../backend/src/modules/post/entities/post.entity";
import { Doc } from "../../../backend/src/types/doc";
import { User } from "../../../backend/src/modules/user/user.entity";
import { Genre, Technique } from "@/types/post";

type FeedGroup = Genre & { contents: any[] };
export type TPresignedUrl = { url: string; path: string };

export const hrefs = {
  home: "/",
  post: (id: string) => `/post/${id}`,
  user: (username: string) =>
    username?.startsWith("@") ? username : `/@${username}`,
  shorts: "/shorts",
  subscriptions: "/subscriptions",
  library: "/library",
  explore: "/explore",
  content: "/content",
  verification: "/verification",
  genres: "/genres",
  techniques: "/techniques",
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    verifyAccount: "/auth/verify-account",
    forgetPassword: "/auth/forget-password",
    resetPassword: "/auth/reset-password",
  },
  api: {
    presignedUrl: {
      userAvatar: (mimetype: string) =>
        `/api/v1/storage/user/profile?mimetype=${mimetype}`,
      post: {
        trailer: (mimetype: string) =>
          `/api/v1/storage/post/video/trailer?mimetype=${mimetype}`,
        shortfilm: (mimetype: string) =>
          `/api/v1/storage/post/video/shortfilm?mimetype=${mimetype}`,
        thumbnail: {
          url: (mimetype: string) =>
            `/api/v1/storage/post/thumbnail?mimetype=${mimetype}`,
          action: axios.get,
          invoke: function (mimetype: string) {
            console.log(this);
            return hrefs.api.presignedUrl.post.thumbnail.action<TPresignedUrl>(
              hrefs.api.presignedUrl.post.thumbnail.url(mimetype),
            );
          },
        },
        gallery: {
          url(mimetype: string) {
            return `/api/v1/storage/post/gallery?mimetype=${mimetype}`;
          },
          action: axios.get,
          invoke: function (mimetype: string) {
            return hrefs.api.presignedUrl.post.gallery.action<TPresignedUrl>(
              hrefs.api.presignedUrl.post.gallery.url(mimetype),
            );
          },
        },
      },
    },
    signedUrl: {
      url: (path: string) => `/api/v1/storage/signed-url?path=${path}`,
      action: axios.get,
      invoke: function (path: string) {
        return hrefs.api.signedUrl.action(hrefs.api.signedUrl.url(path));
      },
    },
    auth: {
      signup: `/api/v1/auth/signup`,
      signin: `/api/v1/auth/signin`,
      verifyAccount: `/api/v1/auth/account-verification`,
      signout: `/api/v1/auth/signout`,
      forgetPassword: `/api/v1/auth/forget-password`,
      resetPassword: `/api/v1/auth/reset-password`,
    },
    user: {
      currentUser: `/api/v1/user`,
      search: (query: string) => `/api/v1/user/search?query=${query}`,
    },
    post: {
      create: {
        url: `/api/v1/post/create`,
        action: axios.post,
      },
      update: {
        url: (id: string) => `/api/v1/post/${id}/edit`,
        action: axios.put,
      },
      getPost: {
        url: (id: string, origin?: string) =>
          `${origin ?? ""}/api/v1/post/${id}`,
        action: axios.get,
        invoke: function (id: string, origin?: string) {
          return this.action<Doc<Post & { user: Doc<User> }>>(
            this.url(id, origin),
          );
        },
      },
      getAll: {
        url: `/api/v1/post/all`,
        action: axios.get,
      },
      getPostOfUser: {
        url: (id: string) => `/api/v1/post/creator/${id}`,
        action: axios.get,
      },
      adminAll: {
        url: `/api/v1/post/admin/all`,
        action: axios.get,
      },
      verify: {
        url: (id: string) => `/api/v1/post/${id}/verify`,
        action: axios.put,
      },
      delete: {
        url: (id: string) => `/api/v1/post/${id}`,
        action: axios.delete,
      },

      feed: {
        url: `/api/v1/post/feed`,
        action: axios.get,
        invoke: function (origin?: string) {
          return this.action<FeedGroup[]>(
            origin ? `${origin}${this.url}` : this.url,
          );
        },
      },
    },
    playlist: {
      create: {
        url: `/api/v1/playlist/create`,
        action: axios.post,
      },
      getAll: {
        url: `/api/v1/playlist`,
        action: axios.get,
      },
    },
    genre: {
      create: {
        url: `/api/v1/post/genre`,
        action: axios.post,
      },
      update: {
        url: (id: string) => `/api/v1/post/genre/${id}`,
        action: axios.put,
      },
      getAll: {
        url: `/api/v1/post/genre/all`,
        action: axios.get,
        invoke: function () {
          return this.action<{ data: Genre[] }>(this.url);
        },
      },
      getOne: {
        url: (id: string) => `/api/v1/post/genre/${id}`,
        action: axios.get,
      },
      delete: {
        url: (id: string) => `/api/v1/post/genre/${id}`,
        action: axios.delete,
      },
    },
    technique: {
      create: {
        url: `/api/v1/post/technique`,
        action: axios.post,
      },
      update: {
        url: (id: string) => `/api/v1/post/technique/${id}`,
        action: axios.put,
      },
      getAll: {
        url: `/api/v1/post/technique/all`,
        action: axios.get,
        invoke: function () {
          return this.action<{ data: Technique[] }>(this.url);
        },
      },
      getOne: {
        url: (id: string) => `/api/v1/post/technique/${id}`,
        action: axios.get,
      },
      delete: {
        url: (id: string) => `/api/v1/post/technique/${id}`,
        action: axios.delete,
      },
    },
    stream: {
      manifest: (videoId: string) => `/api/v1/stream/${videoId}/manifest.mpd`,
      segments: (videoId: string, path: string) =>
        `/api/v1/stream/${videoId}/${path}`,
    },
    siteMeta: {
      fetch: {
        url: (query: string) => `/api/v1/site-metadata?url=${query}`,
        action: axios.get,
      },
    },
    authorization: {
      appPages: {
        url: `/api/v1/authorization/app-pages`,
        action: axios.get,
        invoke: function () {
          return this.action<string[]>(this.url);
        },
      },
    },
  },
} as const;
