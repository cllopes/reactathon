# Deconstruction

**Destructuring** is a new syntax introduced to make it convenient for extracting values stored in arrays or objects.

## Object Deconstruction

Objects can be deconstructed having it's values extracted into individual variables:

```javascript 1.8
const obj = {first: 'Jane', last: 'Doe'}
const {first, last} = obj

console.log(first)  // Jane
console.log(last)   // Doe
```

You can also rename variables using the following synax `{original: newName}`

```javascript 1.8
const obj = {first: 'Jane', last: 'Doe'}
const {first: firstName, last: lastName} = obj

console.log(firstName)  // Jane
console.log(lastName)   // Doe
```

## Array Deconstruction

Values in arrays can be unpacked into individual variables:

```javascript 1.8
const array = ['a', 'b']

const [x,y] = array

console.log(x,y)  // Prints a b
```

### Rest

You can extract some of the array values into variables and use the `rest` operator (denoted by `...`) to hold the remaining elment sin the array.

```javascript 1.8
const array = ['a', 'b', 'd', 'e', 'f']

const [x, y, ...rest] = array

console.log(x)      // a
console.log(y)      // b
console.log(rest)   //[ 'd', 'e', 'f' ]
```


## Defaults

**Default** values can also be set for both types of destructoring

```javascript 1.8
const array = ['a', 'b']

const [x,y, z='z'] = array

console.log(x,y,z)  // Prints a b z
````


## Usages

### Swapping Variables
Variables can be conveniently swapped using destructuring:
 
```javascript 1.8
let a = 1;
let b = 2;

[a, b] = [b, a]
console.log(a)  // Prints 2
console.log(b)  // Prints 1
```

### Invalid JavaScript Identifier
You can deconstruct names that are not valid identifiers and rename to something valid

```javascript 1.8
const foo = { 'fizz-buzz': true };
const { 'fizz-buzz': fizzBuzz } = foo;

console.log(fizzBuzz); // "true"
```

### Parameter breakdown

If you are passing an object (or array) to a function and only need to access certain properties or element of it you can
break them down in the function definition for convenience:

```javascript 1.8
const jane = {
    first: "Jane",
    last: 'Doe',
    age: 15
    //More properties...
}

const hello = function({first, last}) {
    console.log(`Hello ${first} ${last}`)
}

hello(jane)
```