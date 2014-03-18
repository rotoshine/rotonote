"use strict";
exports.load = function(app){
    var salt = "twitter";
    var hash = require("node_hash");
    var User = require("../models/User");

    function getSaltedPassword(password){
        return hash.sha1(password, salt);
    }



    // view calling
    app.get("/registration", function(request, response){
        response.sendfile("views/user/registration.html");
    });

    app.get("/login", function(request, response){
        response.sendfile("views/user/login.html");
    });


    app.get("/users", function(request, response){
        var page = request.query.page || 1;
        var limit = 10;
        var skipPoint = (page - 1) * 10;
        User
            .find()
            .skip(skipPoint)
            .limit(10)
            .select("id")
            .exec(function(err, userList){
                response.json(userList);
            }
        );
    });

    // REST API
    app.get("/user", function(request, response){
        response.json({
            id : request.session.id,
            isLogin : request.session.id !== undefined
        });
    });

    app.post("/user", function(request, response){
        var user = new User({
            id : request.body.id,
            nickname : request.body.nickname,
            password : getSaltedPassword(request.body.password)
        });
        User.findOne({"id" : request.body.id}, function(error, existUser){
            if(existUser === null){
                user.save(function(){
                    response.send(200);
                });
            }else{
                response.send(500, {message : "에러가 발생했습니다."});
            }
        })
    });



    app.post("/login", function(request, response){
        User
            .findOne({"id" : request.body.id}, function(error, user){
                if(error !== null){
                    response.json(401, {message : "존재하지 않는 사용자입니다."});
                }else{
                    console.log(user.password, request.body.password, getSaltedPassword(request.body.password));
                    if(user.password === getSaltedPassword(request.body.password)){
                        response.json(200)
                    }else{
                        response.json(401, {message : "비밀번호가 일치하지 않습니다."});
                    }
                }
            });
    });

    app.post("/logout", function(request, response){
        request.session = null;
        response.redirect("/login")
    });
};