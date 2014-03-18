"use strict";
module.exports = function(){
    var mongoConf = require("../config/mongo.conf.json");
    var mongoose = require("mongoose");
    mongoose.connect(mongoConf.repository);


    var db = mongoose.connection;
    db.once("open", function(){
        console.log("mongo connect success.");
    });

    return mongoose;
};

