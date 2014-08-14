'use strict';

define(['app'], function (app) {

    var registrarseController = function ($scope, $rootScope, $timeout, $http, $location, Auth, userService) {
        var appTitle = 'registrarse';
        $scope.user = {};
        $scope.userService = userService;

        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
        
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
        
        $("#contenido").backstretch("./img/registro_fondo.jpg");
        var $window = $(window).on('resize', function() {
            //alert($(window).width())
            if ($(window).width() <= 767) {
                $('#contenido').height(
                    ($(window).height() - $('#header').height() - $('#footer').height() - 20) / 3 - 25
                );    
            } else {
                $('#contenido').height(
                    $(window).height() - $('#header').height() - $('#footer').height() - 62
                );    
            }
            $("#contenido").backstretch("./img/registro_fondo.jpg");
        }).trigger('resize'); //on page load      
        
    };

    app.register.controller('RegistrarseController', ['$scope', '$rootScope', '$timeout', '$http', '$location', 'Auth', 'userService', registrarseController]);
    
});