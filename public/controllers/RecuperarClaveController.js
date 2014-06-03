'use strict';

define(['app'], function (app) {

    var recuperarClaveController = function ($scope, $rootScope, $timeout, $http, $location, Auth) {
        var appTitle = 'recuperarClave';
        $scope.user = {};

        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
        
        $scope.recuperarClave = function() {
            Auth.retrieveKey($scope.user.email,
                function(resp) {
                    try {
                        alert(resp.msg);
                        $location.path("/");
                    } catch (e) {
                    }
                }
                , function(err) {
                    $rootScope.error = err.msg;
                    $timeout(function() {
                        $rootScope.error = null;
                    }, 4000);
                }
             );
        }
        
        
        $("#contenido").backstretch("./img/registro_fondo.jpg");
        var $window = $(window).on('resize', function() {
            //alert($(window).width())
            if ($(window).width() <= 767) {
                $('#contenido').height(
                    ($(window).height() - $('#header').height() - $('#footer').height() - 20) / 3 - 25
                );    
            } else {
                $('#contenido').height(
                    $(window).height() - $('#header').height() - $('#footer').height() - 60
                );    
            }
            $("#contenido").backstretch("./img/registro_fondo.jpg");
        }).trigger('resize'); //on page load      
        
    };

    app.register.controller('RecuperarClaveController', ['$scope', '$rootScope', '$timeout', '$http', '$location', 'Auth', recuperarClaveController]);
    
});