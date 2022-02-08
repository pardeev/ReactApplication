// All promise demonstration
myP1 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("Hi from P1!"), 1000);
});

myP2 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("Hi from P2!"), 5000);
});

myP3 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("Hi from P3!"), 2000);
});

myPs = [myP1, myP2, myP3];
Promise.all(myPs).then((msg) => console.log(msg));