'use strict';

define(['app'], function (app) {

    var usuarioController = function ($scope, $rootScope, $http, $location, $cookieStore, Auth, userService) {
        var appTitle = 'Usuario';
        $scope.user = Auth.user;
        $scope.menuSelec = 'Datos personales';
        try {
            $scope.user = angular.copy(Auth.user);
//            angular.copy(Auth.user, $scope.user);
        
        } catch (e) {
            
        }
        
        userService.user.listTipoDocumento(
            function(resp) {
                $scope.tipoDocumentos = resp.data;
            }
        );
        
        $scope.guardarUsuario = function() {
            userService.user.saveUser($scope.user,
                function(resp) {
                    try {
                        alert("Su información se registró correctamente.");
                        $cookieStore.put('user', Auth.user);
                        angular.copy($scope.user, Auth.user);
                    } catch (e) {

                    }
                }
             );
        };
        
        $scope.cambiarClave = function() {
            console.log(Auth.user);
            if ($scope.userChange.claveNueva === $scope.userChange.claveNuevaConf) {
                userService.user.changePassword(Auth.user.idCliente, $scope.userChange.clave, $scope.userChange.claveNueva,
                    function(resp) {
                        try {
                            alert(resp.msg);
                        } catch (e) {

                        }
                    }
                 );
            } else {
                $rootScope.error = "La clave Nueva y su confirmación no coinciden.";
                $timeout(function() {
                    $rootScope.error = null;
                }, 4000);
            }
     
        };
        
        
        $scope.path = function() {
            return $location.url();
        };
        
        $scope.isActiveMenu = function (opt) {
            return $scope.menuSelec === opt;
        };
        
        $scope.menuActivo = function (menu) {
            $scope.menuSelec = menu;
        };
        
        


            $('#navMenuUsuario a').click(function (e) {
              e.preventDefault()
              $(this).tab('show');
            })
            
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

    app.register.controller('UsuarioController', ['$scope', '$rootScope', '$http', '$location', '$cookieStore', 'Auth', 'userService', usuarioController]);
    
});