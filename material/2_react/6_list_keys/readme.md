# Lists and Keys

There is a special consideration when rendering lists of items in React referred to as `keys`


### Rendering List

When a Component has a list of items it wants to render the easiest way to do so is using the `map` function to go over
the list of items and wrap them in any element you want.

Below `MyList` constructs an unordered list out of a list of string by wrapping each string in a `<li>` -- this could have
been any another native element or another component.

```javascript 1.8
const MyList = (props) => {

    const {items} = props
    const listItems = items.map(item => {
        return <li>{item}</li>
    })

    return (
        <ul>{listItems}</ul>
    )
}
```

The rendered result of this would be the epected list, but if you open the debug console you will see the following error:

<cite>Warning: Each child in an array or iterator should have a unique "key" prop.</cite>

This is because we haven't provided React any `keys` for our list.

##### What are Keys?

A `key` is a special string attributed added to list elements and it should be a unique way of identifying each element.

##### Why does React need Keys

React uses these `keys` to identify which items have changed. This was if the list changes but only 1 element in the list
actually differs from the previous list only that element will be updated.

If no keys are provided each time anything in the list change React behaves as if ALL the elements have changed and will re-render them.

Let try adding a key to the `<li>`

```javascript 1.8
const MyList = (props) => {

    const {items} = props
    const listItems = items.map(item => {
        return <li key={item.id}>{item.name}</li>
    })

    return (
        <ul>{listItems}</ul>
    )
}
```

Typically if you have a unique `id` this is the best thing to use as a key, however if you don't you can use the index of
them item (index is the second parameter of the `map` function).

However this method is not recommended and can be slow if the items are re-ordered.

```javascript 1.8
const MyList = (props) => {

    const {items} = props
    const listItems = items.map((item, index) => {
        return <li key={index}>{item.name}</li>
    })

    return (
        <ul>{listItems}</ul>
    )
}
```

One thing to remember if you are extracting the list item into it's own component the key still needs to be on the mapped
array item not on the nested component:

Incorrect:

```javascript 1.8
const MyItem = (props) => {
    const {item} = props
    // INCORRECT -- we do not need a key on the nested component
    return <li key={item.id}>{item.name}</li>
}


const MyList = (props) => {

    const {items} = props
    const listItems = items.map(item => {
        //INCORRECT - we are missing the key here
        return <MyItem item={item}/>
    })

    return (
        <ul>{listItems}</ul>
    )
}
```

Correct:

```javascript 1.8
const MyItem = (props) => {
    const {item} = props
    // CORRECT -- no key here
    return <li>{item.name}</li>
}


const MyList = (props) => {

    const {items} = props
    const listItems = items.map(item => {
        //CORRECT
        return <MyItem key={item.id} item={item}/>
    })

    return (
        <ul>{listItems}</ul>
    )
}

```


## References and Resources

[ReactJS Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
