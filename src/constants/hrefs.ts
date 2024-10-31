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
  createProfile: "/a/create-profile",
  auth: {
    signIn: "/a/sign-in",
    signUp: "/a/sign-up",
    forgotPassword: "/a/forgot-password",
    resetPassword: "/a/confirm-password-reset",
    createProfile: "/a/create-profile",
  },
} as const;
