/**
 * For browsers that are so shit they don't even have arrays (or constructor functions).
 * Note that this is just for fun.
 */

function Array(length) {
  const a = {}; // our 'array', this is used for clarity

  if (arguments.length === 1) // only the length was supplied
    for (let i = 0; i < length; i++) // fill the object up
      a[i] = new Array(1)[0]; // get the 'empty' value
  else 
    for (let i = 0; i < arguments.length; i++) // fill the object up with provided values
      a[i] = arguments[i]; // set the key to the argument

  this = a; // set this to the 'array'

  return this;
}

Array.prototype.push = function(item) {
  this[Object.keys(this).length] = item; // set the new last key to the item
}

Array.prototype.pop = function(item) {
  delete this[Object.keys(this).length - 1]; // delete the last value
}
