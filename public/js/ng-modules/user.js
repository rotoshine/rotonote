define(["angular"], function(angular){
    var user = angular.module("user", []);

    user.controller("loginController", function($scope, $http){
        $scope.id = "";
        $scope.password = "";
        $scope.loginError;
        $scope.login = function(id, password, e){
            e.preventDefault();
            $http.post("/login", {
                id : id,
                password : password
            }).
            success(function(result){
                // 쿼리스트링에서 returnUrl있으면 분리
                var returnUrl;
                var querystring;
                var params;
                var paramMap = {};
                var keyAndValue;
                var i;
                if(location.href.indexOf("returnUrl") > -1){
                    querystring = location.href.split("?")[1];
                    params = querystring.split("&");
                    for(i = 0; i < params.length; i++){
                        keyAndValue = params[i].split("=");
                        paramMap[keyAndValue[0]] = keyAndValue[1];
                    }
                }
                if(paramMap.hasOwnProperty("returnUrl")){
                    location.href = paramMap.returnUrl;
                }
                else if(result.returnUrl){
                    location.href = result.returnUrl
                }else{
                    location.href = "/";
                }
            }).
            error(function(error, status){
                if(status === 401){
                    $scope.loginError = "존재하지 않는 사용자이거나 비밀번호가 맞지 않습니다.";
                }else{
                    $scope.loginError = "로그인에 실패하였습니다.";
                }
                $scope.id = "";
                $scope.password = "";
            });
        };
    });

    user.controller("userController", function($http, $scope){
        $scope.user = {};

        $scope.existsCheck = function(id){
            $http.get("/user/" + id)
                .success(function(result){

                });
        };

        $scope.addUser = function(user, e){
            e.preventDefault();
            $http.post("/user", user)
                .success(function(){
                    location.href = "/login";
                })
                .error(function(result){
                    alert(result.message);
                });
        };
    });
    return user;
});