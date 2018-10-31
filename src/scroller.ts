import './polyfills';
import DDEvent from 'dd-event';
import { HAS_WINDOW, loadWindow, error } from './util';
import {
  scrollBy,
  scrollTo,
  scrollToElement,
  scrollToSide,
  scrollToTop,
  scrollToRight,
  scrollToBottom,
  scrollToLeft,
  ScrollResult,
} from './scroll';

type ScrollerEventTarget = Window | Element;
export type ScrollYDirection = 'top' | 'bottom';
export type ScrollXDirection = 'left' | 'right';
export type ScrollDirection = ScrollYDirection | ScrollXDirection;

export type ScrollAxis = 'x' | 'y';

export interface ScrollerSetting {
  el: Element | string;
  scrollStartJudgePx: number;
  scrollingJudgeInterval: number;
  baseAxis: ScrollAxis;
}

export interface ScrollerPayload {
  top: number;
  left: number;
  bottom: number;
  right: number;

  axis: ScrollAxis;

  // directions
  direction: ScrollDirection;
  directionX: ScrollXDirection;
  directionY: ScrollYDirection;

  // tick ammount at element.on('scroll') detect
  tickedX: number;
  tickedY: number;

  // total ammount from scrollStart
  totalX: number;
  totalY: number;
}

interface ScrollerScrollEventMap {
  scrollStart: ScrollerPayload;
  scroll: ScrollerPayload;
  scrollEnd: ScrollerPayload;
}

export interface ScrollerEventMap extends ScrollerScrollEventMap {
  ready: void;
  changeState: ScrollerState;
  resize: { width: number; height: number };
  changeAxis: ScrollAxis;
  changeLastDirection: ScrollDirection;
  changeLastYDirection: ScrollYDirection;
  changeLastXDirection: ScrollXDirection;
}

export enum ScrollerState {
  Pending = 'pending',
  Ready = 'ready',
  Running = 'running',
  Destroyed = 'destroyed',
}

const DEFAULT_SCROLL_START_JUDGE_PX = 0;
const DEFAULT_SCROLLING_JUDGE_INTERVAL = 500;
const DEFAULT_BASE_AXIS: ScrollAxis = 'y';

export interface ScrollerObserver {
  state: ScrollerState;
  isPending: boolean;
  isReady: boolean;
  isRunning: boolean;
  isDestroyed: boolean;
  containerWidth: number;
  containerHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  scrollTop: number;
  scrollLeft: number;
  scrollRight: number;
  scrollBottom: number;
  lastAxis: ScrollAxis;
  lastDirection: ScrollDirection;
  lastYDirection: ScrollYDirection;
  lastXDirection: ScrollXDirection;
  nowScrolling: boolean;
}

export type ScrollerObservableKeys = keyof ScrollerObserver;
export const scrollerObservableKeys: ScrollerObservableKeys[] = [
  'state',
  'isPending',
  'isReady',
  'isRunning',
  'isDestroyed',
  'containerWidth',
  'containerHeight',
  'scrollWidth',
  'scrollHeight',
  'scrollTop',
  'scrollLeft',
  'scrollRight',
  'scrollBottom',
  'lastAxis',
  'lastDirection',
  'lastYDirection',
  'lastXDirection',
  'nowScrolling',
];

interface ScrollerScrolls {
  by: typeof scrollBy;
  to: typeof scrollTo;
  toElement: typeof scrollToElement;
  toSide: typeof scrollToSide;
  toTop: typeof scrollToTop;
  toRight: typeof scrollToRight;
  toBottom: typeof scrollToBottom;
  toLeft: typeof scrollToLeft;
}

interface Scroller extends ScrollerScrolls {}

class Scroller extends DDEvent<ScrollerEventMap> implements ScrollerScrolls {
  scrollStartJudgePx = DEFAULT_SCROLL_START_JUDGE_PX;
  scrollingJudgeInterval = DEFAULT_SCROLLING_JUDGE_INTERVAL;
  baseAxis: ScrollAxis = DEFAULT_BASE_AXIS;

  get el(): Element {
    return this._el;
  }
  get state(): ScrollerState {
    return this._state;
  }
  get isPending(): boolean {
    return this._state === ScrollerState.Pending;
  }
  get isReady(): boolean {
    return this._state === ScrollerState.Ready;
  }
  get isRunning(): boolean {
    return this._state === ScrollerState.Running;
  }
  get isDestroyed(): boolean {
    return this._state === ScrollerState.Destroyed;
  }
  get containerWidth(): number {
    return this._containerWidth;
  }
  get containerHeight(): number {
    return this._containerHeight;
  }
  get scrollWidth(): number {
    return this._scrollWidth;
  }
  get scrollHeight(): number {
    return this._scrollHeight;
  }
  get scrollTop(): number {
    return this._scrollTop;
  }
  set scrollTop(scrollTop: number) {
    if (!this.el) return;
    this.el.scrollTop = scrollTop;
  }
  get scrollRight(): number {
    return this._scrollRight;
  }
  set scrollRight(scrollRight: number) {
    if (!this.el) return;
    this.el.scrollLeft = this._scrollWidth - this._containerWidth - scrollRight;
  }
  get scrollBottom(): number {
    return this._scrollBottom;
  }
  set scrollBottom(scrollBottom: number) {
    if (!this.el) return;
    this.el.scrollTop =
      this._scrollHeight - this._containerHeight - scrollBottom;
  }
  get scrollLeft(): number {
    return this._scrollLeft;
  }
  set scrollLeft(scrollLeft: number) {
    if (!this.el) return;
    this.el.scrollLeft = scrollLeft;
  }
  get nowScrolling(): boolean {
    return this._nowScrolling;
  }
  get lastAxis(): ScrollAxis {
    return this._lastAxis;
  }
  get lastDirection(): ScrollDirection {
    return this._lastDirection;
  }
  get lastYDirection(): ScrollYDirection {
    return this._lastYDirection;
  }
  get lastXDirection(): ScrollXDirection {
    return this._lastXDirection;
  }
  get lastPayload(): ScrollerPayload {
    return {
      top: this._scrollTop,
      left: this._scrollLeft,
      bottom: this._scrollBottom,
      right: this._scrollRight,
      axis: this._lastAxis,
      direction: this._lastDirection,
      directionX: this._lastXDirection,
      directionY: this._lastYDirection,
      tickedX: this._tickedX,
      tickedY: this._tickedY,
      totalX: this._lastTotalX,
      totalY: this._lastTotalY,
    };
  }

  private _el!: Element;
  private _eventTarget!: ScrollerEventTarget;
  private _isDocumentElement: boolean = false;
  private _isBodyElement: boolean = false;
  private _isRootElement: boolean = false;
  private _state: ScrollerState = ScrollerState.Pending;
  private _containerWidth: number = 0;
  private _containerHeight: number = 0;
  private _scrollWidth: number = 0;
  private _scrollHeight: number = 0;
  private _scrollTop: number = 0;
  private _scrollRight: number = 0;
  private _scrollBottom: number = 0;
  private _scrollLeft: number = 0;
  private _lastAxis: ScrollAxis;
  private _lastDirection: ScrollDirection;
  private _lastYDirection: ScrollYDirection = 'top';
  private _lastXDirection: ScrollXDirection = 'left';
  private _nowScrolling: boolean = false;
  private _readyResolvers: Function[] = [];
  private _scrollingJudgeTimerId: number | null = null;
  private _startX: number = 0;
  private _startY: number = 0;
  private _tickedX: number = 0;
  private _tickedY: number = 0;
  private _lastTotalX: number = 0;
  private _lastTotalY: number = 0;
  private _scrollListener?: EventListener;
  private _resizeListener?: EventListener;
  private _resizeObserver?: ResizeObserver;
  private _scrollToResult: ScrollResult | null = null;
  private _observers: ScrollerObserver[] = [];

  constructor(setting: Partial<ScrollerSetting> | Element | string = {}) {
    super();

    const convertedSetting: Partial<ScrollerSetting> =
      typeof setting === 'string' || (HAS_WINDOW && setting instanceof Element)
        ? (setting = { el: <Element | string>setting })
        : (setting as Partial<ScrollerSetting>);

    if (convertedSetting.scrollStartJudgePx !== undefined)
      this.scrollStartJudgePx = convertedSetting.scrollStartJudgePx;

    if (convertedSetting.scrollingJudgeInterval !== undefined)
      this.scrollingJudgeInterval = convertedSetting.scrollingJudgeInterval;

    if (convertedSetting.baseAxis) this.baseAxis = convertedSetting.baseAxis;
    this._lastAxis = this.baseAxis;

    this._lastDirection = this._lastAxis === 'y' ? 'top' : 'left';

    // for SSR
    if (!HAS_WINDOW) return;

    // Skip auto setup when missing scrolling element.
    this.setElement(convertedSetting.el);
  }

  setElement(el?: Element | string) {
    if (!HAS_WINDOW)
      error('Element can be set only when it is under DOM contest.');

    this.stop();

    let _el: Element | null;
    if (typeof el === 'string') {
      _el = document.querySelector(el);
    } else {
      _el = el || document.scrollingElement;
    }
    if (!_el) throw error('missing scrolling element ' + el);

    this._el = _el;
    this._isDocumentElement = this._el.constructor === HTMLHtmlElement;
    this._isBodyElement = this._el.constructor === HTMLBodyElement;
    this._isRootElement = this._isDocumentElement || this._isBodyElement;
    this._eventTarget =
      this._isDocumentElement || this._isBodyElement ? window : this._el;

    this._setup();
  }

  ready(): Promise<void> {
    this._checkDestroyed();
    if (!this.isPending) return Promise.resolve();
    return new Promise(resolve => this._readyResolvers.push(resolve));
  }

  async start(): Promise<void> {
    this._checkDestroyed();
    if (this.isRunning) return;
    await this.ready();
    this._startListeners();
    this._setState(ScrollerState.Running);
  }

  stop(): void {
    this._checkDestroyed();
    if (!this.isRunning) return;
    this._stopListeners();
    this._setState(ScrollerState.Ready);
  }

  destroy() {
    if (this.isDestroyed) return;
    this.stop();
    this.cancel();
    this._readyResolvers = [];
    this._observers = [];

    delete this._el;
    delete this._eventTarget;
    delete this._scrollListener;
    delete this._resizeListener;
    delete this._resizeObserver;
    delete this._scrollToResult;

    this._setState(ScrollerState.Destroyed);
    this.offAll();
  }

  cancel() {
    if (!this._scrollToResult) return;
    this._scrollToResult.cancel();
    this._clearScrollToResult();
  }

  update(): void {
    this._update();
  }

  toJSON(): ScrollerObserver {
    const json: Partial<ScrollerObserver> = {};
    for (const key of scrollerObservableKeys) {
      json[key] = this[key];
    }
    return <ScrollerObserver>json;
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }

  observe(observer: ScrollerObserver): () => void {
    if (!this._observers.includes(observer)) {
      this._observers.push(observer);
    }
    this._syncToObserver(observer);
    const unobserve = () => {
      this.unobserve(observer);
    };
    return unobserve;
  }

  unobserve(observer: ScrollerObserver) {
    const index = this._observers.indexOf(observer);
    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  private async _setup(): Promise<void> {
    await loadWindow();
    this._update();
    this._setState(ScrollerState.Ready);
    this.start();
    this.emit('ready');
    this._readyResolvers.forEach(resolve => resolve());
    this._readyResolvers = [];
  }

  private _setState(state: ScrollerState): void {
    if (this._state !== state) {
      this._state = state;
      this._syncToObservers([
        'state',
        'isPending',
        'isReady',
        'isRunning',
        'isDestroyed',
      ]);
      this.emit('changeState', state);
    }
  }

  private _checkDestroyed(): void {
    if (this.isDestroyed) throw error('already destroyed.');
  }

  private _update(width?: number, height?: number): void {
    this._updateContainerSize(width, height);
    this._updateScrollSize();
    this._updateScrollPositions();
  }

  private _updateContainerSize(
    width: number = this._isBodyElement
      ? // ? window.innerWidth
        (document.documentElement as HTMLElement).clientWidth
      : this.el.clientWidth,
    height: number = this._isBodyElement
      ? // ? window.innerHeight
        (document.documentElement as HTMLElement).clientHeight
      : this.el.clientHeight,
  ): void {
    const { _containerWidth, _containerHeight } = this;
    this._containerWidth = width;
    this._containerHeight = height;
    if (width !== _containerWidth || height !== _containerHeight) {
      this._syncToObservers(['containerWidth', 'containerHeight']);
      this.emit('resize', { width, height });
    }
  }

  private _updateScrollSize(): void {
    const { _scrollWidth, _scrollHeight } = this;
    this._scrollWidth = this.el.scrollWidth;
    this._scrollHeight = this.el.scrollHeight;
    if (
      _scrollWidth !== this._scrollWidth ||
      _scrollHeight !== this._scrollHeight
    ) {
      this._syncToObservers(['scrollWidth', 'scrollHeight']);
    }
  }

  private _updateScrollPositions(): void {
    this._scrollTop = this.el.scrollTop;
    this._scrollLeft = this.el.scrollLeft;

    // advanced values
    this._scrollBottom =
      this._scrollHeight - this._scrollTop - this._containerHeight;
    this._scrollRight =
      this._scrollWidth - this._scrollLeft - this._containerWidth;

    this._syncToObservers([
      'scrollTop',
      'scrollRight',
      'scrollBottom',
      'scrollLeft',
    ]);
  }

  private _startListeners() {
    this._stopListeners();

    this._scrollListener = () => {
      this._onScroll();
    };
    this._eventTarget.addEventListener('scroll', this._scrollListener, false);

    if (this._isRootElement) {
      this._resizeListener = () => {
        this._onResize();
      };
      window.addEventListener('resize', this._resizeListener, false);
    } else {
      this._resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          this._onResize(width, height);
        }
      });
      this._resizeObserver.observe(this._el);
    }
  }

  private _stopListeners() {
    if (this._scrollListener) {
      this._eventTarget.removeEventListener(
        'scroll',
        this._scrollListener,
        false,
      );
      delete this._scrollListener;
    }

    if (this._resizeListener) {
      if (this._isDocumentElement) {
        window.removeEventListener('resize', this._resizeListener, false);
        delete this._resizeListener;
      }
    }

    if (this._resizeObserver) {
      this._resizeObserver.unobserve(this._el);
      this._resizeObserver.disconnect();
      delete this._resizeObserver;
    }
  }

  private _clearScrollingJudgeTimer() {
    if (this._scrollingJudgeTimerId !== null) {
      clearTimeout(this._scrollingJudgeTimerId);
      this._scrollingJudgeTimerId = null;
    }
  }

  private _onResize(width?: number, height?: number) {
    this._update(width, height);
  }

  private _triggerScrollTick(event: keyof ScrollerScrollEventMap): void {
    const { _nowScrolling } = this;

    if (event === 'scrollStart') {
      this._startX = this._scrollLeft;
      this._startY = this._scrollTop;
      this._lastTotalX = 0;
      this._lastTotalY = 0;
      this._nowScrolling = true;
    } else if (event === 'scrollEnd') {
      this._nowScrolling = false;
    }

    if (_nowScrolling !== this._nowScrolling) {
      this._syncToObservers('nowScrolling');
    }
    this.emit(event, this.lastPayload);
  }

  private _onScroll() {
    // remenber before values
    const {
      _scrollTop,
      _scrollLeft,
      _lastAxis,
      _lastDirection,
      _lastXDirection,
      _lastYDirection,
    } = this;

    // ,,,and next update values
    this._updateScrollPositions();

    // calicurate scrolled ammount at (ticked time)
    const tickedX = this._scrollLeft - _scrollLeft;
    const tickedY = this._scrollTop - _scrollTop;
    this._tickedX = tickedX;
    this._tickedY = tickedY;

    // update axis
    if (tickedX === tickedY) {
      this._lastAxis = this.baseAxis;
    } else {
      this._lastAxis = Math.abs(tickedX) > Math.abs(tickedY) ? 'x' : 'y';
    }

    // update directions
    if (_scrollTop < this._scrollTop) {
      this._lastYDirection = 'bottom';
    } else if (_scrollTop > this._scrollTop) {
      this._lastYDirection = 'top';
    }

    if (_scrollLeft < this._scrollLeft) {
      this._lastXDirection = 'right';
    } else if (_scrollLeft > this._scrollLeft) {
      this._lastXDirection = 'left';
    }

    this._lastDirection =
      this._lastAxis === 'y' ? this._lastYDirection : this._lastXDirection;

    // judge scroll end by before axis and directions
    const axisIsChanged = this._lastAxis !== _lastAxis;
    const lastXDirectionIsChanged = this._lastXDirection !== _lastXDirection;
    const lastYDirectionIsChanged = this._lastYDirection !== _lastYDirection;
    const lastDirectionIsChanged = this._lastDirection !== _lastDirection;

    if (axisIsChanged) {
      this.emit('changeAxis', this._lastAxis);
    }

    if (lastXDirectionIsChanged) {
      this.emit('changeLastXDirection', this._lastXDirection);
    }

    if (lastYDirectionIsChanged) {
      this.emit('changeLastYDirection', this._lastYDirection);
    }

    if (lastDirectionIsChanged) {
      this.emit('changeLastDirection', this._lastDirection);
    }

    if (
      axisIsChanged ||
      lastXDirectionIsChanged ||
      lastYDirectionIsChanged ||
      lastDirectionIsChanged
    ) {
      this._syncToObservers([
        'lastAxis',
        'lastDirection',
        'lastYDirection',
        'lastXDirection',
      ]);
    }

    if (this._nowScrolling) {
      if (
        axisIsChanged ||
        (_lastAxis === 'y' && lastYDirectionIsChanged) ||
        (_lastAxis === 'x' && lastXDirectionIsChanged)
      ) {
        // emit scroll end & start(both)
        this._triggerScrollTick('scrollEnd');
      } else {
        // add scroll ammounts
        this._lastTotalX = this._scrollLeft - this._startX;
        this._lastTotalY = this._scrollTop - this._startY;
        this._triggerScrollTick('scroll');
      }
    }

    // judge scroll start
    if (!this._nowScrolling) {
      this._triggerScrollTick('scrollStart');
    }

    this._clearScrollingJudgeTimer();
    this._scrollingJudgeTimerId = window.setTimeout(() => {
      this._triggerScrollTick('scrollEnd');
    }, this.scrollingJudgeInterval);
  }

  private _clearScrollToResult() {
    if (!this._scrollToResult) return;
    this._scrollToResult = null;
  }

  private _syncToObserver(
    observer: ScrollerObserver,
    keys: ScrollerObservableKeys[] = scrollerObservableKeys,
  ) {
    for (const key of keys) {
      observer[key] = this[key];
    }
  }

  private _syncToObservers(
    keys: ScrollerObservableKeys | ScrollerObservableKeys[],
  ) {
    if (this._observers.length === 0) return;
    keys = typeof keys === 'string' ? [keys] : keys;
    for (const observer of this._observers) {
      this._syncToObserver(observer, keys);
    }
  }
}

interface PrototypeMap {
  key: keyof ScrollerScrolls,
  i: number;
  f: Function;
}

const prototypeMappings: PrototypeMap[] = [
  { key: 'by', i: 2, f: scrollBy },
  { key: 'to', i: 1, f: scrollTo },
  { key: 'toElement', i: 1, f: scrollToElement },
  { key: 'toSide', i: 1, f: scrollToSide },
  { key: 'toTop', i: 0, f: scrollToTop },
  { key: 'toRight', i: 0, f: scrollToRight },
  { key: 'toBottom', i: 0, f: scrollToBottom },
  { key: 'toLeft', i: 0, f: scrollToLeft },
];

for (const define of prototypeMappings) {
  const key = define.key;
  const optioinsIndex = define.i;
  const func = define.f;
  const isElement = key === 'toElement';
  (Scroller as any).prototype[key] = function(...args: any[]) {
    const self = this as Scroller;
    const options: any = {
      ...args[optioinsIndex],
    };
    options.container = self.el;

    if (isElement) {
      if (options.x === undefined) options.x = this.baseAxis === 'x';
      if (options.y === undefined) options.y = this.baseAxis === 'y';
    }

    const createdArgs = [...args];
    createdArgs[optioinsIndex] = options;
    this._scrollToResult = func(...createdArgs);
    this._scrollToResult.promise.then(() => {
      this._clearScrollToResult();
    });
    return this._scrollToResult;
  };
}

export default Scroller;
