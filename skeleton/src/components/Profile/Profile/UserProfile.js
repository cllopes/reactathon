import React from 'react'
import PropType from 'prop-types'

import './Profile.css'

const UserProfile = ({firstName, lastName, email}) => {
    return ( <div className="profile-container">
        <h1>Profile</h1>
        <span>First Name: {firstName} </span>
        <span>Last Name: {lastName} </span>
        <span>Email: {email} </span>
    </div>)
}

/**
 * PropType definition -- not 100% necessarily for a react component to function however it is good practice to
 * define each component's expected prop types as a way to catch easy mistakes and a way to self document components.
 *
 * Try passing a number to firstName instead of a string and checking the console
  */
UserProfile.propTypes = {
    firstName: PropType.string.isRequired,
    lastName: PropType.string.isRequired,
    email: PropType.string.isRequired
}

export default UserProfile