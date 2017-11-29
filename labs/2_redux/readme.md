(Link to Redux)

## Installation

Install both `redux` and `react-redux` libraries:

`yarn add redux react-redux`

## Step 1 -- Actions

(See [Reducers](../../material/3_redux/1_redux_basics/actions.md))

The first thing we will do is create some `actions`

In the `/src` folder create a new folder for `actions` and create two new **actionType** files:
`userActionTypes.js` and `profileActionTypes.js`.

These files will contain the action constants used by both the **reducers** and **action creators**

For now just export a single constant of each for `SET_USER` and `SET_PROFILE`

```javascript 1.8
export const SET_USER = 'SET_USER'
```

```javascript 1.8
export const SET_PROFILE = 'SET_PROFILE'
```

In the same folder create two **actionCreators** (`userActions.js` and `profileActions.js`):

In each **actionCreator** import the **actionType** and create a `set` method on both than returns an **action** with 
the **type** from the corresponding **actionType** and a payload of either `profile` or `user`:

```javascript 1.8
import { SET_PROFILE } from './profileActionTypes'

export const setProfile = profile => {
    return {
        type: SET_PROFILE,
        profile
    }
}
```

```javascript 1.8
import { SET_USER } from 'userActionTypes'

export const setUser = user => {
    return {
        type: SET_USER,
        user
    }
}
```

## Step 2 -- Create a User and Profile Reducer

(See [Reducers](../../material/3_redux/1_redux_basics/reducers.md))

Next lets create two reducers a `userReducer` and a `profileReducer`:

In the `/src` folder create a new folder for `reducers` 

In `userReducer.js` create a reducer with a default state of `{}` that responds to the `SET_USER` action.

```javascript 1.8
import { SET_USER } from '../actions/userActionTypes'

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state
    }
}

export default userReducer
```

Create a similar `profileReducer.js`


## Step 3 -- Create a Store

(See [Store](../../material/3_redux/1_redux_basics/stores.md) and [combineReducers](../../material/3_redux/1_redux_basics/reducers.md))

Within the `/src` folder create a new folder `store`, within it create a new file `createStore.js`

Next we need to create a `store` using the `createStore` and `combineReducers` function of the `redux` library.

Import the reducers as well as `redux` library functions:

```javascript 1.8
import { createStore, combineReducers } from 'redux'

import userReducer from '../reducers/userReducer'
import profileReducer from '../reducers/profileReducer'
```

Combine the **user** and **profile** reducer with `combineReducers` and user `createStore` to create a new 
store, passing in the newly created root reducer.


```javascript 1.8
const rootReducer = combineReducers({user: userReducer, profile: profileReducer})

export default () => {
    const store = createStore(rootReducer)
    return store

```

As your application grows and you need more reducers just add them to this `combineReducer` call.

## Step 4 -- Provider

(see [Provider React Redux Bindings](../../material/3_redux/2_react_redux/readme.md))

In `App.js` we need to register the newly created store with a `<Provider>`:

Import the `<Provider>` component from the `react-redux` bindings module:

`import { Provider } from 'react-redux'`
import createStore from 


## Step 5 -- Connect

## Step 6 -- Thunks?
