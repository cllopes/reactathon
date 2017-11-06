# Arrow Functions

One of the most anticipated features from ES6 **arrow functions** (also known as fat functions) are a new less 
verbose syntax for defining functions.

Full function definition for a function that squares a number

```javascript 1.8
const multiply = function (x,y)
{
    return x*y
}

multiply(5)
```

Rewritten using arrow function
```javascript 1.8
const multiply = (x, y) => { return x * y}
```

## Syntax

There are some special shorthands you can use depending on the number of arguments and lines in your function:

#### Parameter syntax

```javascript 1.8
    () => { ... } // no parameter
     x => { ... } // one parameter, an identifier
(x, y) => { ... } // several parameters
```

#### Body Syntax
```javascript 1.8
x => { return x * x }  // block
x => x * x  // expression, equivalent to previous line
```


### Single Parameter

If the function only has one parameter we can omit the brackets around the parameters, this is needed if you have 0 or
 more than 1 parameter


```javascript 1.8
const square = x => { return x * x}
```

### Single Return Statement

If the function is a single line return we can also omit the curly braces and return statement.

```javascript 1.8
const square = x => x * x
```

When there is no curly braces the result of the function will automatically be returned

**Note** If you want to return an object literal you need to wrap it in brackets or else it is considered an expression statement.

```javascript 1.8
const f1 = x => ({ bar: 123 });
f1()    // { bar: 123 }
```

```javascript 1.8
const f2 = x => { bar: 123 };
f2()    // undefined
```



## This

In traditional function have their own `this` bound to the function scope:

```javascript 1.8
function Prefixer(prefix) {
    this.prefix = prefix;
}
Prefixer.prototype.prefixArray = function (arr) { // (A)
    'use strict';
    return arr.map(function (x) { // (B)
        // Doesn’t work:
        return this.prefix + x; // (C)
    });
};

const prefix = new Prefixer('The ')
prefix.prefixArray(['one', 'two'])
```

The above will result in `TypeError: Cannot read property 'prefix' of undefined` as this in the nested function is bound
to the function

There are work around such as assigning `that = this`

```javascript 1.8
function Prefixer(prefix) {
    this.prefix = prefix;
}
Prefixer.prototype.prefixArray = function (arr) {
    var that = this;
    return arr.map(function (x) {
        return that.prefix + x;
    });
};
```

Or using `bind`

```javascript 1.8
function Prefixer(prefix) {
    this.prefix = prefix;
}
Prefixer.prototype.prefixArray = function (arr) {
    return arr.map(function (x) {
        return this.prefix + x;
    }.bind(this)); // (A)
};
```

But because arrow functions do not rebind `this` (it uses the this of the enclosing context) they can be used to avoid this issue.

```javascript 1.8
function Prefixer(prefix) {
    this.prefix = prefix;
}
Prefixer.prototype.prefixArray = function (arr) {
    return arr.map((x) => {
        return this.prefix + x;
    });
};
```

## No Binding of `arguements`

Arrow functions do not have their own `arguments` object.

The `rest` operator can be used to fill a similar purpose:

```javascript 1.8
function addition() {
    return arguments[0] + arguments[1]
}

addition(1,2) //3
```

```javascript 1.8
const addition = (...rest) => {
    return rest[0] + rest[1]
}

addition(1,2) // 3
```

## References and Resources
[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
[Exploring JS](http://exploringjs.com/es6/ch_arrow-functions.html)
[Code Burst](https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc)
[2ality](http://2ality.com/2012/04/arrow-functions.html)
[Fun Fun Functions](https://www.youtube.com/watch?v=6sQDTgOqh-I)
https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/

