import fs from 'fs';
let fname = './bacaLogin.html';
let fdata = fs.readFileSync(fname, 'utf-8');
let count = fdata.toString().split('\n').length;
console.log('Number of lines in the file bacaLogin.html is: ' + count);