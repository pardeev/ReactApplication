import bcrypt from 'bcryptjs';
import {readFile, writeFile} from 'fs/promises';

let users = JSON.parse(await readFile(new URL('./clubUsers3.json',import.meta.url)));

let nRounds = 13;
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);
let salt = bcrypt.genSaltSync(nRounds);
users.map(function(u){
    u.password = bcrypt.hashSync(u.password.toString(), salt)
});
let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
writeFile("clubUsers3Hash.json", JSON.stringify(users, null, 2));