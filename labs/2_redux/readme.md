See [Redux Material](../../material/3_redux/readme.md) and [Redux Official Documentation](https://github.com/reactjs/redux)


## Installation

Install both `redux` and `react-redux` libraries with `yarn`:

`yarn add redux react-redux`

## Step 1: Actions

(See [Actions](../../material/3_redux/1_redux_basics/actions.md))

The first thing we will do is create some `actions`.

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

In each **actionCreator** import the corresponding **actionType** and export an appropriate `set` function that returns an **action** with
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
import { SET_USER } from './userActionTypes'

export const setUser = user => {
    return {
        type: SET_USER,
        user
    }
}
```

## Step 2: Create a User and Profile Reducer

(See [Reducers](../../material/3_redux/1_redux_basics/reducers.md))

Next lets create two reducers a `userReducer` and a `profileReducer`:

In the `/src` folder create a new folder for `reducers` 

In `userReducer.js` create a reducer with a default state of `mockUser` that responds to the `SET_USER` action.

```javascript 1.8
import { SET_USER } from '../actions/userActionTypes'

const mockUser = {
    isAuthenticated: false
}

const userReducer = (state = mockUser, action) => {

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

export default profileReducer
````


## Step 3: Create a Store

(See [Store](../../material/3_redux/1_redux_basics/stores.md) and [combineReducers](../../material/3_redux/1_redux_basics/reducers.md))

Next we want to create a new **redux store** with the reducers we just created.

Within the `/src` folder create a new folder `store`, within it create a new file `createStore.js`.

Next we need to create a `store` using the `createStore` and `combineReducers` function of the `redux` library.

Also import the newly created reducer:

```javascript 1.8
import { createStore, combineReducers } from 'redux'

import userReducer from '../reducers/userReducer'
import profileReducer from '../reducers/profileReducer'
```

Combine the **user** and **profile** reducers with `combineReducers` and use the `createStore` utility to create a new
store, passing in the newly created root reducer.


```javascript 1.8
const rootReducer = combineReducers({user: userReducer, profile: profileReducer})

export default () => {
    const store = createStore(rootReducer)
    return store
}
```

As your application grows and you need more reducers just add them to this `combineReducer` call.

## Step 4: Provider

(see [Provider React Redux Bindings](../../material/3_redux/2_react_redux/readme.md))

Next we will start hooking up the component to the **redux store** using the bindings from the
installed `react-redux` library

First we need to wrap the entire application in a `<Provider>` -- similar to wrapping the application
in a `<Router>` for **React Router 4**.

In `App.js` we need to register the newly created store with a `<Provider>`:

Import the `<Provider>` component from the `react-redux` bindings module:

```javascript 1.8
import { Provider } from 'react-redux'
import createStore from './store/createStore'
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

## Step 5: Connect

(see [Connect React Redux Bindings](../../material/3_redux/2_react_redux/readme.md#connect))

### Part 1 `<Profile>` Component
Now that all of the components in the app are children of the `<Provider>` they can be hooked up to listen/dispatch actions to
the store using the `connect` method of **redux-react**.

In `Profile.js` we will start pulling this profile object from the redux **store** and displaying the information.

Import the `connect` function from **react-redux**

`import { connect } from 'react-redux'`

Next create a `mapStateToProps` function that extracts the **profile** object from the state tree and passes it to the `<Profile>` component's props:

Finally, instead of exporting the `<Profile>` component directly wrap it in the `connect`.

```javascript 1.8
const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(Profile)
```

Now the `<Profile>` component will have the **state's** profile object passed in as a prop so we can replace the dummy
values being passed to `<UserProfile>`.

Update the `render` method of the component:


```javascript 1.8
    render() {
        const {profile} = this.props
        return <UserProfile firstName={profile.firstName} lastName={profile.lastName} email={profile.email} />
    }
```

Hitting `http://localhost:3000/profile/123` should now show the profile information created as the initial state of the 
`profileReducer`.



**NOTE**: We will update this to pull the profile from the sever once we have added the **thunk** middleware to the application.


### Part 2 `<AuthenticatedRoute>`

We want to update the `<AuthenticatedRoute>` component to read the user's authenticated status from the **state** instead of the hardcoded mock authentication.

Convert this component to a redux connected component using `connect` and set `isAuthenticated` based on the **state's**
user object.

```javascript 1.8
import { connect } from 'react-redux'
```


```javascript 1.8
const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

export default connect(mapStateToProps)(AuthenticatedRoute)
```


Next update the component's logic to read `isAuthenticated` from the newly introduced **prop** instead of the fakeAuth.

```javascript 1.8
const AuthenticatedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (

        ...
```

**Note** In the above `isAuthenticated` is being extracted from the props using [Object Deconstruction](./../../material/1_es6/2_deconstruction/readme.md).

Now if you hit an authenticated end point ```http://localhost:3000/account-information``` you will get re-directed to the sign in page.

But if you modify the `userReducer` to have an initial user similar to profile you should be able to hit the url.

You can also now delete the fakeAuthentication object since it is no longer used.

```javascript 1.8
const mockUser = {
    isAuthenticated: true
}
```

## Step 6: Middleware

### Part 1 -- Redux Logger

(See [Redux Middleware](./../../material/3_redux/3_middleware))

Time to apply the first piece of middleware [Redux Logger](https://github.com/evgenyrodionov/redux-logger).

Install the middleware with `yarn`:

`yarn add redux-logger`

In the `createStore.js` file import the `logger` from **redux-logger** and additionall import `applyMiddleware` from the existing **redux** imports.

```javascript 1.8
import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
```

Next update the call to `createStore` to pass in `applyMiddleware` initialized with the logger middleware.


```javascript 1.8
export default () => {
    const store = createStore(rootReducer, applyMiddleware(logger))
    return store
}
```

Now if any actions get dispatched to your store you will see a log of the actions and state in the JavaScript debug console

## Step 6: Thunks

(See [Redux Thunk](../../material/3_redux/3_middleware/readme.md#redux-thunk))


### Part 1 -- User Login

Before we can create our **thunks** we need some code to actually make calls to the back end service, for this lab we wil be
using the promise based http library [Axios](https://github.com/axios/axios) but there are other options.

Install **Axios** with yarn:

`yarn add axios`

Create a new folder in `src` called `services` and create a `userService.js` -- here we will put the user related calls:


```javascript 1.8
import axios from 'axios'

export const login = async (username, password) => {
    const result = await axios({
        url: 'http://localhost:8080/account/login',
        method: 'get',
        auth: {
            username,
            password
        },
    });

    return result.data
}
```

The above makes a **GET** request to the locally running sever using **Basic Authentication** for security.

Next we need to create a **thunk** to the `userActions.js` that calls to login, if this succeeds dispatch the `SET_USER`
action.

`import { login } from '../services/userService'`

...

```javascript 1.8
export const loginUser = (userName, password) => async dispatch => {
    try {
        const user = await login(userName, password)
        user.isAuthenticated = true
        return dispatch(setUser(user))
    } catch (e) {
        // Error handle incorrect user password, locked out users etc...
    }
}
```
If you are not familiar with arrow functions the above syntax may look a little odd.

Here it is written less concisely without the arrow functions.

```javascript 1.8
export function loginUser (userName, password) {
    return async function(dispatch) {
        try {
            const user = await login(userName, password)
            user.isAuthenticated = true
            return dispatch(setUser(user))
        } catch (e) {
            // Error handle incorrect user password, locked out users etc...
        }
    }
}
```

The `loginUser` function takes in a username and password and returns another function which is passed to the **redux-thunk**
middleware. The middleware takes this function and executes it passing in the `dispatch` method, which the function will
call when the login call is finished and the user is fetched from the server.

This is using [async/await](../../material/1_es6/5_promises/readme.md) to synchronize the asynchronous call to the server.


Here we are only dispatching a single action in the thunk but we could also call dispatch more than once to dispatch multiple
actions. This is one of the **Redux Thunks** advantages over libraries like **Redux Promise**.



Finally we need to update the `<SignIn>` component to dispatch this action when the user tries to login:

To do so we need to connect this component the redux store using `connect`.

Import `connect` from `react-redux` and the newly created `loginUser` from the action creator in **SignIn.js**:

```javascript 1.8
import { connect } from 'react-redux'
import { loginUser } from '../../actions/userActions'
```

This time instead of a `mapStateToProps` create a `mapDispatchToProps` returning an object with a single property `login`.

The `login` should be a function that takes in a username and password and dispatches the newly created `logUser` thunk from
the user action creators.


...

```
const mapDispatchToProps = dispatch => {
    return {
        login: (userName, password) => dispatch(loginUser(userName, password))
    }
}

export default connect(null, mapDispatchToProps)(SignIn)
```

Also modify the `handleSignIn` to call the new `login` from the props:

```
    handleSignIn() {
        const {userName, password} = this.state
        this.props.login(userName, password)
        this.setState({
            userName: '',
            password: ''
        })
    }
```

Now if you try and sign in username: `jonah` and password `password` and check the console you should see `SET_USER` being
dispatched to the store with the user information.

However at this point the user is still on the sign in page. A good next step would be to check if there is an already logged
in user preform a redirect to the home page, similar to how AuthenticatedRoute did a redirect to the sign in page if there
was no logged in user.


### Part 1 -- Profile Loading
