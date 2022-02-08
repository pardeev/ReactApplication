import express from 'express';
import session from 'express-session';
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

function setUpSessionMiddleware(req, res, next) {
    console.log(`\nsession object: ${JSON.stringify(req.session)}`);
    console.log(`session id: ${req.session.id}`);
    if (!req.session.user) {
        req.session.user = { role: "admin" };
    };
    next();
};

app.use(setUpSessionMiddleware);

function checkAdminMiddleware(req, res, next) {
    console.log("recieved req - " + req);
    if (req.session.user.role !== "admin") {
        res.status(401).json({ error: "Not permitted" });;
    } else {
        next();
    }
};

app.get('/members', checkAdminMiddleware, function (req, res) {
    db.find({}).then(function (members) {
        res.json(members);
      });
});

const host = '127.0.0.1';
const port = '9996';

app.listen(port, host, function () {
    console.log(`clubMembers.mjs app listening on IPv4: ${host}:${port}`);
});