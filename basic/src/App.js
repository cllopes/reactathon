import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Landing from './components/Landing/Landing.js'
import Header from './components/Header/Header'

import About from './components/About/About'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import PageNotFound from './components/PageNotFound/PageNotFound'

import UserProfile from './components/Profile/UserProfile'


import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Header/>
                    </header>
                    <Switch>
                        <Route path="/signin" component={SignIn} />
                        <Route path="/register" component={Register} />
                        <Route path="/about" component={About} />
                        <Route path="/" exact component={Landing} />

                        <Route path="/profile/:id" component={Profile} />

                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
