'use strict'

let request = require('request-promise-native');
let cheerio = require('cheerio');
request = request.defaults({jar: true});
const formData = {
  'user[login]' :'',
  'user[password]' :''
};

const base_url = 'https://www.couchsurfing.com';
function prepareLogin(){
  return request('https://www.couchsurfing.com/users/sign_in?cs_new_fe=truer');
}
function login(token){
   const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
      'Host': 'www.couchsurfing.com',
      'Origin':'https://www.couchsurfing.com',
      'Referer':'https://www.couchsurfing.com/',
      'X-CSRF-Token': token,
      'X-Requested-With':'XMLHttpRequest'
    };
    return request.post({url: `${base_url}/users/sign_in`, formData, headers, json:true });
}
request(base_url)
  .then(()=>{
    return prepareLogin();
  })
  .then((body)=> {
    let $ = cheerio.load(body);
    let lastMeta = $('meta')[$('meta').length - 1];
    return $(lastMeta).attr('content');
  })
  .then((token) => {
    return login(token);
  })
  .then(() => {
    request(`${base_url}/messages`).then((body)=>{
      let $ = cheerio.load(body);
      console.log($('.cs-inbox-thread-list-thread').length);
    })
  });
