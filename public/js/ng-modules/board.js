define(["angular"], function(angular){
    var board = angular.module("board", []);
    board.controller("boardController", function($scope, $http){
        $scope.user = {};
        $http.get("/user").
            success(function(user){
                $scope.user = user;
            });
        $scope.articleList = [
            {
                no : 3,
                title : "test1",
                writer : "winterwolf0412",
                writeDate : new Date()
            },
            {
                no : 3,
                title : "test1",
                writer : "winterwolf0412",
                writeDate : new Date()
            },
            {
                no : 3,
                title : "test1",
                writer : "winterwolf0412",
                writeDate : new Date()
            }
        ];
    });
    return board;
});
