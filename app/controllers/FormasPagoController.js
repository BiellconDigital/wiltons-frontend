'use strict';

define(['app'], function (app) {

    var formasPagoController = function ($scope, $location) {
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

    app.register.controller('FormasPagoController', ['$scope', '$location', formasPagoController]);
    
});