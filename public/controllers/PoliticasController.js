'use strict';

define(['app'], function (app) {

    var politicasController = function ($scope, $location) {
        var appTitle = 'Politicas';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        };

			$("#banner_politicas").backstretch("./img/registro_fondo.jpg");
			//$("#contenido").css("height", "300");
		    var $window = $(window).on('resize', function() {
				//alert($(window).width())
		    	if ($(window).width() <= 767) {
					$('#contenido').height(
						($(window).height() - $('#header').height() - $('#footer').height() - 20) / 2
					);    
		    	} else {
					$('#contenido').height(
						$(window).height() - $('#header').height() - $('#footer').height() - 150
					);    
	    		}
				$("#banner_politicas").backstretch("./img/registro_fondo.jpg");
			}).trigger('resize'); //on page load      
        
    };

    app.register.controller('PoliticasController', ['$scope', '$location', politicasController]);
    
});
