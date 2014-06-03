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
        
        
        $("#contenido").backstretch("./img/registro_fondo.jpg");
        var $window = $(window).on('resize', function() {
                    //alert($(window).width())
            if ($(window).width() <= 767) {
                            $('#contenido').height(
                                    ($(window).height() - $('#header').height() - $('#footer').height() - 20) / 2
                            );    
            } else {
                            $('#contenido').height(
                                    $(window).height() - $('#header').height() - $('#footer').height() - 69
                            );    
            }
            $("#contenido").backstretch("./img/registro_fondo.jpg");
        }).trigger('resize'); //on page load      
    };

    app.register.controller('LoginController', ['$scope', '$rootScope', '$location', '$timeout', 'Auth', loginController]);
    
});
