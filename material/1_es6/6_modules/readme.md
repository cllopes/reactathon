# Modules

Like many other features introduced in ES6 javascript modules are not a new concept. Originally they were introduced 
with 3rd party libraries rather than the language itself.

Prior to ES6 the two modules standards were:

1. *CommonJS* -- The standard that influenced by _Node.js_ 
    - Aimed towards sever side 
    - Compact syntax
    - Designed for synchronous loading

2. *AMD* (Asynchronous Module Definition) -- The standard implemented by _Require.js_
    - More complex syntax
    - Designed for asynchronous loading and browsers


The ES6 `module` loading is meant to be a happy medium between the two featuring:
    - Compact syntax and support for circular dependencies
    - Support for asynchronous loading
    

The goal of any module loading system is to separate code into their own files (known as `modules`). In each file 
variables and functions are not visible to outside unless explicitly exported.

At it's core `modules` contains 2 concepts `exporting` from one module and `importing` in another.

There are two core types of `exports` **Named** and **Defaults**
    
    
## Named Exports

Each module can have have multiple `named` exports using the `export` syntax 


```javascript 1.8
export const square = x => x*x
export const squareRoot = x => Math.sqrt(x)

export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```

To use the modules in another module simply `import` them from your file using the relative
file path of the module listing the named modules you want to import within curly brackets:

```javascript 1.8
import {square, squareRoot, diag} from './module_one'
```

## Renaming named imports 

You can rename the imported modules using the `as` syntax.
This is particular helpful if you have 2 modules that export the same named module.

```javascript 1.8
import {square as libSquare, squareRoot as libSquareRoot} from './module_one'
```

## Default Exports

Unlike `named` export each module can only have a single `default` export using the `export default` syntax:

```javascript 1.8
export default function(){}
```

To import the `default` module you use the same `import` syntax but do not put curly brackets.

```javascript 1.8
import foo from './module_one';
```

The name of the the import does not need to match the name of the export you can name the 

```javascript 1.8
// module_one.js
const bar = 5
export default bar
```

```javascript 1.8
import foo from './module_one'
```

Here `bar` from module_one will be named `foo` in the imported module


You can mix importing both default and named exports in a single import statement.

```javascript 1.8
import foo, {square, squareRoot, diag} from './module_one'
```

## Import *

You can import entire modules with the `import * as` syntax giving the module a name.
However this will only import `named` modules not `default

```javascript 1.8
import * as modOne from './module_one'
modOne.square(5)
```

Anything can be exported:
 - Functions
 - Variables
 - Constants 
 - Classes


Full Export Syntax:
```javascript 1.8
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var, function
export let name1 = …, name2 = …, …, nameN; // also var, const

export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```

Full Import Syntax:
```javascript 1.8
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

## Re-exporting 

Within one module you can export the contents of another module:

```javascript 1.8
export * from 'src/other_module';
export { default } from `src/other_module`
```

## Importing installed libraries

Installed NPM modules can be imported using the module name instead of the file path:

```javascript 1.8
import React, {PureComponent} from 'react'
import moment from 'moment'
```


## References and Resources

[MDN Web Docs Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

[MDN Web Docs Export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)

[Exploring JS](http://exploringjs.com/es6/ch_modules.html)

