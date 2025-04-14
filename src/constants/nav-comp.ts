import micromatch from "micromatch";

type TNavComp = {
  label: string;
  href: string;
  pattern: string;
  isActive: (path: string) => boolean;
};

export const navComp: TNavComp[] = [
  {
    label: "Films",
    href: "/content/films",
    pattern: "/content/films/**",
    isActive(path) {
      return micromatch.isMatch(path, this.pattern);
    },
  },
];
