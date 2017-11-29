import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// Temporary fake authentication
const fakeAuth = {
    isAuthenticated: true
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

export default AuthenticatedRoute