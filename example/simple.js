var eachtick = require('../eachtick.js');

// Works with any object
// (which means arrays too)
var obj = {
  foo: 'bar',
  beep: ['boop'],
  yin: {
    yang: true
  },
  //stop: true,
  error: true
};

// Provide an iterator and complete callback
// Complete callbacks are optional
// Calling next is mandatory
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