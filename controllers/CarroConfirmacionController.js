'use strict';

define(['app'], function (app) {

    var carroConfirmacionController = function ($scope, $stateParams, $filter, $http, $location, Auth, userService, dataService) {
        //$scope.pedido = {};
        //$scope.pedidoVisa = {};
        //dataVisa.result = "ok";
        var load = function() {
            console.log("load... tipo: " + localStorage['ultCompraTipo']);
//                userService.cartUser.getPedido(7,
//                    function(resp) {
//                        $scope.pedido = resp.data;
//                    }
//                 );
            
            if (parseInt(localStorage['ultCompraTipo']) === 1) {//deposito
                userService.cartUser.getPedido(localStorage['ultCompraId'],
                    function(resp) {
                        $scope.pedido = resp.data;
                        $scope.idUltimaOrden = localStorage['ultCompraId'];
                        console.log("lista de pedido por banco");
                    }
                 );
                localStorage['ultCompraTipo'] = 0;
            } else if (parseInt(localStorage['ultCompraTipo']) === 2) {//paypal
                console.log("FIN pedido por paypal...");
                var codigoTransaccion =  $location.search()['tx'],
                    estadoTransaccion =  $location.search()['st'],
                    montoTransaccion =  $location.search()['amt'];
            
                userService.cartUser.confirmarPagoPayPal(localStorage['ultCompraId'], codigoTransaccion, 
                    function(resp) {
                        userService.cartUser.getPedido(localStorage['ultCompraId'],
                            function(resp) {
                                $scope.pedido = resp.data;
                                $scope.idUltimaOrden = localStorage['ultCompraId'];
                                localStorage['ultCompraTipo'] = 0;
                                console.log("lista de pedido por paypal");
                            }
                         );
                    }
                 );
                
            }  else if (parseInt(localStorage['ultCompraTipo']) === 3) {//VISA
                console.log("FIN pedido por visa...");
                var codigoTransaccion =  $location.search()['eticket'];
                userService.cartUser.actualizarPedidoVisa(localStorage['ultCompraId'],
                    function(resp) {
                        $scope.pedidoVisa = resp.data;
                        $scope.pedido = resp.pedido;
                        $scope.idUltimaOrden = localStorage['ultCompraId'];
                        
                        console.log("lista de pedido por VISA");
                    }
                );
                
//                userService.cartUser.getPedido(localStorage['ultCompraId'],
//                    function(resp) {
//                        console.log(resp.data);
//                        $scope.pedido = resp.data;
//                        $scope.idUltimaOrden = localStorage['ultCompraId'];
//                        
//                        
//                        console.log("lista de pedido por VISA");
//                    }
//                 );
                //localStorage['ultCompraTipo'] = 0;
                
            } else {
                return;
            }
            
        }
        
        load();

        $scope.mostrarCodigo = function(item) {
            if (item.codigoVariante != null && item.codigoVariante != "")
                return item.codigoVariante;
            else
                return item.codigoProducto;
        }
        
    };
    
    app.register.controller('CarroConfirmacionController', ['$scope', '$stateParams', '$filter', '$http', '$location', 'Auth', 'userService', 'dataService', carroConfirmacionController]);
    
});