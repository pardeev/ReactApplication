import express from 'express';
const app = express(); // Can't use const if exporting
import bcrypt from 'bcryptjs';

// Fake user and tour data
import { readFile } from 'fs/promises';
const users = JSON.parse(await readFile(new URL('./secUsers.json',
    import.meta.url)));
const tours = JSON.parse(await readFile(new URL('./tours.json',
    import.meta.url)));

// Available to all visitors
app.get('/tours', function(req, res) {
    res.json(tours.virtTours);
});

// Only available to admin, returns updated tour list.
app.post('/addTour', checkAdminMiddleware, express.json(), function(req, res) {
    let temp = req.body;
    let event = {
        name: temp.name,
        date: temp.date,
    };
    tours.virtTours.push(event);
    res.json(tours.virtTours);
});

// Available to all visitors, returns user info if successful
app.post('/login', express.json(), function(req, res) {
    //	console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    // Find user
    let auser = users.find(function(user) {
        return user.email === email
    });
    if (!auser) { // Not found
        res.status(401).json({ error: true, message: "User/Password error" });
        return;
    }
    let verified = bcrypt.compareSync(password, auser.passHash);
    if (verified) {
        // Upgrade in priveledge, should generate new session id
        // Save old session information if any, create a new session
        let oldInfo = req.session.user;
        req.session.regenerate(function(err) {
            if (err) {
                console.log(err);
            }
            let newUserInfo = Object.assign(oldInfo, auser);
            delete newUserInfo.passHash;
            req.session.user = newUserInfo;
            res.json(newUserInfo);
        });
    } else {
        res.status(401).json({ error: true, message: "User/Password error" });
    }
});

app.get('/logout', function(req, res) {
    let options = req.session.cookie;
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); // the cookie name and options
        res.json({ message: "Goodbye" });
    })
});

export default app;