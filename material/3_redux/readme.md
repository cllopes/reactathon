# Redux

[Redux](https://github.com/reactjs/redux) is library written by [Dan Abramov](https://github.com/gaearon) (the author
also responsible for [create-react-app](https://github.com/facebookincubator/create-react-app)) described as:

<cite>Redux is a predictable state container for JavaScript apps.</cite>

It's designed to help manage large application states based off Facebook's [Flux Architecture](https://facebook.github.io/flux/)

### The Problem is Solves

As applications grow it more and more stage must get managed. For smaller application individual components can manage their
own state independently without any issues. However as the application becomes more complex the need to share state between
components grows and becomes more difficult to manage.

If state only lives in individual components then each component would have it's own copy of the state and would need to be
synced or notify other components which something changes. This direct cross component communication can get quite messy.

Facebook encourages a concept of [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html), where the state is
lifted to their closest common ancestor which is responsible for holding the state as a single "source of truth" and 
passes it to the children Components and accepts any notification of state changes from the children.

`Redux` and the `Flux Pattern` advocate for having a single source of state in your application that are injected into the views.


### Flux Architecture

Without going into to deep of a dive (see [Facebook's Flux In Depth Overview](https://facebook.github.io/flux/docs/in-depth-overview.html) for more information)


The Flux pattern is pattern for managing the data flow within your application. It enforces that all the data in the application
flows in one direction and be stored in a central store.

A good coverage of the Flux Concepts can be found on the [Flux Github](https://github.com/facebook/flux/tree/master/examples/flux-concepts)


And it's base there are 4 main parts for Flux:

1. Dispatcher
2. Store
3. Action
4. View

#### Dispatcher

There is a single `dispatcher` that receives `actions` from the views and dispatches these `actions` to all of the
subscribed `stores`.


#### Store

The `store` is a central source of all the state within an application. Each store registers with the `dispatcher` and
will only mutate it's state responding to a dispatched `action`

#### Actions

`Actions` define the interactions within the application. They must have a `type` field and may contain a data payload.

#### Views

Each `View` subscribes to a `store` and is responsible for rendering the data stored into store


#### Data Flow

The uni-directional code flow

1. Views send actions to the Dispatcher.
2. Dispatcher sends actions to each Store.
3. Store update according to the actions and send data to each subscribed View

[Flux Flow](https://github.com/facebook/flux/blob/master/examples/flux-concepts/flux-simple-f8-diagram-with-client-action-1300w.png)

### How does Redux Differ from Flux?

`Flux` is just a pattern with no concrete implementations while `Redux` is a library which based on the `Flux Architecture` it
 does things it's own way.
 
 - `Redux` only has one central store, while Flux has the convention of multiple stores per application.
 
 - Flux has a singleton **dispatcher** that dispatches to the multiple stores, `Redux` does not have this same entity instead
 the singleton store has the build in dispatching process.
 
 - The logic of how to handle `actions` in Flux lives within each store itself. In `Redux` the store is just a JavaScript object 
 and `reducer` functions are responsible for updating the store state based on actions.
 
 - In `Redux` stores **cannot be mutable** -- each time an action is dispatched a completely new state is created.
 
 
### Installation
 
## Content

1. [Redux Basics](./1_redux_basics)

2. [React Redux Bindings](./2_react_redux)

3. [Middleware](./3_middleware)


## References and Resources

[Facebook Flux](https://facebook.github.io/flux/docs/in-depth-overview.html) 

[Redux Docs](https://redux.js.org/)

[Egghead.io Getting Started with Flux](https://egghead.io/courses/getting-started-with-redux)

[Egghead.io Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

