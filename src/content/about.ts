import { msg } from '@lit/localize';

export type AboutProfile = {
  name: string;
  nickname: string;
  role: string;
  imageUrl: string;
  imageAlt: string;
};

export function getAboutProfiles(): AboutProfile[] {
  return [
  {
    name: "Mateusz Kulesza",
    nickname: "KulasMGM",
    role: msg('Film / photography / editing', { id: 'about.kuleszaRole' }),
    imageUrl: new URL("../../assets/about/kulas_ziron.avif", import.meta.url)
      .href,
    imageAlt: msg('Mateusz Kulesza, ZIRON team member', { id: 'about.kuleszaImageAlt' }),
  },
  {
    name: "Mateusz Radkiewicz",
    nickname: "Radken",
    role: msg('Film / drone / post-production', { id: 'about.radkenRole' }),
    imageUrl: new URL("../../assets/about/radken_ziron.avif", import.meta.url)
      .href,
    imageAlt: msg('Mateusz Radkiewicz, ZIRON team member', { id: 'about.radkenImageAlt' }),
  },
  ];
}

export const ABOUT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1542248311-c6111015e3de?auto=format&fit=crop&q=86&w=2400';
