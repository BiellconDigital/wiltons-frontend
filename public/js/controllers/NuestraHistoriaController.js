'use strict';

define(['app'], function (app) {

    var nuestraHistoriaController = function ($scope, $timeout) {
        $scope.tipoImg = '';
        $(window).off("resize");
        
        if ($(window).width() <= 991) {
            $scope.tipoImg = 'imgFondoMovil';
            $scope.alturaAdic = 1;
        } else {
            $scope.tipoImg = 'imgFondoNormal';
            $scope.alturaAdic = 0;
        }
            
        $timeout(function() {
            $("#fondo").height($("." + $scope.tipoImg).height() - $scope.alturaAdic);
            $("#contenidoBody").height($("#fondo").height() - 84);
        }, 1000);
        
        var $window = $(window).on('resize', function() {
//            $("#fondo").height($(".imgFondo").height() + 10);
            if ($(window).width() <= 991) {
                $scope.tipoImg = 'imgFondoMovil';
            } else {
                $scope.tipoImg = 'imgFondoNormal';
            }
            $timeout(function() {
                $("#fondo").height($("." + $scope.tipoImg).height());
                $("#contenidoBody").height($("#fondo").height() - 84);
            }, 1000);
        });
        
    };
    app.register.controller('NuestraHistoriaController', ['$scope', '$timeout', nuestraHistoriaController]);
    
});
