## Store

There is a **single** `store` in the application and it is responsible for the following:

- Holding all the application state
- Allows access to state via `getState()`
- Allows state to be updated via `dispatch(action)`
- Registers listeners via `subscribe(listener)`
- Handles unregistering of listeners via the function returned by `subscribe(listener)`

### Creation

The store is created with the [createStore](https://redux.js.org/docs/api/createStore.html) function from the `redux` package 

```javascript 1.8
import { createStore } from 'redux'
import app from './reducers'
const store = createStore(app)
```

The method takes 3 arguments:
1. Reducer
2. (Optional) Pre-loaded or initial state
3. (Optional) Enhancers (See Middleware)

Within **React Application** the majority of the interactions with the `Redux Store` can be done through the `react-redux`
module (see [React-Redux](../2_react_redux/readme.md)) but here are some of the operations this library is using:

### Getting State

Once a store has been created the current state can be obtained via [getState()](https://redux.js.org/docs/api/Store.html#getState)

```javascript 1.8
console.log(store.getState())
```

### Dispatching Actions

To interact with the store **actions** need to be `dispatched` (see more on [Actions](./actions.md)) through the stores's [dispatch()](https://redux.js.org/docs/api/Store.html#dispatch) 
method, which takes a single argument -- the action to be dispatched.

```javascript 1.8
// Action Creator
const addTodo = text =>{
    return {
        type: ADD_TODO,
        text: 'Buy milk from the store'
    }
}

store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
```

### Subscribing / Unsubscribing

For anything to respond to changes in the store they can `subscribe` to the store and in return they will be given an
`unsubscribe` function that can be called to unregister them from changes.

```javascript 1.8
// Every time the state changes, log it
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

...

unsubscribe()
```

##### Next up: [Date Flow](./dataflow.md)