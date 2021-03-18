# AnimSync.js
An async library with easy synchronous-like syntax.
 
This library is focused on providing advanced methods for animations and transitions. 
Splitting the code into small syntactically good looking and easy to debug parts.

## Timings and animations


### transition
`_.transition` is a method used to create basic from-to transitions. It accepts four basic parameters. The first parameter is the duration in `ms`, while the second one specifies after what amount of time the function should be resolved, which allows for transition that overlap in time. Other parameters are the timing function and the callback.

```javascript
// Play a second long transition, and resolve after 500ms
await _.transition(1000, 500, _.easeInOutQuad, t => { element.style.left = `${100* t }px` });
// Play something else after the previous function has been resolved...
await _.transition(1000, 0,   _.easeOutQuint,  t => { element.style.top = `${100* t }px` });
```

### change
`_.change` is a method used to modify multiple CSS properties of many HTML elements at the same time.
It can also manipulate different transform properties individually, without changing the existing transforms of an element.
Accepted parameters are the same as with `_.transition`, with the addition of the measurement unit and a list of changes to be played.
```javascript
_('div').change(1000, 0, _.easeOutBounce, 'px', {
    from: {
        x: 0,
        width: 100,
    },
    to: {
        x: 50,
        width: 300,
    }
})
```

### time
`_.time` is a timeout function that works just like the `window.timeout` but is promise-based and so it can be used together with the rest of the library to create time gaps in transitions. It also accepts a callback as the second parameter if there's any need to place a synchronous piece of code into the middle of the animation.
```javascript
await _.time(500);
// Do something else after 500ms...
```

## Mathematical Methods

### m.rand
`_.m.rand` returns a random intiger value inside specified boundaries:
```javascript
_.m.rand(10, 20) // Might return 12, 18, 15...
```

### m.average
`_.m.average` returns the average value of an array of numbers:
```javascript
_.m.average(10, 20) // [10, 15, 22, 50, 6] --> 20.6
```

### m.hex
`_.m.hex` returns a hexadecimal representation of an intiger
```javascript
_.m.hex(10)   // 0a
_.m.hex(255)  // FF
_.m.hex(1000) // 3e8
```
### m.hexToRgb
`_.m.hex` converts a hexadecimal color representation to `rgb` 
```javascript
_.m.hexToRgb('7c87e1')   // rgb(124, 135, 225)
_.m.hexToRgb('7c88e180') // rgb(124, 135, 225, 0.5)
```

### m.rgbToHex
`_.m.hex` converts an `rgb` and `rgba` color representations to `hex` 
```javascript
_.m.rgbToHex('rgb(178, 0, 63)')       // b2003f
_.m.rgbToHex('rgba(178, 0, 63, 0.5)') // b2003f7f
```



## CSS/HTML Manipulation

### css
`_.css` is to apply different transform properties to elements individually, which are tricky in vanilla JavaScript.
It can be used for other CSS properties as well, but it is to keep in mind to use camel case names.
```javascript
_('div').css('translateX', '100px');
_('div').css('scaleX', '0.95');
```


