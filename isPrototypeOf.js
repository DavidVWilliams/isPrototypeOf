// Write a function, isPrototypeOf, that works just like Object.prototype.isPrototypeOf.
// Since your solution will be called as a function rather than a method,
// the way you use it will be slightly different, but the outcome should be the same.

// Obviously, don't use Object.prototype.isPrototypeOf in your solution,
// but feel free to use other methods on Object.prototype.

// Definition:
// The isPrototypeOf() method checks if an object exists in another object's prototype chain.

// Syntax:
// prototypeObj.isPrototypeOf(object);

// Parameters:
  // object - The object whose protype chain will be searched.

// Return value:
  // A Boolean indicating whether the calling object lies in the prototype
  // chaing of the specified object.

// Errors Thrown:
  // A TypeError is thrown if prototypeObj is undifined or null.

// Description:
// The isPrototypeOf() method allows you to check whether or not an object exists within
// another object's prototype chain.

var canine = {
  bark: function() {
    console.log('bark');
  }
};

var dog = Object.create(canine);
dog.fetch = function() {
  console.log('fetch');
};

var myDog = Object.create(dog);
var empty = Object.create(null);

function isPrototypeOf(proto, obj) {
	var currentPrototype = Object.getPrototypeOf(obj);

	if (proto === undefined || proto === null) {
		throw new TypeError('Proto is undefined or null');
	}

	if (currentPrototype === undefined || currentPrototype === null) {
		return false;
	} 

	if (proto === currentPrototype) {
		return true;
	} else {
		return isPrototypeOf(proto, currentPrototype);
	}
}

/******************** [ Tests ] ********************/

tests({
  'It should return true if proto is equal to obj.': function() {
    eq(isPrototypeOf(canine, dog), true);
},
  'It should return false if obj is null': function() {
    eq(isPrototypeOf(canine, empty), false);
  },
  'It should return true if the prototype is up the chain.': function() {
    eq(isPrototypeOf(canine, myDog), true);
  },
  'It should throw a TypeError if proto is undefined or null.': function() {
    try {
      isPrototypeOf(undefined, {});
    } catch (e) {
      eq(e instanceof TypeError, true);
    }
  }
});