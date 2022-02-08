myP = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("Hi Web Systems!"), 3000);
});

// What is myP2?
myP2 = myP.then(function(msg) {return "I saw: " + msg;});

console.log("Is myP2 a Promise? " + (myP2 instanceof Promise));

myP2.then(function(msg) {console.log(msg)});