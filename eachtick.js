/**
 *               .  .---.      .
 *               |    |  o     |
 *   .-. .-.  .-.|--. |  .  .-.|.-.
 *  (.-'(   )(   |  | |  | (   |-.'
 *   `--'`-'`-`-''  `-'-' `-`-''  `-
 *
 *    Non-blocking for loop styled
 *       iteration for Node.js
 *
 *  --------------------------------
 *
 * @param obj
 *   Object to be iterated over
 * @param iterator
 *   Callback for each iteration
 * @param complete
 *   Iteration is complete
 */
function eachtick(obj, iterator, complete){
  var keys = Object.keys(obj);
  (function iterate(keys){
    process.nextTick(function(){
      // No more keys, no more iterating
      if (!keys[0]) {
        if (complete) complete();
      } else {
        // Return the key / value pair
        iterator(keys[0], obj[keys[0]]);
        // Check if we're done
        if (keys.length === 1) return complete ? complete() : true;
        // Grab a slice to go. Pepperoni please.
        return ((keys = keys.slice(1)).length && iterate(keys));
      }
    });
  })(keys);
};

module.exports = eachtick;
