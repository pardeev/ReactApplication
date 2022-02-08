// Simple Synchronous file reading
// Using ES6 Modules.
import fs from 'fs'; // File system module
let fname = './tempWrite.txt';
let data = "Hello World!!!";
fs.writeFileSync(fname, data);