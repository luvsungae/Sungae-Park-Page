/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// CSS in stylesheets
app.use(express.static(__dirname + '/stylesheets'));

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.get('/resume',function(req,res){
  res.sendFile('/resume.html');
});

app.get('/portfolios',function(req,res){
  res.sendFile('/portfolios.html');
});

var request = require('request');
var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke';

request(url, function (err, resp, body) {
    if (err || resp.statusCode != 200)
        return console.log('Could not get weather information');
    var json = JSON.parse(body);
    console.log('Five-day forecast for McLean, VA:', json.query.results.channel.item.condition.temp);
});



// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
