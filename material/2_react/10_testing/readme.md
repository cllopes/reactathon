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

**Jest** will go and search for all files with either the `.js` or `.jsx` inside of `__test__` folders as well as any
files with the `.test` or `.spec` suffix. Like many of Jest's properties this can be override and a new
 test pattern used, see [Jest Configuration](https://jest-bot.github.io/jest/docs/configuration.html).
 
Your specific naming convention (.spec vs .test vs .js) doesn't matter but you should be consistent throughout your application.

A second option is to run via the commandline by install Jest globally `npm install -g jest`.

See the [Jest CLI Options](https://facebook.github.io/jest/docs/en/cli.html) for more options.


### Test Structure

The `describe` block should be used to group tests together -- in general each test file should have a root `describe` block
describing the component or logic it is testing.

Within each `describe` block `test` blocks are individual tests

```
const myBeverage = {
  delicious: true,
  sour: false,
};

describe('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy()
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy()
  });
});
```


`describe` blocks can also be also be nested within other `describe` blocks for further test organization:

```javascript 1.8
describe('top level test description', () => {
  describe('more specific test descriptions', () => {
      ...tests..
  })
})
```

[Jest's API](https://facebook.github.io/jest/docs/en/api.html) has a rich set of methods in addition to `describe` and `test`
such as `afterEach`/`beforeEach` to set-up/tear down code before/after each test or `afterAll` / `beforeAll` to setup/tear down
code before/after each suit.


### Assertions

**Jest** comes with its own build in [Expect Assertions](https://facebook.github.io/jest/docs/en/expect.html#content) -- the
documentation has a more exhaustive list.

The base assert is `expect` which can be paired with a [Matcher](https://facebook.github.io/jest/docs/en/using-matchers.html#content)
to assert a certain condition must be met:

Equality with `toBe` and `toEqual`:

```javascript 1.8
test('favourite fruit', () => {
    expect(getFavouriteFruit()).toBe('Lychee')
})
```

`toBe` does a shallow compare with `Object.is` if you want to compare objects or arrays you can do a deep compared with `toEqual`:

```javascript 1.8
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2})
});
```

Testing for truthy/falsy with `toBeTruthy` and `toBeFalsy`:
 
```javascript 1.8
test('day of week checker', () => {
    const isWed = isWednesday('2017-01-03')
    const isTues = isTuesday('2017-01-03')
    
    expect(isWed).toBeTruthy()
    expect(isTues).toBeFalsy()
})
```

Testing for the length of an array of string size with `toHaveLength`:

```javascript 1.8
expect([1, 2, 3]).toHaveLength(3)
expect('abc').toHaveLength(3)
```

See[Expect Assertions](https://facebook.github.io/jest/docs/en/expect.html#content) for full Expect API.

### Mocking

**Jest** provides ability to create [Mocks](https://facebook.github.io/jest/docs/en/mock-function-api.html#content) or spies that
let you test or stub out other code.

A basic jest mock is created with `jest.fn()` which will be default return `undefined` when invoked.

You can tell the mock to returns a certain value with `mockFn.mockReturnValue(value)` or `mockFn.mockReturnValueOnce(value)`:

```javascript 1.8
const mock = jest.fn()
mock.mockReturnValue(42)
mock() // 42
mock.mockReturnValue(43)
mock() // 43
```

```javascript 1.8
const myMockFn = jest.fn()
  .mockReturnValue('default')
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call')

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn())
// 'first call', 'second call', 'default', 'default'
```

You can examine your mocks to see how many times they were called and what parameters they were passed with `mockFn.mock.calls`:

Example asserting function called twice:

```javascript 1.8
const myMockFn = jest.fn()
logicToTest(myMockFn)
expect(myMockFn.mock.calls).toHaveLength(2)
```

Example examining the parameter passed to the mock function:

```
const myMockFn = jest.fn()
logicToTestTwo(myMockFn)
expect(myMockFn.mock.calls[0][0]).toBe(expectedParamOne)
expect(myMockFn.mock.calls[0][1]).toBe(expectedParamTwo)
```

In the above `myMockFn.mock.calls[0]` get the first time `myMockFn` is invoked so `myMockFn.mock.calls[0][0]` is the first
parameter of the first invocation while `myMockFn.mock.calls[0][1]` is the second parameter of the first call.
 
If you share a mockFunction across multiple tests you will want to clear them using either `mockFn.mockClear()` or `mockFn.mockReset()` so that
your tests remain independent of each other. The difference between the two calls:

- `mockFn.mockClear()` -- only resets `mockFn.mock.calls` and `mockFn.mock.instances` but will keep the original implementation.

- `mockFn.mockReset()` -- completely resets the mockFn back to it's original state.

See Jest [Mock Function API](https://facebook.github.io/jest/docs/en/mock-function-api.html#content) for full mockFn functionality.

#### Snapshot Testing

Snapshot testing is a unique feature in **Jest**, which aims to test the all html output of each of the components and make sure
it doesn't accidentally change.

The first time a snapshot test is run a **snapshot** file will be created which contains the html output of that component:

```
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

These snapshots will be committed to the code repo and the next time the snapshots run the rendered output of each component will
be compared to the latest snapshot failing if there are any differences.

This is a great tool to quickly have coverage over the output of all of your components, however if your UI changes frequently
you need to constantly update the snapshot Jest is testing against.

See [Jest Snapshot Testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html)


## Enzyme

[Enzyme](http://airbnb.io/enzyme/) is a JavaScript testing utility for React that makes it easier to assert, manipulate, and traverse your React Component's output.

Enzyme's API provides a flexible jQuery like API for DOM manipulation and traversal.

### Installation

**Enzyme** can be added with `yarn` or `npm`, you also need to specify an `adaptor` version that should correspond to your React version.

`yarn add --dev enzyme enzyme-adapter-react-16`

`npm install --save-dev enzyme enzyme-adapter-react-16`

### Shallow and Deep Rendering

The first concept to grasp when using **enzyme** is __shallow__ and __full rendering__ rendering.

[Shallow Rendering](http://airbnb.io/enzyme/docs/api/shallow.html) restricts the rendering to only the component you want to test. Any 
children components will not get fully rendered.

Most of the time `shallow` rendering you component is enough to test the majority of your functionality.

```javascript 1.8
import { shallow } from 'enzyme';

const wrapper = shallow(<MyComponent />);
```

[Full Rendering](http://airbnb.io/enzyme/docs/api/mount.html) also known as `mounting` is useful for cases where you need
to test the full component lifecycle (`componentDidMount`) or have component's that may interact with the DOM APIs.

```javascript 1.8
import { mount } from 'enzyme';

const wrapper = mount(<MyComponent />);
```

The result calling either `shallow` and `mount` is a `Wrapper` (either `ShallowWrapper` or `ReactWrapper`).

Wrapper contains some information about the component such as:

The **name** of the component:
```javascript 1.8
function SomeWrappingComponent() {
  return <Foo />;
}
const wrapper = shallow(<SomeWrappingComponent />);
expect(wrapper.name()).to.equal('Foo');
```

The **props**:

```javascript 1.8
const wrapper = shallow(<MyComponent includedProp="Success!" excludedProp="I'm not included" />);
expect(wrapper.props().includedProp).to.equal('Success!');
```

The **state**:

```javascript 1.8
const wrapper = shallow(<MyComponent />);
expect(wrapper.state().foo).to.equal(10);
expect(wrapper.state('foo')).to.equal(10);
```

`find` looks for every node in the wrapper's tree that matches the [Enzyme Selector](#selectors) and returns them in a new
wrapper:

Since everything in **Enzyme** is either a `Wrapper` or a `ReactElement` you can traverse
through the tree:

```javascript 1.8
const wrapper = shallow(<MyComponent />);
expect(wrapper.find('.foo')).to.have.length(1)
expect(wrapper.find('.bar')).to.have.length(3)
```


```javascript 1.8
const wrapper = shallow(<MyComponent />);
expect(wrapper.find('#foo')).first().hasClass('disabled').to.equal(true)
```

### Selectors

Just like any DOM element you can traverse or search for particular children of the wrapper using JQuery like [Selectors](http://airbnb.io/enzyme/docs/api/selector.html):

1. CSS Selectors:

- class syntax (.foo, .foo-bar, etc.)
- element syntax (input, div, span, etc.)
- id syntax (#foo, #foo-bar, etc.)
- attribute syntax ([href="foo"], [type="text"], etc.)

```javascript 1.8
const wrapper = shallow(<MyComponent />)
const elementsWithClass = wrapper.find(',foo')
const divElements = wrapper.find(div)
const elementWitId = wrapper.find('#foo')
```

2. Prop Selector:

Select using React props, similar to an Attribute selector:

```javascript 1.8
const wrapper = mount((
  <div>
    <span foo={3} bar={false} title="baz" />
  </div>
));

wrapper.find('[foo=3]');
wrapper.find('[bar=false]');
wrapper.find('[title="baz"]');
```
**Note:** Can cannot search by the `key` and `ref` props

3. React Component Constructor

You can search for specific component children 

```javascript 1.8
OuterComponent = () => {
  return <InnerComponent />
}

// find instances of MyComponent
const wrapper = shallow(<OuterComponent />)
const innerComponents = wrapper.find(InnerComponent)
```

### simulate

[Simulate](http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html) lets you simulate DOM events to test your event
lister logic:

```javascript 1.8
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <div className={`clicks-${count}`}>
          {count} clicks
        </div>
        <a href="url" onClick={() => { this.setState({ count: count + 1 }); }}>
          Increment
        </a>
      </div>
    );
  }
}

const wrapper = shallow(<Foo />);

expect(wrapper.find('.clicks-0').length).to.equal(1);
wrapper.find('a').simulate('click');
expect(wrapper.find('.clicks-1').length).to.equal(1);
```

### instance

[Instance](http://airbnb.io/enzyme/docs/api/ShallowWrapper/instance.html) can be called on the root node passed into `shallow`
or `mount` and gives you access to the `ReactComponent`

This is useful if you want to test things like methods on the React Component itself, example:

```
class MyComponent extends React.Component {
  methodToTest() {
    // Do something here
  }
  render() {
    // Component here
  }
}
```


```javascript 1.8
const wrapper = shallow(<MyComponent \>)
const result = wrapper.instance().methodToTest()
```



