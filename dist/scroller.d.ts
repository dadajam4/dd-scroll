import './polyfills';
import DDEvent from 'dd-event';
import { scrollBy, scrollTo, scrollToElement, scrollToSide, scrollToTop, scrollToRight, scrollToBottom, scrollToLeft } from './scroll';
export * from './scroll';
export declare type ScrollYDirection = 'top' | 'bottom';
export declare type ScrollXDirection = 'left' | 'right';
export declare type ScrollDirection = ScrollYDirection | ScrollXDirection;
export declare type ScrollAxis = 'x' | 'y';
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
    direction: ScrollDirection;
    directionX: ScrollXDirection;
    directionY: ScrollYDirection;
    tickedX: number;
    tickedY: number;
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
    resize: {
        width: number;
        height: number;
    };
    changeAxis: ScrollAxis;
    changeLastDirection: ScrollDirection;
    changeLastYDirection: ScrollYDirection;
    changeLastXDirection: ScrollXDirection;
}
export declare enum ScrollerState {
    Pending = "pending",
    Ready = "ready",
    Running = "running",
    Destroyed = "destroyed"
}
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
export declare type ScrollerObservableKeys = keyof ScrollerObserver;
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
interface Scroller extends ScrollerScrolls {
}
declare class Scroller extends DDEvent<ScrollerEventMap> implements ScrollerScrolls {
    static readonly scrollerObservableKeys: ("state" | "isPending" | "isReady" | "isRunning" | "isDestroyed" | "containerWidth" | "containerHeight" | "scrollWidth" | "scrollHeight" | "scrollTop" | "scrollLeft" | "scrollRight" | "scrollBottom" | "lastAxis" | "lastDirection" | "lastYDirection" | "lastXDirection" | "nowScrolling")[];
    static readonly States: typeof ScrollerState;
    scrollStartJudgePx: number;
    scrollingJudgeInterval: number;
    baseAxis: ScrollAxis;
    readonly el: Element;
    readonly state: ScrollerState;
    readonly isPending: boolean;
    readonly isReady: boolean;
    readonly isRunning: boolean;
    readonly isDestroyed: boolean;
    readonly containerWidth: number;
    readonly containerHeight: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    scrollTop: number;
    scrollRight: number;
    scrollBottom: number;
    scrollLeft: number;
    readonly nowScrolling: boolean;
    readonly lastAxis: ScrollAxis;
    readonly lastDirection: ScrollDirection;
    readonly lastYDirection: ScrollYDirection;
    readonly lastXDirection: ScrollXDirection;
    readonly lastPayload: ScrollerPayload;
    private _el;
    private _eventTarget;
    private _isDocumentElement;
    private _isBodyElement;
    private _isRootElement;
    private _state;
    private _containerWidth;
    private _containerHeight;
    private _scrollWidth;
    private _scrollHeight;
    private _scrollTop;
    private _scrollRight;
    private _scrollBottom;
    private _scrollLeft;
    private _lastAxis;
    private _lastDirection;
    private _lastYDirection;
    private _lastXDirection;
    private _nowScrolling;
    private _readyResolvers;
    private _scrollingJudgeTimerId;
    private _startX;
    private _startY;
    private _tickedX;
    private _tickedY;
    private _lastTotalX;
    private _lastTotalY;
    private _scrollListener?;
    private _resizeListener?;
    private _resizeObserver?;
    private _scrollToResult;
    private _observers;
    constructor(setting?: Partial<ScrollerSetting> | Element | string);
    setElement(el?: Element | string): void;
    ready(): Promise<void>;
    start(): Promise<void>;
    stop(): void;
    destroy(): void;
    cancel(): void;
    update(): void;
    toJSON(): ScrollerObserver;
    toString(): string;
    observe(observer: ScrollerObserver): () => void;
    unobserve(observer: ScrollerObserver): void;
    private _setup;
    private _setState;
    private _checkDestroyed;
    private _update;
    private _updateContainerSize;
    private _updateScrollSize;
    private _updateScrollPositions;
    private _startListeners;
    private _stopListeners;
    private _clearScrollingJudgeTimer;
    private _onResize;
    private _triggerScrollTick;
    private _onScroll;
    private _clearScrollToResult;
    private _syncToObserver;
    private _syncToObservers;
}
export default Scroller;
