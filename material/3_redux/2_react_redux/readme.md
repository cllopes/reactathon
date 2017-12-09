# Redux and React

While `Redux` functions completely independently of of `React` and can be used in conjunction with any other framework for
independently the author of the `Redux` library also created a library of **React bindings** or `Redux` called
 [react-redux](https://github.com/reactjs/react-redux).
 
### Installation
 
`react-redux` can be added to any React app using either `npm` or `yarn`:
 
 `npm install --save react-redux`
 
 `yarn add react-redux`
 
 
There are two key API bindings `react-redux` provides:
1. [Provider](#provider)
2. [connect](#connect)

## <Provider store>

The `<Provider>` component should be one of the root components of the application and it takes in your **store** and makes
it available to all of the **children** components in the `<Provider>'s` hierarchy via the `connect` binding:

```javascript 1.8
import {Provider} from `react-redux`

ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
  rootEl
)
```

## connect

`connect` is a **higher order function** [See HOC](../../2_react/9_higher_order_components/readme.md) that wraps your component and provides methods to extract state and dispatch
actions to the **store**

For any component to use `connect` it must be child component of a `<Provide>r`.

`connect` takes 4 arguments (all optional):

1. mapStateToProps

2. mapDispatchToProps

3. mergeProps

4. options


### mapStateToProps

`mapStateToProps(state, [ownProps]): stateProps`

This optional function is how a component subscribes to changes to the redux **store**.

Whenever there is a change in the store the components `mapStateToProps` will be run receiving the new
**state** as it's first parameter.

The job of this function is to take the entire state tree, extracts the parts required by the component and returns
a plain JavaScript **object**. The object returned will be available to the component as a `prop`, it will be merged into
the component's existing props.

Example:
```javascript 1.8
const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}
```

The second `optonal` parameter to `mapStateToProps` is the component's `ownProps` in-case it is needed to determine
what to extract from the state.


### mapDispatchToProps
`mapDispatchToProps(dispatch, [ownProps]): dispatchProps`

This optional function is responsible for constructing the functions to be passed to the component that will allow it
to dispatch actions to the store.

The first argument it gets is the `dispatch` function which can be called with any `action` to dispatch the `action` to
the store.

Similar to `mapStateToProps` this function should return a plain JavasScript **object** that will also be merged with the
objects props.


```javascript 1.8
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
```

If there is no `mapDispatchToProps` the component will instead be passed `dispatch` directly as a prop.

Similar to `mapStateToProps` the second optional parameter to `mapDispatchToProps` is the component's `ownProps`.


### mergeProps
`mergeProps(stateProps, dispatchProps, ownProps): props`

The default behavior of `mergeProps` is to merge the components props with the results from `mapStateToProps` and `mapDispatchToProps`
`Object.assign({}, ownProps, stateProps, dispatchProps)`.


### options

Allows further customization of connectors behavior.

See [github API docs](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
for more information.

### Using Connect:

To create a 

```javascript 1.8
import React, {Component} from 'react'
import {connect} from 'react-redux'

import UserProfile from './UserProfile'
import { updateProfile } from './profileActions'

class Profile extends Component {
    render() {
        const {profile} = this.props
        return <UserProfile firstName={profile.firstName} lastName={profile.lastName} email={profile.email}/>
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (profile) => dispatch(updateProfile(profile))
    }
}

export default connect(mapStateToProps)(Profile)
```