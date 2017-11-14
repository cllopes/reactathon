import React, { Component } from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'

import Home from './views/Home'
import Contacts from './views/Contacts'
import Profile from './views/Profile'
import PageNotFound from './views/PageNotFound'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <div>
                <ul>
                    <li><Link  to="/profile">Profile</Link></li>
                    <li><Link to="/contacts">Contacts</Link></li>

                </ul>
                <Route path="/" component={Home} />
                <Switch>
                    <Route path="/profile" component={Profile} />
                    <Route path="/contacts" component={Contacts} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
