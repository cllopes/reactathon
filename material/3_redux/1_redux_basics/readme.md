# Redux Basics

`Redux` is library build to simplify and centralize application state which predicable changes.

The three core concepts of Redux (from [Redux Three Principles](https://redux.js.org/docs/introduction/ThreePrinciples.html))

1. Single Source of Truth

    Your applications entire state is stored as a `single object tree` within a single centralized `store`

2. Store is **Read Only**

    State is only changed in response to dispatched action that describes exactly what happened

3. Changes are made with **Pure** Functions

    The reducers that modify the state must be **pure** functions -- that is they take in a the previous state, return a new state
but do not make any modification to the previous state.

1. [Actions](actions.md)
2. [Reducers](reducers.md)
3. [Store](stores.md)
4. [Data Flow](#data-flow)




---


### Combining Reduces


## Middlware / Async

