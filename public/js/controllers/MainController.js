'use strict';

define(['app'], function (app) {

    var mainController = function ($scope, $location) {
        $scope.item = 1;
        $scope.itemImg = 1;

        setInterval(function() {
            $("#imgBanner").hide();
//                console.log("interval... " + $scope.item);
            if ($scope.itemImg === 3)
                $scope.itemImg = 0;
            $scope.itemImg++;
            $("#imgBanner").show("slow");
            $scope.$apply();
        }, 3600);


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