//import sys = require('sys');
import http = require('http');
import fs = require('fs');
var index;


fs.readFile('../client/index.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;
});

var server = http.createServer(function (req, res) {
    var header_type = "";
    var data :NodeBuffer;
    var get = function (url, callback) {
        if (req.url.match(url)) {
            callback();
        }
    };

    var render = function (resource) {
        // resource = name of resource (i.e. index, site.min, jquery.min)
        fs.readFile("../client/" + resource, function (err, file) {
            if (err) throw err; // Do something with the error....
            header_type = "text/html"; // Do some checking to find out what header type you must send.
            data = file;
        });
       }

    get('/', function (req, res, next) {
        // Send out the index.html
        render('index.html');
        //next();
    });


    get('/javascript.min', function (req, res, next) {
        render('javascript.js');
        //next();
    });


});

server.listen(3000);

/*
fs.readFile('../client/index.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;
});

http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(index);
    response.end();
}).listen(3000);*/