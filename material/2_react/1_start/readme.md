# Getting Started with Create React App

The easiest way to get started with creating a react application is using the **Create React App** to create and configure a new project.

See [Create React App](https://github.com/facebookincubator/create-react-app)

The above github repo has great instructions on installing and creating a new app with the package so that won't be covered here.

Once you get your project running you will notice a few JavaScript, Css, and html files created.

In the public folder you will find `index.html`

This file contains one very import line:

`<div id="root"></div>`

This create an html element for our first React Component to attach to.

Inside `App.js` you will first notice the imports

```javascript 1.8
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
```

We are importing React and ReactDOM from the `react` and `react-dom` modules.
These packages were split out from eachother as part of v0.14 with **React** containing all the core functionality and 
ReactDOM containing the glue to integrate React with the browers DOM.

Aside: This separate helped allow for the creation of **React Native** which shares the same React module but uses a 
the **React Native** module for the mobile components.

Also imported here is the css file as well as our first module `App.js`

The fit bit of work here is done by **ReactDOM** to render our `App` component into the `root` div defined in the index.html.

```javascript 1.8
ReactDOM.render(<App />, document.getElementById('root'));

```

To start learning about Components jump to the [Component Section](../2_components/readme.md)