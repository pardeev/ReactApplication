myP = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("Hi Web Systems!"), 2000);
});

myP.then(function(msg) {console.log("listener 1: " + msg)})
myP.then(function(msg) {console.log("listener 2: " + msg)})

console.log("Called after myP.then ...");
