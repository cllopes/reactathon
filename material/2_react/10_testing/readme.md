# Testing

There is a very robust and mature ecosystem for testing React components.

Two of the most useful libraries for unit testing are [Jest](https://facebook.github.io/jest/) and [Enzyme](https://github.com/airbnb/enzyme)

## Jest
**Jest** is Facebook's minimal configuration unit testing framework.

**Jest** is primarily a test runner (similar to Karma/Mocha) but it comes build in mocking and assertion
libraries.

For assertions if you don't want to use Jest's build in assertion feature you can use something like [Chai](https://www.google.com/search?q=chai+js&oq=chai+js&aqs=chrome..69i57j0j69i61l3j0.729j0j7&sourceid=chrome&ie=UTF-8)
or a combination of. Similarly for the mocking/spies/stubs you could use [Sinon.JS](http://sinonjs.org/).


#### Setup
Yarn Installation with yarn or npm:

`yarn add --dev jest`

or

`npm install --save-dev jest`


### Running Test


The easiest way to test your project is to add a `test` command to your package.json that invokes `jest`

```
{
  "scripts": {
    "test": "jest"
  }
}
```

This can be called with `npm test` or `yarn test`.

Jest will go and search for all files with either the `.js` or `.jsx` inside of `__test__` folders as well as any
files with the `.test` or `.spec` suffix. Like many of Jest's properties this can be override and a new
 test pattern used, see [Jest Configuration](https://jest-bot.github.io/jest/docs/configuration.html).
 
You specific naming convention (.spec vs .test vs .js) doesn't matter but you should be consistent throughout your application.

A second option is to run via the commandline by install Jest globally `npm install -g jest`.

See the [Jest CLI Options](https://facebook.github.io/jest/docs/en/cli.html) for more options.





#### Snapshotting

## Enzyme

## Coverage



`yarn add --dev enzyme enzyme-adapter-react-16`
`npm install --save-dev enzyme enzyme-adapter-react-16`



Other (potential)

## Sinon (spies)
## Chai (assertion)