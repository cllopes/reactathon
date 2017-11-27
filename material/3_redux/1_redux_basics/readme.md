# Redux Basics

`Redux` is library build to simplify and centralize application state which predicable changes.

The three core concepts of Redux (from [Redux Three Principles](https://redux.js.org/docs/introduction/ThreePrinciples.html))

1. Single Source of Truth

Your applications entirely state is stored within a `single object tree` within a single centralized `store`

2. Store is **Read Only**

State is only changed in response to dispatch action that describes exctly what happened.

3. Changes are made with **Pure** Functions

The reducers that modify the state must be **pure** functions -- that is that take in a the previous state, return a new state
but do not make any modification to the previous state.

1. [Actions](./1_actions.md)
2. [Reducers](#reducers)
3. [Store](#store)
4. [Data Flow](#data-flow)

**TODO: Move to own files**

### Action Creators

A common pattern to extract away some of the boiler plate is to create `Action Creators` whose job is to construct an
action object.

```javascript 1.8
const addTodo = text =>{
    return {
        type: ADD_TODO,
        text: 'Buy milk from the store'
    }
}
```

## Reducers

`Reducers` are responsible for generating a new `state` based on the `actions` dispatched to it.

A `Reducer` is a function that takes 2 parameters `previousState` and `action` and returns the `newState`.

```javascript 1.8
(previousState, action) => newState
```

The `Reducer` function needs to be **Pure** and should not do the following: 
1. Mutate the previousState
2. Mutate the arguments
3. Perform side effects like API calls

For the same set of `state` and `action` the reducer should always return the same `newState`

The point of never mutating the `previousState` is especially important because `Redux` relies on comparing the old and
new states to know if it should publish the change to the subscribed Components. If the reducer simply mutates the old state
this diff will return a false negative and updates may not get published.

The most basic reducer would take in a previous state and action and simply return the original state.

```javascript 1.8
const reduce = (state, action) => {
    return state
}
```


##### Initial State


The next thing a reducer needs to do is handle the **initial state** which occurs when the passed in state is '`undefined'.

A reducer cannot return `undefined` so it needs to return some type of preconfigured default state -- often this could just
be an empty object or an empty array.

A good technique for this is to use the `ES6 Default Argument Syntax` to define the default state:

```javascript 1.8
const reduce = (state = {}, action) => {
    return state
}
```

Next the reducer needs to start responding to the passed in `action` -- first by checking the the action `type` and creating
a new state appropriately

```javascript 1.8
const reduce = (state = {}, action) => {
    
     switch (action.type) {
        case SET_COLOR:
            return Object.assign({}, state, {color: action.color})
        case SET_QUANTITY:
            return Object.assign({}, state, {quantity: action.quanity})
        default:
            return state
}
```

Note in the above we still have the default behavior that the reducer should return the previous state if it does not
know how to handle the dispatched action.

We also are avoiding mutation the original state by using `Object.assign`

### Tips for not mutating state

One of the hardest concepts to grasp when first using Redux is avoiding object mutation but there are some ticks.

#### Objects

##### Object Assign

The easiest way to avoid mutating an object is to the `Object.assign` which will create a brand new object which the 
properties you want to change.
 
 `Object.assign({}, originalObject, {property: 'updated'})`
 
This will create a new object ({}) as the `target` then assign it all the properties of the `originalObject` then assigns 
it all properties of the next object. You can provide any many `sources` to the object and if there are conflicts in properties
the **last** source wins. So if `originalObject` had a value for `property` the newly created object would still get a value
of `updated` for the property.

##### Object Spread

Introduced in `ES7` is the `Object Spread` operation 

```
    const object = {
        name: 'Jim',
        age: 30,
        favoriteColor: 'orange'
    }

    return {...object, age: 40}
```

#### Arrays

Similar to Object you need to avoid directly modifying an array with `push` or `pop` operations.

##### Adding Values with Concat

Instead of `push` you can use `concate` to return a new list:

```javascript 1.8
return list.concat([newItem])
```

**Note:** concate is used to join 2 arrays so newItem needs to be converted to an array by being wrapped in []

##### With Spread

The same `concat` could be written with the `ES6 Array Spread` operator

```javascript 1.8
return [...list, newElement]
```

#### Remove Values with Slice + Concat

Instead of using the `spice` method to remove elements an at and index you can use use `slice` to get the part of
the array before the element and the part of the array after the element and join them with `concat`

```javascript 1.8
return list.slice(0, index).concate(list.slice(index + 1))
```

##### With Spread

Similarly you can replace the `concat` with the `ES6 Array Spread` operator

```javascript 1.8
return [...list.slice(0, index), ...list.slice(index + 1)]
```

#### Updating Value with Slice + Concat

You can extend the Removing values approach to update an item by just appending the modified item in between the sliced
first and second half of the original array.

```javascript 1.8
return list.slice(0, index)
           .concate([list[index] + 1])
           .concate(list.slice(index + 1))
```

##### With Spread

```javascript 1.8
return [...list.slice(0, index), list[item] + 1, ...list.slice(index + 1)]
```

### ImmutableJS

There is an entire library build around creating immutable JavaScript collection and objects known as [ImmutableJS](https://facebook.github.io/immutable-js/).

It's worth considering using `ImmutableJS` if you are finding you have too many unintended mutation but it does come with a 
performance trade off and is a fairly large sized library.


## Store

There is a **single** `store` in the application and it is responsible for the following

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
let store = createStore(app)
```

The method takes 3 arguments:
1. Reducer
2. (Optional) Pre-loaded or initial state
3. (Optional) Enhancers (See Middleware)

Within **React Application** the majority of the interactions with the `Redux Store` can be done through the `react-redux`
module (see **INSERT Reference**) but here are some of the operations this library is using:

### Getting State

Once a store has been created the current state can be obtained via [getState()](https://redux.js.org/docs/api/Store.html#getState)

```javascript 1.8
console.log(store.getState())
```

### Dispatching Actions

To interact with the store **actions** need to be `dispatched` (see [Actions](#actions)) through the stores's [dispatch()](https://redux.js.org/docs/api/Store.html#dispatch) 
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
`ubsubcribe` function that can be called to unregister them from changes.

```javascript 1.8
// Every time the state changes, log it
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

...

unsubscribe()
```





## Data Flow



## React Binding (Likely it's own at this point)

### Combining Reduces

### Providers

## Middlware / Async

