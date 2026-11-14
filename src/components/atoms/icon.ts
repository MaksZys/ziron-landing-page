import { createElement, type IconNode } from 'lucide';

export function icon(node: IconNode, className?: string) {
  return createElement(node, {
    'aria-hidden': 'true',
    ...(className ? { class: className } : {}),
  });
}
