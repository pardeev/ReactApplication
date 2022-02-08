import fetch from 'node-fetch';

async function inOrder() {
    let url = "http://localhost:8886"
    try {
        let initialActivities = await fetch(url + `/activities`);
        let res = await initialActivities.json();
        console.log(`The club has ${res.length} activities currently posted`);
    } catch (err) {
        console.error(err);
    }
    try {
        let addActivity = await fetch(url + `/addActivity`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Post method",
                dates: ["Oct 27th"],
                description: "Just testing the post method"
            })
        });
        console.log(`Posted new activity, return code: ${addActivity.status}`);
    } catch (err) {
        console.error(err);
    }
    try {
        let activities = await fetch(url + `/activities`);
        let res = await activities.json();
        console.log(`The club has ${res.length} activities currently posted`);
    } catch (err) {
        console.error(err);
    }
    try {
        let id = 3;
        let deleteActivity = await fetch(url + `/delete/${id}`, {
            method: 'delete',
        });
        console.log(`Deleted activity, return code: ${deleteActivity.status}`);
    } catch (err) {
        console.error(err);
    }
    try {
        let activities = await fetch(url + `/activities`);
        let res = await activities.json();
        console.log(`The club has ${res.length} activities currently posted`);
    } catch (err) {
        console.error(err);
    }
}
inOrder();