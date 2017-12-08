## Reducers

`Reducers` are responsible for generating a new `state` based on the `actions` dispatched to it.

A `Reducer` is a function that takes 2 parameters `previousState` and `action` and returns the `newState`.

```javascript 1.8
(previousState, action) => newState
```

The `Reducer` function needs to be **Pure** and __should not__ do the following: 
1. Mutate the previousState
2. Mutate the arguments
3. Perform side effects like API calls

For the same set of `state` and `action` the reducer should always return the same `newState`.

The point of __never mutating__ the `previousState` is especially important because `Redux` relies on comparing the old and
new states to know if it should publish the change to the subscribed Components. If the reducer simply mutates the old state
this diff will return a false negative and updates may not get published.

The most basic reducer would take in a previous state and action and simply return the original state.

```javascript 1.8
const reduce = (state, action) => {
    return state
}
```


#### Initial State


The next thing a reducer needs to do is handle the **initial state** which occurs when the passed in state is `undefined`.

A reducer cannot return `undefined` so it needs to return some type of preconfigured default state -- often this could just
be an empty object or an empty array.

A good technique for this is to use the `ES6 Default Argument Syntax` to define the default state:

```javascript 1.8
const reduce = (state = {}, action) => {
    return state
}
```

Next the reducer needs to start responding to the passed in **actions** -- first by checking the the action `type` and creating
a new state appropriately:

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

**Note:** in the above we still have the default behavior that the reducer should return the previous state if it does not
know how to handle the dispatched action.

We also are avoiding mutation the original state by using `Object.assign`.

### Tips for not mutating state

One of the hardest concepts to grasp when first using Redux is avoiding object mutation but there are some ticks.

#### Objects

##### Object Assign

The easiest way to avoid mutating an object is to the `Object.assign` which will create a brand new object which the 
properties you want to change.
 
 `Object.assign({}, originalObject, {property: 'updatedValue'})`
 
This will create a new object ({}) as the `target` then assign it all the properties of the `originalObject` then assigns 
it all properties of the next object. You can provide any many `sources` to the object as you like and if there are conflicts in properties
the **last** source wins. So if `originalObject` had a value for `property` the newly created object would still get a value
of `updatedValue` for the property.

##### Object Spread

Introduced in `ES7` is the `Object Spread` operation which behaves similarly to to `Object.assign`

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

The same `concat` could be written with the [ES6 Array Spread](../../1_es6/9_spread) operator

```javascript 1.8
return [...list, newElement]
```

#### Remove Values with Slice + Concat

Instead of using the `splice` method to remove elements an at and index you can use use `slice` to get the part of
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

You can extend the removing values approach to update an item by just appending the modified item in between the sliced
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


## Combining Reducers

Reference: [CombingReducers](https://redux.js.org/docs/recipes/reducers/UsingCombineReducers.html)

Often your application will have enough state it is not feasible to to handle all possible actions in a single reducer function,
fortunately Redux supports multiple reducers by using `combineReducers`.

`combineReducers` takes in an object containing the **reducers** you want to combine and along with the **namespace** you want
to associate to each reducer.

The return values of `combineReducers` is a single **reducer** that will invoke all the reducers inside. 

The resulting **state** object of the `combinedReducer` is an tree structure (like all Redux state) with each reducer **namespace**
as it's property.

Example:

```javascript 1.8
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
```

Would produce the following state object:

```javascript 1.8
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ... 
  }
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}
```

The `potatoReducer` would only be passed `state.potato` as the **state** and any returned **state** from the reducer 
would then be assigned to `state.potato`.

You can shortcut the `combineReducers` using the ES6 features of [module import renaming](../../1_es6/6_modules/readme.md#renaming-named-imports) and enhanced object literals:

```javascript 1.8
import potatoReducer as pototo from 'potatoReducer'
import tomatoReducer as tomato from 'tomatoReducer'

rootReducer = combineReducers({potato, tomato})
```

##### Next up: [Store](./stores.md)


 
 