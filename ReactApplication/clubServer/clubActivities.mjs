import express from 'express';
import session from 'express-session';
import DataStore from "nedb-promises";

import { readFile } from 'fs/promises';

let db = new DataStore({
    filename: "./activitiesDB",
    autoload: true,
});

const app = express();

const cookieName = "EJ2920"; // Session ID cookie name
app.use(session({
    secret: 'BACA site development using React',
    resave: true,
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

function checkCustomerMiddleware(req, res, next) {
    if (req.session.user.role === "guest") {
        res.status(401).json({ error: "Not permitted" });;
    } else {
        next();
    }
};

function checkAdminMiddleware(req, res, next) {
    if (req.session.user.role !== "admin") {
        res.status(401).json({ error: "Not permitted" });;
    } else {
        next();
    }
};

function jsonErrors(err, req, res, next) {
    console.log(JSON.stringify(err));
    res.status(500);
    res.json(err);
}


app.get('/activities', checkCustomerMiddleware, async function (req, res) {
    res.json(await db.find({}));
});

app.post('/addActivity', express.json({ limit: 5000 }), checkCustomerMiddleware, jsonErrors, function (req, res) {
    console.log(`path /addActivity received: ${JSON.stringify(req.body)}`);
    var data = [];
    data.push(req.body);
    db.insert(data, function (err, newDoc) { });
    res.send(db.find({}));
});

app.delete("/delete/:id", checkAdminMiddleware, async function (req, res) {
    var index = req.params.index;
    db.remove(
      { _id: index },
      { multi: false },
      function (err, numRemoved) {
        db.loadDatabase(function (err) {});
      }
    );
    res.send(await db.find({}));
  }
);

const host = '127.0.0.1';
const port = '8886';

app.listen(port, host, function () {
    console.log(`clubActivities.mjs app listening on IPv4: ${host}:${port}`);
});