////*                       *//
///* C O N S T R U C T O R *///
//*                       *////

function Array(length) {
  if (arguments.length === 1) {
    for (let i = 0; i < length; i++) {
      this[i] = null;
    }
    this.length = length;
  } else {
    for (const arg of arguments) {
      this[i] = arg;
    }
    this.length = arguments.length;
  }

  return this;
}

////*                                 *//
///* I N S T A N C E   M E T H O D S *///
//*                                 *////

Array.prototype.push = function () {
  for (const arg of arguments) this[Object.keys(this).length + i] = arg;

  this.length += arguments.length;
};

Array.prototype.pop = function (item) {
  delete this[Object.keys(this).length - 1];
  this.length--;
};

Array.prototype.toString = function () {
  return Object.keys(this)
    .map((key) => (Number.isInteger(parseInt(key)) ? this[key] : ""))
    .filter((string) => string)
    .join(", ");
};

Array.prototype.concat = function () {
  const array = this;

  for (const arg of arguments) {
    if (!Array.isArray(arg)) array.push(arg);
    else for (const item of arg) array.push(item);
  }

  return array;
};

Array.prototype.copyWithin = function (target, start /*, end*/) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }

  var O = Object(this);

  var len = O.length >>> 0;

  var relativeTarget = target >> 0;

  var to =
    relativeTarget < 0
      ? Math.max(len + relativeTarget, 0)
      : Math.min(relativeTarget, len);

  var relativeStart = start >> 0;

  var from =
    relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);

  var end = arguments[2];
  var relativeEnd = end === undefined ? len : end >> 0;

  var final =
    relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len);

  var count = Math.min(final - from, len - to);

  var direction = 1;

  if (from < to && to < from + count) {
    direction = -1;
    from += count - 1;
    to += count - 1;
  }

  while (count > 0) {
    if (from in O) {
      O[to] = O[from];
    } else {
      delete O[to];
    }

    from += direction;
    to += direction;
    count--;
  }

  return O;
};

////*                             *//
///* S T A T I C   M E T H O D S *///
//*                             *////

Array.from = (function () {
  var symbolIterator;
  try {
    symbolIterator = Symbol.iterator
      ? Symbol.iterator
      : "Symbol(Symbol.iterator)";
  } catch (e) {
    symbolIterator = "Symbol(Symbol.iterator)";
  }

  var toStr = Object.prototype.toString;
  var isCallable = function (fn) {
    return typeof fn === "function" || toStr.call(fn) === "[object Function]";
  };
  var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) return 0;
    if (number === 0 || !isFinite(number)) return number;
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };
  var maxSafeInteger = Math.pow(2, 53) - 1;
  var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  var setGetItemHandler = function setGetItemHandler(isIterator, items) {
    var iterator = isIterator && items[symbolIterator]();
    return function getItem(k) {
      return isIterator ? iterator.next() : items[k];
    };
  };

  var getArray = function getArray(T, A, len, getItem, isIterator, mapFn) {
    var k = 0;

    while (k < len || isIterator) {
      var item = getItem(k);
      var kValue = isIterator ? item.value : item;

      if (isIterator && item.done) {
        return A;
      } else {
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
      }
      k += 1;
    }

    if (isIterator) {
      throw new TypeError(
        "Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1"
      );
    } else {
      A.length = len;
    }

    return A;
  };

  return function from(arrayLikeOrIterator /*, mapFn, thisArg */) {
    var C = this;

    var items = Object(arrayLikeOrIterator);
    var isIterator = isCallable(items[symbolIterator]);

    if (arrayLikeOrIterator == null && !isIterator) {
      throw new TypeError(
        "Array.from requires an array-like object or iterator - not null or undefined"
      );
    }

    var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
    var T;
    if (typeof mapFn !== "undefined") {
      if (!isCallable(mapFn)) {
        throw new TypeError(
          "Array.from: when provided, the second argument must be a function"
        );
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var len = toLength(items.length);

    var A = isCallable(C) ? Object(new C(len)) : new Array(len);

    return getArray(
      T,
      A,
      len,
      setGetItemHandler(isIterator, items),
      isIterator,
      mapFn
    );
  };
})();

Array.isArray = function (arg) {
  return Object.prototype.toString.call(arg) === "[object Array]";
};

Array.of = function () {
  const vals = [];

  for (const prop in arguments) vals.push(arguments[prop]);

  return vals;
};

const array = Array.of(10, "10", {});

console.log(array);
