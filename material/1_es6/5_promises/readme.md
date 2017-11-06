# Promises

A `Promises` object representing the eventual completion of failure of an asynchronous operation.

It is an alternative to using callbacks for delivering the results of asynchronous operations.

The concept of **promises** is nothing newly introduced in ES6, they are defined by the [Promise/A+ spec](https://promisesaplus.com/)
 
Many larger frameworks already implemented their own version such as [jQuery Differed Object](https://api.jquery.com/category/deferred-object/) and `$q` in angular.

As as many other library implementations and polyfills such as Bluebird, node-promise, and RSVP.js.


## Creating a Promise

The promise constructor takes 2 arguments a `resolve` function and a `reject`

**Note** The resolve and reject are callbacks but not usually user defined

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

Within the promise code if there is no issues the `resolve` function is called and can be passed any values to be retunred.

If there was an error executing the code the `reject` callback can be invoked with any error information.

## Using a promise

The result of the promise can be used by chaining `.then` and `.catch`:

```javascript 1.8
asyncFunc1()
    .then(result => {
        // Use result1
        console.log(result)
    })
    .catch(error => {
        // Handle errors of asyncFunc1() and asyncFunc2()
    });
```

Then `.then` call will be executed if the promise invoked the `resolve` callback and result will be the values passed to the `resolve`.

If the promise involved the `reject` call back then `.catch` call would be involved with the passed back error.

### Chaining Multiple Promises

If another promise is returned in the `.then` another chained `.then` can be used check the result of this promise.

This was many promises can be chained together without too much nesting

```javascript 1.8
 asyncFunction1(a, b)
  .then(result1 => {
      console.log(result1);
      return asyncFunction2(x, y);
  })
  .then(result2 => {
      console.log(result2);
  })
```


### Promise.All

If you have multiple promises and want to execute them all then see the combined results you can use `Promise.all`

```javascript 1.8
Promise.all(promiseList)
.then(results => {
    results.forEach((result => {
        // Process Item
    }))
})
```

#### Promise.Race

If you want the results of the **first** returned promise you can use `Promise.race()`


### Axios Example

While in most cases you won't need to write you own promise you will often use promise based libraries (especially for making http requests).

A good example is using the  `Axios` library, while the implemtnation details don't matter `axios.get` will make an asynchronous `GET` request 
 that returns a promise that can be dealt with using `.then` and `.catch`

```javascript 1.8
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```


 