import express from 'express';
const app = express();

const name = "Pardeev Reddy";
const netId = "EJ2920";
let count = 0;

app.get('/netId', (req, res) => {
    count++;
    res.send(
    'Name: ' + name + '<br>' + 
    'NetId: ' + netId + '<br>' + 
    'Number of counts: ' + count
    )});

app.listen(9999, "127.0.0.1", () => console.log('App listening on port 127.0.0.1:9999'));