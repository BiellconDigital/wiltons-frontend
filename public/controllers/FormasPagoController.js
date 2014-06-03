
'use strict';

define(['app'], function (app) {

    var formasPagoController = function ($scope, $location) {
        var appTitle = 'Formas de Pago';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        };
			$("#banner_formaspago").backstretch("./img/registro_fondo.jpg");
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
				$("#banner_formaspago").backstretch("./img/registro_fondo.jpg");
			}).trigger('resize'); //on page load      
        
    };

    app.register.controller('FormasPagoController', ['$scope', '$location', formasPagoController]);
    
});