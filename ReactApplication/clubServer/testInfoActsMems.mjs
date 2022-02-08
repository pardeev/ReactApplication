import fetch from 'node-fetch';

async function inOrder() {
    try {
        let infor = await fetch(`http://localhost:5556/info`);
        let res = await infor.json();
        console.log(`Club Name: ${res.clubName}`);
    } catch (err) {
        console.error(err);
    }
    try {
        let activ = await fetch(`http://localhost:8886/activities`);
        let res = await activ.json();
        console.log(`The club has ${res.length} activities currently posted`);
    } catch (err) {
        console.error(err);
    }
    try {
        let mems = await fetch(`http://localhost:9996/members`);
        let res = await mems.json();
        console.log(`The club currently has ${res.length} members`);
    } catch (err) {
        console.error(err);
    }
}
inOrder();