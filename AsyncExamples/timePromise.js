myP = new Promise(function(resolve, reject){ // Trivial promise
    setTimeout(()=>resolve("Hi Web Systems!"), 5000);
});

function sucessHandler(msg) { // If things go well
    console.log(msg);
}
  
myP.then(sucessHandler);
console.log("I was called after myP.then ...");