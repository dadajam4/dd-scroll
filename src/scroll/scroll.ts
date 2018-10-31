import BezierEasing, { EasingFunction } from 'bezier-easing';
import easings, { EasingName, EasingValues } from './easings';
import {
  $,
  on,
  off,
  getContainerDimension,
  HTMLElementEventMapKey,
  error,
} from './util';

export interface ScrollSettings {
  container: string | Element;
  duration: number;
  easing: EasingName;
  cancelable: boolean;
  onProgoress?: ScrollCallback;
  onCancel?: ScrollCallback;
  onDone?: ScrollCallback;
}

export type ScrollOptions = Partial<ScrollSettings>;

export type ScrollCanceller = (
  event?: Event | null,
  checkCancelable?: boolean,
) => void;

export interface ScrollResult {
  cancel: ScrollCanceller;
  promise: Promise<void>; // resolve when done or cancel
  plans: { x: number; y: number };
}

export interface ScrollCallbackValues {
  container: Element;
  progress: number;
  aborted: boolean;
  abortEventSource: Event | null;
}

export type ScrollCallback = (
  scrollToCallbackValues: ScrollCallbackValues,
) => any;

export interface ScrollPosition {
  x: number;
  y: number;
}

export const defaultSettings: ScrollSettings = {
  get container(): Element {
    return document.scrollingElement as Element;
  },
  duration: 500,
  easing: 'ease',
  cancelable: true,
};

interface ComputedValues {
  $container: HTMLElement;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
}

const abortEvents: HTMLElementEventMapKey[] = [
  'mousedown',
  'wheel',
  'DOMMouseScroll',
  'mousewheel',
  'keyup',
  'touchmove',
];

export default function scrollBy(
  diffX: number,
  diffY: number,
  options: ScrollOptions = {},
  _computedValues?: ComputedValues,
): ScrollResult {
  let $container: HTMLElement;
  let initialX: number;
  let initialY: number;
  let targetX: number;
  let targetY: number;

  const _options = Object.assign({}, defaultSettings, options);
  const {
    container,
    duration,
    easing,
    cancelable,
    onProgoress,
    onCancel,
    onDone,
  } = _options;

  const x = diffX !== 0;
  const y = diffY !== 0;

  if (_computedValues) {
    $container = _computedValues.$container;
    initialX = _computedValues.initialX;
    initialY = _computedValues.initialY;
    targetX = _computedValues.targetX;
    targetY = _computedValues.targetY;
  } else {
    $container = $(container) as HTMLElement;
    if (!$container) throw error('missing container ' + container);
    initialX = $container.scrollLeft;
    initialY = $container.scrollTop;
    targetX = initialX + diffX;
    targetY = initialY + diffY;
  }

  // compute overflow and adjust values
  const { scrollWidth, scrollHeight } = $container;
  const { width, height } = getContainerDimension($container);
  const overflowX = targetX + width - scrollWidth;
  const overflowY = targetY + height - scrollHeight;
  if (overflowX > 0) {
    diffX -= overflowX;
    targetX -= overflowX;
  }
  if (overflowY > 0) {
    diffY -= overflowY;
    targetY -= overflowY;
  }

  //
  // Setup Temporary values
  //
  let doneResolver: Function;
  let timeStart: number = 0;
  let timeElapsed: number;

  const callbackValues: ScrollCallbackValues = {
    container: $container,
    progress: 0,
    aborted: false,
    abortEventSource: null,
  };

  const result: ScrollResult = {
    cancel: canceller,
    promise: new Promise(resolve => {
      doneResolver = resolve;
    }),
    plans: {
      x: diffX,
      y: diffY,
    },
  };

  //
  // processes
  //
  if (!diffY && !diffX) return initialAbort();

  // setup easings
  let easingValues: EasingValues;
  if (!easing) {
    easingValues = easings.ease;
  } else if (typeof easing === 'string') {
    easingValues = easings[_options.easing];
  } else {
    easingValues = easing;
  }
  const easingFn: EasingFunction = BezierEasing.apply(
    BezierEasing,
    easingValues,
  );

  on($container, abortEvents, abortFn, { passive: true });
  window.requestAnimationFrame(step);
  return result;

  //
  // inner methods
  //
  function doneResolve(): void {
    doneResolver();
  }

  function canceller(e: Event | null = null, checkCancelable: boolean = false) {
    if (checkCancelable && !cancelable) return;
    off($container, abortEvents, abortFn);
    callbackValues.abortEventSource = e;
    callbackValues.aborted = true;
    onCancel && onCancel(callbackValues);
  }

  function abortFn(e: Event) {
    canceller(e, true);
  }

  function initialAbort(e: Event | null = null) {
    canceller(e);
    doneResolve();
    return result;
  }

  function step(timestamp: number): void {
    if (callbackValues.aborted) return done();
    if (!timeStart) timeStart = timestamp;

    timeElapsed = timestamp - timeStart;

    let progress = Math.min(timeElapsed / duration, 1);
    progress = easingFn(progress);
    callbackValues.progress = progress;

    topLeft(initialY + diffY * progress, initialX + diffX * progress);
    onProgoress && onProgoress(callbackValues);

    timeElapsed < duration ? window.requestAnimationFrame(step) : done();
  }

  function topLeft(top: number, left: number) {
    if (y) $container.scrollTop = top;
    if (x) $container.scrollLeft = left;
  }

  function done() {
    if (!callbackValues.aborted) topLeft(targetY, targetX);
    timeStart = 0;
    off($container, abortEvents, abortFn);
    callbackValues.progress = 1;
    if (!callbackValues.aborted && onDone) onDone(callbackValues);
  }
}
