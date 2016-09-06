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

var ipaddress = '127.0.0.1' || process.env.IP;
var port      =  3000 || process.env.PORT;

app.listen(port, ipaddress, function(){
    console.log("Server is running on localhost:3000.");
});