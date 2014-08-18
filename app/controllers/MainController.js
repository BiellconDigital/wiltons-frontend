'use strict';

define(['app'], function (app) {

    var mainController = function ($scope, $location) {
        var appTitle = 'Home';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        };

//           $("#banner").backstretch([
//                "./img/banner-portada.jpg"
////              , "./img/banner-portada.jpg"
//            ], {duration: 3000, fade: 100});          

           
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
        
        setTimeout(function() {
            $('#contenido').height(
                    $('#fondo').height() + 28
            );
            $("#contenido").backstretch("resize");
            console.log("redimensiona!");
        }, 1000);
        
        $('#contenido').height(
          $(window).height() - $('#header').height() - $('#footer').height()
        );


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
          $scope.$apply();

          /*
          $("#banner").backstretch([
              "./img/banner-portada.jpg"
            , "http://dl.dropbox.com/u/515046/www/garfield-interior.jpg"
            , "./img/banner-about.jpg"
          ], {duration: 4000, fade: 750});          
          */
          //$('#banner').data('backstretch').pause();
          //$('#banner').data('backstretch').next();


        }).trigger('resize'); //on page load      
    	
          //$('#modalLoading').modal('hide');

    }

    app.register.controller('MainController', ['$scope', '$location', mainController]);
    
});