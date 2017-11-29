import React, {Component} from 'react'

import './SignIn.css'

class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        }

        // Bind the handle methods so they can reference this.state
        this.handleSignIn = this.handleSignIn.bind(this)
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleUserNameChange(event) {
        this.setState({userName: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    handleSignIn() {
        const {userName, password} = this.state
        // TODO: Sign User In
        console.log(`Signing user in with userName ${userName} and password ${password}`)
        this.setState({
            userName: '',
            password: ''
        })
    }

    render() {
        return (
            <div className="signin-container">
                <h1>Sign In</h1>
                <span>User Name: <input value={this.state.userName} onChange={this.handleUserNameChange} type="input"/></span>
                <span>Password:  <input value={this.state.password} onChange={this.handlePasswordChange} type="password"/></span>
                <button onClick={this.handleSignIn}>Sign In</button>
            </div>
        )
    }

}

export default SignIn