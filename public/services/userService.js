'use strict';

define(['app'], function (app) {

    var userService = function ($http, $rootScope, $q, $timeout) {
       //var serviceBase = '/api/dataservice/',
        var userFactory = {};
        var cartFactory = {};

        userFactory.saveUser = function(user, success) {
            $http.post($rootScope.appUrl + '/cliente', {operacion: 'save_user', user: user}).success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en el procesamiento de registro de sus datos.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
            });
        };
        
        userFactory.changePassword = function (idCliente, clave, claveNueva, success) {
            return $http.put($rootScope.appUrl + '/cliente', { operacion : 'change_password', idCliente: idCliente 
                    , clave: clave, claveNueva: claveNueva})
                    .success(function(data, status, headers, config) {
                        success(data);
                }).error(function(err) {
                    $rootScope.error = err.msg;
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
            });
        };


        userFactory.login = function (usuario, clave) {
//             return $http({
//                url: $rootScope.appUrl + '/login',
//                method: "POST",
//                data: { 'usuario' : usuario, 'clave': clave }
//            })
//            .then(function(data, status, headers, config) {
//                    return {data: data, headers: headers};
//                }, 
//                function(data, status, headers, config) { // optional
//                    alert("error")
//                    return null
//                }
//            );            
            return $http.post($rootScope.appUrl + '/login', { 'usuariox' : usuario, 'clave': clave })
                    .success(function(data, status, headers, config) {
                        //$scope.productos = data.data;
                        //angular.copy($scope.productos, $scope.copy);
                        return {data: data, headers: headers};
                });
        };
        
        userFactory.listTipoDocumento = function(success) {
            $http.get($rootScope.appUrl + '/tipo-documento').success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en la consulta.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                });
        };
        
        cartFactory.listUbigeo = function(success) {
            $http.get($rootScope.appUrl + '/distrito').success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en la consulta.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                });
        };
        
        cartFactory.listOrdenTipo = function(success) {
            $http.get($rootScope.appUrl + '/orden-tipo').success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en la consulta.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                });
        };
        
        cartFactory.listHoraDespacho = function() {
            return [
                {"horaEnvio": "8:00 a 20:00", "descripcion": "8:00 a 20:00"}
            ];
        };
        
        cartFactory.procesarCompra = function(orden, items, success) {
            $http.post($rootScope.appUrl + '/cart', {operacion: 'procesar_compra', orden: orden, items: items}).success(function(data) {
                success(data);
            }).error(function(err) {
                    console.log(err)
//                    $rootScope.error = "Error en el procesamiento de la compra.";
                    $rootScope.error = err.msg;
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
            });
        };
        
        cartFactory.obtenerEticketVisa = function(orden, user, success) {
            $http.put($rootScope.appUrl + '/visa', {operacion: 'obtener_eticket', orden: orden, cliente: user}).success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en el procesamiento de la compra.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
            });
        };
        
        cartFactory.confirmarPagoPayPal = function(idOrden, codigoTransaccion, success) {
            $http.put($rootScope.appUrl + '/cart', {operacion: 'confirmar_paypal', idOrden: idOrden, codigoTransaccion: codigoTransaccion}).success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en el procesamiento de la compra.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
            });
        };
        
        cartFactory.listaPedidos = function(success) {
            $http.get($rootScope.appUrl + '/cart', {params: {operacion: 'lista_pedidos'}}).success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en obtener la información.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
            });
        };
        
        cartFactory.getPedido = function(idOrden, success) {
            $http.get($rootScope.appUrl + '/cart', {params: {operacion: 'get_pedido', idOrden : idOrden}}).success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en obtener la información.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
            });
        };
        
        cartFactory.actualizarPedidoVisa = function(idOrden, success) {
            $http.put($rootScope.appUrl + '/visa', {operacion: 'actualizar_orden_visa', idOrden : idOrden}).success(function(data) {
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en obtener la información.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
            });
        };
        


        
        
        return {
            user: userFactory,
            cartUser: cartFactory
        };
        
    };

    app.factory('userService', ['$http', '$rootScope', '$q', '$timeout', userService]);

});