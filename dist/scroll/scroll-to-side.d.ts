import { ScrollOptions, ScrollResult } from './scroll';
export declare type ScrollYSide = 'top' | 'bottom';
export declare type ScrollXSide = 'left' | 'right';
export declare type ScrollSide = ScrollYSide | ScrollXSide;
declare function scrollToSide(side: ScrollSide, options?: ScrollOptions): ScrollResult;
declare function scrollToSide(sides: [ScrollSide], options?: ScrollOptions): ScrollResult;
declare function scrollToSide(sides: [ScrollYSide, ScrollXSide] | [ScrollXSide, ScrollYSide], options?: ScrollOptions): ScrollResult;
export declare function scrollToTop(options?: ScrollOptions): ScrollResult;
export declare function scrollToRight(options?: ScrollOptions): ScrollResult;
export declare function scrollToBottom(options?: ScrollOptions): ScrollResult;
export declare function scrollToLeft(options?: ScrollOptions): ScrollResult;
export default scrollToSide;