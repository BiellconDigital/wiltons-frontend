'use strict';

define(['services/routeResolver', 'ngStorage','ngSanitize', 'ngTouch'], function (route,io) {

    var app = angular.module('myApp', ['routeResolverServices','ngStorage','ui.router','ngAnimate','ngSanitize','mgcrea.ngStrap','ui.bootstrap', 'ngTouch']);
    
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', '$popoverProvider', '$asideProvider',
         function ($stateProvider, $urlRouterProvider, $locationProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider,$popoverProvider, $asideProvider) {
            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service                
            };



//    $FBProvider.setLocale('es_LA');
//    $FBProvider.setInitParams({
//        appId: '299461200206662'
//    });  
//
            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

/*
            $routeProvider
                .when('/main', route.resolve('Main'))
                .when('/contacto', route.resolve('Contacto'))
                .when('/arreglos/:cateId?', route.resolve('Productos'))
                .when('/detalle-producto/:prodId?', route.resolve('ProductoDetalle'))
                .when('/delibouquet', route.resolve('Delibouquet'))
                .when('/politicas', route.resolve('Politicas'))
                .when('/delivery', route.resolve('Delivery'))
                .when('/formas-de-pago', route.resolve('FormasPago'))
                .when('/carro-de-compra', route.resolve('Carro'))
                .when('/login', route.resolve('Login'))
                .when('/usuario', route.resolve('Usuario'))
                .otherwise({redirectTo : '/main'});
*/
            var access = routingConfig.accessLevels;

            // Public routes
            $stateProvider
                .state('public', {
                    abstract: true,
                    template: "<ui-view/>",
                    data: {
                        access: access.public
                    }
                })
                .state('public.404', {
                    url: '/404',
                    templateUrl: VarsApp.baseUrl + '/views/404.html'
                })
                .state('public.home', route.resolve('/', 'Main'))
                .state('public.carro_compra', route.resolve('/carro-de-compra', 'Carro'))
                .state('public.contacto', route.resolve('/contacto', 'Contacto'))
                .state('public.arreglos', route.resolve('/arreglos/{cateId}', 'Productos'))//[/:cateId]
                .state('public.arreglos_busqueda', route.resolve('/arreglos_busqueda/{query}', 'ProductosBusqueda'))//[/:cateId]
                .state('public.detalle_producto', route.resolve('/detalle-producto/{prodId}', 'ProductoDetalle'))
                .state('public.delibouquet', route.resolve('/delibouquet', 'Delibouquet'))
                .state('public.politicas', route.resolve('/politicas', 'Politicas'))
                .state('public.delivery', route.resolve('/delivery', 'Delivery'))
                .state('public.formas_pago', route.resolve('/formas-de-pago', 'FormasPago'));

            // Anonymous routes
            $stateProvider
                .state('anon', {
                    abstract: true,
                    template: "<ui-view/>",
                    data: {
                        access: access.anon
                    }
                })
                .state('anon.login', route.resolve('/login', 'Login'))
                .state('anon.registrarse', route.resolve('/registrarse', 'Registrarse'))
                .state('anon.recuperar_clave', route.resolve('/recuperar-clave', 'RecuperarClave'))
                .state('anon.activacion_cuenta', route.resolve('/activacion/:user/:key', 'ActivacionCuenta'));

            // Regular user routes
            $stateProvider
                .state('user', {
                    abstract: true,
                    template: "<ui-view/>",
                    data: {
                        access: access.user
                    }
                })
                .state('user.perfil', route.resolve('/usuario', 'Usuario'))
                .state('user.pedido', route.resolve('/pedido/:idpedido', 'PedidoDetalle'))
                .state('user.pedidos', route.resolve('/pedidos', 'Pedidos'))
                .state('public.confirmacion_compra', route.resolve('/confirmacion-compra', 'CarroConfirmacion'));
//                .state('user.perfil', {
//                    url: '/usuario',
//                    templateUrl: VarsApp.baseUrl + '/views/Usuario.html'
//                });
//                .state('user.private.nested', {
//                    url: 'nested/',
//                    templateUrl: 'private/nested'
//                })
//                .state('user.private.admin', {
//                    url: 'admin/',
//                    templateUrl: 'private/nestedAdmin',
//                    data: {
//                        access: access.admin
//                    }
//                });

            // // Admin routes
            // $stateProvider
                // .state('admin', {
                    // abstract: true,
                    // template: "<data-ui-view/>",
                    // data: {
                        // access: access.admin
                    // }
                // })
                // .state('admin.admin', {
                    // url: '/admin/',
                    // templateUrl: 'admin',
                    // controller: 'AdminCtrl'
                // });


            $urlRouterProvider.otherwise('/404');



            $urlRouterProvider.rule(function($injector, $location) {
                if($location.protocol() === 'file')
                    return;

                var path = $location.path()
                // Note: misnomer. This returns a query object, not a search string
                    , search = $location.search()
                    , params
                    ;

                // check to see if the path already ends in '/'
                if (path[path.length - 1] === '/') {
                    return;
                }

                // If there was no search string / query params, return with a `/`
                if (Object.keys(search).length === 0) {
                    return path + '/';
                }

                // Otherwise build the search string and return a `/?` prefix
                params = [];
                angular.forEach(search, function(v, k){
                    params.push(k + '=' + v);
                });
                return path + '/?' + params.join('&');
            });

            //$locationProvider.html5Mode(true);

            $httpProvider.interceptors.push(function($q, $location) {
                return {
//                    'request': function (config) {
//                        console.log("HACIENDO REQUEST");
//                        console.log(config);
//                         return config || $q.when(config);
//                     },
//                    'response': function(response) {
//                        console.log("HACIENDO RESPONSE");
//                        console.log(response);
//                        return response || $q.when(response);
//                    },
                    'responseError': function(response) {
                        if(response.status === 401 || response.status === 403) {
                            $location.path('/login');
                            return $q.reject(response);
                        }
                        else {
                            return $q.reject(response);
                        }
                    }
                }
            });


    }]);

    //Only needed for Breeze. Maps Q (used by default in Breeze) to Angular's $q to avoid having to call scope.$apply() 
    app.run(['$q', '$rootScope', '$timeout', '$state', 'Auth',
        function ($q, $rootScope, $timeout, $state, Auth) {
            //$rootScope.$apply();
            //breeze.core.extendQ($rootScope, $q);

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                if (!Auth.authorize(toState.data.access)) {
                    console.log("no auth...");
//                    console.log(toState.data.access);
                    
                    $rootScope.error = "No tienes los permisos suficientes para esta opción.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                    event.preventDefault();
                    
                    //if(fromState.url === '^') {
                        if(Auth.isLoggedIn()) {
                            console.log("ir a home...");
                            $state.go('user.perfil');
                        }
                        else {
                            console.log("ir a login...");
                            //$rootScope.error = null;
                            $state.go('anon.login');
                        }
                    //}
                }
            });

    }]);

    return app;

});




