angular.module('authenticationModule.services', []).factory('authenticationService', function ($http, $rootScope, $q) {

    var authUrl = clientConfig.host + "/oauth/token";
    var cookieLogin = false;
    var accessToken = document.cookie.split("accessToken=")[1];

    if(accessToken){
        $rootScope.loggedIn = true;
        setAccessToken(accessToken);
    }

    function setAccessToken(newAccessToken) {
        $http.defaults.headers.common.Authorization = "Bearer " + newAccessToken;
        accessToken = newAccessToken;
    };

    return {
        setCookieLogin: function(value) {
            cookieLogin = value;
        },
        authenticate: function (authEmail, authPassword) {
            var request_data = {
                grant_type: "password",
                client_id: clientConfig.client_id,
                client_secret: clientConfig.client_secret,
                scope: "user",
                username: authEmail,
                password: authPassword
            };
            return $http.post(authUrl, request_data)
                .success(function (data) {
                    setAccessToken(data.access_token);
                    if (cookieLogin) {
                        document.cookie = "accessToken=" + data.access_token;
                    }
                    $rootScope.loggedIn = true;
                    return $q.defer(data.access_token);
                })
                .error(function (error) {
                    var errorText = "";
                    return $q.reject(errorText);
                });
        },
        logout: function () {
            setAccessToken("");
            document.cookie = "accessToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
            $rootScope.loggedIn = false;
        },
        getAccessToken: function () {
            return accessToken;
        }
    }
});