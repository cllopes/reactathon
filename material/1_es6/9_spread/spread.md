# Spread

The **spread** syntax allow interable items (like arrays or a string) to be expanded in place using the `...` notation.


## Array Manipulation

One of the usage of the `spread` operator is to preform array operations without modifying the original array.

One example is replacing the `concat` operating for adding to the end of an array:

```javascript 1.8
const list = [1,2,3]
const newList = [...list, 4]
const newListTwo = [0, ...list]

// newList = [1,2,3,4] 
// newListTwo = [0,1,2,3]
// list is unchanged
```

Combining the `spread` operator with the `slice`&#42; operator you can create a new array from adding or removing elements
within an existing array.

```javascript 1.8
// Removing element at index
const smallerList = [...list.slice(0, index), ...list.slice(index + 1)]
```

```javascript 1.8
// Adding new element at index
const newElement = 10
const largerList = [...list.slice(0, index), newElement, ...list.slice(index)]
```

 The `slice` operator returns a shallow copy of a portion of an array between the specified `begin` and `end` parameters
 without modifying the original list. If no `end` is specified it will return until the end of the array.

## Replacing Apply

Anoter common usage of the `spread` operator is to replace the `apply` method when you want to pass an array of elements
as parameters but use them as individual arguments

ES6:
```javascript 1.8
const myFunction = (x, y, z) => { }
const args = [0, 1, 2];
myFunction(...args);
```

ES5:
```javascript 1.8
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args);
```

## Object Spread

In addition to spreading arrays the `...` operator also works on objects a similar manner:

A common case is uses the `spread` operator to create a shallow clone on an object:

```javascript 1.8
const obj1 = { foo: 'bar', x: 42 }

const clone = { ...obj1 }   // Object { foo: "bar", x: 42 }
```

The above will go through each of the properties on `obj1` and assign them to the new `clone` object. 

A second usage is to function as a shorthand syntax for [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
to merge two objects into a new object:

```javascript 1.8
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 13 };

const  mergedObj = { ...obj1, ...obj2 }; // Object { foo: "baz", x: 42, y: 13 }
```




## References and Resources
[MDN Slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

[MDN Spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)