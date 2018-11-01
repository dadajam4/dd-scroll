import { EasingName } from './easings';
export interface ScrollSettings {
    container: string | Element;
    duration: number;
    easing: EasingName;
    cancelable: boolean;
    onProgoress?: ScrollCallback;
    onCancel?: ScrollCallback;
    onDone?: ScrollCallback;
}
export declare type ScrollOptions = Partial<ScrollSettings>;
export declare type ScrollCanceller = (event?: Event | null, checkCancelable?: boolean) => void;
export interface ScrollResult {
    cancel: ScrollCanceller;
    promise: Promise<void>;
    plans: {
        x: number;
        y: number;
    };
}
export interface ScrollCallbackValues {
    container: Element;
    progress: number;
    aborted: boolean;
    abortEventSource: Event | null;
}
export declare type ScrollCallback = (scrollToCallbackValues: ScrollCallbackValues) => any;
export interface ScrollPosition {
    x: number;
    y: number;
}
export declare const defaultSettings: ScrollSettings;
interface ComputedValues {
    $container: HTMLElement;
    initialX: number;
    initialY: number;
    targetX: number;
    targetY: number;
}
export default function scroll(diffX: number, diffY: number, options?: ScrollOptions, _computedValues?: ComputedValues): ScrollResult;
export {};
