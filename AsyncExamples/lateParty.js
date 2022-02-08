myP = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("Hi Websystems!"), 100); // 0.1 second!
});

// These will check on the promise much later...
setTimeout(() => myP.then(function(msg) {console.log("listener 1: " + msg)}), 3000);

setTimeout(() => myP.then(function(msg) {console.log("listener 2: " + msg)}), 6000);