/*
Extended demonstration of cookie use via a bad weather, tide, and wind site.
*/
import express from "express";
const app = express();
app.use(express.static("public")); // For static assets
app.use(express.urlencoded({ extended: false })); // Body form processing
import cookieParser from "cookie-parser"; // For cookies
app.use(cookieParser());

// Experiment with cookie options
const cookieOpts = {
    // domain: "blah",  // defaults to domain name
    // expires: new Date() + 1000, // defaults to session cookie
    httpOnly: false, // Browser JavaScript can't see it
    // maxAge: 5000, // Time from when it is set in ms
    path: "/", // default
    secure: false, // Require HTTPS
    signed: false, // Express relevant
    sameSite: "Lax"
};
// Template system
import nunjucks from "nunjucks";
nunjucks.configure("templates", { autoescape: true, express: app });

// Random Weather forecasting information
const weather = [
    "Sunny",
    "Cloudy",
    "Raining",
    "Broiling",
    "Snowing",
    "Partly Cloudy"
];
const tideRange = [0.0, 6.0]; // In feet
const windRange = [0.0, 30.0]; // In MPH

const userPrefs = {
    user_name: "Our Friend",
    backColor: "#b6fcf4",
    fontColor: "#0000ff",
    typeSize: "9",
    fontStyle: "serif"
};

app.get("/", function(req, res) {
    console.log("Cookies: ", req.cookies);
    var prefs = userPrefs; // Default
    if (req.cookies.user_prefs) {
        prefs = JSON.parse(req.cookies.user_prefs);
    }
    let info = {};
    info.prefs = prefs;
    info.weather =
        weather[Math.floor(Math.random() * Math.floor(weather.length))];
    info.tide = (
        Math.random() * (tideRange[1] - tideRange[0]) +
        tideRange[0]
    ).toFixed(1);
    info.wind = (
        Math.random() * (windRange[1] - windRange[0]) +
        windRange[0]
    ).toFixed(1);
    res.render("weatherReport.html", info);
});

// Respond to post request from form page.
app.post("/setUserPrefs", function(req, res) {
    console.log("Handling post request");
    console.log("URL path:", req.path);
    console.log("URL:", req.originalUrl);
    console.log("Method", req.method);
    console.log("Body", req.body);
    console.log("request HTTP version", req.httpVersion);
    console.log("Content type", req.headers["content-type"]);
    // Sets the cookie to a JSON string of user preferences with options
    res.cookie("user_prefs", JSON.stringify(req.body), cookieOpts);
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("cookieExampleExt listening on port 3000!");
});