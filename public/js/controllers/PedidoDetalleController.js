'use strict';

define(['app'], function (app) {

    var pedidoDetallesController = function ($scope, $rootScope, $stateParams, $filter, $http, $location, userService) {
        var appTitle = 'pedidoDetalles';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
        $scope.pedido = {};

        var load = function() {
            userService.cartUser.getPedido($stateParams.idpedido,
                function(resp) {
                    $scope.pedido = resp.data;
                }
             );

        }

        load();

        
    };

    app.register.controller('PedidoDetalleController', ['$scope', '$rootScope', '$stateParams', '$filter', '$http', '$location', 'userService', pedidoDetallesController]);
    
});