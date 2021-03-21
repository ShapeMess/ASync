
/*
    Copyright Shapelessed 2021 - https://github.com/ShapeMess/AnimSync
*/

(function() {

    'use strict';

    const Root = function (x) {
        if (x === undefined || x === null) return Root;
        if (typeof x === 'string') Root.$.tg = document.querySelectorAll(x);
        if (typeof x === 'object' || Array.isArray(x)) Root.$.tg = [x];
        return Root;
    };

    Root.$ = {
        tg: null,
        r: () => Root.$.tg === null,
        each: (callback) => {
            for (let i = 0; i < Root.$.tg.length; i++) {
                callback(Root.$.tg[i]);
            }
        }
    }

    Root.tg = i => typeof i === 'number' ? Root.$.tg[i] : Root.$.tg;


    /*##############################################################*/
    // MATHEMATICAL METHODS
    /*##############################################################*/
    Root.m = {}
    // Returns random number between two given input values
    Root.m.rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    // Returns average value from of an array of numbers
    Root.m.average = arr => { x = 0; for (let i = 0; i < arr.length; i++) x += arr[i]; return x / arr.length };
    

    Root.m.hex = int => {
        int = int.toString(16);
        return int.length < 2 ? `0${int}` : int;
    }
    Root.m.hexToRgb = int => {
        int = int.match(/.{1,2}/g);
        for (let i = 0; i < 3; i++) int[i] = parseInt(int[i], 16);
        if (int.length === 4) int[3] = (parseInt(int[3]) / 255).toString().substring(0,5);
        return int.length === 3 ? `rgb(${int.join(', ')})` : `rgba(${int.join(', ')})`;
    }
    Root.m.rgbToHex = string => {
        string = string.replace(/rgba|rgb|\(|\)| /g, '').split(',');
        for (let i = 0; i < 3; i++) string[i] = Root.m.hex(parseInt(string[i]));
        if (string.length === 4) string[3] = (parseFloat(string[3]) * 255).toString().split('.')[0];
        return string.join('');
    }

    Root.m.hexTransform = (t, from, to) => {
        from = from.match(/.{1,2}/g); 
        to = to.match(/.{1,2}/g); 
        for (let i = 0; i < from.length; i++) {
            from[i] = parseInt(from[i], 16);
            to[i] = parseInt(to[i], 16);
        };
        for (let i = 0; i < to.length; i++) to[i] = Root.m.hex(Math.floor(Root.m.fromTo(t, from[i], to[i])));
        return to.join(''); 
    }

    // Basic function to calculate the state between two values
    // based on the percent of the animation.
    Root.m.fromTo = (t, from, to) => from + ((to - from) * t);

    /*##############################################################*/
    // TIMING FUNCTIONS
    /*##############################################################*/
    Root.f = {};

    Root.f.easeInQuad     = t => t*t;
    Root.f.easeInCubic    = t => t*t*t;
    Root.f.easeInQuart    = t => t*t*t*t;
    Root.f.easeInQuint    = t => t*t*t*t*t;

    Root.f.easeOutQuad    = t => t*(2-t);
    Root.f.easeOutCubic   = t => (--t)*t*t+1;
    Root.f.easeOutQuart   = t => 1-(--t)*t*t*t;
    Root.f.easeOutQuint   = t => 1+(--t)*t*t*t*t;
    
    Root.f.easeInOutQuad  = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
    Root.f.easeInOutCubic = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
    Root.f.easeInOutQuart = t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
    Root.f.easeInOutQuint = t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t;

    const c4 = (2 * Math.PI) / 3;
    Root.f.easeOutElastic = t => t === 0 ? 0 : t === 1? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
    
    const n1 = 7.5625;
    const d1 = 2.75;
    Root.f.easeOutBounce = t => t < 1/d1 ? n1*t*t : t<2/d1?n1*(t-=1.5/d1)*t+.75 : t<2.5/d1?n1*(t-=2.25/d1)*t+.9375 : n1*(t-=2.625/d1)*t+.984375;

    Root.f.bezier = function(mX1, mY1, mX2, mY2) {

        this.get = function (aX) {
            if (mX1 == mY1 && mX2 == mY2) return aX;
            return calc(getTForX(aX), mY1, mY2);
        }

        const A = (aA1, aA2) => { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
        const B = (aA1, aA2) => { return 3.0 * aA2 - 6.0 * aA1; }
        const C = (aA1) => { return 3.0 * aA1; }

        const calc = (aT, aA1, aA2) => {
            return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
        }

        const getSlope = (aT, aA1, aA2) => {
            return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
        }

        const getTForX = (aX) => {
            var aGuessT = aX;
            for (var i = 0; i < 4; ++i) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);
                if (currentSlope == 0.0) return aGuessT;
                var currentX = calc(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        }

        return this.get;
    }



    /*##############################################################*/
    // STATIC METHODS
    /*##############################################################*/

    const cssStyles = {
        translateX: 'transform',
        translateY: 'transform',
        translateZ: 'transform',

        rotateX:    'transform',
        rotateY:    'transform',
        rotateZ:    'transform',

        scaleX:     'transform',
        scaleY:     'transform',
        scaleZ:     'transform',
        scale:      'transform',

        skewX:      'transform',
        skewY:      'transform',
        skewZ:      'transform',
    };

    const cssMethodHandlers = {
        translateX: (string, value) => { if (!string.match(/translateX/i)) string += 'translateX()'; string = string.replace(/translateX\((.*)\)/gmi, `translateX(${value})`); return string; },
        translateY: (string, value) => { if (!string.match(/translateY/i)) string += 'translateY()'; string = string.replace(/translateY\((.*)\)/gmi, `translateY(${value})`); return string; },
        translateZ: (string, value) => { if (!string.match(/translateZ/i)) string += 'translateZ()'; string = string.replace(/translateZ\((.*)\)/gmi, `translateZ(${value})`); return string; },

        rotateX: (string, value) => { if (!string.match(/rotateX/i)) string += 'rotateX()'; string = string.replace(/rotateX\((.*)\)/gmi, `rotateX(${value})`); return string; },
        rotateY: (string, value) => { if (!string.match(/rotateY/i)) string += 'rotateY()'; string = string.replace(/rotateY\((.*)\)/gmi, `rotateY(${value})`); return string; },
        rotateZ: (string, value) => { if (!string.match(/rotateZ/i)) string += 'rotateZ()'; string = string.replace(/rotateZ\((.*)\)/gmi, `rotateZ(${value})`); return string; },

        scaleX: (string, value) => { if (!string.match(/scaleX/i)) string += 'scaleX()'; string = string.replace(/scaleX\((.*)\)/gmi, `scaleX(${value})`); return string; },
        scaleY: (string, value) => { if (!string.match(/scaleY/i)) string += 'scaleY()'; string = string.replace(/scaleY\((.*)\)/gmi, `scaleY(${value})`); return string; },
        scaleZ: (string, value) => { if (!string.match(/scaleZ/i)) string += 'scaleZ()'; string = string.replace(/scaleZ\((.*)\)/gmi, `scaleZ(${value})`); return string; },
        scale: (string, value) => { if (!string.match(/scale/i)) string += 'scale()'; string = string.replace(/scale\((.*)\)/gmi, `scale(${value})`); return string; },

        skewX: (string, value) => { if (!string.match(/skewX/i)) string += 'skewX()'; string = string.replace(/skewX\((.*)\)/gmi, `skewX(${value})`); return string; },
        skewY: (string, value) => { if (!string.match(/skewY/i)) string += 'skewY()'; string = string.replace(/skewY\((.*)\)/gmi, `skewY(${value})`); return string; },
        skewZ: (string, value) => { if (!string.match(/skewZ/i)) string += 'skewZ()'; string = string.replace(/skewZ\((.*)\)/gmi, `skewZ(${value})`); return string; },
    }

    // Allows for easy manipulation of CSS properties.
    // Properties like translateX or rotateZ which can't be styled individually using the native style property.
    Root.css = (property, value) => {
        for (let i = 0; i < Root.$.tg.length; i++) {
            const elem = Root.$.tg[i];
            if (cssStyles[property]) elem.style[cssStyles[property]] = cssMethodHandlers[property](elem.style[cssStyles[property]], value);
            else                     cssMethodHandlers.defaultHandler(property, value);
        }
    }



    Root.addClass =     name => Root.$.each(elem => elem.classList.add(name));
    Root.removeClass =  name => Root.$.each(elem => elem.classList.add(name));

    

    /*##############################################################*/
    // MAIN METHODS
    /*##############################################################*/

    // Basic promise-based timeout
    // it can work as a normal timeout as well as can be awaited in an async function
    // If awaited it will stop the execution of the code below it, allowing an easy
    // to debug structure without nesting callbacks
    //
    // eg:
    // await _.time(1000);                                                      <-- Wait 1s
    //       _.change(1000, 0, t => t, t => x.style.left = `${100 * t}px`);     <-- Apply some CSS transitions
    //
    Root.time = (delay, callback) => {
        return new Promise(resolve => {
            window.setTimeout(() => {
                if (callback) callback();
                resolve();
            }, delay);
        })
    };


    // "transition" is a transition function that accepts 4 arguments
    // duration  -  The duration of the css transition
    // next      -  This argument allows to specify after what time the function is resolved
    //              This allows to start the next animation while the current one haven't yet finished.
    //              This argument is ignored if set to 0.
    // f         -  The timing function which should return a value between 0 and 1.
    // callback  -  Cballback played on each frame.
    //
    // eg:
    // await _.change(1000, 400, t => t, t => x.style.left = `${100 * t}px`);   <-- Plays a 1s long transition but resolve it after 0.4s
    // await _.change(1000, 0,   t => t, t => x.style.top = `${100 * t}px`);    <-- This an transition starts playing while the first one is still 0.6s from finishing.
    //
    const transition = (duration, next, f = x => x, callback) => {
        return new Promise((resolve) => {
            const creation = Date.now();
            let progress, now, resolved = false;
    
            function frame() { 
                now = Date.now();
                progress = (now - creation) / duration;

                if (progress < 1) {
                    callback(f(progress));
                    if (next > 0 && now - creation >= next) { resolve(); resolved = true; }
                    requestAnimationFrame(frame);
                }
                else { callback(1); if (!resolved) resolve(); }
            }
            frame();
        });
    }
    Root.transition = transition;


    const styles = {
        x:              'transform',
        y:              'transform',
        z:              'transform',
        scale:          'transform',
        rotate:         'transform',
    }
    // Animation handlers
    const styleHandlers = {
        defaultHandler: (t, from, to, measure) => `${Math.round(Root.m.fromTo(t, from, to))}${measure}`,

        x: (t, from, to, string, measure) => {
            if (!string.match(/translateX/i)) string += 'translateX()';
            string = string.replace(/translateX\((.*)\)/gmi, `translateX(${Root.m.fromTo(t, from, to)}${measure})`);
            return string;
        },
        y: (t, from, to, string, measure) => {
            if (!string.match(/translateY/i)) string += 'translateY()';
            string = string.replace(/translateY\((.*)\)/gmi, `translateY(${Root.m.fromTo(t, from, to)}${measure})`);
            return string;
        },
        z: (t, from, to, string, measure) => {
            if (!string.match(/translateZ/i)) string += 'translateZ()';
            string = string.replace(/translateZ\((.*)\)/gmi, `translateZ(${Root.m.fromTo(t, from, to)}${measure})`);
            return string;
        },
        scale: (t, from, to, string) => {
            if (!string.match(/scale/i)) string += 'scale()';
            string = string.replace(/scale\((.*)\)/gmi, `scale(${Root.m.fromTo(t, from, to)})`);
            return string;
        },
        rotate: (t, from, to, string) => {
            if (!string.match(/rotate/i)) string += 'rotate()';
            string = string.replace(/rotate\((.*)\)/gmi, `rotate(${Root.m.fromTo(t, from, to)}deg)`);
            return string;
        },

    }

    // Plays a transition by changing multiple CSS properties at once
    // Has to be provided with both the start and end values.
    Root.change = (duration, next, f, measure = 'px', options) => new Promise((async resolve => {
        try {
            const elems = Root.$.tg;
            await transition(duration, next, f, t => {
                for (let i = 0; i < elems.length; i++) {
                    const element = elems[i];
                    for (const key in options.from) {
                        if (Object.hasOwnProperty.call(options.to, key)) {
                            if (styles[key]) element.style[styles[key]] = styleHandlers[key](t, options.from[key], options.to[key], element.style[styles[key]], measure);
                            else             element.style[key] = styleHandlers.defaultHandler(t, options.from[key], options.to[key], measure);
                        }
                    }
                }
            });
            resolve();
        }
        catch(err) { console.log(err); };
    }));











    /*##############################################################*/
    // CUSTOM EFFECT
    /*##############################################################*/
    
    // Typewriter effect
    const getChars = (array1, array2, number, shiftTimes) => {
        array1 = [...array1];
        for (let i = 0; i < shiftTimes; i++) if (array1.length > 0) array1.shift();
        for (let i = 0; i < number; i++) array1[i] = array2[i];
        return array1.join('');
    }
    const emptyChars = (array) => {
        let newArray = [];
        for (let i = 0; i < array.length; i++) newArray.push('');
        return newArray;
    }
    const textEase = (elem, text, duration, {shift = 0, f = Root.f.easeInOutCubic }, callback) => {
        let oText = elem.textContent.split('');
        text = text.length > 0 ? text.split("") : [""];
        let start = 1;
        let _start;

        transition(duration, 0, f, t => {
            _start = start * t;
            elem.textContent = getChars(oText, text, Math.round(text.length * _start), Math.round(shift * _start));
            t === 1 && callback();
        });
    }
    // Possible options:
    // shift - how symbols to remove from the previously left text.
    // f     - timing function
    Root.typewriter = (text, duration, options = {}, callback) => {
        let targets = Root.$.tg;
        console.log('asdasd');

        if (text.length === 0) text = emptyChars(text);
        return new Promise(resolve => {
            for (let i = 0; i < targets.length; i++) {
                const elem = targets[i];
                if (i === targets.length - 1) textEase(elem, text, duration, options, () => { resolve(); console.log('resolved!')} );
                else                          textEase(elem, text, duration, options);
            }
        });
    }


    if (!window._)          window._ = Root;
    if (!window.AS)         window.AS = Root;
    if (!window.AnimSync)   window.AnimSync = Root;

})();