# Promises

A `Promises` object representing the eventual completion or failure of an asynchronous operation.

It is an alternative to using callbacks for delivering the results of asynchronous operations.

The concept of **promises** is nothing newly introduced in ES6, they are defined by the [Promise/A+ spec](https://promisesaplus.com/).
 
Many larger frameworks already implemented their own version such as [jQuery Differed Object](https://api.jquery.com/category/deferred-object/) and `$q` in angular.

Also many pre-ES6 library implementations and polyfills such as [Bluebird](http://bluebirdjs.com/docs/getting-started.html), [node-promise](https://www.promisejs.org/), and [RSVP.js](https://github.com/tildeio/rsvp.js/).


## Creating a Promise

The promise constructor takes 2 arguments a `resolve` function and a `reject`.

**Note:** The resolve and reject are callbacks but not usually user defined by the promise creator they are passed in by
the promise consumer.

```javascript 1.8
function asyncFunc() {
    return new Promise(
        function (resolve, reject) {
            try {
                const result = logicToGetResult()
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
}
```

Within the promise code finishes executing if there is no issues the `resolve` function is called and can be passed any values to be returned.

If there was an error executing the code the `reject` callback can be invoked with any error information.

## Using a promise

The result of the promise can be used by chaining `.then` and `.catch`:

```javascript 1.8
asyncFunc()
    .then(result => {
        // Use result1
        console.log(result)
    })
    .catch(error => {
        // Handle errors
    });
```

Then `then` block will be executed if the promise invoked the `resolve` callback and result will be the values passed to the `resolve`.

If the promise involved the `reject` call back then `catch` block would be involved with the passed back error.

### Chaining Multiple Promises

If another promise is returned in the `.then` another chained `.then` can be used check the result of this promise.

This way many promises can be chained together without too much nesting:

```javascript 1.8
 asyncFunctionOne(a, b)
  .then(result1 => {
      console.log(result1);
      return asyncFunctionTwo(result1);
  })
  .then(result2 => {
      console.log(result2);
  }).catch(error => {
          // Handle errors of asyncFuncOne() and asyncFuncTwo()
  })
```


### Promise.All

If you have multiple promises and want to execute them all, then see the combined results, you can use `Promise.all`:

```javascript 1.8
Promise.all(promiseList)
.then(results => {
    results.forEach((result => {
        // Process Item
    }))
})
```

### Promise.Race

If you want the results of the **first** returned promise you can use `Promise.race()`:


### Axios Example

While in most cases you won't need to write your own promise you will often use promise based libraries (especially for making asynchronous http requests).

A good example is using the  [Axios](https://github.com/axios/axios) promise based http library, while the implementation details don't matter `axios.get` will make an asynchronous `GET` request 
 that returns a promise that can be dealt with using `.then` and `.catch` blocks:

```javascript 1.8
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```

# Async/Await

`async/await` did not make it into the ES6 or ES7 spec but it is slated for the ES8 (ECMAScript 2017) specifications.

Async/Await is built upon ES6 `Promises` and make async code behave more synchronously.

An example using promises to resolve a JSON object and return `"done"`:

```javascript 1.8

const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })

```

The same example using `async/await`:

```javascript 1.8

const makeRequest = async () => {
  console.log(await getJSON())
  return "done"
}
```

The `await` keyword before the promise can only be used in functions with the `async` keyword.

The `await` allows you to call a `promise` but **pauses** the execution of the function until the promise is resolved or 
rejected, making the function behave more synchronously.

The `async` function implicitly returns a promise with the resolve value being what is returned from the function.

Promise logic can start to get deeply nested the moment too many conditionals are introduced:

```javascript 1.8
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
```

This code can be cleaned up while still following the same logic path using `async/await`:

```javascript 1.8
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
```

### Error Handling

Errord can be handled using a simple `try/catch` block instead of the `.catch`:

```javascript 1.8
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON())
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
```


## References and Resources

### Promises
[Promise/A+ spec](https://promisesaplus.com/)

[MDN Web Docs Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[MDN Web Docs Promise Eser Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

[Exploring JS](http://exploringjs.com/es6/ch_promises.html)

[Axios](https://github.com/axios/axios)

http://www.datchley.name/es6-promises/

http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/

### Async Await

[Hackernoon](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)

[Async/Await Spec](https://github.com/tc39/ecmascript-asyncawait)

[Twilio](https://www.twilio.com/blog/2015/10/asyncawait-the-hero-javascript-deserved.html)

[MDN Web Docs Async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

[MDN Web Docs Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

https://ponyfoo.com/articles/understanding-javascript-async-await

[Fun Fun Function](https://www.youtube.com/watch?v=568g8hxJJp4)
