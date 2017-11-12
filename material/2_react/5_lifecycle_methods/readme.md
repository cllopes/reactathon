#Lifecycle Methods

React's **Class components** give you hooks into hooks into several "lifecycle methods" where you can override 
and add custom functionality.

There are 4 categories of "lifecyles":

1. **Mouting** -- when the component is first being added to the DOM

2. **Updates** -- when the component is mounted and receives changed props or has it's state changed

3. **Unmounting** -- when the component is being removed from the DOM

4. **Error Handling** -- called on errors during rendering, in a lifecycle method, or in the constructor of any child component.

Some of the lifecycle methods will trigger before an event and typically begin with the name `componentWill` other will
trigger after an event and begin with the name `componentDid`

##Mounting

These first set of hook will be called only **once** in the following order when the component is first being added to the DOM:

1. [constructor()](#constructor)

2. [componentWillMount()](#componentWillMount)

3. [render()](#render)

4. componentDidMount()


###constructor

This method is called when the component has been created before it is mounted (added to the DOM).

It's primary usage is to initial that component state by setting `this.state` (do not use `this.setState()` here).

A secondary usage is to bind any methods.

The constructor takes in `props` as a single argument -- if you want to use props in the constructor (example set the 
initial state based on the props) you need to call the inherited `React.Component` constructor with the props: `super(props)`


```javascript 1.8
constructor(props) {
  super(props);
  this.state = {
    color: props.initialColor
  };
}
```

If you do not need to initialize state or bind any methods you can completely omit the constructor from the Component.

###componentWillMount (avoid)

This methods is called immediately before the component is added to the DOM and the `render()` method is run.

At this point using `componentWillMount` is highly unadvisedly and it mostly kept around for backwards compatibility.

Any component initialization should be done in the `constructor` subscription or logic with side effects (example changing state)
 should `componentDidMount` as calling setState() in `componentWillMount` will not trigger a rerendering.
 
 Note: This is the only lifecycle hook called on server rendering.
 
 
###render

The render method (the only *required* lifecycle method of class component) will examine `this.props` and `this.state`
and return one the following

1. **React Element** -- native DOM components (`<div/>`) or user-defined components (`<MyComponent/>`)

2. **String or Numbers** -- rendered via text nodes in the DOM

3. **Portals** -- newly introduced features of React 16 that allows access to DOM nodes outside the DOM hierarchy of a parent component.

4. `null` - renders nothing

4. **Booleans** - renders nothing (used to support conditional rendering such as `return test && <Child />` -- if 
test is true `<Child/>` will be rendered otherwise nothing will be)

The render method should be **pure** and have no side effects. This means everytime the render method is run with the 
same set of `this.props` and `this.state` it should always return the same result. It should also not trigger any 
events.

The render method is the only lifecycle method that is part of both the **Mounting** and **Updating** lifecycles. In
the case of the **Mounting** it will also be called between `componentWillMount` and `componentDidMount`.

In the case of the **Updating** flow it will be conditionally called depending on the return value of **shouldComponentUpdate**
but if it does it will be between `componentWillUpdate` and `componentDidUpdate`.

###componentDidMount

This method is called immediately after a component has been inserted into the DOM after the render() method.

This is the best place to make any calls to APIs. This is also the first point you hav access to the DOM so if you need
to added any event listeners to the DOM or do any DOM manipulation it should go here.

```javascript 1.8
componetDidMount() {
  fetch('https://gitconnected.com')
    .then((res) => {
      this.setState({
        user: res.user
      });
    });
}
```

##Updating

Now that the Component is mounted and added to the DOM the **Updating** lifecycle is in effect.

These lifecycle methods will be triggered on any changes to the component (either `this.state` or `this.props` that could
potentially cause the component to update). Unlike the **Mounting** and **Unmoutning** these methods can be called
many times over a Component's life.

###componentWillReceiveProps

The first method will be called on a mounted Component when it receives new props from it's parents. It takes in a single
argument `newProps`.

This is the place where you can trigger any changes to your state based on the incoming props by calling `this.setState()`.

**Note** `componentWillReceiveProps` may be called even if the props have not changed so be sure to verify that `this.props`
is different than `newProps`:

```javascript 1.8
componentWillReceiveProps(nextProps) {
  if (this.props.id !== nextProps.id) {
    this.setState({
      feedContent: []
    });
  }
}
```

Like the other **Updating** lifecycle methods this method (with the exception of render) will *not* be called on the _initial_ rendering
when the component is first mounted in the DOM. So if you intend to populate the Component's initial state with
values when the first passed in props you need to do so in the `constructor`.


###shouldComponentUpdate

`shouldComponentUpdate` takes in 2 parameters `newProps` and `newState` and determines if a Component needs to render
based on this information by returning `true` or `false`. It is triggered by any changes of `this.props` from the parents
or `this.state` from any `this.setState` calls.

The **default** behavior of `shouldComponentUpdate` is to always return `true` and renders on any changes to `this.state`
and `this.props`. You can normally rely on this default behavior.

Overriding the default `shouldComponentUpdate` should only be done as performance enhancement if you render is slow/intensive
and is triggered to often. Majority of the time it is faster to just render the component that try to run the comparision
logic in `shouldComponentUpdate`.

If `shouldComponentUpdate` returns `false` all the other lifecycle methods down the chain (`componentWillUpdate`, 
`render`, `componentDidUpdate`) will not be executed.

One other optimization you can do before implementing your own `shouldComponentUpdate` is have your component inherit from 
`React.PureComponent` instead of `React.Component` -- Pure Component is the exact as Component except it implements 
`shouldComponentUpdate` with a shallow props and state comparision.

**Redux Note:** Any component created via the `connect` methods of `react-redux` are `react.PureComponents`

```javascript 1.8
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.color !== nextProps.color;
  }
```

###componentWillUpdate (avoid)

This method will be called after `shouldComponentUpdate` returns true (after a change in `props` or `state`) right before
the render is triggered.

Very similar to `componentWillMount` you should avoid putting any side-effect logic in here. 

Any calls to `this.setState()` here will not properly re-trigger rendering and should be done in `componentWillReceiveProps`
 and any post-render changes should be done in `componentDidUpdate`
 
###componentDidUpdate

This method is immediately called after a Component has been updated in the DOM with it's `render`, like the rest of the
method in the **Updating** flow it is **not** called on the _initial_ rendering.

It takes 2 parameters `prevProps` and `propState` (the new props and state can be accessed now via `this.props` and `this.state`)

Now that the DOM has been fully updated this is where you put any DOM specific interaction that or preform any new network
requests. *Note* similar to `componentWillRecieveProps` there is no guarantee the props or state will have changed when 
`componentDidUpdate` run so make sure to check for changes before making calls.

##Unmounting

The unmounting phase occurs when the the Component is no longer required and is about to be removed from the UI.

Current it only consists of the `componentWillUnmount` method

###componentWillUnmount

This method will run just before the component is unmounted where it will be completely removed from the DOM.

This is the best place to do any clean up -- such as removing any event listeners on the DOM elements or the window.

```javascript 1.8
componentWillUnmount() {
  window.removeEventListener('resize', this.resizeEventHandler);
}
```

##Error Handing

Newly introduced as part of **React 16** release is a new lifecycle method called `componentDidCatch`

##componentDidCatch

Prior to `React 16` and the introduction of `componentDidCatch`, React apps were notorious for crashing the entire application
or left in a unrecoverable/corrupted state after an unexpected and unhandled javascript error occurred. 

`componentDidCatch` was introduced to solve this issue by creating **error boundaries** that catch any error within the
Component or the Component's tree of children and allowing the UI to display a fallback UI as well as preform any diagnostic
logging.
 
There are two parameters `error` and `info`.

An example of an Error Boundary Component:

```javascript 1.8
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

`componentDidCatch` sould only be used to catch and handle **unexpected** errors not to control normal user flow.


#### Summary of React's Life Cycles from
[lifecycle]: 


## References and Resources

[ReactJS Component](https://reactjs.org/docs/react-component.html) 
[ReactJS Stat and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
[React Pure Component](https://reactjs.org/docs/react-api.html#reactpurecomponent)
[Medium](https://medium.com/gitconnected/componentdidmakesense-react-lifecycle-explanation-393dcb19e459)

