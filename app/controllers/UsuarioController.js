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

    app.register.controller('UsuarioController', ['$scope', '$rootScope', '$http', '$location', '$cookieStore', 'Auth', 'userService', usuarioController]);
    
});