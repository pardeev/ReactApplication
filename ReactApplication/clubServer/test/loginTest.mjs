import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch';

let urlBase = "http://localhost:5556/";

function getCookies(res) {
    let rawStrings = res.headers.raw()["set-cookie"];
    let cookies = [];
    rawStrings.forEach(function (ck) {
        cookies.push(ck.split(";")[0]);
    });
    return cookies.join(";");
}

describe('Login Tests', function () {
    let res;
    let myCookie = null;

    before(async function () {
        console.log("Calling fetch");
        res = await fetch(urlBase + 'info');
        console.log("Back from fetch");
        myCookie = getCookies(res);
    })
    it('Cookie with appropriate name is returned', function () {
        assert.include(myCookie, 'EJ2920');
    });
    describe('Login Sequence', function () {
        before(async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "biune1929@gmail.com",
                    "password": "VOJueGIPl"
                }),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
        });
        it('Login Good', function () {
            assert.equal(res.status, 200);
        });
        it('User returned', async function () {
            let user = await res.json();
            assert.containsAllKeys(user, ['firstName', 'lastName', 'role']);
        });
        it('Cookie session ID changed', function () {
            let cookie = getCookies(res);
            assert.notEmpty(cookie);
            assert.notEqual(cookie, myCookie);
            console.log(cookie, myCookie);
        });
        it('Logout, cookie cleared', async function () {
            res = await fetch(urlBase + 'logout');
            assert.equal(res.status, 200);
        });
    });
    describe('Bad Logins', function () {
        it('Bad Email', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "Bstedhorses1903@yahoo.com",
                    "password": "nMQs)5Vi"
                }),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        });
        it('Bad Password', async function () {
            before(async function () {
                res = await fetch(urlBase + 'login', {
                    method: "post",
                    body: JSON.stringify({
                        "email": "stedhorses1903@yahoo.com",
                        "password": "BnMQs)5Vi"
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res.status, 401);
            });
        })
    })
})