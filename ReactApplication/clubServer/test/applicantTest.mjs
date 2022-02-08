import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch';

let urlBase = "http://localhost:2226/";

describe('Applicant Testing', function () {
    let res;
    describe('Add Applicant Tests', function () {
        before(async function () {
            res = await fetch(urlBase + 'applicants', {
                method: "post",
                body: JSON.stringify({
                    "name": "Pardeev Reddy",
                    "email": "sdcdsc@gmail.com",
                    "password": "pardeev@Web123",
                    "confirmPassword": "pardeev@Web123",
                    "selectOption": "friends",
                    "comments": "This is a sample data for an applicant"
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        });
        it('Add Good Applicant', function () {
            assert.equal(res.status, 200);
        });
        it('Too Long JSON Applicant', async function () {
            res = await fetch(urlBase + 'applicants', {
                method: "post",
                body: JSON.stringify({
                    "name": "Pardeev Reddy",
                    "email": "sdcdsc@gmail.com",
                    "password": "pardeev@Web123",
                    "confirmPassword": "pardeev@Web123",
                    "selectOption": "friends",
                    "comments": "This is a sample data for an applicant",
                    "testField1": "This is an extra test field for this test case",
                    "testField2": "This is an extra test field for this test case",
                    "testField3": "This is an extra test field for this test case",
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            assert.equal(res.status, 500);
        });
        it('Missing Info Applicant', async function () {
            res = await fetch(urlBase + 'applicants', {
                method: "post",
                body: JSON.stringify({
                    "name": "Pardeev Reddy",
                    "email": "",
                    "password": "pardeev@Web123",
                    "confirmPassword": "pardeev@Web123",
                    "selectOption": "friends",
                    "comments": "This is a sample data for an applicant"
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            assert.equal(res.status, 401);
        });
        it('Bad Email Applicant', async function () {
            res = await fetch(urlBase + 'applicants', {
                method: "post",
                body: JSON.stringify({
                    "name": "Pardeev Reddy",
                    "email": "sa.com",
                    "password": "pardeev@Web123",
                    "confirmPassword": "pardeev@Web123",
                    "selectOption": "friends",
                    "comments": "This is a sample data for an applicant"
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            assert.equal(res.status, 401);
        });
    })
})