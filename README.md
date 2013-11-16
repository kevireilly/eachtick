eachtick
========

Non-blocking for loop styled iteration for Node.js

## Installation
```
npm install eachtick
```

## Usage
```javascript
var eachtick = require('eachtick');

// Works with any object
// (which means arrays too)
var obj = {
  foo: 'bar',
  beep: ['boop'],
  yin: {
    yang: true
  }
};

// Provide an iterator and complete callback
// Complete callbacks are optional
eachtick(obj, function iterator(key, value){
  console.log('Key: ' + key + ' Value: ' + JSON.stringify(value));
}, function complete() {
  console.log('Iteration complete');
});
```

## TODO
* Add iteration completed callback for asynchronous iterators
* Add ability to break out of iteration on errors or otherwise
* Produce performance comparison data
* Produce examples
* Unit Tests