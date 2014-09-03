'use strict';

define(['app'], function (app) {

    var nosotrosController = function ($scope, $rootScope, $stateParams, $filter, $http, $location) {
        
        $(window).off("resize");

        $scope.quitarAlto = 60;
        if ($(window).width() <= 991) {
            $scope.tipoImg = 'tablet';
            $scope.quitarAlto = 40;
        }

        setTimeout(function() {
            $('#contenido').height(
                  $scope.heightContent < $('#fondo').height() ? $('#fondo').height() + 28 : $scope.heightContent
            );
            $("#contenido").backstretch("resize");
            $('#content-text').height(
                    $('#fondo').height() - $scope.quitarAlto
            );
            $('#content-text').width(
                  $('.' + $scope.fondoClass).width() - 10
            );
            console.log("redimensiona!");
        }, 1200);
        
        $scope.heightContent =  $(window).height() - $('#header').height() - $('#footer').height()-10;
        
//        $('#contenido').height(
//          $(window).height() - $('#header').height() - $('#footer').height()
//        );


        var $window = $(window).on('resize', function() {
          if ($(window).width() <= 991) {
              $("#contenido").backstretch("./img/fondos/fondo.png");
          } else {
              $("#contenido").backstretch("./img/fondos/fondo.png");
          }

          if ($(window).width() <= 991) {
            $scope.tipoImg = 'tablet';
            $scope.quitarAlto = 30;
            $scope.fondoClass = 'imgFondoMovil';
          } else {
            $scope.tipoImg = '';
            $scope.quitarAlto = 50;
            $scope.fondoClass = 'imgFondoNormal';
          }
          $('#contenido').height(
                  $scope.heightContent < $('#fondo').height() ? $('#fondo').height() + 28 : $scope.heightContent
          );
          $('#content-text').height(
                  $('#fondo').height() - $scope.quitarAlto
          );

          $('#content-text').width(
                  $('.' + $scope.fondoClass).width() - 10
          );

        }).trigger('resize');
    
    };

    app.register.controller('NosotrosController', ['$scope', '$rootScope', '$stateParams', '$filter', '$http', '$location', nosotrosController]);
    
});
