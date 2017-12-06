# JSX

While not absolutely required for React JSX is __strongly__ recommended you use JSX to describe what you UI should look like.

It stands for simply **JavaScript XML** and it is a syntax extension of JavaScript.

While JSX does resemble HTML or a templating language but it fully powered JavaScript.

A simple example of JSX:

```javascript 1.8
const element = <h1>Hello, world!</h1>
```

The first thing you probably notice is this is not valid javascript and cannot be run in the browser, which you are correct.

To use JSX in any JavaScript application you need to transpile it with something like babel first. 
Similar to if you wanted to use new ES6+ features.

(**NOTE**: Transpilers are **source-to-srouce** compilers, so they convert JavaScript of some form to another, examples being
converted ES6 code to ES5 syntax or converted JSX to ES5 syntax)

Babel has a `transform-react-jsx` plugin that does just this (see [Babel Transforming React JSX](https://babeljs.io/docs/plugins/transform-react-jsx/))

For the sake of experimenting we can use the online [Babel REPL](https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbiA&debug=false&circleciRepo=&evaluate=false&lineWrap=true&presets=es2015%2Creact%2Cstage-2&targets=&version=6.26.0)
) to see what JavaScript JSX is transpiled into.

## JSX Under the Hood

If we run the first JSX expression into the babel REPL we will see the following conversion:

```javascript 1.8
var element = React.createElement(
  "h1",
  null,
  "Hello, world!"
);
```

It produces a **React.createElement** call. A **React Element** <cite>is a plain object describing a component instance or DOM node and its desired properties</cite> and is the core building block of the React API.

It <cite> is a light, stateless, immutable, virtual representation of a DOM Element.</cite>

If you have ever heard of the concept of **Virtual DOM** -- (not to be confused with Shadow DOM) it is a tree of these **React Elements**.
These are pure JavaScript objects that represent each node in the DOM. React modifies this tree instead of the actual DOM which would be much slower.

React's diffing algorithm (known as [Reconciliation](https://reactjs.org/docs/reconciliation.html)) is able to tell 
based on the changes in the Virtual DOM tree when and how the real DOM needs to be modified, minimizing DOM changes as much as possible.

The `React.createElement` call takes 3 arguments

1. type (string | component)
2. props (null | object)
3. children (null | string | component | element)

In the case of `<h1>Hello, world!</h1>`

1. The typs is a `<h1>` tag
2. There are no passed in props
3. The children is the `'Hello, world!'` String

Lets try creating an element with properties:

```javascript 1.8
const element = <div style={{color: 'green'}} className="my-class">Green My Class</div>
```

If we run this through the babel REPL we see the props passed in as a nested object `{ style: { color: 'green' }, className: "my-class" }`

```javascript 1.8
var element = React.createElement(
  "div",
  { style: { color: 'green' }, className: "my-class" },
  "Green My Class"
);
```

Next lets try nesting something inside our div:

```javascript 1.8
const element = <div style={{color: 'green'}} className="my-class">
    <span>Nested Elements</span>
</div>
```

And we see another nested React.createElement:

```javascript 1.8
var element = React.createElement(
      "div",
      { style: { color: 'green' }, className: "my-class" },
      React.createElement(
            "span",
            null,
            "Nested Elements"
      )
);
```

Finally, lets try nesting another React Element within our first element.

**Note:** You __must__ name your React Components with Capitals as lowercase names refer to built-in components (span, div, h1....).

```javascript 1.8
const Component = <span>Hello world</span>

const element = <div style={{color: 'green'}} className="my-class"><Component/></div>
```

This results in another nested React.createElement.

```javascript 1.8
var Component = React.createElement(
      "span",
      null,
      "Hello world"
);

var element = React.createElement(
      "div",
      { style: { color: 'green' }, className: "my-class" },
      React.createElement(Component, null)
);
```

But rather than write our entire applications in nested React.createElement calls (which you could) majority of application are written with JSX.


## Embedding Expressions

Any javascript expression can be written in JSX as long as it is contained with curly brackets:

```javascript 1.8
<h1>
    {2+2}
</h1>
```

or for example calling a function:

```javascript 1.8
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const Element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```


## Attributes with JSX

Attributes on built in DOM elements can be specified in JSX, literals should be wrapped in quotes and expressions wrapped in curly backets

```javascript 1.8
<div tabIndex='0'></div>;
```

```javascript 1.8
<img src={user.avatarUrl}></img>;
```

When DOM attributes (class, tab-id, width, max-length) are being passed in they need to be converted to camel case in the JSX.

So `taxIndex` in JSX will convert to `tab-index` in the resulting HTML.

A special case is `class` since it is a key word in JavaScript `class-name` should be used in it's place.

Prior to [React 16](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html) any unknown attributes would
just be skipped by React all together. 

After release 16 React does support passing custom attributes but you should still use the *canonical* notitation for DOM attriutes
described above


## Children

You can have elements that immediately closes with /&gt; 

```javascript 1.8
<img src={image.source} />
```

Or you can also pass nested children as well.

```javascript 1.8
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
```


## Styles

Styles can be passed to elements using the `style` attribute which expects a nested JavaScript object __not__ CSS syntax:

```javascript 1.8
<div style={{color: 'red', fontSize: 20}}> Hello World </div>
```

The first set of curly braces is telling the JSX that we are writing a JavaScript expression while the second set is the actual styles object.

It is easier to see this if you break styles out into it's own object.

```javascript 1.8
const styles = {color: 'red', fontSize: 20}
<div style={styles}> Hello World </div>
```

**Note**:  Similar to the class attributes here the styles are camelCase as well so `font-size` needs to be converted to `fontSize` in the passed in object


## References and Resources

[ReactJS JSX Introduction](https://reactjs.org/docs/introducing-jsx.html)

[ReactJS Element Blog](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)

[React 16 Attribute Realease Notes](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)

https://gist.github.com/sebmarkbage/fcb1b6ab493b0c77d589














https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html
