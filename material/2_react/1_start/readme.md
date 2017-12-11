# Getting Started with Create React App

The easiest way to get started with creating a react application is using the **Create React App** to create and configure a new project.

See [Create React App](https://github.com/facebookincubator/create-react-app)

The above github repo has great instructions on installing and creating a new app with the package so that won't be covered here.

Once you get your project running you will notice a few JavaScript, Css, and html files created.

In the public folder you will find `index.html`

This file contains one very important line:

`<div id="root"></div>`

This creates an html element for our first React Component to attach to.

Inside `App.js` you will first notice the imports (see [ES6 Imports](../../1_es6/6_modules/readme.md) for more information on __modules__))

```javascript 1.8
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
```

We are importing React and ReactDOM from the `react` and `react-dom` modules.
These packages were split out from eachother as part of v0.14 with:
 - **React** containing all the core functionality
- **ReactDOM** containing the glue to integrate React with the browers DOM

__Aside:__ This separation helped allow for the creation of **React Native** which shares the same **React(()) module but uses a 
the **React Native** module for the mobile components.

Also imported here is the css file as well as our first module `App.js`.

The first bit of work here is done by **ReactDOM** to render our `App` component into the `root` div defined in the index.html.

```javascript 1.8
ReactDOM.render(<App />, document.getElementById('root'));
```

To start learning about Components jump to the [Component Section](../3_components/readme.md)

An slightly easier way to visualize what `ReactDOM.render` is doing to replace the component with a simple &lt;h1&gt; tag:

```javascript 1.8
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

The above code will render the `<h1>Hello, world!</h1>` within the `<div id="root"></div>` in index.html

##### Next up: [JSX](../2_jsx)
