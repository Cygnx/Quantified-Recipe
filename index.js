var statix = require('node-static');
var http = require('http');
var dynamic = require("./dynamic");
var url = require("url");
var fileServer = new statix.Server('./public');

function handler(request, response) {
    var urlRecieved = request.url; // maybe complex string
    console.log(urlRecieved );
    var urlObj = url.parse(urlRecieved);
    var pathname = urlObj.pathname; // maybe simpler string
    var parts = pathname.split("/"); // array of strings
    if (parts[1] == "dyn") { 
        console.log(urlRecieved);
        dynamic.dynamic(response, urlObj);
    } 
    else {
        request.addListener('end', function() {
            fileServer.serve(request, response)
        }).resume();
    }
}

server = http.createServer(handler);
server.listen(20022);
