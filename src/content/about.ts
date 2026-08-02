export type AboutProfile = {
  name: string;
  nickname: string;
  role: string;
  imageUrl: string;
  imageAlt: string;
};

export const ABOUT_PROFILES: AboutProfile[] = [
  {
    name: 'Mateusz Kulesza',
    nickname: 'KulasMGM',
    role: 'Film / fotografia / montaż',
    imageUrl: new URL('../../assets/about/mateusz-kulesza.jpg', import.meta.url).href,
    imageAlt: 'Mateusz Kulesza, członek zespołu ZIRON',
  },
  {
    name: 'Mateusz Radkiewicz',
    nickname: 'Radken',
    role: 'Film / dron / postprodukcja',
    imageUrl: new URL('../../assets/about/mateusz-radkiewicz.jpg', import.meta.url).href,
    imageAlt: 'Mateusz Radkiewicz, członek zespołu ZIRON',
  },
];

export const ABOUT_HERO_IMAGE =
  new URL('../../assets/about/production-workshop.jpg', import.meta.url).href;
