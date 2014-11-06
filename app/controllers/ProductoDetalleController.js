'use strict';

define(['app'], function (app) {

    var productoDetalleController = function ($scope, $rootScope, $timeout, $window, $sce, $stateParams, $filter, $http, $location, dataService) {
        var appTitle = 'Detalle Producto';
        $scope.appTitle = appTitle;
        $scope.pageUrl = $window.location.href;
//        $scope.precio = 0;
        $scope.isNumber = angular.isNumber;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }

        $scope.categoriaSelec = null;
        $scope.cateID;
        $scope.nombreProdOrig = "";
        $scope.cart = dataService.cart;
        $scope.productos = {};
         $scope.likeURL = $sce.trustAsResourceUrl('http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.delibouquet.pe%2Fcart%2Findex.html%23%2Fdetalle-producto%2F' + $stateParams.prodId + '&width&layout=standard&action=like&show_faces=false&share=false&height=80');
        
        $('.carousel').carousel();
        $scope.carouselPrev = function () {
            $('.carousel').carousel('prev');
        }
        $scope.carouselNext = function () {
            $('.carousel').carousel('next');
        }
        
        var load = function() {
//            console.log('call load()...');
            $http.get($rootScope.appUrl + '/producto', {params: { operacion : 'getById', idprod: $stateParams.prodId }})
                    .success(function(data, status, headers, config) {
                        $scope.producto = data.data;
                        angular.copy($scope.producto, $scope.copy);
                        $scope.nombreProdOrig = $scope.producto.nombre_producto;
                        if ($scope.producto.precio1 > 0 
                                && $scope.producto.precio2 > 0)
                            $scope.producto.precio = 0.0;
                        
                        $http.get($rootScope.appUrl + '/producto', {params: { operacion : 'get_galeria', idprod: $stateParams.prodId }})
                                .success(function(data, status, headers, config) {
                                    $scope.productoGaleria = data.data;
                                    angular.copy($scope.productoGaleria, $scope.copy);
                                });
                        
                        $http.get($rootScope.appUrl + '/producto-variante', {params: { operacion : 'lista', idproducto: $stateParams.prodId }})
                                .success(function(data, status, headers, config) {
                                    $scope.productoVariantes = data.data;
                                    angular.copy($scope.productoVariantes, $scope.copy);
                                });
                        
                        if (!$rootScope.categorias_producto) {
                            $http.get($rootScope.appUrl + '/producto-categoria')
                                    .success(function(data, status, headers, config) {
                                        $rootScope.categorias_producto = data.data;
                                        angular.copy($rootScope.categorias_producto, $scope.copy);

                                        $scope.categoriaSelec = $filter('filter')($rootScope.categorias_producto, {idcontcate: $scope.producto.idcontcate})[0];
                                        loadProductos($scope.categoriaSelec);
                                    });
                        } else {
                            $scope.categoriaSelec = $filter('filter')($rootScope.categorias_producto, {idcontcate: $scope.producto.idcontcate})[0];                
                            loadProductos($scope.categoriaSelec);
                        };
                        
                    });

        }

        load();

        $scope.loadCategoria = function(cateID) {
            $location.path( "/productos/:" + cateID );
        }

        $scope.showCart = function() {
            $location.path( "/carro-de-compra");
        }
        
        $scope.isActiveCate = function (cate) {
            return $scope.categoriaSelec === cate;
        }

        $scope.isActiveProd = function (prod) {
            return $scope.producto.idproducto === prod;
        }

        $scope.deliberatelyTrustDangerousSnippet = function(html) {
            return $sce.trustAsHtml(html);
        };        

        var loadProductos = function(cate) {
            $http.get($rootScope.appUrl + '/producto', {params: {operacion : 'lista', idcontcate: cate.idcontcate }})
                    .success(function(data, status, headers, config) {
                        $scope.productos = data.data;
                        angular.copy($scope.productos, $scope.copy);
                    });
        }

        
        $scope.changePrecio = function(precio) {
//            alert(precio);
            $scope.producto.precio = angular.copy(precio);
        }
        
            $('#navProducto a').click(function (e) {
              e.preventDefault()
              $(this).tab('show');
            })

        $scope.agregarProducto = function(idproducto, nombre_producto, imagen, precio, cantidad, nameUnidadMedidaVenta) {
            var codigo = null
            if ($scope.selectedPV != null)
                codigo = $scope.selectedPV.codigo;
            console.log(codigo);
            result = $scope.cart.addItem(idproducto, nombre_producto, imagen, precio, cantidad, codigo, nameUnidadMedidaVenta);

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

        $scope.changeNombre = function(variante) {
//            alert(precio);
            $scope.producto.nombre_producto = $scope.nombreProdOrig + ' - ' + variante;
        }

    };

    app.register.controller('ProductoDetalleController', ['$scope', '$rootScope', '$timeout', '$window', '$sce', '$stateParams', '$filter', '$http', '$location', 'dataService', productoDetalleController]);
    
});