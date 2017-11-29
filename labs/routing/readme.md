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

Within `App.js` wrap all the existing content within the newly imported `Router`:



```javascript 1.8
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Header/>
                    </header>
                    <Landing />
                </div>
            </Router>
```

## Step 2: Add Routes

(Click [here]() to learn more about <Routes> and <Switches>)

The next thing we need to do it start adding the different routes in.

First add to your import statement to grab `Route` and `Switch`.

```javascript 1.8
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
```

Also import the component views you want to render on each `Route`

```javascript 1.8
import About from './components/About/About'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import PageNotFound from './components/PageNotFound/PageNotFound'
```


Finally, within your `Router` define a `Switch` and the children `Routes`

```javascript 1.8
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Header/>
                    </header>
                    <Switch>
                        <Route path="/about" component={About} />
                        <Route path="/" exact component={Landing} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
```

As explained in the [React Router](../../material/4_routing/1_react_router_basics/readme.md), when the url matches one of 
the `paths` specified on a `Route` the specified `component` will be rendered.

For the Routes wrapped in a `Switch`, only the first matching `Route` will be rendered.

The above will render the `<Landing>` component on the root path `/` or the `<About>` component on `/about` url.

You can try this now by hitting: `http://localhost:3000/` or `http://localhost:3000/about`.

Any unknown url should hit the 404 `<PageNotFound>` component.

Now add three more routes for the `<Profile>`, `<SignIn>`, and `<Register>` components.

As you build out your app register any new pages you create in this `<Router>`.


## Step 2 Adding Links

The next step is to add some real link functional to `Header.js`.

Start by importing `Link` from `react-router-dom`:

```javascript 1.8
import { Link } from 'react-router-dom'
```

Next replace all the `span` navigation with `Link` 

```javascript 1.8
        <div className="header-container">
            <Link to="/" className="home">Home</Link>
            <Link to="/about" className="nav-items">About</Link>
            <span className="nav-items">Sign In</span>
            <span className="nav-items">Create Account</span>
        </div>
```

Now click on **Home** or **About** should cause the `<Landing>` or `<About>` component to render when clicked

Replace **Sign In** and **Create Account** with their corresponding `<Links>`


## Step 3 User Params


