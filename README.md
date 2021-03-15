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
`_.change` is a method used to mmodify multiple CSS properties of multiple HTML elements at the same time.
It can also manipulate on different transform properties individually, without changing the existing transforms of an element.
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
`time` is a timeout function that works just like the `window.timeout` but is promise-based and so it can be used together with the rest of the library to create time gaps in transitions. It also accepts a callback as the second parameter if there's any need to place a synchronous piece of code into the middle of the animation.
```javascript
await _.time(500);
// Do something else after 500ms...
```


## Timings and animations

### css
`_.css` is used to apply CSS styling to elements.
Different values of the `transform` property can not be styled individually. This method solves that particular issue.
It is to keep in mind that this method accepts camel case property names.
```javascript
_('div').css('translateX', '100px');
```


