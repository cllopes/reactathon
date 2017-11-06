# Introducing **let** and **const**

Prior to ES6 `var` was the only way to assign variables. `var` is **function scoped** which could often to lead to some unintended consequences.

If the variable is not declared within a function it is given **global** scope.

Example:

```javascript 1.8
var i = 1

for(var i = 0; i<10; i++) {
    console.log(i)
}
console.log(i)
```

The final `i` here would print 10

One common solution to this issue was to create _anonymous_ functions to isolate the variable:

```javascript 1.8
var i = 1
(function () {
    for(var i = 0; i<10; i++) {
        console.log(i)
    }
})()
console.log(i)
```

Here the final `i` would print 1 as expected.

Two new variable declarations were introduced in ES6 `let` and `const`


### let

`let` is similar to `var` in that allows you create and reassign a variable, however it differs in that it is `block` scoped (scoped to the nearest curly brackets) rather than function.

If we ran the same code as in the first `var` example:

```javascript 1.8
let i = 1
for(let i = 0; i<10; i++) {
    console.log(i)
}
console.log(i)
```

This time `i` would be the expected 1 since it is in a different block it is treated as a separate variable entirely than the i within the for loop.

### const

`const` is `blocked` scoped simialr to `let` but it has an additional features, as it's name sugguest, where it create a variable that **cannot** be reassigned.

```javascript 1.8
const foo = 123
foo = 456
```

will result in an `TypeError: Assignment to constant variable.`

**NOTE:** while `const` cannot be reassigned that does not make it **immutable**, if it is a object it's contents can still be altered.

```javascript 1.8
// Foo cannot be reassigned
const foo = 213

const bar = {
    name: 'Bar',
    color: 'Green'
}

// Bar.name can be reassigned
bar.name = 'Blue'
```


### Best Practise

Whenever possible use `const` but if you do need to reassign `let` is preferred over `var1

## References and Resources

[Webos](http://wesbos.com/let-vs-const/)

[MDN Web Docs let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

[MDN Web Docs const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

[MDN Web Docs var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)

[Fun Fun Function](https://www.youtube.com/watch?v=sjyJBL5fkp8)
