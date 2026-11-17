export const SOCIAL_LINKS = [
  { icon: 'facebook', label: 'Facebook', href: 'https://facebook.com/designpwoteam' },
  { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com/ziron.agroagency' },
  { icon: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@kulas.mgm' },
  { icon: 'youtube', label: 'YouTube', href: 'https://youtube.com/@RadKen' },
] as const;

export type SocialIcon = (typeof SOCIAL_LINKS)[number]['icon'];
