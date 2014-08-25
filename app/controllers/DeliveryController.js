'use strict';

define(['app'], function (app) {

    var deliveryController = function ($scope, $location) {

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

    app.register.controller('DeliveryController', ['$scope', '$location', deliveryController]);
    
});
