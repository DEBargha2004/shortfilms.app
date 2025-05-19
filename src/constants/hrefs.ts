export const hrefs = {
  home: "/",
  post: (id: string) => `/post/${id}`,
  user: (username: string) =>
    username.startsWith("@") ? username : `/@${username}`,
  shorts: "/shorts",
  subscriptions: "/subscriptions",
  library: "/library",
  explore: "/explore",
  content: "/content",
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
    },
  },
} as const;
