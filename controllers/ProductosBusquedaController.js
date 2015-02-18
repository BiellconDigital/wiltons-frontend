'use strict';

define(['app'], function (app) {

    var productosBusquedaController = function ($scope, $rootScope, $timeout, $stateParams, $filter, $http, $location, dataService) {
        var appTitle = 'ProductosBusqueda';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }

        $scope.isNumber = angular.isNumber;
        $scope.cart = dataService.cart;
        $scope.querySearch = $stateParams.query;
        $scope.total = 0;
        
        var load = function() {
            console.log('call load() busqueda...');
            $scope.cateID = ($stateParams.cateId) ? parseInt($stateParams.cateId) : null;
            
            $http.get($rootScope.appUrl + '/producto', {params: { operacion : 'lista', query: $stateParams.query }})
                    .success(function(data, status, headers, config) {
                        $scope.productos = data.data;
                        $scope.total = $scope.productos.length;
                        angular.copy($scope.productos, $scope.copy);

                    });

        }

        load();

        $scope.changePrecio = function(p, precio) {
            p.precio = angular.copy(precio);
        };

        $scope.agregarProducto = function(idproducto, nombre_producto, imagen, precio, cantidad, variante, nameUnidadMedidaVenta) {
            result = $scope.cart.addItem(idproducto, nombre_producto, imagen, precio, cantidad, variante, nameUnidadMedidaVenta);

            if (result === "new") {
                $rootScope.error = "Se agregó nuevo producto al carro de compras.";
                $timeout(function() {
                    $rootScope.error = null;
                }, 4000);
            } else if (result === "edit") {
                $rootScope.error = "Se aumentó el producto al carro de compras.";
                $timeout(function() {
                    $rootScope.error = null;
                }, 4000);
            };
        }

        
    };

    app.register.controller('ProductosBusquedaController', ['$scope', '$rootScope', '$timeout', '$stateParams', '$filter', '$http', '$location', 'dataService', productosBusquedaController]);
    
});