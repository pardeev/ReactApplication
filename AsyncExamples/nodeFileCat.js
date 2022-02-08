const fs = require('fs');
const dirRoot = __dirname + "/sample_files/";
let myString = " Empty\n";

// Don't know which of the next three calls will execute first, could depend on file size.
fs.readFile(dirRoot+"samp1.txt", 'utf8', function(err, data){
  if (err) throw err;
  myString = data;
  console.log(data);
});

fs.readFile(dirRoot+"samp2.txt", 'utf8', function(err, data){
  if (err) throw err;
  myString += data;
  console.log(myString);
});

fs.readFile(dirRoot+"samp3.txt", 'utf8', function(err, data){
  if (err) throw err;
  myString += data;
  console.log(myString);
});

console.log("MyString: " + myString); // Executes first