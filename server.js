const http = require('http');
const url = require('url');
const fs = require('fs');
const handlers = require('./src/handle')
const mysql = require('mysql')

let server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');

    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notfound;
    chosenHandler(req, res);
});

let router = {
    'register': handlers.register,
    'listhomestay':handlers.listHomestay

}


server.listen(3000, function () {
    console.log('server running at localhost:3000 ')
});

