import React, { Component } from 'react'

import UserProfile from './UserProfile'

class Profile extends Component {


    componentDidMount() {
        const id = this.props.match.params.id
        console.log(`The profile id is ${id}`)
    }

    render() {
        return <UserProfile firstName='dummy' lastName='dummy' email='dummy' />
    }
}

export default Profile
