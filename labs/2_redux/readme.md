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

Create a similar `profileReducer.js` except create a mock profile for now:

````javascript 1.8
import { SET_PROFILE } from '../actions/profileActionTypes'

const mockProfile = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jsmith@jonahgroup.com'
}

const profileReducer = (state = mockProfile, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return action.user
        default:
            return state
    }
}

return profileReducer
````


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

```javascript 1.8
import { Provider } from 'react-redux'
import createStore from 
```

Wrap your `<Router>` component with the **react-redux** `<Provider>` passing it your created store:

```javascript 1.8
const store = createStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                   ...
                </Router>
            </Provider>
        );
    }
}
```

## Step 5 -- Connect

### Part 1 <Profile> Component
Now that all of the components in the app are children of the component the can be hooked up to listen/dispatch actions to
the store using the `connect` method of **redux-react**

In `Profile.js` we will start pulling this profile object from the redux **store** and displaying the information.

Import the `connect` function from **react-redux**

`import { connect } from 'react-redux'`

Next create a `mapStateToProps` function that extract the **profile** object from the state tree and instead of exporing
the `<Profile>` component directly wrap it in the `connect`

```javascript 1.8
const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(Profile)
```

Now the `<Profile>` component will have the **states** profile object passed in as a prop so we can replace the dummy
values beig passed to `<UserProfile>`:

```javascript 1.8
    render() {
        const {profile} = this.props
        return <UserProfile firstName={profile.firstName} lastName={profile.lastName} email={profile.email} />
    }
```

Hitting `http://localhost:3000/profile/123` should now show the profile information created as the initial state of the 
`profileReducer`.


### Part 2 <AuthenticatedRoute>

We want to update the `<AuthenticatedRoute>` component to read the user's authenticated status from the state.

Convert this component to a redux connected component using `connect` and set `isAuthenticated` based on the **state's**
user object.

```javascript 1.8
const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}
```

Next update the component's logic to read `isAuthenticated` from the newly introduced prop instead of the fakeAuth.

```javascript 1.8
const AuthenticatedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
```

Now if you hit an authenticated end point ```http://localhost:3000/account-information``` you will get re-directed to the sign in page.

But if you modify the `userReducer` to have an initial user similar to profile you should be able to hit the url.

```javascript 1.8
const mockUser = {
    isAuthenticated: true
}
```

## Step 6 --Middleware

### Part 1 Redux Logger

(See [Redux Middleware](./../../material/3_redux/3_middleware))

Time to apply the first piece of middleware [Redux Logger](https://github.com/evgenyrodionov/redux-logger).

Install the middleware with yarn:

`yarn add redux-logger`

In the `createStore.js` file import the `logger` from **redux-logger** and import `applyMiddleware` from the **redux** package.

```javascript 1.8
import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
```

Next update the call to `createStore` to pass `applyMiddleware` passing in the logger middleware

```javascript 1.8
export default () => {
    const store = createStore(rootReducer, applyMiddleware(logger))
    return store
}
```


## Step 6 -- Thunks

(See [Redux Thunk](../../material/3_redux/3_middleware/readme.md#redux-thunk))

For handing asynchronous calls within the application we are going to add a middleware known as 
[Redux Thunk](https://github.com/gaearon/redux-thunk) which allows the actionCreators to return function instead of just
action objects.

First install the module with yarn:

`yarn add redux-thunk`

Next in `createStore.js` import the thunk from the **redux-thunk** and add it to the existing `applyMiddleware` function:

```const store = createStore(rootReducer, applyMiddleware(thunk, logger))```

