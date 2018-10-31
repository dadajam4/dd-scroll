import scroll, { ScrollOptions, ScrollResult } from './scroll';

export default function scrollBy(
  diffX: number,
  diffY: number,
  options?: ScrollOptions,
): ScrollResult {
  return scroll(diffX, diffY, options);
}
