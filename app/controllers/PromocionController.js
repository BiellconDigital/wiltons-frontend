'use strict';

define(['app'], function (app) {

    var promocionController = function ($scope, $rootScope, $timeout, $stateParams, $filter, $http, $location
            ,contenidoService) {
        var owl = null;
        
       var load = function() {
             contenidoService.listaContenidos(6, 5,
                 function(resp) {
                    $scope.contenidos = resp.data;

                    $timeout(function() {
                    
                        var owl1 = $("#owl-promociones-movil");
                        owl1.owlCarousel({
                            navigation : false, // Show next and prev buttons
                            slideSpeed : 300,
                            paginationSpeed : 400,
                            singleItem:true,
                            autoPlay : true,
                            autoHeight : true

                        });
                        owl = $("#owl-promociones-movil").data('owlCarousel');
                        
                        var owl1 = $("#owl-promociones-tablet");
                        owl1.owlCarousel({
                            navigation : false, // Show next and prev buttons
                            slideSpeed : 300,
                            paginationSpeed : 400,
                            singleItem:true,
                            autoPlay : true,
                            autoHeight : true

                        });
                        owl = $("#owl-promociones-tablet").data('owlCarousel');
                        
                        var owl1 = $("#owl-promociones-pc");
                        owl1.owlCarousel({
                            navigation : false, // Show next and prev buttons
                            slideSpeed : 300,
                            paginationSpeed : 400,
                            singleItem:true,
                            autoPlay : true,
//                            navigationText : ["prev","next"],
                            autoHeight : true

                        });
                        owl = $("#owl-promociones-pc").data('owlCarousel');
                        
                    }, 1300);
                }
             );
     
        }

        load();

        
        $(window).off("resize");

        $scope.heightContent =  $(window).height() - $('#header').height() - $('#footer').height();

        $("#contenido").backstretch("./img/fondos/fondo.png");

        var $window = $(window).on('resize', function() {
          var nameV = "";
          var alturaMas = 0;
          setTimeout(function() {

              if($(window).width() <= 768) {
                nameV = "owl-promociones-movil";
                alturaMas = 50;
              } else if($(window).width() <= 991) {
                nameV = "owl-promociones-tablet";
                alturaMas = 60;
              } else {
                nameV = "owl-promociones-pc";
                alturaMas = 110;
              }

//              console.log($('#' + nameV + " img"));
              console.log($('#' + nameV + " img")[0].height);
              var alturaImg = $('#' + nameV + " img")[0].height;
              $('#contenido').height(
//                    $scope.heightContent =  $(window).height() - $('#header').height() - $('#footer').height()
                    $scope.heightContent < alturaImg + alturaMas ? alturaImg + alturaMas : $scope.heightContent
              );
              $("#contenido").backstretch("resize");
          }, 1100);
        }).trigger('resize');
    
    };

    app.register.controller('PromocionController', ['$scope', '$rootScope', '$timeout',  '$stateParams', '$filter', '$http', '$location'
        ,'contenidoService', promocionController]);
    
});
