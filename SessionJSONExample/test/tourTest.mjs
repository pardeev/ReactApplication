import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch';
import getCookies from './getCookies.mjs';
import urlBase from '../testURL.mjs';

describe('Get Tour Tests', function() {
    let res;
    let tours = null;
    before(async function() {
        res = await fetch(urlBase + 'tours');
    })
    it('Everything is OK', async function() {
        assert.equal(res.status, 200);
    });
    it('Returns an array', async function() {
        tours = await res.json();
        assert.isArray(tours);
    });
    it('All tour elements have name and date', function() {
        tours.forEach(function(tour) {
            assert.containsAllKeys(tour, ['name', 'date']);
        });
    });
    it('Cookie with appropriate name is returned', function() {
        let cookies = getCookies(res);
        assert.include(cookies, 'TourSid');
        console.log(`tour test cookies: ${cookies}`);
    });
})