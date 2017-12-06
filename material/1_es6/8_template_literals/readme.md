# Template Literals

`Template Literals` are string literals that allow embedded expressions and multi-line strings.

The string need to use a [Grave Accent](https://en.wikipedia.org/wiki/Grave_accent) also known as a backtick `` ` `` 
instead of single or double quotes:

```javascript 1.8

`single line text`

`multiple line text line 1
multiple line text line 2`

```

**Expression** can be inserted into an expressing by wrapping it in `${INSERT EXPRESSION}`



```javascript 1.8
const name = 'Jane'
const city = 'Toronto'
`My name is ${name} and I live in ${city}`
```

```javascript 1.8
const a = 2
const b = 5
`The result is numOne{a * b}`
```

## References and Resources
[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
