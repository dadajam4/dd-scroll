import { ScrollOptions, ScrollResult } from './scroll';
export declare type ScrollToElementTarget = string | Element;
export interface ScrollToElementSettings {
    offset: number | {
        x: number;
        y: number;
    };
    x: boolean;
    y: boolean;
}
export declare const scrollToElementSettingsDefaults: ScrollToElementSettings;
export declare type ScrollToElementOptions = Partial<ScrollOptions & ScrollToElementSettings>;
export default function scrollToElement(target: ScrollToElementTarget, options?: ScrollToElementOptions): ScrollResult;
