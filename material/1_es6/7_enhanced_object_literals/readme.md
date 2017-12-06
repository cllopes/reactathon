# Enhanced Object Literals

## Property Shorthand

The most commonly used features of `ES6 Enhanced Object Literals` is the shorthand for initializing variables on objects.

When you declare an object if the property you are assigning to is the same as an existing variable name you can just provide
the object the variable and it will automatically be assigned to the property of the same name.

This is easiest to see in an example:

ES6:
```javascript 1.8
const type = 'Seater'
const color = 'blue'
const size = 13

const clothes = {
	type,
	color,
	size
}
```

ES5:
```javascript 1.8
const type = 'Sweater'
const color = 'blue'
const size = 13

const clothes = {
	type: type,
	color: color,
	size: size
}
```
## Method Definition Shorthand

There is also a shorthand for defining methods object:
 
ES5:
```javascript 1.8
var calculator = {
	add: function(a, b) {
		return a + b
	}
}
```

ES6:
```javascript 1.8
const calculator = {
	add(a, b) {
		return a + b
	}
}
```

## Computed Property Keys

Prior to ES6 if you wanted to assign a property that was computed you would need to add it after the object was created:

Example:
```javascript 1.8
var foo = {}
foo['prop' + 1] = 1
foo['prop' + 2] = 2

// Resulting foo = {"prop1":1,"prop2":2}
```

With ES6 you can preform the same computed property keys in the initializer using the same square bracket notation:

```javascript 1.8
const foo = {
	['prop' + 1]:  1,
	['prop' + 2]:  2
}
```

## References and Resources

http://www.benmvp.com/learning-es6-enhanced-object-literals/