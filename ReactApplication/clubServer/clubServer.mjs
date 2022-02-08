import express from 'express';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import { readFile } from 'fs/promises';

import DataStore from "nedb-promises";
let db = new DataStore({ filename: "./membersDB", autoload: true });

const app = express();

const cookieName = "EJ2920"; // Session ID cookie name
app.use(session({
    secret: 'BACA site development using React',
    resave: false,
    saveUninitialized: false,
    name: cookieName // Sets the name of the cookie used by the session middleware
}));

let cname = "BACA - Bay Area Cricket Association";
let name = "Pardeev Reddy";
let id = "EJ2920";

app.get('/info', function (req, res) {
    let myObj = {
        clubName: `${cname}`,
        ownerName: `${name}`,
        ownerNetId: `${id}`
    };
    req.session.regenerate(function (err) {
        if (err) {
            console.log(err);
        }
        let newUserInfo = Object.assign(myObj);
        req.session.user = newUserInfo;
        res.json(newUserInfo);
    });
});

app.post('/login', express.json(), function (req, res) {
    let password = req.body.password;
    let auser = db.findOne({ email: req.body.email }); 
    if (!auser) {
        res.status(401).json({ error: true, message: 'User/Password error' });
        return;
    }
    let verified = bcrypt.compareSync(password, auser.password);
    if (verified) {
        req.session.regenerate(function (err) {
            if (err) {
                console.log(err);
            }
            let newUserInfo = Object.assign(auser);
            delete newUserInfo.password;
            req.session.user = newUserInfo;
            res.json(newUserInfo);
        });
    } else {
        res.status(401).json({ error: true, message: "User/Password error" });
    }
});

// app.post("/login", express.json(), function (req, res) {
//     var userItem = db.findOne({ email: req.body.email });
//     if (!userItem) {
//       res.status(401);
//       var returnData = { error: true, message: "Bad email" };
//       res.send(returnData);
//     } else {
//       bcrypt.compare(
//         req.body.password,
//         userItem.password,
//         function (err, response) {
//           if (err) {
//             res.status(401);
//             var returnData = { error: true, message: "Bad password" };
//             res.send(returnData);
//           }
//           if (response) {
//             let oldInfo = req.session.user;
//             req.session.regenerate(function (err) {
//               if (err) {
//                 console.log(err);
//               }
//               let newUserInfo = Object.assign(oldInfo, userItem);
//               delete newUserInfo.password;
//               req.session.user = newUserInfo;
//               userItem = newUserInfo;
  
//               var returnData = {
//                 error: false,
//                 message: "Good login",
//                 user: userItem,
//               };
//               res.send(returnData);
//             });
//           } else {
//             res.status(401);
//             var returnData = { error: true, message: "Bad password" };
//           }
//         }
//       );
//     }
//   });

app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options);
        res.json({ message: "Goodbye" });
    })
});

const host = '127.0.0.1';
const port = '5556';

app.listen(port, host, function () {
    console.log(`clubServer.mjs app listening on IPv4: ${host}:${port}`);
});