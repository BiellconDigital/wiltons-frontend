'use strict';

define(['app'], function (app) {

    var productosEspController = function ($scope, $rootScope, $timeout, $stateParams, $filter, $http, $location, dataService) {
        var appTitle = 'Productos';

        $scope.isNumber = angular.isNumber;
        $scope.cateID;
        $scope.cart = dataService.cart;
        
        var load = function() {
            console.log('call load()...');
            $http.get($rootScope.appUrl + '/producto', {params: { operacion : 'lista', idTipo: 2 }})
                    .success(function(data, status, headers, config) {
                        $scope.productos = data.data;
                        angular.copy($scope.productos, $scope.copy);

                    });

        }

        load();

        $scope.loadProductos = function(cate) {
            console.log('call loadProductos()...');
            $http.get($rootScope.appUrl + '/producto', {params: {operacion : 'lista', idTipo: 2 }})
                    .success(function(data, status, headers, config) {
                        $scope.productos = data.data;
                        angular.copy($scope.productos, $scope.copy);
                    });
        }

        $scope.changePrecio = function(p, precio) {
            p.precio = angular.copy(precio);
        }

        
    };

    app.register.controller('ProductosEspController', ['$scope', '$rootScope', '$timeout', '$stateParams', '$filter', '$http', '$location', 'dataService', productosEspController]);
    
});