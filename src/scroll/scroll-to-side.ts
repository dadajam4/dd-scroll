import {
  ScrollPosition,
  ScrollOptions,
  defaultSettings,
  ScrollResult,
} from './scroll-by-internal';
import { $, error } from './util';
import scrollTo from './scroll-to';

export type ScrollYSide = 'top' | 'bottom';
export type ScrollXSide = 'left' | 'right';
export type ScrollSide = ScrollYSide | ScrollXSide;

export type ScrollToSideTargets =
  | ScrollSide
  | [ScrollSide]
  | [ScrollYSide, ScrollXSide]
  | [ScrollXSide, ScrollYSide];
// function scrollToSide(side: ScrollSide, options?: ScrollOptions): ScrollResult;
// function scrollToSide(
//   sides: [ScrollSide],
//   options?: ScrollOptions,
// ): ScrollResult;
// function scrollToSide(
//   sides: [ScrollYSide, ScrollXSide] | [ScrollXSide, ScrollYSide],
//   options?: ScrollOptions,
// ): ScrollResult;
// function scrollToSide(
//   targets:
//     | ScrollSide
//     // | [ScrollSide]
//     | [ScrollYSide, ScrollXSide]
//     | [ScrollXSide, ScrollYSide],
//   options?: ScrollOptions,
// ): ScrollResult {
function scrollToSide(
  targets: ScrollToSideTargets,
  options?: ScrollOptions,
): ScrollResult {
  const sides: ScrollSide[] = typeof targets === 'string' ? [targets] : targets;
  const position: Partial<ScrollPosition> = {};

  const hasRight = sides.includes('right');
  const hasBottom = sides.includes('bottom');

  if (sides.includes('top')) {
    position.y = 0;
  } else if (sides.includes('left')) {
    position.x = 0;
  }

  if (hasRight || hasBottom) {
    const container =
      (options && options.container) || defaultSettings.container;
    const $container = $(container) as HTMLElement;
    if (!$container) throw error('missing container ' + container);

    if (hasRight) position.x = $container.scrollWidth;
    if (hasBottom) position.y = $container.scrollHeight;
  }

  return scrollTo(position, options);
}

export function scrollToTop(options?: ScrollOptions) {
  return scrollToSide('top', options);
}

export function scrollToRight(options?: ScrollOptions) {
  return scrollToSide('right', options);
}

export function scrollToBottom(options?: ScrollOptions) {
  return scrollToSide('bottom', options);
}

export function scrollToLeft(options?: ScrollOptions) {
  return scrollToSide('left', options);
}

export function scrollToLeftTop(options?: ScrollOptions) {
  return scrollToSide(['left', 'top'], options);
}

export function scrollToLeftBottom(options?: ScrollOptions) {
  return scrollToSide(['left', 'bottom'], options);
}

export function scrollToRightTop(options?: ScrollOptions) {
  return scrollToSide(['right', 'top'], options);
}

export function scrollToRightBottom(options?: ScrollOptions) {
  return scrollToSide(['right', 'bottom'], options);
}

export default scrollToSide;
