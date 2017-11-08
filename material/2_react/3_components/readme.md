# Components and Props

React Components are how we are able to split our UIs into smaller reusable pieces.

There are two types of Components: **Class Components** and **Functional Component**


## React.Component

The first type of Components the **Class Component** can be created using ES6 Classes (see [ES6 Classes](../../1_es6/4_classes)) extending
either Reacts `Component` or `PureComponent`

```javascript 1.8
import React, {Component} from 'react'

class Welcome extends Component {
    render() {
        return <div>Welcome!</div>
    }
}
```


The only required method on a class component is the `render` method which is the final Element that will be rendered.

---

Prior to React v15 `React.createClass` could be used to create Class components instead of extending the ES6 Component class.

Classes created via this means behaved slightly different than ES6 classes (most notably `this` was automatically bound on all methods
which it is not in ES6 Classes.

`React.createClass` has been depreciated as of v15 and shoul not longer be used

---

The second more light weight component type is **Function Components** (also known as stateless) is just a function that
returns the result to be rendered.

```javascript 1.8
import React from 'react'

const Welcome = () => {
     return <div>Welcome!</div>
 }
```

**Note** You still need to import React in modules that contain functional components.

## Props

To pass information into a component you will use props (short for properties).

The Functional components takes the props as as argument to the function:

```javascript 1.8
const Welcome = (props) => {
    return <div>Welcome {props.firstName}!</div>
}
```

You can use Object Destructoring (see [ES6 Object Destructoring](../../1_es6/2_deconstruction)) to break down the props 
directly in the function signature instead of calling `props.propName` repeatedly 

```javascript 1.8
const Welcome = ({firstName, lastName}) => {
    return <div>Welcome {name} {lastName}!</div>
}
```


Class components can access their props via `this.props`:

```javascript 1.8
class Welcome extends Component {
    render() {
        return <div>Welcome {this.props.firstName}!</div>
    }
}
```

Props are passed to child components from their parents through the tag attributes:

```javascript 1.8
<App>
    <Welcome firstName="Jane"/>
</App>
```

Within a component props are **READ ONLY** and cannot be modified by the component. They can only
by changed by the parent component.


#### defaultProps

Your component can define a static property called `defaultProps` where you can define a set of default for if the prop
is not passed or is passed in as `undefined`, passing in **null** will not trigger the default to be used.

```javascript 1.8
class Welcome extends Component {

    static defaultProps = {
        firstName: 'John'
    }

    render() {
        return <div>Welcome {this.props.firstName}!</div>
    }
}
```

Similarly you can also add default props to functional components using slightly different syntax:

```javascript 1.8
const Welcome = (props) => {
    return <div>Welcome {props.name}!</div>
}

Welcome.defaultProps = {
    name: 'John'
}
```

### Functional vs Class Components Summary


Functional Components
- Lightweight does not require extending any classes
- Syntactically more concise and simple 
- Props passed in a function argument


Class Components
- Can utilize component state (see [State](../4_state))
- Can utilize component lifecycle methods (see [Lifecycle Methods](../5_lifecycle_methods))
- Props access via this.props


## References and Resources

[ReactJS Component and Props](https://reactjs.org/docs/components-and-props.html)
[ReactJS React Component](https://reactjs.org/docs/react-component.html)


