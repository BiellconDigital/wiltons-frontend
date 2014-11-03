'use strict';

define(['app'], function (app) {

    var initController = function ($scope, $rootScope, $http, $location, $window, dataService, Auth) {
        var appTitle = 'Inicio';
        $scope.appTitle = appTitle;
        $scope.user = Auth.user;
        $scope.userRoles = Auth.userRoles;
        $scope.accessLevels = Auth.accessLevels;
        $scope.menu = '';
        console.log($window.browserNoSup);
//        alert($window.browserNoSup);
        if ($location.path() === "" || $location.path() === "/") {
            console.log("ruta: " + $location.path());
            $scope.mostrarFondo = true;
            setTimeout(function() {
                //$scope.mostrarFondo = false;
                //$scope.$apply();
                $(".layerIntro").fadeOut( "slow" );
            }, 4000);
            
        } else {
            $scope.mostrarFondo = false;
        }
        
        
//        $('#id_content_view').css('height', "100%");
//        $('#id_content_view').css('background-color', "black");
        $scope.logout = function() {
            Auth.logout(function() {
                dataService.cart.clearItems();
                $location.path('/login');
            }, function() {
                $rootScope.error = "No se pudo salir de su sesión.";
            });
        };

        
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
        $scope.cart = dataService.cart;
        
        $scope.path = function() {
            return $location.url();
        };
        
        $scope.showCart = function() {
            $location.path( "/carro-de-compra");
        };
        
        $scope.buscarProductos = function() {
            $location.path( "/productos_busqueda/" + $scope.textSearch);
        };
        $scope.manageOverlay = function() {
            console.log("esconder layer orig...");
            $('.layerOpacity').hide();
        };

        $scope.selectMenu = function (menu) {
            $scope.menu = menu;
        };
        
        $scope.isActiveMenu = function (menu) {
            return $scope.menu === menu;
        };

        $scope.selectMenu($location.path());
        //$scope.isActiveMenu($location.path());
        $rootScope.appUrl = "/wiltons-backend/web/api";
    };

    app.controller('InitController', ['$scope', '$rootScope', '$http', '$location', '$window', 'dataService', 'Auth', initController]);
    
});