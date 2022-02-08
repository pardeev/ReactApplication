// Guaranteed calling order with asynchronous reads

const fs = require('fs');
const dirRoot = __dirname + "/sample_files/";
let myString = " Empty\n";

// Nest callbacks to gurantee ordering
fs.readFile(dirRoot+"samp1.txt", 'utf8', function(err, data){
  if (err) throw err;
  myString = data + "\n";
  fs.readFile(dirRoot+"samp2.txt", 'utf8', function(err, data){
      if (err) throw err;
      myString += data + "\n";
      fs.readFile(dirRoot+"samp3.txt", 'utf8', function(err, data){
          if (err) throw err;
          myString += data + "\n";
          console.log(myString);  // Executes after all files have been read in order
        });
    });
});

console.log("MyString: " + myString); // Executes first