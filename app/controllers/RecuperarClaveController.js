'use strict';

define(['app'], function (app) {

    var recuperarClaveController = function ($scope, $rootScope, $timeout, $http, $location, Auth) {
        var appTitle = 'recuperarClave';
        $scope.user = {};

        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
        
        $scope.recuperarClave = function() {
            Auth.retrieveKey($scope.user.email,
                function(resp) {
                    try {
                        alert(resp.msg);
                        $location.path("/");
                    } catch (e) {
                    }
                }
                , function(err) {
                    $rootScope.error = err.msg;
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                }
             );
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
                $scope.quitarAlto = 135;
          } else if ($(window).width() <= 1400) {
                $scope.tipoImg = 'PC';
                $scope.quitarAlto = 145;
          } else {
                $scope.tipoImg = 'PC';
                $scope.quitarAlto = 180;
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

    app.register.controller('RecuperarClaveController', ['$scope', '$rootScope', '$timeout', '$http', '$location', 'Auth', recuperarClaveController]);
    
});