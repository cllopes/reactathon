While not strictly necessary for any application adding a UI component library may greatly speed up the initial development
of your application -- which may be especially useful in a hackathon.

There are many UI libraries you can investigate using but this lab will cover [Material UI](https://material-ui-next.com/)
specifically, a React Component implementation of [Google's Material Design](https://material.io/guidelines/).

**NOTE**: This tutorial will install the latest version of Material UI -- known as __Material UI Next__ so when you look up the
documentation make sure check the [Material UI Next](https://material-ui-next.com/) version not the previous version's documentation
as there have been some fairly large API changes.

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

`yarn add material-ui-icons`


### Customizing Theme

To make your application a little more personalized you can customize [Material UI's Theme(https://material-ui-next.com/customization/themes/) to
set your own applications default.

This can be done using Materials UI's `<MuiThemeProvider>` component and `createMuiTheme` utility.

In `App.js` import both these from the `material-ui` library:

```javascript 1.8
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
```

Also import any colours you wish from [Material UI Color Pallet](https://material-ui-next.com/style/color/).

```javascript 1.8
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
```

Create a new theme setting the `primary`, `secondary`, and `error` color for your application.

```javascript 1.8
const theme = createMuiTheme({
    palette: {
        primary: purple, // Purple and green play nicely together.
        secondary: {
            ...green,
            A400: '#00e677',
        },
        error: red,
    },
})

```

Finally wrap your entire application in a `<MuiThemeProvider>` passing in the newly crated theme:

```javascript 1.8
<Provider store={store}>
    <Router>
        <MuiThemeProvider theme={theme}>
            <Header/>
            ...
        </MuiThemeProvider>
    </Router>
</Provider>
```