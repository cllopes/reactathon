#Higher Order Components

[Higher Order Components](https://reactjs.org/docs/higher-order-components.html)

*Higher Order Component* is a pattern that has emerged in `React` and not an actual part of the API.

*HOC*s is pattern that aim to **reduce code duplication**, at one point this was accomplished by `Mixins` but when `Mixens`
were dropped from the ES6 class standards **React** also dropped support for them in version 0.13 
(see [Mixins Area Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
and [Mixins Considered Harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)).

An *HOC* is simply a function that wraps a component and allows you to:
- Reduce code, logic, bootstrap extraction
- State abstraction and manipulation
- Props manipulation

It takes in the component to be wrapped as an argument and returns a new component that renders the passed in component,
 passing it all the props and any additional props.

A very trivial explain of this is if you wanted to add logging to certain lifecycle methods of the component:

```javascript 1.8
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />
    }
  }
}
```

Example using this *HOC*:

```javascript 1.8
const MyComponent extends Component {
	render() {
		return <div>Component to be Wrapped</div>
	}
}

export default logProps(MyComponent)
```

Now when <MyComponent> is imported it will actually have a wrapping component that will log next and current props each time 
`componentWillReceiveProps` is called.

In the `logProps` *HOC* the render method returns the `<WrappedComponent>` passing it all of the original props using the
 [spread](../../1_es6/9_spread/spread.md#sperad-operator) operator on this.props `return <WrappedComponent {...this.props} />`.
 this is important as the *HOC* doesn't know which props the `<WrappedComponent>` currently accepts and will accept in the
 future so it shouldn't be unintentionally filtering out props.
 
 
 ##### Next up: [Testing](../10_testing)


## References and Resources

[React Higher Order Components](https://reactjs.org/docs/higher-order-components.html)


[Medium Higher Order Component In Depth](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)