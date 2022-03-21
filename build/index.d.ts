declare namespace ASync {
    type Selection = (HTMLElement[] | NodeListOf<HTMLElement>) & Array<HTMLElement>;
    type TimingFunction = (t: number) => number;
    type TransitionCallback = (t: number, selection: Selection) => any;
}
declare const is: {
    array: (item: any) => boolean;
    DOM: (item: any) => any;
};
declare const now: () => number;
declare let selection: ASync.Selection;
declare function ASync(query: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>): typeof ASync;
declare namespace ASync {
    var on: (event: string | string[], callback: (e: Event) => void) => void;
    var css: {
        /**
         * Sets a global CSS variable on the `:root` element.
         */
        setVar: (property: string, value: string) => void;
        /**
         * Returns value of a global CSS variable if it exists.
         */
        getVar: (property: string) => string;
        /**
         * Applies the computed style for a given CSS property to an inline `style` tag.
         * This is to prevent glitches while performing transitions on element which are styled using
         * external CSS.
         */
        computedToInline: (property: string) => typeof ASync;
    };
    var m: {
        /**
         * Returns random number between two given input values.
         * Makes use of `Math.random()`.
         */
        rand: (min: number, max: number) => number;
        /**
         * Returns the average value from an array of numbers.
         */
        avg: (numbers: number[]) => number;
        /**
         * **Utility method.**
         *
         * Works similarly to `int.toString(16)`.
         * Replaces empty char with a zero for use in other library methods.
         */
        hex: (int: number) => string;
        /**
         * Caps the value in a range specified by `min` and `max`.
         * ```js
         * ASync.m.minMax(-1, 0, 10) // 0
         * ASync.m.minMax(5, 0, 10)  // 5
         * ASync.m.minMax(11, 0, 10) // 10
         * ```
         */
        minMax: (value: number, min: number, max: number) => number;
        /**
         * Returns a transition from two numbers, based on `t`.
         * ```js
         * ASync.m.fromTo(0.5, 20, 70) // 45
         * ```
         */
        fromTo: (t: number, from: number, to: number) => number;
        /**
         * Takes a hex color code and returns an RGB CSS function.
         * ```js
         * ASync.m.rgbToHex('rgb(75, 221, 201)') // #4cddca
         * ```
         */
        hexToRgb: (hex: string) => string;
        /**
         * Takes an RGB color function and returns a hex code.
         * ```js
         * ASync.m.rgbToHex('rgb(75, 221, 201)') // #4cddca
         * ```
         */
        rgbToHex: (string: string) => string;
        /**
         * Returns a value between two hex colors based on the progress of a transition `t`.
         * ```js
         * ASync.m.hexTransform(0.5, '000000', 'ffffff') // 888888
         * ```
         */
        hexTransform: (t: number, from: string, to: string) => string;
    };
    var f: {
        easeInQuad: (t: number) => number;
        easeInCubic: (t: number) => number;
        easeInQuart: (t: number) => number;
        easeInQuint: (t: number) => number;
        easeInCirc: (t: number) => number;
        easeInExpo: (t: number) => number;
        easeOutQuad: (t: number) => number;
        easeOutCubic: (t: number) => number;
        easeOutQuart: (t: number) => number;
        easeOutQuint: (t: number) => number;
        easeOutCirc: (t: number) => number;
        easeOutExpo: (t: number) => number;
        easeInOutQuad: (t: number) => number;
        easeInOutCubic: (t: number) => number;
        easeInOutQuart: (t: number) => number;
        easeInOutQuint: (t: number) => number;
        easeInOutCirc: (t: number) => number;
        easeInOutExpo: (t: number) => number;
        easeOutElastic: (t: number) => number;
        easeOutBounce: (t: number) => number;
    };
    var time: (delay: number, callback?: Function | undefined) => Promise<void>;
    var transition: (duration: number, next: number | null, f: TimingFunction, callback: TransitionCallback) => Promise<void>;
    var transform: (property: string, value: string | number) => typeof ASync;
    var addClass: (classname: string) => typeof ASync;
    var removeClass: (classname: string) => typeof ASync;
    var toggleClass: (classname: string) => typeof ASync;
    var e: {
        partReveal: (duration: number, translateByPercent: number, skewByDeg: number, timingFunction?: ((t: number) => number) | undefined) => void;
    };
}
declare let math: {
    /**
     * Returns random number between two given input values.
     * Makes use of `Math.random()`.
     */
    rand: (min: number, max: number) => number;
    /**
     * Returns the average value from an array of numbers.
     */
    avg: (numbers: number[]) => number;
    /**
     * **Utility method.**
     *
     * Works similarly to `int.toString(16)`.
     * Replaces empty char with a zero for use in other library methods.
     */
    hex: (int: number) => string;
    /**
     * Caps the value in a range specified by `min` and `max`.
     * ```js
     * ASync.m.minMax(-1, 0, 10) // 0
     * ASync.m.minMax(5, 0, 10)  // 5
     * ASync.m.minMax(11, 0, 10) // 10
     * ```
     */
    minMax: (value: number, min: number, max: number) => number;
    /**
     * Returns a transition from two numbers, based on `t`.
     * ```js
     * ASync.m.fromTo(0.5, 20, 70) // 45
     * ```
     */
    fromTo: (t: number, from: number, to: number) => number;
    /**
     * Takes a hex color code and returns an RGB CSS function.
     * ```js
     * ASync.m.rgbToHex('rgb(75, 221, 201)') // #4cddca
     * ```
     */
    hexToRgb: (hex: string) => string;
    /**
     * Takes an RGB color function and returns a hex code.
     * ```js
     * ASync.m.rgbToHex('rgb(75, 221, 201)') // #4cddca
     * ```
     */
    rgbToHex: (string: string) => string;
    /**
     * Returns a value between two hex colors based on the progress of a transition `t`.
     * ```js
     * ASync.m.hexTransform(0.5, '000000', 'ffffff') // 888888
     * ```
     */
    hexTransform: (t: number, from: string, to: string) => string;
};
declare const c4: number;
declare const n1 = 7.5625;
declare const d1 = 2.75;
declare const f: {
    easeInQuad: (t: number) => number;
    easeInCubic: (t: number) => number;
    easeInQuart: (t: number) => number;
    easeInQuint: (t: number) => number;
    easeInCirc: (t: number) => number;
    easeInExpo: (t: number) => number;
    easeOutQuad: (t: number) => number;
    easeOutCubic: (t: number) => number;
    easeOutQuart: (t: number) => number;
    easeOutQuint: (t: number) => number;
    easeOutCirc: (t: number) => number;
    easeOutExpo: (t: number) => number;
    easeInOutQuad: (t: number) => number;
    easeInOutCubic: (t: number) => number;
    easeInOutQuart: (t: number) => number;
    easeInOutQuint: (t: number) => number;
    easeInOutCirc: (t: number) => number;
    easeInOutExpo: (t: number) => number;
    easeOutElastic: (t: number) => number;
    easeOutBounce: (t: number) => number;
};
/**
 * Can be used exactly like native `setTimeout` but with swapped parameters for readability.
 * Returns a promise that is resolved after the callback fires, which can be used to easily
 * implement delays in existing code like so:
 * ```js
 * console.log('start')
 * await ASync.time(1000) // 1s
 * console.log('end')
 * ```
 */
declare const timeFunction: (delay: number, callback?: Function | undefined) => Promise<void>;
/**
 * Creates a transition of specific duration.
 * Takes the `duration` (ms), a number `"next"` that determines after what amount of time
 * the animation is resolved - this allows for transitions that overlap in time.
 * A timing function `"f"` that determines the transition curve and the `callback` function
 * that specifies the logic of the animation.
 *
 * Example:
 * ```js
 * await ASync('query').transition(1000, 500, ASync.f.easeInOutQuad, (t, elems) => {
 *    elems.forEach(elem => elem.style.transform = `translateX(${20 * t}px)`)
 * });
 * ```
 */
declare const transition: (duration: number, next: number | null, f: ASync.TimingFunction, callback: ASync.TransitionCallback) => Promise<void>;
declare type TIndex = {
    [index: string]: Function;
};
declare const transforms: TIndex;
