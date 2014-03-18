var mongoose = require("./mongooseInit")();

var UserSchema = new mongoose.Schema({
    id : String,
    nickname : String,
    password : String
});

var User = mongoose.model("User", UserSchema, "Users");


module.exports = User;