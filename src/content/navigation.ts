import { msg } from '@lit/localize';

import type { NavigationLink } from '../components/molecules/navigation';

export const PRIMARY_NAVIGATION: NavigationLink[] = [
  { href: '?view=project', label: msg('Work', { id: 'nav.work' }) },
  { href: '#about', label: msg('About', { id: 'nav.about' }) },
  { href: '#contact', label: msg('Contact', { id: 'nav.contact' }) },
];
