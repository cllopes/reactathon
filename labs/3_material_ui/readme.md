While not strickly neccessary for any applicaton adding a UI component library may greatly speed up the initial development
of your application -- which may be esspecially useful in a hackathon.

There are many UI libraries you can investigate using but this lab will cover [Material UI](https://material-ui-next.com/)
specifically, a React Component implementation of [Google's Material Design](https://material.io/guidelines/).


## Installation

Install the latest version of `material-ui` with `yarn`:

`yarn add material-ui@next`

### Roboto Font

The library makes use of Google's Roboto font so you should additionally install 'typeface-roboto`

`yarn add typeface-roboto`

To use the `Roboto` font you need to import it in `App.js`:

```
import 'typeface-roboto'
```

### Icons

