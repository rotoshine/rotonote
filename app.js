
/**
 * Module dependencies.
 */

var express = require("express");
var http = require("http");
var path = require("path");
var glob = require("glob");
var _ = require("underscore");
var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ cookie : { maxAge : 60 * 60 * 1000 }, secret : "winterwolf"}));
app.use(express.static(path.join(__dirname, "public")));
app.use(app.router);
app.use(express.favicon(__dirname + "/public/images/favicon.ico"));

// development only
if ("development" == app.get("env")) {
  app.use(express.errorHandler());
}


// route setup
glob("./routes/*.js", function(err, files){
    if(err){
        console.log(err);
    }
    _.each(files, function(file){
        require(file).load(app);
    });
});

http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
