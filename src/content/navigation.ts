import { msg } from '@lit/localize';

import type { NavigationLink } from '../components/molecules/navigation';
import { localizedHomeUrl, localizedViewUrl } from '../localization';

export function getPrimaryNavigation(): NavigationLink[] {
  return [
    { href: localizedHomeUrl(), label: msg('Homepage', { id: 'nav.home' }) },
    { href: localizedViewUrl('project'), label: msg('Work', { id: 'nav.work' }) },
    { href: localizedViewUrl('about'), label: msg('About', { id: 'nav.about' }) },
    { href: localizedViewUrl('contact'), label: msg('Contact', { id: 'nav.contact' }) },
  ];
}
