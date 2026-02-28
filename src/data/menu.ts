export interface MenuItem {
  name: string;
  url: string;
  target?: string;
  rel?: string;
}

export const mainMenu: MenuItem[] = [
  { name: "Docs", url: "https://docs.jaseci.org/learn/tour/" },
  { name: "Community", url: "/community" },
  { name: "About Us", url: "/about-us" },
  {
    name: "Research",
    url: "https://jaseci.engin.umich.edu/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { name: "Blogs", url: "https://blogs.jaseci.org/" },
];

export const footerMenu: MenuItem[] = [
  { name: "About", url: "/about-us" },
  { name: "Community", url: "/community" },
  { name: "Privacy Policy", url: "/privacy-policy" },
];

export const social = {
  twitter: "https://x.com/Jaseci_Labs",
  linkedin: "https://www.linkedin.com/company/jaseci-labs/",
  github: "https://github.com/Jaseci-Labs/jaseci",
  discord: "https://discord.gg/6j3QNdtcN6",
  email: "community@jaseci.org",
  website: "https://docs.jaseci.org/",
} as const;
