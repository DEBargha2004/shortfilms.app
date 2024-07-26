export const hrefs = {
  home: '/',
  post: (id: string) => `/post/${id}`,
  user: (username: string) =>
    username.startsWith('@') ? username : `/@${username}`,
  shorts: '/shorts',
  subscriptions: '/subscriptions',
  library: '/library',
  explore: '/explore'
} as const
