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

        $scope.quitarAlto = 80;
        if ($(window).width() <= 991) {
            $scope.tipoImg = 'tablet';
            $scope.quitarAlto = 60;
        }

        setTimeout(function() {
            $('#contenido').height(
                  $scope.heightContent < $('#fondo').height() ? $('#fondo').height() + 28 : $scope.heightContent
            );
            $("#contenido").backstretch("resize");
            $('#content-text').height(
                    $('#fondo').height() - $scope.quitarAlto
            );
            console.log("redimensiona!");
        }, 1000);
        
        $scope.heightContent =  $(window).height() - $('#header').height() - $('#footer').height()-10;
        
        var $window = $(window).on('resize', function() {
          if ($(window).width() <= 991) {
              $("#contenido").backstretch("./img/fondos/fondo.png");
          } else {
              $("#contenido").backstretch("./img/fondos/fondo.png");
          }

          if ($(window).width() <= 991) {
            $scope.tipoImg = 'tablet';
            $scope.quitarAlto = 60;
          } else {
            $scope.tipoImg = '';
            $scope.quitarAlto = 80;
          }
          $('#contenido').height(
                  $scope.heightContent < $('#fondo').height() ? $('#fondo').height() + 28 : $scope.heightContent
          );
          $('#content-text').height(
                  $('#fondo').height() - $scope.quitarAlto
          );

        }).trigger('resize');
    
    };

    app.register.controller('LoginController', ['$scope', '$rootScope', '$location', '$timeout', 'Auth', loginController]);
    
});
