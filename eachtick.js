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
    nexttick(function(){
      // Return the key / value pair, wait for next callback
      iterator(keys[0], obj[keys[0]], function next(err, stop){
        // Stop iterating on error or stop instruction
        if (err || stop) return complete ? complete(err, stop) : false;
        // Check if we're done
        if (keys.length === 1) return complete ? complete() : true;
        // Grab a slice to go. Pepperoni please.
        return ((keys = keys.slice(1)).length && iterate(keys));
      });
    });
  })(keys);
}

/**
 *
 * Cross-platform tick
 *
 * @param fn
 *   Callback for each tick
 * @returns {*}
 *   Cached tick method
 */
function nexttick(fn) { return tick(fn, 0); }
var tick = (typeof process !== 'undefined' && process.nextTick) ? process.nextTick
  : (typeof setImmediate !== 'undefined') ? setImmediate
  : setTimeout;


/**
 * Cross-platform exports
 */
if (typeof module !== 'undefined') {
  module.exports = eachtick;
}
