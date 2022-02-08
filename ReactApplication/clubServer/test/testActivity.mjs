import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch';

let urlBase = "http://localhost:8886/";

let activities = [
    {
        "name": "Practise sessions for September",
        "dates": [
            "Sept 13th",
            "Sept 14th",
            "Sept 15th",
            "Sept 20th",
            "Sept 21st",
            "Sept 22nd"
        ],
        "description": "These sessions include warmup sessions, strength training, and technique sessions for batting bowling and fielding "
    },
    {
        "name": "Warm up matches for September",
        "dates": [
            "Sept 16th",
            "Sept 17th",
            "Sept 23rd",
            "Sept 24th"
        ],
        "description": "These matches are considered as practise matches for upcoming tournments"
    },
    {
        "name": "Tournament dates for September",
        "dates": [
            "Sept 27th",
            "Sept 28th",
            "Sept 29th",
            "Sept 30th"
        ],
        "description": "Different tournments will be conducted on these specific dates with different oppositions"
    }
];

describe('Activity Tests', function () {
    let res;
    before(async function () {
        res = await fetch(urlBase + 'activities');
    })
    it('An array of activities is returned', function () {
        assert.equal(res.status, 200);
    });
    describe('Add Activity Tests', function () {
        before(async function () {
            res = await fetch(urlBase + 'addActivity', {
                method: "post",
                body: JSON.stringify([
                    {
                        "name": "Testing",
                        "dates": [
                            "Sept 13th"
                        ],
                        "description": "Just for testing"
                    }
                ]),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        });
        it('Try adding activity without login', function () {
            assert.equal(res.status, 401);
        });
    });
    describe('Add Activity as a Member', function () {
        before(async function () {
            res = await fetch(urlBase + 'addActivity', {
                method: "post",
                body: JSON.stringify([
                    {
                        "name": "Testing",
                        "dates": [
                            "Sept 13th"
                        ],
                        "description": "Just for testing"
                    }
                ]),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        });
        it('Login as a member and add activity', function () {
            assert.equal(res.status, 200);
        });
        it('Add too Big activity', async function () {
            res = await fetch(urlBase + 'addActivity', {
                method: "post",
                body: JSON.stringify(
                    [
                        {
                            "firstName": "Melia",
                            "lastName": "Barker",
                            "email": "tirrivees1820@outlook.com",
                            "password": "449OqspUq",
                            "role": "admin"
                        },
                        {
                            "firstName": "Demetrice",
                            "lastName": "Parker",
                            "email": "chihuahua1899@gmail.com",
                            "password": "9E3423Gj3iJ",
                            "role": "member"
                        },
                        {
                            "firstName": "Ligia",
                            "lastName": "Hudson",
                            "email": "umbrate1989@yahoo.com",
                            "password": "1n3pLS47yH",
                            "role": "member"
                        },
                        {
                            "firstName": "Maisha",
                            "lastName": "Hickman",
                            "email": "bibiri1807@yandex.com",
                            "password": "Hj4sS5sshQ",
                            "role": "member"
                        },
                        {
                            "firstName": "Cythia",
                            "lastName": "Park",
                            "email": "biune1929@gmail.com",
                            "password": "VOJueGIPl",
                            "role": "member"
                        },
                        {
                            "firstName": "Arlie",
                            "lastName": "Holt",
                            "email": "aromatised1858@yandex.com",
                            "password": "No3428fsL",
                            "role": "member"
                        },
                        {
                            "firstName": "Andy",
                            "lastName": "Morton",
                            "email": "bayesian1899@outlook.com",
                            "password": "DotzIDgrNHY",
                            "role": "member"
                        },
                        {
                            "firstName": "Peg",
                            "lastName": "Gardner",
                            "email": "earrings1987@yandex.com",
                            "password": "XcjE6G2s",
                            "role": "member"
                        },
                        {
                            "firstName": "Noble",
                            "lastName": "Wilder",
                            "email": "facer1912@yandex.com",
                            "password": "67bLjiOJKjj",
                            "role": "member"
                        },
                        {
                            "firstName": "Willow",
                            "lastName": "Trevino",
                            "email": "nodes1883@yahoo.com",
                            "password": "t8Us6rUHN",
                            "role": "member"
                        },
                        {
                            "firstName": "Corrinne",
                            "lastName": "Curtis",
                            "email": "boisset1829@live.com",
                            "password": "dnRZMmBzR",
                            "role": "member"
                        },
                        {
                            "firstName": "Joseph",
                            "lastName": "Brock",
                            "email": "utilizer1910@live.com",
                            "password": "BomQVIoNm",
                            "role": "member"
                        },
                        {
                            "firstName": "Daron",
                            "lastName": "Stevens",
                            "email": "pedocalcic1982@outlook.com",
                            "password": "EJ73er4x",
                            "role": "member"
                        },
                        {
                            "firstName": "Anamaria",
                            "lastName": "Grant",
                            "email": "downtown1843@live.com",
                            "password": "iNTwqNZsY",
                            "role": "member"
                        },
                        {
                            "firstName": "Leonard",
                            "lastName": "Shepherd",
                            "email": "thrower1972@yahoo.com",
                            "password": "jeruiiUUTF77",
                            "role": "member"
                        },
                        {
                            "firstName": "Belia",
                            "lastName": "Monroe",
                            "email": "cranky1882@gmail.com",
                            "password": "ybUE0EHs",
                            "role": "member"
                        },
                        {
                            "firstName": "Stacey",
                            "lastName": "Calderon",
                            "email": "marsileaceae1910@gmail.com",
                            "password": "887IbHpnLM",
                            "role": "member"
                        },
                        {
                            "firstName": "Bob",
                            "lastName": "Fitzgerald",
                            "email": "burin1898@yahoo.com",
                            "password": "7XNkNYi4m3Kp",
                            "role": "member"
                        },
                        {
                            "firstName": "Albertina",
                            "lastName": "Mclaughlin",
                            "email": "drainpipe2041@yandex.com",
                            "password": "Jj294nDhJm",
                            "role": "member"
                        },
                        {
                            "firstName": "Marg",
                            "lastName": "Carney",
                            "email": "ventages2031@yahoo.com",
                            "password": "R7wJllMN8cV",
                            "role": "member"
                        },
                        {
                            "firstName": "Jeffery",
                            "lastName": "Charles",
                            "email": "zaffer1889@live.com",
                            "password": "KJipn999Xcu",
                            "role": "member"
                        },
                        {
                            "firstName": "Annett",
                            "lastName": "Parsons",
                            "email": "kurikata1944@yandex.com",
                            "password": "dNmBy7iLLL",
                            "role": "member"
                        },
                        {
                            "firstName": "Wilson",
                            "lastName": "Sharpe",
                            "email": "misunderstandable1916@live.com",
                            "password": "LkI87fKssA",
                            "role": "member"
                        },
                        {
                            "firstName": "Gertude",
                            "lastName": "Ewing",
                            "email": "althein1801@yahoo.com",
                            "password": "jLfW9jcR3,",
                            "role": "member"
                        },
                        {
                            "firstName": "Phil",
                            "lastName": "Knowles",
                            "email": "piscators1880@live.com",
                            "password": "Bw8lqEMdaA",
                            "role": "member"
                        },
                        {
                            "firstName": "Catherina",
                            "lastName": "Castillo",
                            "email": "saltworker1892@live.com",
                            "password": "IS8RNoT121K",
                            "role": "member"
                        },
                        {
                            "firstName": "Jim",
                            "lastName": "Kennedy",
                            "email": "speer2026@outlook.com",
                            "password": "LMIIoh7hOQ",
                            "role": "member"
                        },
                        {
                            "firstName": "Tula",
                            "lastName": "Stafford",
                            "email": "devoir1853@live.com",
                            "password": "rt46FZOJR",
                            "role": "member"
                        },
                        {
                            "firstName": "Rachell",
                            "lastName": "Harding",
                            "email": "article1896@outlook.com",
                            "password": "Www0OXMNo876L",
                            "role": "member"
                        },
                        {
                            "firstName": "Brandon",
                            "lastName": "Monroe",
                            "email": "article1821@live.com",
                            "password": "Houed4BC55A",
                            "role": "member"
                        },
                        {
                            "firstName": "Micha",
                            "lastName": "Sanders",
                            "email": "fewer1818@outlook.com",
                            "password": "o8I035UeR",
                            "role": "member"
                        },
                        {
                            "firstName": "Blake",
                            "lastName": "Gray",
                            "email": "occults1985@yandex.com",
                            "password": "Betnh28ndMY",
                            "role": "member"
                        },
                        {
                            "firstName": "Karren",
                            "lastName": "Crosby",
                            "email": "harborers2000@live.com",
                            "password": "NIqwl8945ngg",
                            "role": "member"
                        },
                        {
                            "firstName": "Faustino",
                            "lastName": "Morris",
                            "email": "bayard1928@outlook.com",
                            "password": "q6How8ItIs783",
                            "role": "member"
                        },
                        {
                            "firstName": "Claretta",
                            "lastName": "Cummings",
                            "email": "fish2004@gmail.com",
                            "password": "CmHyaVp6Z",
                            "role": "member"
                        },
                        {
                            "firstName": "Carmen",
                            "lastName": "Phillips",
                            "email": "geometry1853@live.com",
                            "password": "j$YsEqua3qK",
                            "role": "member"
                        },
                        {
                            "firstName": "Pamula",
                            "lastName": "Holt",
                            "email": "amperage1914@yandex.com",
                            "password": "4IrjUz5h",
                            "role": "member"
                        },
                        {
                            "firstName": "Truman",
                            "lastName": "Boyd",
                            "email": "dustman2024@live.com",
                            "password": "KBraZr42ZPer",
                            "role": "member"
                        },
                        {
                            "firstName": "Alphonso",
                            "lastName": "Salazar",
                            "email": "raddle2043@yandex.com",
                            "password": "qStarPExJBfH",
                            "role": "member"
                        },
                        {
                            "firstName": "Isidra",
                            "lastName": "O'neal",
                            "email": "antonin2059@yahoo.com",
                            "password": "KeTgbPmfBck3",
                            "role": "member"
                        }
                    ]
                ),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            assert.equal(res.status, 401);
        });
        it('Add Missing stuff activity', async function () {
            res = await fetch(urlBase + 'addActivity', {
                method: "post",
                body: JSON.stringify({
                    "name": "",
                        "dates": [
                            "Sept 13th"
                        ],
                        "description": "Just for testing"
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            assert.equal(res.status, 401);
        });
    });
    describe('Add Activity without login as Admin', function () {
        before(async function () {
            res = await fetch(urlBase + 'addActivity', {
                method: "post",
                body: JSON.stringify([
                    {
                        "name": "Testing",
                        "dates": [
                            "Sept 13th"
                        ],
                        "description": "Just for testing"
                    }
                ]),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        });
        it('Try deleting activity without logging in', function () {
            assert.equal(res.status, 401);
        });
    });
    describe('Add Activity as Admin', function () {
        before(async function () {
            res = await fetch(urlBase + 'addActivity', {
                method: "post",
                body: JSON.stringify([
                    {
                        "name": "Testing",
                        "dates": [
                            "Sept 13th"
                        ],
                        "description": "Just for testing"
                    }
                ]),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        });
        it('Login as member and Delete an activity', function () {
            assert.equal(res.status, 200);
        });
    });
    describe('Delete Activity as Admin', function () {
        before(async function () {
            res = await fetch(urlBase + 'delete/2', {
                method: "delete"
            });
        });
        it('Login as admin and Delete an activity', function () {
            assert.equal(res.status, 200);
        });
    });
})