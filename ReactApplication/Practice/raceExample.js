function winner(name) {
    console.log(`The winner is ${name}`);
  }
  myP1 = new Promise(function(resolve, reject){
      setTimeout(()=>resolve("P1"), 1000*Math.random());
  });
  myP2 = new Promise(function(resolve, reject){
      setTimeout(()=>resolve("P2"), 1000*Math.random());
  });
  myP3 = new Promise(function(resolve, reject){
      setTimeout(()=>resolve("P3"), 1000*Math.random());
  });
  myPs = [myP1, myP2, myP3];
  racingPs = Promise.race(myPs).then(function(value){
      console.log(value);
  })