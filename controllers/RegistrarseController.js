'use strict';

define(['app'], function (app) {

    var registrarseController = function ($scope, $rootScope, $timeout, $http, $location, Auth, userService) {
        var appTitle = 'registrarse';
        $scope.user = {};
        $scope.userService = userService;

        var load = function() {
            $scope.userService.user.listTipoDocumento(
                function(resp) {
                    $scope.tipoDocumentos = resp.data;
                }
            );
        }
        load();

        $scope.guardarUsuario = function() {
            $scope.user.role = routingConfig.userRoles.user;
            Auth.register($scope.user,
                function(resp) {
                    try {
                        alert("Su información se registró correctamente. Se envío un email para la activación de su cuenta.");
                        $location.path("/");
//                        $cookieStore.put('user', Auth.user);
//                        angular.copy($scope.user, Auth.user);
                    } catch (e) {

                    }
                }
                , function(err) {
                    $rootScope.error = "Error en el registro.";
                    $timeout(function() {
                        $rootScope.error = null;
//                        console.log("time out");
                    }, 4000);
                    //$timeout.cancel(timeError);
                }
                        
             );
        }
        
        
        $scope.path = function() {
            return $location.url();
        };
        
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
            $('#content-text').height(
                    $('#imgFondo').height() - $scope.quitarAlto
            );
            $('#content-text').width(
                  $('#imgFondo').width() - 20
            );
            console.log("redimensiona!");
        }, 1000);
        
        $scope.heightContent =  $(window).height() - $('#header').height() - $('#footer').height()-10;
        
        $('#contenido').height(
          $(window).height() - $('#header').height() - $('#footer').height()
        );


        var $window = $(window).on('resize', function() {
          if ($(window).width() <= 870) {
              $("#contenido").backstretch("./img/fondos/fondo.png");
          } else {
              $("#contenido").backstretch("./img/fondos/fondo.png");
          }

          if ($(window).width() <= 870) {
            $scope.tipoImg = 'tablet';
            $scope.quitarAlto = 90;
          } else if ($(window).width() <= 1280) {
                $scope.tipoImg = '';
                $scope.quitarAlto = 125;
          } else if ($(window).width() <= 1400) {
                $scope.tipoImg = 'PC';
                $scope.quitarAlto = 135;
          } else {
                $scope.tipoImg = 'PC';
                $scope.quitarAlto = 170;
          }
          $('#contenido').height(
                  $scope.heightContent < $('#fondo').height() ? $('#fondo').height() + 28 : $scope.heightContent
          );
          $('#content-text').height(
                  $('#imgFondo').height() - $scope.quitarAlto
          );

          $('#content-text').width(
                  $('#imgFondo').width() - 20
          );

        }).trigger('resize');
        
    };

    app.register.controller('RegistrarseController', ['$scope', '$rootScope', '$timeout', '$http', '$location', 'Auth', 'userService', registrarseController]);
    
});