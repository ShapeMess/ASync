# AnimSync.js
An async library with easy synchronous-like syntax.
 
This library is focused on providing advanced methods for animations and transitions. 
Splitting the code into small syntactically good looking and easy to debug parts.

AnimSync is a project focused on providing an easy to work with async animation library that consists of small building blocks that can be easily used to create advanced animations, and adresses many problems like animating individual CSS transforms or HEX color values.

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
Accepted parameters are the same as with `_.transition`, with the addition of a measurement unit and a list of changes to transition between.
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
`_.time` is a timeout function that works just like the `window.timeout` but is promise-based and so it can be used together with the rest of the library to create time gaps in transitions. It also accepts a callback as the second parameter.
```javascript
await _.time(500);
// Do something else after 500ms...
```

## Miming Functions

| Function | Description |
| --- | --- |
| `_.f.easeInQuad`  | (t^2) Speed grows exponentially |
| `_.f.easeInCubic` | (t^3) |
| `_.f.easeInQuart` | (t^4) |
| `_.f.easeInQuint` | (t^5) |
| `_.f.easeOutQuad` | (t^2) Speed decreeses exponentially |
| `_.f.easeOutCubic` | (t^3) |
| `_.f.easeOutQuart` | (t^4) |
| `_.f.easeOutQuint` | (t^5) |
| `_.f.easeInOutQuad` | Speed changes in a parabolic manner |
| `_.f.easeInOutCubic` |  |
| `_.f.easeInOutQuart` |  |
| `_.f.easeInOutQuint` |  |

### f.bezier 
`_.f.bezier` is a class which returns a timing function based on the initial parameters.  
! WIP - Extreme values will break the animation !  
`_.f.bezier(mX1, mY2, mX1, mY2)`
```javascript
const f1 = new _.f.bezier(.65 ,.07, .07, .41);
```


## Mathematical Methods

### m.rand
`_.m.rand` returns a random intiger between two values.  
`_.m.average(min, max)`  
```javascript
_.m.rand(10, 20) // Might return 12, 18, 15...
```

### m.average
`_.m.average` returns the average value of an array of numbers.  
`_.m.average(array)`  
```javascript
_.m.average([10, 15, 22, 50, 6]) // 20.6
```

### m.fromTo
`_.m.fromTo` takes the animation progress (between `0` & `1`), two decimal numbers and returns a value between them based on the progress.  
`_.m.fromTo(t, from, to)`  
```javascript
_.m.fromTo(0.1, 0, 255) // 25.5
_.m.fromTo(0.5, 0, 255) // 127.5
```

### m.hex
`_.m.hex` returns a hexadecimal representation of an intiger.  
`_.m.average(int)`  
```javascript
_.m.hex(10)   // 0a
_.m.hex(255)  // FF
_.m.hex(1000) // 3e8
```
### m.hexToRgb
`_.m.hexToRgb` converts a hexadecimal color representation to `rgb`.  
`_.m.average(hex)`  
```javascript
_.m.hexToRgb('7c87e1')   // rgb(124, 135, 225)
_.m.hexToRgb('7c88e180') // rgb(124, 135, 225, 0.5)
```

### m.rgbToHex
`_.m.rgbToHex` converts an `rgb` and `rgba` color representations to `hex`.  
`_.m.average(rgb)`  
```javascript
_.m.rgbToHex('rgb(178, 0, 63)')       // b2003f
_.m.rgbToHex('rgba(178, 0, 63, 0.5)') // b2003f7f
```

### m.hexTransform
`_.m.hexTransform` takes the animation progress (between `0` & `1`), two hexadecimal color representations and returns a value between them, based on the progress.  
The hex values must be full 6 characters long representations, or 8 characters long in case of added transparency.  
`_.m.average(t, from, to)`  
```javascript
_.m.hexTransform(0.0, '000000', 'FFFFFF') // 000000
_.m.hexTransform(0.4, '000000', 'FFFFFF') // 666666
_.m.hexTransform(0.8, '000000', 'FFFFFF') // cccccc
```



## CSS/HTML Manipulation

### class
`_.addClass` `_.removeClass` add/remove classes from all matching available HTML elements.
```javascript
_('div').addClass('class1');
_('div').removeClass('class2');
```

### css
`_.css` can apply different transform properties to elements individually, which are tricky in vanilla JavaScript.
It can be used for other CSS properties as well, but it is to keep in mind to use camel case names.  
`_.m.average(property, value)`  
```javascript
_('div').css('translateX', '100px');
_('div').css('scaleX', '0.95');
```

## Other methods

### typewriter
`_.typewriter` Allows for easy animation of individual text characters.
This method returns a promise.
The options object can include the `shift` property, that tells how many already existing characters in the element should be deleted during the animation and the `f` property that specifies the timing function.  
`_.typewriter(text, duration, options)` 
```javascript
_('p').typewriter('Lorem ipsum dolor sit amet...', 1000, { shift: 100, f: _.easeOutQuad })

```




