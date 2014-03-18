exports.load = function(app){
    app.get("/", function(request, response){
        response.sendfile("views/main.html");
    });
};