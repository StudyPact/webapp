var app = angular.module("app",
    [
        "ngResource",
        "ngRoute",
        "userModule",
        "authenticationModule",
        "authenticationModule.services",
    ]);

app.config(["$routeProvider",
        function ($routeProvider) {
            $routeProvider.
                when("/login", {
                    templateUrl: "/views/login/login.html",
                    controller: "LoginController"
                })
                .when("/user/:userId", {
                    templateUrl: "/views/user/userDetails.html",
                    controller: "UserDetailsController"
                })
               .otherwise({
                    redirectTo: "/login"
                });
        }])
    .run(function ($rootScope, $location, authenticationService) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {

            if (!authenticationService.getAccessToken()) {
                if (next.templateUrl == "/views/login/login.html") {
                    // already going to login, no redirect needed
                } else {
                    $location.path("/login");
                }
            } else {
                if (next.templateUrl == "/views/login/login.html") {
                    $location.path("/user/userList");
                }
            }
        });
    })