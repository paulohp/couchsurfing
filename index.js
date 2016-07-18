'use strict'

let request = require('request-promise-native');

request = request.defaults({jar: true});

const base_url = 'https://www.couchsurfing.com';

request(base_url, (err, res, body) => {
  console.log(err, body);
});