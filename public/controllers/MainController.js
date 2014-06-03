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

           

          var $window = $(window).on('resize', function() {
            $('#contenido').height(
              $(window).height() - $('#header').height() - $('#footer').height() - 40
            );
            if ($(window).width() <= 320) {
                $("#banner").backstretch("./img/banner-portada-320.jpg");
            } else if ($(window).width() <= 390) {
                $("#banner").backstretch("./img/banner-portada-op2.jpg");
            } else {
                $("#banner").backstretch("./img/banner-portada.jpg");
            }
    
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