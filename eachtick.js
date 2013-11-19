/**
 *                .  .---.      .
 *                |    |  o     |
 *    .-. .-.  .-.|--. |  .  .-.|.-.
 *   (.-'(   )(   |  | |  | (   |-.'
 *    `--'`-'`-`-''  `-'-' `-`-''  `-
 *
 *  -----------------------------------
 *  Non-blocking asynchronous iteration
 *     for Node.js and the browser.
 *  -----------------------------------
 *
 */
'use strict';
if (typeof require !== 'undefined') require('setimmediate');

/**
 * Perform iterations on each tick
 *
 * @param obj
 *   Object or array to be iterated over
 * @param iterator
 *   Iterator to call each iteration
 * @param complete
 *   Iteration is complete, there was
 *   an error, or stop was called
 */
function eachtick(obj, iterator, complete){
  var keys = Object.keys(obj);
  (function iterate(keys){
    setImmediate(function(){
      // Return the key / value pair, wait for next callback
      iterator(keys[0], obj[keys[0]], function next(err, stop){
        // Stop iterating on error, stop instruction, or completion
        if (err || stop || keys.length === 1) return complete ? complete(err, stop) : false;
        // Grab a slice to go. Pepperoni please.
        return ((keys = keys.slice(1)).length && iterate(keys));
      });
    });
  })(keys);
}

/**
 *
 * Node.js exports
 *
 */
if (typeof module !== 'undefined') {
  module.exports = eachtick;
}
