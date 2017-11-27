## Actions

`Actions` are a core piece in both the `Flux Pattern` and `Redux` library. They are a plain JavaScript object which describes
a change that needs to be made in the store.
At a minimum contain a `type` attribute and may contain some sort of `payload`:

```javascript 1.8
const ADD_TODO = 'ADD_TODO'
```

```javascript 1.8
{
    type: ADD_TODO,
    text: 'Buy milk from the store'
}
```

### Action Creators

A common pattern to extract away some of the boiler plate is to create `Action Creators` whose job is to construct an
action object.

```javascript 1.8
const addTodo = text =>{
    return {
        type: ADD_TODO,
        text: 'Buy milk from the store'
    }
}
```