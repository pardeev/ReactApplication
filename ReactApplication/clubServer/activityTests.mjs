import fetch from "node-fetch";

let urlBase = "http://localhost:";

function extractCookies(rawStrings) {
    let cookies = [];
    rawStrings.forEach(function(ck) {
        cookies.push(ck.split(";")[0]);
    });
    return cookies.join(";");
}

let addActivity = {
    url: urlBase + "8886/addActivity",
    options: {
        method: "POST",
        body: JSON.stringify({
            name: "Test",
            dates: ["Jan 26th", "Jan 27th"],
            description: "Testing through node-fetch"
        }),
        headers: { "Content-Type": "application/json" },
    },
};

let deleteActivity = {
    url: urlBase + "8886/delete/2",
    options: {
        method: "DELETE"
    },
};

let loginAdmin = {
    url: urlBase + "5556/login",
    options: {
        method: "POST",
        body: JSON.stringify({
            email: "tirrivees1820@outlook.com",
            password: "449OqspUq",
        }),
        headers: { "Content-Type": "application/json" },
    },
};

let loginCust = {
    url: urlBase + "5556/login",
    options: {
        method: "POST",
        body: JSON.stringify({
            email: "umbrate1989@yahoo.com",
            password: "1n3pLS47yH",
        }),
        headers: { "Content-Type": "application/json" },
    },
};

async function testing() {
    console.log("Try adding activity without logging in");
    try {
        let res = await fetch(addActivity.url, addActivity.options);
        console.log(`Add Activity result: ${res.statusText}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    console.log("Try deleting activity without logging in");
    try {
        let res = await fetch(deleteActivity.url, deleteActivity.options);
        console.log(`Delete Activity result: ${res.statusText}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    console.log("Login as club member, then get information");
    try {
        let res = await fetch(loginCust.url, loginCust.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        addActivity.options.headers.cookie = savedCookie;
        // Trying to add a activity
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(addActivity.url, addActivity.options);
        console.log(`Club member trying to add activity result: ${res.statusText}\n`);
        // Trying to Delete a activity
        res = await fetch(deleteActivity.url, deleteActivity.options);
        console.log(`Club member trying to delete activity result: ${res.statusText}\n`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    console.log("Login as Admin, then get information");
    try {
        let res = await fetch(loginAdmin.url, loginAdmin.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        addActivity.options.headers.cookie = savedCookie;
        // Trying to add a activity
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(addActivity.url, addActivity.options);
        console.log(`Admin trying to add activity result: ${res.statusText}\n`);
        // Trying to Delete a activity
        res = await fetch(deleteActivity.url, deleteActivity.options);
        console.log(`Admin trying to delete activity result: ${res.statusText}\n`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
}

testing();