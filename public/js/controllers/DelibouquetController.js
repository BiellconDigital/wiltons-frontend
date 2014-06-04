'use strict';

define(['app'], function (app) {

    var delibouquetController = function ($scope, $rootScope, $stateParams, $filter, $http, $location) {
        var appTitle = 'Delibouquet';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        };

			$("#banner_deli").backstretch("./img/banner-about.jpg");
		    var $window = $(window).on('resize', function() {
				//alert($(window).width())
		    	if ($(window).width() <= 767) {
					$('#contenido').height(
						($(window).height() - $('#header').height() - $('#footer').height() - 20) / 2
					);    
		    	} else {
					$('#contenido').height(
						$(window).height() - $('#header').height() - $('#footer').height() - 180
					);    
	    		}
				$("#banner_deli").backstretch("./img/banner-about.jpg");
			}).trigger('resize'); //on page load     
        
        //$('#modalLoading').modal('hide');

    };

    app.register.controller('DelibouquetController', ['$scope', '$rootScope', '$stateParams', '$filter', '$http', '$location', delibouquetController]);
    
});
