'use strict';

define(['app'], function (app) {

    var nosotrosController = function ($scope, $rootScope, $stateParams, $filter, $http, $location) {
        
        $(window).off("resize");

        if ($(window).width() <= 991) {
            $scope.tipoImg = 'tablet';
        }

        setTimeout(function() {
            $('#contenido').height(
                    $('#fondo').height() + 28
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
                    $('#fondo').height() + 28
            );
            //$scope.$apply();
        }).trigger('resize');
    
    

    };

    app.register.controller('NosotrosController', ['$scope', '$rootScope', '$stateParams', '$filter', '$http', '$location', nosotrosController]);
    
});
