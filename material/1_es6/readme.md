# ES6 (and beyond)

ES6 (ECMAScript 2015) was the 6th edition to the ECMAScript standard released in 2015.
It was the first update since ES5 released in 2009 and included many syntatic changes and
new features.

ES6 was a pretty big deal in the JavaScript universe firstly because it was the first major release
in 6 years and it contains a large amount of nearly introduced features, but the evolution of 
JavaScript does not end here.

The [TC39](https://github.com/tc39) decided to transition the ECMAScript standardization process to a yearly release 
cadence. This is why `ES6` is also referred to by it's year (ECMAScript 2015). The next releases after ES6 have been much 
small in terms of the number of changes but have contained some important new features.

- ES7 (ECMAScript 2016) — Finalized in 2016 (`Array.prototype.includes()`, `**` exponent operator)

- ES8 (ECMAScript 2017) — Finalized June 2017 (`async/await`) 

- ES.Next -- refers to the ''

### Why ES6 and How ES6?

One the largest hurdles in the adoption of ES6 is the lag in browser compatibility:

[ES6 Browser Compatibility](https://kangax.github.io/compat-table/es6/)

[ES-next Browser Compatibility](https://kangax.github.io/compat-table/esnext/)

After each standard is published it is still up to each of the Browser/JavaScript Engine to start supporting the new standard.
 
Even worse in the case of Internet Explore some versions may never be updated to support these new features.

If this is the case why is everyone so interested in ES6 if they still intend to support a wide array of browsers?

The answer is **JavaScript Transpilers** like [Babel](https://babeljs.io/).

While this section isn't meant to be a deep guide on transpilers it's important to have an understanding of what they do and
why we need them.

A **transpiler** is a `source-to-source` compiler -- it takes source code in one language and outputs the equivalent source 
code in another language. There are many transpilers out there that convert source code to JavaScript -- two of the most known
one's are `CoffeeScript` and `TypeScript`.

This means we can take code written in `ES6`, `ES7`, `esnext` and run it through a compiler like `Babel` to output `ES5`
distribution code that can be run on current day browsers/JavaScript Engines.

**Note:** This approach is different than the use `polyfills` which will try to emulate missing APIs -- for example
 prior to the `ES6` introduction of the [Promise](./5_promises) feature  had many `polyfills` that allowed their usage within
 current day browsers.


## Content

1. [let/const](./1_let_const/)

2. [deconstruction](./2_deconstruction/)

3. [arrow function](./3_arrow_functions)

4. [classes](./4_classes)

5. [promises](./5_promises)

6. [modules](./6_modules)

7. [enhanced object literals](./7_enhanced_object_literals/readme.md)

8. [template literals](./8_template_literals/readme.md)

9. [spread](./9_spread/spread.md)



https://github.com/lukehoban/es6features
 
 