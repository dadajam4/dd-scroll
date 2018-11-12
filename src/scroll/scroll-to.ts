import scroll, {
  ScrollPosition,
  ScrollOptions,
  defaultSettings,
} from './scroll-by-internal';
import { $, error } from './util';

export default function scrollTo(
  { x, y }: Partial<ScrollPosition>,
  options: ScrollOptions = {},
) {
  const container = options.container || defaultSettings.container;
  const $container = $(container) as HTMLElement;
  if (!$container) throw error('missing container ' + container);
  const initialY = $container.scrollTop;
  const initialX = $container.scrollLeft;
  if (x === undefined) x = initialX;
  if (y === undefined) y = initialY;
  const diffX = x - initialX;
  const diffY = y - initialY;

  return scroll(diffX, diffY, options, {
    $container,
    initialX,
    initialY,
    targetX: x,
    targetY: y,
  });
}
