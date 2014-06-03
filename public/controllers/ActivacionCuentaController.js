'use strict';

define(['app'], function (app) {

    var activacionCuentaController = function ($scope, $rootScope, $stateParams, $timeout, $http, $location, Auth) {
        var appTitle = 'Activación';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
        $scope.mensaje_activacion = "";
        
        var load = function() {
            Auth.activation($stateParams.user, $stateParams.key, 
                function(resp) {
                    try {
                        $scope.mensaje_activacion = resp.msg;
                        //$location.path("/login");
//                        $cookieStore.put('user', Auth.user);
//                        angular.copy($scope.user, Auth.user);
                    } catch (e) {

                    }
                }
                , function(err) {
                    $rootScope.error = err.msg;
                    $timeout(function() {
                        $rootScope.error = null;
//                        console.log("time out");
                    }, 4000);
                    //$timeout.cancel(timeError);
                }
                        
             );
        }
        
        load();
    };

    app.register.controller('ActivacionCuentaController', ['$scope', '$rootScope', '$stateParams', '$timeout', '$http', '$location', 'Auth', activacionCuentaController]);
    
});