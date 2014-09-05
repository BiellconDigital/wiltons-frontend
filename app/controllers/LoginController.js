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

        $scope.quitarAlto = 60;
        if ($(window).width() <= 870) {
            $scope.tipoImg = 'tablet';
            $scope.quitarAlto = 40;
        }
        $('#content-text').width($(window).width()*0.8);

        setTimeout(function() {
            $('#contenido').height(
                  $scope.heightContent < $('#fondo').height() ? $('#fondo').height() + 28 : $scope.heightContent
            );
            $("#contenido").backstretch("resize");
//            $('#content-text').height(
//                    $('#imgFondo').height() - $scope.quitarAlto
//            );
            $('#content-text').width(
                  $('#imgFondo').width()
            );
            console.log("redimensiona!");
        }, 1000);
        
        $scope.heightContent =  $(window).height() - $('#header').height() - $('#footer').height()-10;
        
//        $('#contenido').height(
//          $(window).height() - $('#header').height() - $('#footer').height()
//        );


        var $window = $(window).on('resize', function() {
          if ($(window).width() <= 870) {
              $("#contenido").backstretch("./img/fondos/fondo.png");
          } else {
              $("#contenido").backstretch("./img/fondos/fondo.png");
          }

          if ($(window).width() <= 870) {
            $scope.tipoImg = 'tablet';
            $scope.quitarAlto = 30;
          } else if ($(window).width() <= 1280) {
                $scope.tipoImg = '';
                $scope.quitarAlto = 50;
          } else {
            $scope.tipoImg = 'PC';
            $scope.quitarAlto = 70;
          }
          $('#contenido').height(
                  $scope.heightContent < $('#fondo').height() ? $('#fondo').height() + 28 : $scope.heightContent
          );
//          $('#content-text').height(
//                  $('#imgFondo').height() - $scope.quitarAlto
//          );

          $('#content-text').width(
                  $('#imgFondo').width()
          );

        }).trigger('resize');
    };

    app.register.controller('LoginController', ['$scope', '$rootScope', '$location', '$timeout', 'Auth', loginController]);
    
});
