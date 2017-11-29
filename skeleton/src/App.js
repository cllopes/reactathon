import React, {Component} from 'react';

import Landing from './components/Landing/Landing.js'
import Header from './components/Header/Header'

import SignIn from './components/SignIn/SignIn'
import Profile from './components/Profile/Profile'

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Header/>
                </header>
                <Landing />
                <Profile firstName='Cindy' lastName='Lopes' email='blah@blah.com'/>
            </div>
        );
    }
}

export default App;
