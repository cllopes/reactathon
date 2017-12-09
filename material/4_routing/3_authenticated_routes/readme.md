# Authentication Routes

While technically not a built in part of **React Router** there is a common pattern that can be used to create `Routes`
only accessible by logged in users otherwise redirect to the login page.

This method uses the [`<Redirect>`](https://reacttraining.com/react-router/web/api/Redirect) component of the **React Router**.


The `<AuthenticatedRoute>` below checks if the user in authenticated:
- If they are render the `<Component>` passed in as a prop
- If they are not redirect to the login page 

```javascript 1.8
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
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

In the above the current `location` is held in the redirect state which can then be accessed in the `<Login>` with `this.props.location.state` component
to redirect the user __back__ to the page they were trying to hit:

```javascript 1.8
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
```
