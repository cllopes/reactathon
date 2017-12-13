# State

While props are a means of passing data from a parent to component, `state` is the internal data store of a component.

State can only be used within **Class Components** and it is completely isolated to the component -- it cannot be accessed
from the component's parents or children.

The **state** should be a plain JavaScript object that should be accessed with `this.state` and updated with `this.setState()`

Outside of the component's constructor this.state should never be used for assignment purposes, once the component is 
created `this.state` should be considered immutable.


## Initializing State

For a component to use its **state** it needs to first initialize it within the `constructor` by setting `this.state` to the initial state object.
This is the only place `this.state` should be mutated directly.

If you want to pre-populate the state with the initial values based on the first set of props you can do so but make sure to call `super(props)` at the 
start of the constructor.

```javascript 1.8
constructor(props) {
        super(props)
        this.state = {
            count: props.initialCount
        }
    }
```


## Using State

You can access state similarly to accessing props but using `this.state`:

```javascript 1.8
class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: props.initialCount
        }
    }

    render() {
        return <div>Count: {this.state.count}</div>
    }
}
```

## Updating State

All state mutations should be done with `this.setState` which has 2 potential signatures:

1. In the first usage you pass `setState` an object containing the properties you want to update.

```javascript 1.8
this.setState({count: 2})
```

`this.setState()` will merge in these properties with the existing state properties, only overriding only any properties passed in.

**Warning:** `this.setState()` is asynchronous and can batch together updates, so if your update requires the previous state you may end up
with an unintended update like the following:

```javascript 1.8
Object.assign(
  previousState,
  {count: state.count + 1},
  {count: state.count + 1},
  ...
)
```

The count increment was called twice but because they were batched the new **count** will only be incremented once

2. If you need to update the state based on the current state you can use second form a setState which takes an updater function instead of an object:

Update function signature:

```javascript 1.8
(prevState, props) => stateChange
```

Example using Counter:

```javascript 1.8
this.setState ((prevState, props) => {
    return {count: prevState.count + 1}
})
```

Finally the last thing to note about this.setState is the optional second `callback` parameter which will get called once 
setState is complete and the component is re-rendered.

This is useful because as mentioned above `setState()` is asynchronous if you need to access `this.state` after setting the
state you should use this callback since it is the only point you can guarantee the state will be updated.

```javascript 1.8
this.setState(stateChange[, callback])
```

##### Next up: [Lifecycle Methods](../5_lifecycle_methods)

## References and Resources

[ReactJS State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

[ReactJS Component](https://reactjs.org/docs/react-component.html)


