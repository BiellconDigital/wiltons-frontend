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

    app.register.controller('RegistrarseController', ['$scope', '$rootScope', '$timeout', '$http', '$location', 'Auth', 'userService', registrarseController]);
    
});