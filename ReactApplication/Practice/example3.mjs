import fs from 'fs';
let fname = './example2.mjs';
let fdata = fs.readFileSync(fname, "utf-8");
console.log(fdata);