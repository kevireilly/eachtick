eachtick
========

Non-blocking asynchronous iteration for Node.js and the browser.

`eachtick` iterates over objects or arrays using setImmediate by
calling an iterator function with a key, value, and completion callback. You
can `break` out of iterations by passing an error or the stop instruction

```javascript
eachtick([ 1, 2, 3, 4, 5 ], function iterator(index, value, next) {
  console.log(index, value);
  // Break with an error
  //next('error');
  // Break without an error
  next(null, true);
}, function complete(err, stop) {
  if (err || stop) console.warn(err, stop);
  console.log('Iteration complete');
}
```

## Notes
Tick methods used:
* Node.js: process.nextTick or process.setImmediate
** 1000 keys to iterate over causes a

## Installation
### For Node.js
Install `eachtick` from the npm repository
```
npm install eachtick
```
Require `eachtick` in a script
```javascript
var eachtick = require('eachtick');
```

### For the browser
Include `eachtick` on your page
```html
<script type="text/javascript" src="/js/eachtick.js"></script>
```

## Usage
```javascript
// Works with any object or array
var obj = {
  foo: 'bar',
  beep: ['boop'],
  yin: {
    yang: true
  },
  //stop: true,
  error: true
};

// Provide an iterator() and complete() callback
// complete() callbacks are optional
// Calling next() is mandatory
eachtick(obj, function iterator(key, value, next){
  console.log('Key: ' + key + ' Value: ' + JSON.stringify(value));
  if (key === 'stop') {
    // To `break` out of iteration without
    // an error, provide a falsy 1st argument
    // and a truthy 2nd argument
    next(null, true);
  } else if (key === 'error') {
    // Simulate asynchronous task producing an error
    setTimeout(function(){
      // Return an error and stop iterating
      next('Roger, we have uh oh');
    }, 2500);
  } else {
    // Continue to the next iteration
    next();
  }
}, function complete(err, stop) {
  // Iteration has had an error,
  // been asked to stop early,
  // or completed successfully
  if (err || stop) {
    console.warn('Error: ' + err);
    console.warn('Stop: ' + stop);
  }
  console.log('Iteration complete');
});
```

## TODO
* ~~Add iteration completed callback for asynchronous iterators~~
* ~~Add ability to break out of iteration on errors or otherwise~~
* ~~Add browser support~~
* Produce performance comparison data
* Produce examples
* Unit Tests