var eachtick = require('../eachtick.js');

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