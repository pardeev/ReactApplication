// goodTimePromise.js
let myTime = 0.0;
let startTime = new Date();

function oneSecond() { // Returns a promise that resolves in one second
    return new Promise(function(resolve, reject){
        setTimeout(()=>resolve(), 1000);
        });
}

function advanceTime() {
    myTime += 1.0;
    elapsedTime = (new Date() - startTime)/1000.0;
    console.log(`myTime = ${myTime}, elapsedTime = ${elapsedTime}`);
    return oneSecond(); // Returns another new one second promise
}
// What will this do?
// oneSecond()
//     .then(advanceTime)
//     .then(advanceTime)
//     .then(advanceTime);

// // Or this?
// /*
let p1 = oneSecond();
let p2 = p1.then(advanceTime);
let p3 = p2.then(advanceTime);
p3.then(advanceTime);
