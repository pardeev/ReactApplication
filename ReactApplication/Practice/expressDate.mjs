import express from 'express';
const app = express();

const name = "Pardeev Reddy";
app.get('/date', (req, res) => res.send(
    'Name: ' + name + '<br>' + 
    'Current Date and Time: ' + new Date().toLocaleString()));

app.listen(5150, "127.20.30.11", () => console.log('App listening on port 127.0.0.1:5150'));