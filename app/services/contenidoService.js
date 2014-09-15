'use strict';

define(['app'], function (app) {

    var contenidoService = function ($http, $rootScope, $q, $timeout) {
        var cateContenidoFactory = {};
        cateContenidoFactory.listaContenidos = function(idcate, idtipo, success) {
            $http.get($rootScope.appUrl + '/contenido', {params: {operacion: 'lista', idcontcate: idcate, idtipo: idtipo}}).success(function(data) {
                if (data.success == 0) {
                    $rootScope.error = data.msg;
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 5000);
                }
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en la consulta.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                });
        };

        cateContenidoFactory.getById = function(idcont, success) {
            $http.get($rootScope.appUrl + '/contenido', {params: {operacion: 'getById', idcont: idcont}}).success(function(data) {
                if (data.success == 0) {
                    $rootScope.error = data.msg;
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 5000);
                }
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en la consulta.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                });
        };
        
        cateContenidoFactory.getGaleriaById = function(idcont, tipo, success) {
            $http.get($rootScope.appUrl + '/contenido', {params: {operacion: 'getGaleriaById', idcont: idcont, idtipo: tipo}}).success(function(data) {
                if (data.success == 0) {
                    $rootScope.error = data.msg;
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 5000);
                }
                success(data);
            }).error(function(err) {
                    $rootScope.error = "Error en la consulta.";
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                });
        };
        
        
        return cateContenidoFactory;
        
    };

    app.factory('contenidoService', ['$http', '$rootScope', '$q', '$timeout', contenidoService]);

});