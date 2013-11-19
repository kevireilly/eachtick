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
 *  Set the tick method based on availability
 *
 * @returns {*}
 *   Instance of available tick method
 */
function settick() {
  return (typeof process !== 'undefined' && process.nextTick) ? process.nextTick
    : (typeof setImmediate !== 'undefined') ? setImmediate
    : setTimeout;
}
// Get and set the tick method immediately
var _tick = _initial = settick();

/**
 *
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

  // Without this, a large iteration causes
  // "Maximum call stack size exceeded" errors
  _tick = (isNode && keys.length > 999) ? setImmediate : _initial;

  (function iterate(keys){
    nexttick(function(){
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
 * Call the tick method
 *
 * @param fn
 *   Callback for each tick
 * @returns {*}
 *   Cached tick method
 */
function nexttick(callback) {
  return _tick(callback, 0);
}

/**
 *
 * Node.js exports
 *
 */
var isNode = false;
if (typeof module !== 'undefined') {
  isNode = true;
  module.exports = eachtick;
}
