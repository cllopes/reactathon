## React Router Basics

The first place you should look when you want learn more about React Router is the very detailed [React Training / React Router Documenation](https://reacttraining.com/react-router/).

In the latest version React Route took an approach similar to React where it broke down its core functionality into multiple packages:

1. Web
2. Native
3. Core

For use in a React web application you only need the Web version, also known as **React Router Dom**

### Installation

React Router Web can be easily installed with either `npm` or `yarn`

`yarn add react-router-dom`

`npm install react-router-dom`

## Router

The first component you will encounter when using **React Router** is the `<Router>` component.

The [`<Router>`](https://reacttraining.com/react-router/core/api/Router) is a common level interface that is implemented
by many lower level routers such as:

1. `<BrowserRouter>`
2. `<HashRouter>`
3. `<MemoryRouter>`
4. `<NativeRouter>`
5. `<StaticRouter>`

For most web application you will utilizse the `<BrowserRouter>`.

You can check the documentation for [BrowserRouter](https://reacttraining.com/react-router/web/api/BrowserRouter) but it
should work perfectly out of the box without any configurations.

```javascript 1.8
import { BrowserRouter as Router } from 'react-router-dom'


  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
```

All the routing components need to be children of the `<Router>` component.

## Routes

The second and possibly most important component in React Router is the [`<Route>`](https://reacttraining.com/react-router/core/api/Route) component.

The `<Route>` component is responsible for rendering a particular defined UI component on urls matching its `path`

Just like all the other routing components it must have a `<Router>` either as its parent of somewhere above its parents hierarchy.

```javascript 1.8
<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>
```

The `path` prop tells the `<Route>` which urls it should render its component on. The `path` is a [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
so it is able to convert named parameters into regular expressions.
 
If the `path` is set to the root path `/` it will render on all urls.
 
The `exact` prop can be set to true which means that `<Route>` will only render on urls that match the path exactly

`<Route path="/news" component={NewsFeed} exact/>`

Will render on the url `/news` but not the url `/news/downtown`.

**Aside:** in the above code example putting the prop type `exact` is shorthand for `exact=true`


### Route Rendering

There are three ways to tell a `<Route>` component what it should render:

1. `<Route component>`
2. `<Router render>`
3. `<Router childen>`

For examples of the using the **render** and **children** methods see the [Route Documentation](https://reacttraining.com/react-router/core/api/Route).


The most commonly used version is the `component`, where a UI Component is passed to the Route which will be rendered in its
place when the url matches the path.


```javascript 1.8
<Router>
  <div>
    <Route path="/" component={Home}/>
    <Route exact path="/profile" component={Profile}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>
```

The `/profile` url will render the `<Profile>` component and the `/news` url will render the `<News>` component.

#### Route Components

Each Component rendered by a `<Route>` (referred to as at __Route Component__) will passed the following three props:
1. Match -- contains information about how the `path` matched the url (example path params)
2. Location -- represents where the app is now and gives you access to the query params
3. History -- history object from the [history package](https://github.com/ReactTraining/history) which allows programmatic navigation


The first important thing to note in the above example is `<Routes>` are not by default mutually exclusive, meaning **all** routes
that match a url will be rendered in the order they are defined.

So in the above example, on the `/profile` url the results of the render will be the `<Home>` component rendered above the `<Profile>` component.

If you want to only render one `<Route>` you need to wrap them in a `<Switch>` component.

## Switch

The `<Switch>` component takes a list of `<Route>` components and renders the **first child** that matches the url.

```javascript 1.8
<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

In this example the url `/about` will only render the `<About>` component 

A common pattern is to end the `<Switch>` with a "404" page in case none of the routes able to handle the url. 


## Links

The next most common component you will use is [`<Link>`](https://reacttraining.com/react-router/web/api/Link) which provides a way for the user to navigate your application.

```javascript 1.8
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
```


The `<Link>` component takes a `to` prop that tells it where the app should be redirected to. This should match one
of the `paths` defined by your `<Route>` components.

There is also an optional `replace` parameter that will cause the new url to replace the current one in history instead of
pushing on the new one into the history.

```<Link replace to="/about">About</Link>```

### Nav Link

An extension of the `<Link>` component, [`<NavLink>`](https://reacttraining.com/react-router/web/api/NavLink) provides the ability to add some extract styling to links based on if they match the current url.
 
`<NavLink>` have two additional props `activeStyle` and `activeClassName` which define the style or classname that will be
added to the link when the current url matches the Link's url.
 
 ```javascript 1.8
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```
 
 ```javascript 1.8
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```

##### Next up: [Parameters](../2_parameters/readme.md)


