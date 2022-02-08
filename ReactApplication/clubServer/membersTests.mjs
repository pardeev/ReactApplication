import fetch from "node-fetch";

let urlBase = "http://localhost:";

function extractCookies(rawStrings) {
    let cookies = [];
    rawStrings.forEach(function(ck) {
        cookies.push(ck.split(";")[0]);
    });
    return cookies.join(";");
}

let getMembers = {
    url: urlBase + "9996/members"
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
    console.log("Try fetching members details without logging in");
    try {
        let res = await fetch(getMembers.url);
        console.log(`Get members result: ${res.statusText}`);
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
        // Trying to Fetch members data
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(getMembers.url);
        console.log(`Get members result: ${res.statusText}`);
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
        // Trying to Fetch members data
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(getMembers.url);
        console.log(`Get members result: ${res.status}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
}

testing();