declare const easings: {
    ease: number[];
    linear: number[];
    'ease-in': number[];
    'ease-out': number[];
    'ease-in-out': number[];
};
export declare type EasingName = keyof typeof easings;
export declare type EasingValues = number[];
export default easings;
