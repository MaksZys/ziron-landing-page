import { msg } from '@lit/localize';

import type { NavigationLink } from '../components/molecules/navigation';
import { localizedViewUrl } from '../localization';

export function getPrimaryNavigation(): NavigationLink[] {
  return [
    { href: localizedViewUrl('project'), label: msg('Work', { id: 'nav.work' }) },
    { href: localizedViewUrl('about'), label: msg('About', { id: 'nav.about' }) },
    { href: `#contact`, label: msg('Contact', { id: 'nav.contact' }) },
  ];
}
