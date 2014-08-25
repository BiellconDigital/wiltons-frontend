'use strict';

define(['app'], function (app) {

    var loginController = function ($scope, $rootScope, $location, $timeout, Auth) {
        var appTitle = 'Login';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        };
        
        var resp = null;
        $scope.login = function() {
            Auth.login({
                    username: $scope.username,
                    password: $scope.password,
                    rememberme: $scope.rememberme
                },
                function(res) {
//                    console.log(res)
                    $location.path('/usuario');
                },
                function(err) {
                    $rootScope.error = "Correo o clave no válida.";
                    $timeout(function() {
                        $rootScope.error = null;
//                        console.log("time out");
                    }, 4000);
                    //$timeout.cancel(timeError);
                }
            );
            
//            resp = UserService.login($scope.username, $scope.password);
//            if (resp.data.success === 1 ) {
//                $location.path('/usuario');
//            } else {
//            }
        }
        
        
        $(window).off("resize");

        if ($(window).width() <= 991) {
            $scope.tipoImg = 'tablet';
        }

        setTimeout(function() {
            $('#contenido').height(
                    $('#imgFondo').height() + 58
            );
            $("#contenido").backstretch("resize");
            console.log("redimensiona!");
        }, 1000);
        
        var $window = $(window).on('resize', function() {
            if ($(window).width() <= 991) {
                $("#contenido").backstretch("./img/fondos/fondo.png");
            } else {
                $("#contenido").backstretch("./img/fondos/fondo.png");
            }

            if ($(window).width() <= 991) {
                $scope.tipoImg = 'tablet';
            } else {
                $scope.tipoImg = '';
            }
            $('#contenido').height(
                    $('#imgFondo').height() + 58
            );
            //$scope.$apply();
        }).trigger('resize');
    };

    app.register.controller('LoginController', ['$scope', '$rootScope', '$location', '$timeout', 'Auth', loginController]);
    
});
