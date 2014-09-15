'use strict';

define(['app'], function (app) {

    var promocionController = function ($scope, $rootScope, $stateParams, $filter, $http, $location
            ,contenidoService) {
        
       var load = function() {
             contenidoService.listaContenidos(6, 5,
                 function(resp) {
                    $scope.contenidos = resp.data;
                }
             );
     
        }

        load();

        
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
                  $('#imgFondo').width() - 10
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
            $scope.quitarAlto = 85;
          } else if ($(window).width() <= 1280) {
                $scope.tipoImg = '';
                $scope.quitarAlto = 135;
          } else if ($(window).width() <= 1400) {
                $scope.tipoImg = 'PC';
                $scope.quitarAlto = 165;
          } else {
                $scope.tipoImg = 'PC';
                $scope.quitarAlto = 260;
          }
          $('#contenido').height(
                  $scope.heightContent < $('#fondo').height() ? $('#fondo').height() + 28 : $scope.heightContent
          );
          $('#content-text').height(
                  $('#imgFondo').height() - $scope.quitarAlto
          );

          $('#content-text').width(
                  $('#imgFondo').width() - 10
          );

        }).trigger('resize');
    
    };

    app.register.controller('PromocionController', ['$scope', '$rootScope', '$stateParams', '$filter', '$http', '$location'
        ,'contenidoService', promocionController]);
    
});
