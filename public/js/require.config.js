require.config({
    baseUrl : "/js",
    paths : {
        jquery : "/bower_components/jquery/dist/jquery",
        bootstrap : "/bower_components/bootstrap/dist/js/bootstrap.min",
        angular : "/bower_components/angular/angular.min"
    },
    shim : {
        angular : {
            exports : "angular"
        }
    }
});
