myP = new Promise(function(resolve, reject){
    setTimeout(()=>reject("Something Bad :-<"), 2000);
});

myP.then(function(msg) {console.log("Doing Great!")})
.catch(function(msg) {console.log(msg)});
console.log("Called after myP.then and myP.catch ...");