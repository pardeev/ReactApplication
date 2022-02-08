myP = new Promise(function(resolve, reject){ // Trivial promise
    setTimeout(()=>reject("Something bad happened!"), 2000);
});

function sucessHandler() { // If things go well
    console.log("Things are Great!");
}

function rejectHandler(msg) { // If things don't go well
    console.log(msg);
}

console.log("Trying and getting rejected!");
myP.then(sucessHandler, rejectHandler); // See what happens...