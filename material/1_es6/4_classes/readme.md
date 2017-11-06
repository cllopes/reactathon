# Classes

Classes introduced in ES6 are mostly synatatic sugar over the existing prototypal inheritance.

### Declaration

Classes are declared using the `class` keyword and contain contain a `constructor`, similar to object oriented languages

```javascript 1.8
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

const rect = Rectangle(4,5)

```

### Methods

Classes can have class methods defined on them:

```javascript 1.8
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const square = new Rectangle(10, 10);
console.log(square.calcArea())      // 100
```

### Static Methods

Static methods (methods called without instantiating their class)

```javascript 1.8
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2)); // 7.0710678118654755
```

### Getters and Setters

```javascript 1.8
class Person {
    firstName;
    lastName;

    constructor(firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName
    }

    set firstName(value) {
        console.log(`set name to ${value}`)
    }
}

const jane = new Person('', 'Doe')
jane.firstName = 'Jane'
console.log(jane.fullName)       // Jane Doe
```


### Extends

The `extends keyword` can be used to create a class which is a child of another class

```javascript 1.8
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(this.name + ' makes a noise.');
    }

    sayName() {
        console.log('My name is: ' + this.name)
    }
}


class Dog extends Animal {
    speak() {
        console.log(this.name + ' barks.');
    }
}

const d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
d.sayName() // My name is: Mitzie
```


There is far more to ES6 classes not covered in the scope of this material 

## References and Resources

[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

[Exploring JS](http://exploringjs.com/es6/ch_classes.html)

https://googlechrome.github.io/samples/classes-es6/

