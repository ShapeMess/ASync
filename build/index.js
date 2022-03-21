"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Type checks
const is = {
    array: (item) => Array.isArray(item),
    DOM: (item) => typeof HTMLElement === "object" ? item instanceof HTMLElement : item && typeof item === "object" && item !== null && item.nodeType === 1 && typeof item.nodeName === "string"
};
const now = performance
    ? performance.now
    : Date.now;
// Element selection
let selection = [];
// Core function
function ASync(query) {
    if (typeof query === 'string')
        selection = document.querySelectorAll(query);
    else if (NodeList.prototype.isPrototypeOf(query))
        selection = query;
    else if (is.array(query))
        selection = query;
    else if (is.DOM(query))
        selection = [query];
    else
        throw new TypeError(`<ASync> Povided query was type of ${typeof query}, expected types: string | HTMLElement | HTMLElement[] | NodeList<HTMLElement>.`);
    return ASync;
}
// ==========================================
// Events
// ==========================================
/**
 * Method used to apply one or more event listeners to all selected elements.
 * ```js
 * ASync('query').on('click', (e) => {})
 * ```
 * Or
 * ```js
 * ASync('query').on(['mouseenter', 'mouseleave'], (e) => {})
 * ```
 */
ASync.on = (event, callback) => {
    if (typeof event === 'string')
        event = [event];
    selection.forEach((item) => {
        event.forEach(e => {
            item.addEventListener(e, callback);
        });
    });
};
// ==========================================
// CSS
// ==========================================
ASync.css = {
    /**
     * Sets a global CSS variable on the `:root` element.
     */
    setVar: (property, value) => document.documentElement.style.setProperty(property, value),
    /**
     * Returns value of a global CSS variable if it exists.
     */
    getVar: (property) => getComputedStyle(document.documentElement).getPropertyValue(property),
    /**
     * Applies the computed style for a given CSS property to an inline `style` tag.
     * This is to prevent glitches while performing transitions on element which are styled using
     * external CSS.
     */
    computedToInline: (property) => {
        const _s = [...selection];
        _s.forEach(elem => {
            //@ts-ignore
            const prop = window.getComputedStyle(elem)[property];
            if (prop !== 'none') {
                //@ts-ignore
                elem.style[property] = prop;
            }
        });
        return ASync;
    }
};
// ==========================================
// Mathematical functions
// ==========================================
let math = {
    /**
     * Returns random number between two given input values.
     * Makes use of `Math.random()`.
     */
    rand: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    /**
     * Returns the average value from an array of numbers.
     */
    // Returns average v from of an array of numbers
    avg: (numbers) => { let x = 0; for (let i = 0; i < numbers.length; i++)
        x += numbers[i]; return x / numbers.length; },
    /**
     * **Utility method.**
     *
     * Works similarly to `int.toString(16)`.
     * Replaces empty char with a zero for use in other library methods.
     */
    hex: (int) => {
        let hex = int.toString(16);
        return hex.length < 2 ? `0${hex}` : `${hex}`;
    },
    /**
     * Caps the value in a range specified by `min` and `max`.
     * ```js
     * ASync.m.minMax(-1, 0, 10) // 0
     * ASync.m.minMax(5, 0, 10)  // 5
     * ASync.m.minMax(11, 0, 10) // 10
     * ```
     */
    minMax: (value, min, max) => value < min ? min : value > max ? max : value,
    /**
     * Returns a transition from two numbers, based on `t`.
     * ```js
     * ASync.m.fromTo(0.5, 20, 70) // 45
     * ```
     */
    fromTo: (t, from, to) => from + ((to - from) * t),
    /**
     * Takes a hex color code and returns an RGB CSS function.
     * ```js
     * ASync.m.rgbToHex('rgb(75, 221, 201)') // #4cddca
     * ```
     */
    hexToRgb: (hex) => {
        // Remove potential hash at the start of the color code
        if (hex[0] === '#')
            hex = hex.substring(1);
        let hexParts = hex.match(/.{1,2}/g);
        let hexPartsNum = [];
        for (let i = 0; i < 3; i++)
            hexPartsNum[i] = parseInt(hexParts[i], 16);
        if (hexParts.length === 4)
            hexPartsNum[3] = (parseInt(hexParts[3]) / 255).toString().substring(0, 5);
        return hexPartsNum.length === 3 ? `rgb(${hexPartsNum.join(', ')})` : `rgba(${hexPartsNum.join(', ')})`;
    },
    /**
     * Takes an RGB color function and returns a hex code.
     * ```js
     * ASync.m.rgbToHex('rgb(75, 221, 201)') // #4cddca
     * ```
     */
    rgbToHex: (string) => {
        let _string = string.replace(/rgba|rgb|\(|\)| /g, '').split(',');
        for (let i = 0; i < 3; i++)
            _string[i] = math.hex(parseInt(_string[i]));
        if (_string.length === 4)
            _string[3] = (parseFloat(_string[3]) * 255).toString(16).split('.')[0];
        return `#${_string.join('')}`;
    },
    /**
     * Returns a value between two hex colors based on the progress of a transition `t`.
     * ```js
     * ASync.m.hexTransform(0.5, '000000', 'ffffff') // 888888
     * ```
     */
    hexTransform: (t, from, to) => {
        let _from = from.match(/.{1,2}/g), _to = to.match(/.{1,2}/g), __from = [], __to = [];
        for (let i = 0; i < _from.length; i++) {
            __from[i] = parseInt(_from[i], 16);
            __to[i] = parseInt(_to[i], 16);
        }
        ;
        for (let i = 0; i < __to.length; i++)
            _to[i] = math.hex(Math.floor(math.fromTo(t, __from[i], __to[i])));
        return _to.join('');
    }
};
ASync.m = math;
// ==========================================
// Timing & animation 
// ==========================================
// Timing functions
// easeOutElastic
const c4 = (2 * Math.PI) / 3;
// easeOutBounce
const n1 = 7.5625;
const d1 = 2.75;
const f = {
    easeInQuad: (t) => t * t,
    easeInCubic: (t) => t * t * t,
    easeInQuart: (t) => t * t * t * t,
    easeInQuint: (t) => t * t * t * t * t,
    easeInCirc: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
    easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
    easeOutQuad: (t) => t * (2 - t),
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeOutQuart: (t) => 1 - (--t) * t * t * t,
    easeOutQuint: (t) => 1 + (--t) * t * t * t * t,
    easeOutCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInOutQuad: (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInOutCubic: (t) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInOutQuart: (t) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    easeInOutQuint: (t) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
    easeInOutCirc: (t) => t < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
    easeInOutExpo: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
    easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1,
    easeOutBounce: (t) => t < 1 / d1 ? n1 * t * t : t < 2 / d1 ? n1 * (t -= 1.5 / d1) * t + .75 : t < 2.5 / d1 ? n1 * (t -= 2.25 / d1) * t + .9375 : n1 * (t -= 2.625 / d1) * t + .984375
};
ASync.f = f;
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
const timeFunction = (delay, callback) => {
    return new Promise(resolve => {
        window.setTimeout(() => {
            if (callback)
                callback();
            resolve();
        }, delay);
    });
};
ASync.time = timeFunction;
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
const transition = (duration, next, f, callback) => {
    const creation = now();
    let progress, _now, resolved = false, $s = [...selection];
    return new Promise((resolve) => {
        function frame() {
            _now = now();
            progress = (_now - creation) / duration;
            if (progress < 1) {
                callback(ASync.m.minMax(f(progress), 0, 1), $s);
                if (next !== null && _now - creation >= next) {
                    resolve();
                    resolved = true;
                }
                requestAnimationFrame(frame);
            }
            else {
                callback(1, $s);
                if (!resolved)
                    resolve();
            }
        }
        frame();
    });
};
ASync.transition = transition;
const transforms = {
    translateX: (s, v) => { if (!s.match(/translateX/i))
        s += 'translateX()'; s = s.replace(/translateX\((.*)\)/gmi, `translateX(${v})`); return s; },
    translateY: (s, v) => { if (!s.match(/translateY/i))
        s += 'translateY()'; s = s.replace(/translateY\((.*)\)/gmi, `translateY(${v})`); return s; },
    translateZ: (s, v) => { if (!s.match(/translateZ/i))
        s += 'translateZ()'; s = s.replace(/translateZ\((.*)\)/gmi, `translateZ(${v})`); return s; },
    rotate: (s, v) => { if (!s.match(/rotate/i))
        s += 'rotate()'; s = s.replace(/rotate\((.*)\)/gmi, `rotate(${v})`); return s; },
    rotateX: (s, v) => { if (!s.match(/rotateX/i))
        s += 'rotateX()'; s = s.replace(/rotateX\((.*)\)/gmi, `rotateX(${v})`); return s; },
    rotateY: (s, v) => { if (!s.match(/rotateY/i))
        s += 'rotateY()'; s = s.replace(/rotateY\((.*)\)/gmi, `rotateY(${v})`); return s; },
    rotateZ: (s, v) => { if (!s.match(/rotateZ/i))
        s += 'rotateZ()'; s = s.replace(/rotateZ\((.*)\)/gmi, `rotateZ(${v})`); return s; },
    scale: (s, v) => { if (!s.match(/scale/i))
        s += 'scale()'; s = s.replace(/scale\((.*)\)/gmi, `scale(${v})`); return s; },
    scaleX: (s, v) => { if (!s.match(/scaleX/i))
        s += 'scaleX()'; s = s.replace(/scaleX\((.*)\)/gmi, `scaleX(${v})`); return s; },
    scaleY: (s, v) => { if (!s.match(/scaleY/i))
        s += 'scaleY()'; s = s.replace(/scaleY\((.*)\)/gmi, `scaleY(${v})`); return s; },
    scaleZ: (s, v) => { if (!s.match(/scaleZ/i))
        s += 'scaleZ()'; s = s.replace(/scaleZ\((.*)\)/gmi, `scaleZ(${v})`); return s; },
    skew: (s, v) => { if (!s.match(/skew/i))
        s += 'skew()'; s = s.replace(/skew\((.*)\)/gmi, `skew(${v})`); return s; },
    skewX: (s, v) => { if (!s.match(/skewX/i))
        s += 'skewX()'; s = s.replace(/skewX\((.*)\)/gmi, `skewX(${v})`); return s; },
    skewY: (s, v) => { if (!s.match(/skewY/i))
        s += 'skewY()'; s = s.replace(/skewY\((.*)\)/gmi, `skewY(${v})`); return s; },
    perspective: (s, v) => { if (!s.match(/perspective/i))
        s += 'perspective()'; s = s.replace(/perspective\((.*)\)/gmi, `perspective(${v})`); return s; },
    matrix: (s, v) => { if (!s.match(/matrix/i))
        s += 'matrix()'; s = s.replace(/matrix\((.*)\)/gmi, `matrix(${v})`); return s; },
    matrix3d: (s, v) => { if (!s.match(/matrix3d/i))
        s += 'matrix3d()'; s = s.replace(/matrix3d\((.*)\)/gmi, `matrix3d(${v})`); return s; }
};
/**
 * Allows for styling individual CSS transforms of all matching/selected elements.
 * @param property Transform property
 * @param value Applied value
 * @returns main
 */
ASync.transform = (property, value) => {
    const _s = [...selection];
    if (transforms[property]) {
        _s.forEach(x => {
            x.style.transform = transforms[property](x.style.transform, value);
        });
    }
    else
        throw new Error(`ASync <main.transform> Can not set transform property of "${property}"`);
    return ASync;
};
/**
 * Adds a class to all matching elements.
 */
ASync.addClass = (classname) => {
    const _s = [...selection];
    _s.forEach(x => {
        x.classList.add(classname);
    });
    return ASync;
};
/**
 * Removes a class from all matching elements.
 */
ASync.removeClass = (classname) => {
    const _s = [...selection];
    _s.forEach(x => {
        x.classList.remove(classname);
    });
    return ASync;
};
/**
 * Toggles a class on all matching elements.
 */
ASync.toggleClass = (classname) => {
    const _s = [...selection];
    _s.forEach(x => {
        x.classList.toggle(classname);
    });
    return ASync;
};
ASync.e = {
    partReveal: (duration, translateByPercent, skewByDeg, timingFunction) => {
        try {
            const _s = [...selection];
            const _t = timingFunction || ASync.f.easeOutQuint;
            _s.forEach((elem) => __awaiter(void 0, void 0, void 0, function* () {
                const child = elem.querySelector('*');
                const r = elem.getBoundingClientRect();
                ASync(elem).css.computedToInline('transform');
                // ease in
                yield ASync.transition(duration, null, _t, t => {
                    ASync(elem).transform('translateY', `${translateByPercent - translateByPercent * t}%`);
                    ASync(child)
                        .transform('translateY', `${r.height - r.height * t}px`)
                        .transform('skew', `${0}deg, ${skewByDeg - skewByDeg * t}deg`);
                });
                elem.style.removeProperty('transform');
            }));
        }
        catch (err) {
            console.log(err);
        }
    },
};
//@ts-ignore
module.exports = ASync;
