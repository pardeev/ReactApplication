myP = new Promise(function(resolve, reject){ // Trivial promise
    resolve("Hi Web Systems!");
});

function sucessHandler(msg) { // If things go well
    console.log(msg);
}

function rejectHandler() { // If things don't go well
    console.log("It was rejected!");
}
    
myP.then(sucessHandler, rejectHandler); // See what happens...