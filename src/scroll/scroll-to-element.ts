import scroll, { ScrollOptions, ScrollResult, defaultSettings } from './scroll';
import { $, cumulativeOffset, error } from './util';

export type ScrollToElementTarget = string | Element;

export interface ScrollToElementSettings {
  offset: number | { x: number; y: number };
  x: boolean;
  y: boolean;
}

export const scrollToElementSettingsDefaults: ScrollToElementSettings = {
  offset: 0,
  x: false,
  y: true,
};

export type ScrollToElementOptions = Partial<
  ScrollOptions & ScrollToElementSettings
>;

export default function scrollToElement(
  target: ScrollToElementTarget,
  options: ScrollToElementOptions = {},
): ScrollResult {
  //
  // Setup Options
  //

  const _options = Object.assign({}, scrollToElementSettingsDefaults, options);

  const { x, y } = _options;

  const offsetSource = _options.offset;

  const offset =
    typeof offsetSource === 'number'
      ? { x: offsetSource, y: offsetSource }
      : offsetSource;

  //
  // Setup Elements
  //

  const $target = $(target) as HTMLElement;
  if (!$target) throw error('missing element ' + target);

  const container = _options.container || defaultSettings.container;
  const $container = $(container) as HTMLElement;
  if (!$container) throw error('missing container ' + container);

  const cumulativeOffsetContainer = cumulativeOffset($container);
  const cumulativeOffsetTarget = cumulativeOffset($target);

  const initialY = $container.scrollTop;
  const initialX = $container.scrollLeft;

  const targetY =
    cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + offset.y;

  const targetX =
    cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + offset.x;

  const diffX = x ? targetX - initialX : 0;
  const diffY = y ? targetY - initialY : 0;

  return scroll(diffX, diffY, _options, {
    $container,
    initialX,
    initialY,
    targetX,
    targetY,
  });
}
