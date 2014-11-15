angular.module('studypact').factory('AuthenticationService', ["$state","$http", "$rootScope", "$q",
        function($state, $http, $rootScope, $q) {

            var authUrl = clientConfig.host + "/oauth/token";
            var cookieLogin = true;

            function setAccessToken(newAccessToken) {
                $http.defaults.headers.common.Authorization = "Bearer " + newAccessToken;
                accessToken = newAccessToken;
            };

            return {
                init: function() {
                    console.log("INIT");
                    var accessToken = document.cookie.split("accessToken=")[1];

                    if (accessToken) {
                        console.log("Logged in!");
                        $rootScope.loggedIn = true;
                        setAccessToken(accessToken);
                        $state.go("myStudy");

                    } else {
                        console.log("Logged Out!");
                        $rootScope.loggedIn = false;
                        $state.go("loggedOut");
                    }
                },
                setCookieLogin: function(value) {
                    cookieLogin = value;
                },
                login: function(user) {
                    var request_data = {
                        grant_type: "password",
                        client_id: clientConfig.client_id,
                        client_secret: clientConfig.client_secret,
                        scope: "user",
                        username: user.email,
                        password: user.password
                    };
                    return $http.post(authUrl, request_data)
                        .success(function(data) {
                            setAccessToken(data.access_token);
                            if (cookieLogin) {
                                document.cookie = "accessToken=" + data.access_token;
                            }
                            $rootScope.loggedIn = true;
                            return $q.defer(data.access_token);
                        })
                        .error(function(error) {
                            var errorText = "";
                            return $q.reject(errorText);
                        });
                },
                logout: function() {
                    setAccessToken("");
                    document.cookie = "accessToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
                    $rootScope.loggedIn = false;
                },
                getAccessToken: function() {
                    return accessToken;
                }
            }
        }]);