export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Memes App',
  description: 'Your ultimate meme reference guide.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Memes Table',
      href: '/memes',
    },
    {
      label: 'Memes List',
      href: '/memes/list',
    },
  ],
};
