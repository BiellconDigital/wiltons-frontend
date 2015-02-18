'use strict';

define(['app'], function (app) {

    var carroController = function ($scope, $rootScope, $timeout, $stateParams, $filter, $http, $location, Auth, userService, dataService) {
        $scope.cart = dataService.cart;
        $scope.cartUser = userService.cartUser;
        $scope.user = Auth.user;
        $scope.disitritos = null;
        $scope.orden = {};
        $scope.razonesCompra = null;
        $scope.orden.costoEnvio = null;
        $scope.orden.subTotal = dataService.cart.getTotalPrice();
        $scope.orden.cuentaBanco = "Cta. Cte. BCP 194-0931731-0-23";
        $scope.horaDespacho = userService.cartUser.listHoraDespacho();
        $scope.procesando = false;
        $scope.orden.fechaEnvio = $filter("date")(Date.now() + (3 * 24 * 3600 * 1000) , 'yyyy-MM-dd');
//        $scope.orden.costosEnvio = {
//            'ATE' : 25.00,
//            'BARRANCO' : 10.00,
//            'BELLAVISTA' : 25.00,
//            'BREÑA' : 15.00,
//        };
        
        var dataVisa = {url_visa : '', eticket: 0, result: ''};

        $scope.updateOrden = function() {
            $scope.orden.total = $scope.orden.costoEnvio + $scope.cart.getTotalPrice();
        };
        
        var load = function() {
            $scope.updateOrden();
            $scope.cartUser.listUbigeo(
                function(resp) {
                    $scope.disitritos = resp.data;
                }
             );
            $scope.cartUser.listOrdenTipo(
                function(resp) {
                    $scope.razonesCompra = resp.data;
                }
             );
            $scope.orden.razonSocial = $scope.user.nombres + ' ' + $scope.user.apellidoPaterno + ' ' + $scope.user.apellidoMaterno;
            $scope.orden.rucCliente = $scope.user.nroDocumento;
        }
        load();
        
        $scope.procesarCompra = function(tipoPago) {
            $scope.procesando = true;
	    $scope.orden.subTotal = dataService.cart.getTotalPrice();
            $scope.cartUser.procesarCompra($scope.orden, $scope.cart.items,
                function(resp) {
                    localStorage['ultCompraId'] =  resp.idOrden;
                    localStorage['ultCompraTipo'] = tipoPago;
                    $scope.orden.idOrden = resp.idOrden;
/*                    $rootScope.idUltimaOrden = resp.idOrden;
                    $rootScope.tipoPago = tipoPago;
*/                    
                    if (tipoPago === 3) {
                        console.log("invocar visa...");
                        $scope.cartUser.obtenerEticketVisa($scope.orden, $scope.user,
                            function(resp2) {
                                if (resp2.success) {
                                    dataVisa.eticket = resp2.Eticket;
                                    dataVisa.url_visa = resp2.urlVisa;
                                    
                                    $scope.cart.addCheckoutParameters("Visa", "", dataVisa);
                                    $scope.cart.checkout('Visa');
  //                                    var targetitem = 1;// $scope.retornoPago;
//                                    var dataitem = window.open("PagoVisa.html", "dataitem", "toolbar=no,menubar=no,scrollbars=yes"); 
//                                    dataitem.dataVisa = dataVisa;
//                                    dataitem.onbeforeunload = function(){  console.log(dataVisa.result);}
                                    $scope.procesando= false;
                              } else {
                                    $rootScope.error = resp2.msg;
                                    $timeout(function() {
                                        $rootScope.error = null;
                                    }, 4000);
                                    $scope.procesando= false;
                                }
                            }
                        );
                        
                    } else if (tipoPago === 2) {
                        console.log("invocar paypal...");
                        $scope.cart.setCostoEnvio($scope.orden.costoEnvio);
                        $scope.cart.checkout('PayPal');
                        $scope.procesando = false;
                    } else if (tipoPago === 1) {
                        $scope.procesando = false;
                        $scope.cart.clearItems();
                        $location.path('/confirmacion-compra');
                    }
                }
             );
        }
        
        
        
        $('#rootwizardCart').bootstrapWizard({
                'nextSelector': '.button-next', 'previousSelector': '.button-previous',
                onTabShow: function(tab, navigation, index) {
//                        var $total = navigation.find('li').length;
//                        var $current = index+1;
//                        var $percent = ($current/$total) * 100;
//                        $('#rootwizardCart').find('.bar').css({width:$percent+'%'});
//			if(index === 1) {
//				// Make sure we entered the name
//                                if(Auth.user.role.title === "public") {
//                                    $location.path('/login');
//                                    console.log(Auth.user);
//                                    //return false;
//				}
//			}
                }
                ,onTabClick: function(tab, navigation, index) {
                    return false;
                }
                ,onNext: function(tab, navigation, index) {
//                    alert(targetitem.result);
//			// Set the name for the next tab
//			$('#tab3').html('Hello, ' + $('#name').val());
			
		}
        });
    };
    
    app.register.controller('CarroController', ['$scope', '$rootScope', '$timeout', '$stateParams', '$filter', '$http', '$location', 'Auth', 'userService', 'dataService', carroController]);
    
});
