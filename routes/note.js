"use strict";
exports.load = function(app){
    app.get("/note/:boardName", function(request, response){
        response.sendfile("views/note.html");
    });
};