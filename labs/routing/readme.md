(Link To react router)

## Installation

`yarn add react-router-dom`



## Step 1: Add a Router to your application

(Click [here]() to learn more about routers)

The first step to integrating **React Router 4** with your application is to add in the root `<BrowserRouter>`.
This `Router` will need to be the parent of all your routing Component so it should go fairly high up in your Component tree.

Start by importing `<BrowserRouter>` from the `react-router-dom` package you installed within `App.js`

```javascript 1.8
import {
    BrowserRouter as Router
} from 'react-router-dom'
```

The wrap all the existing content within the Router:

```javascript 1.8
<Router>
    // ...application code here
</Router>
```

## Step 2: Add Routes

(Click [here]() to learn more about <Routes> and <Switches>)

The next thing we need to do it start adding the different routes in.

First add to your import statement to grab `Route` and `Switch`

```javascript 1.8
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
```

**TODO** replace with real example
```javascript 1.8
<Router>
    <div>
        <Route path="/" component={Home} />
        <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/contacts" component={Contacts} />
            <Route component={PageNotFound} />
        </Switch>
    </div>
</Router>
```

As explained in the [insert documentation](), the above will render the `<Home>` component on every url followed by either
the `<Profile>` or `<Contacts>` components depending on the url.

You can try this now by hitting: `http://localhost:3000/profile` or `http://localhost:3000/contacts`.

Any unknown url should hit the 404 `<PageNotFound>` component.

React Router by default will render all the matching `Routes`, but wrapping any in a `<Switch>` component will only render
the *first child* that matches the url

## Step 2 Adding Links

```javascript 1.8
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'
```

```javascript 1.8
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
```

## Step 3 User Params


