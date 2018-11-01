export declare function isBodyElement(el: Element): el is HTMLBodyElement;
export declare function getContainerDimension(el: Element): {
    width: number;
    height: number;
};
export declare function $(selectorOrElement: string | Element): HTMLElement | null;
export declare function cumulativeOffset(element: Element): {
    top: number;
    left: number;
};
export declare type HTMLElementEventMapKey = keyof HTMLElementEventMap | 'DOMMouseScroll' | 'mousewheel';
export declare function on(element: Element, events: HTMLElementEventMapKey | HTMLElementEventMapKey[], handler: EventListenerOrEventListenerObject, opts?: {
    passive: boolean;
}): void;
export declare function off(element: Element, events: HTMLElementEventMapKey | HTMLElementEventMapKey[], handler: EventListenerOrEventListenerObject): void;
export declare function warn(message: string): void;
export declare function error(message: string): Error;
