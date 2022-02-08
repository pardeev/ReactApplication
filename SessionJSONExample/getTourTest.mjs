/* Testing the GET /tours API */
import fetch from "node-fetch";
import urlBase from './testURL.mjs';

fetch(urlBase + 'tours')
    .then(function(res) {
        // Look at the cookie
        console.log(res.headers.raw()['set-cookie']);
        return res.json();
    })
    .then(function(data) {
        data.forEach(function(tour, i) {
            console.log(`Tour ${i + 1} name ${tour.name}, date: ${tour.date}`);
        });
    })
    .catch(function(err) {
        console.log(`Error: ${err}`);
    });