import fetch from 'node-fetch';

async function inOrder() {
    let url = "http://localhost:5556";
    try {
        let loginUrl = await fetch(url + `/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "umbrate1989@yahoo.com",
                password: "1n3pLS47yH"
            })
        }).then(function (res) {
            console.log("Good Login Test return code :",res.statusText);
            return res.json();
        }).then(json => console.log(json));
    } catch (err) {
        console.error(err);
    }
    try {
        let loginUrl = await fetch(url + `/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "umbrate19201@yahoo.com",
                password: "1n3pLS47yH"
            })
        }).then(function (res) {
            console.log("Bad email Test return code :",res.statusText);
            return res.json();
        }).then(json => console.log(json));
    } catch (err) {
        console.error(err);
    }
    try {
        let loginUrl = await fetch(url + `/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "umbrate1989@yahoo.com",
                password: "1n3pLS47scscesdcyH"
            })
        }).then(function (res) {
            console.log("Bad password Test return code :",res.statusText);
            return res.json();
        }).then(json => console.log(json));
    } catch (err) {
        console.error(err);
    }
}
inOrder();