# Authentication Routes

While technically not a built in part of **React Router** there is a common pattern that can be used to create `Routes`
only accessible by logged in users otherwise redirect to the login page.

This method uses the `<Redirect>` component of the **React Router**

**TODO** Comes back after redux portion is done

```javascript 1.8
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
```