const express = require('express');
const app = express();

const port = 3000;

var bodyParser = require('body-parser');
var request = require('request');


app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req , res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req , res) {
   var crypto = req.body.crypto;
   var fiat = req.body.fiat;
   var BaseURL="https://apiv2.bitcoinaverage.com/indices/global/ticker/";

   var finalURL = BaseURL +crypto + fiat;

  request(finalURL, function (error, response, body) {

    var data = JSON.parse(body);
    var price = data.last;
    var datex = data.display_timestamp;

    res.write("<h1> The current time is :" + datex);
    res.write("<br>");
    res.write(String("The price of :" + crypto +" &nbsp; is" + price +fiat));

    res.send();
  });
});

app.listen(port, function(){
  console.log("app is running on port 3000!");
});
