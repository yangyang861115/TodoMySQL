/**
 * Created by yangyang on 9/5/16.
 */
var express = require('express'),
    bodyparser = require('body-parser'),
    mysql = require('mysql'),
    app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var todoRoutes    = require("./routes/todo");
app.use(todoRoutes);

var ipaddress =  process.env.IP || '127.0.0.1';
var port      =  process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Server is running on " + port);
});