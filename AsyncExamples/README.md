---
title: Asynchronous JavaScript Examples
author: Dr. Greg M. Bernstein
date: October 8th, 2018
---

# Asynchronous JavaScript Examples

The enclosed files and directories provide examples of various JavaScript mechanisms to deal with asynchronous execution.  These include:

1. The JavaScript [concurrency model and event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Event_loop)

* `timeout.js` Showing event loop and `setTimeout`.

2. Callbacks and ordered processing

* `nodeFileCat.js` Order not guaranteed.
* `nodeFileCat2.js` Order guaranteed via nesting of callbacks.
* `badTimes.js` Timeouts aren't ordered they are concurrent
* `goodTimes.js` Ugly nesting to get it right...

3. JavaScript Promises

* `simplestPromise.js` A trivial promise.
* `timePromise.js` More interesting using time
* `rejectPromise.js`, `catchPromise.js`
* `multipleListeners.js` Yes, you can do this...
* `lateParty.js` Like events but different...

* Chainning: `goodTimePromise.js` No callback nesting.


* Promises for Request [request-promise-native](https://www.npmjs.com/package/request-promise-native)


* Promises for NEDB [nedb-promises](https://www.npmjs.com/package/nedb-promises)


4. Async/await