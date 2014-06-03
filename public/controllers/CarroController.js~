'use strict';

define(['app'], function (app) {

    var carroController = function ($scope, $rootScope, $timeout, $stateParams, $filter, $http, $location, Auth, userService, dataService) {
        $scope.cart = dataService.cart;
        $scope.cartUser = userService.cartUser;
        $scope.user = Auth.user;
        $scope.disitritos = null;
        $scope.orden = {};
        $scope.razonesCompra = null;
        $scope.orden.costoEnvio = 15.00;
        $scope.orden.subTotal = dataService.cart.getTotalPrice();
        $scope.orden.cuentaBanco = "Cta. Cte. No. 193 - 2100552 - 0 - 96";
        $scope.horaDespacho = userService.cartUser.listHoraDespacho();
        $scope.procesando = false;
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
        }
        load();
        
        $scope.procesarCompra = function(tipoPago) {
            $scope.procesando = true;
            $scope.cartUser.procesarCompra($scope.orden, $scope.cart.items,
                function(resp) {
                    localStorage['ultCompraId'] =  resp.idOrden;
                    localStorage['ultCompraTipo'] = tipoPago;
/*                    $rootScope.idUltimaOrden = resp.idOrden;
                    $rootScope.tipoPago = tipoPago;
*/                    
                    if (tipoPago === 3) {
                        console.log("invocar visa...");
                        $scope.orden.idOrden = resp.idOrden;
                        $scope.cartUser.obtenerEticketVisa($scope.orden, $scope.user,
                            function(resp) {
                                if (resp.success) {
                                    dataVisa.eticket = resp.Eticket;
                                    dataVisa.url_visa = resp.urlVisa;
                                    
                                    $scope.cart.addCheckoutParameters("Visa", "", dataVisa);
                                    $scope.cart.checkout('Visa');
  //                                    var targetitem = 1;// $scope.retornoPago;
//                                    var dataitem = window.open("PagoVisa.html", "dataitem", "toolbar=no,menubar=no,scrollbars=yes"); 
//                                    dataitem.dataVisa = dataVisa;
//                                    dataitem.onbeforeunload = function(){  console.log(dataVisa.result);}
                                    $scope.procesando= false;
                              } else {
                                    $rootScope.error = resp.msg;
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