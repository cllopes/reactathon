# Synthetic Events

As part of React's Event System, a `SyntheticEvent` is wrapped around the browsers native events and passed to 
the event handlers. This `SyntheticEvent` is a cross-browser wrapper that helps mitigate the need for browser specific logic.

It has the same interface as the native events (such as `stopPropagation()` and `preventDefault()`). At any point the the
underlying browser event can extracted from the wrapper with the `nativeEvent` attribute.

The `SyntheticEvent` has the following attributes

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

## Adding Event Handlers

Event handlers can be added to any native element, similar to native event handling but there are two small differences:
1. React event handlers are camelCase rather than lower case (onClick vs onclick)
2. JSX expects you to pass a function rather than a string

HTML Example:
```javascript 1.8
<button onclick="activateLasers()">
  Activate Lasers
</button>
```


React Example:

```javascript 1.8
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

### Prevent Default Behavior

As of React 14, if you want to prevent the default behavior on an event you need to explicit call `preventDefault` rather
than just return false like you would in a native javascript event handler:

```javascript 1.8
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.')
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  )
}
```


For a full list of events supported by React see [React Event Docs](https://reactjs.org/docs/events.html)

##### Next up: [Higher Order Components](../9_higher_order_components)

## References and Resources

[ReactJS Events](https://reactjs.org/docs/events.html) 

[ReactJS Handling Event](https://reactjs.org/docs/handling-events.html)

