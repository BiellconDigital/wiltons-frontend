'use strict';

define(['app'], function (app) {

    var mainController = function ($scope, $location) {
        $scope.tipoImg = '';
        $scope.itemImg = 1;
        
        $scope.mostrarBanner = new Array();
        
        $scope.mostrarBanner[0] = true;
        $scope.mostrarBanner[1] = true;
        $scope.mostrarBanner[2] = false;
        $scope.mostrarBanner[3] = false;
        $scope.item = 1;
        $scope.activarTime = true;

        $(window).off("resize");

        if ($(window).width() <= 991) {
            $scope.tipoImg = 'tablet';
        }

        var $window = $(window).on('resize', function() {
            if ($(window).width() <= 991) {
                $scope.tipoImg = 'tablet';
            } else {
                $scope.tipoImg = '';
            }
        });

        setInterval(function() {
            $scope.mostrarBanner[$scope.itemImg] = false;
            //$("#imgBanner").hide();
//                console.log("interval... " + $scope.item);
            if ($scope.itemImg === 3)
                $scope.itemImg = 0;
            $scope.itemImg++;
            $scope.mostrarBanner[$scope.itemImg] = true;
            //$("#imgBanner").show("slow");
            $scope.$apply();
        }, 4600);


//           $("#banner").backstretch([
//                "./img/banner-portada.jpg"
////              , "./img/banner-portada.jpg"
//            ], {duration: 3000, fade: 100});          

           

//          var $window = $(window).on('resize', function() {
//            $('#contenido').height(
//              $(window).height() - $('#header').height() - $('#footer').height() - 40
//            );
//            if ($(window).width() <= 320) {
//                $("#banner").backstretch("./img/banner-portada-320.jpg");
//            } else if ($(window).width() <= 390) {
//                $("#banner").backstretch("./img/banner-portada-op2.jpg");
//            } else {
//                $("#banner").backstretch("./img/banner-portada.jpg");
//            }
//          }).trigger('resize'); //on page load      
    	
          //$('#modalLoading').modal('hide');

    }

    app.register.controller('MainController', ['$scope', '$location', mainController]);
    
});