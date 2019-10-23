'use strict';

var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require("body-parser");
// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


// your first API endpoint...
var api = require("./routes/api");
app.use(api);


app.listen(port, function () {
  console.log('Node.js listening ...');
});
