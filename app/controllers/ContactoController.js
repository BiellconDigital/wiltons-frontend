'use strict';

define(['app'], function (app) {

    var contactoController = function ($scope, $location) {
        var appTitle = 'Contacto';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }

        var $window = $(window).on('resize', function() {
            if ($(window).height() <= 540) {
                $('#map_canvas').height(
                        $(window).height() - $('#header').height() - $('#footer').height() - $('#contact').height() + 130
                );    
            } else {
                $('#map_canvas').height(
                        $(window).height() - $('#header').height() - $('#footer').height() - $('#contact').height() - 35
                );    
            }
                        
                                        
        }).trigger('resize'); //on page load      
        initialize();


function initialize() {
	var myLatlng = new google.maps.LatLng(-12.125058,-76.999407);
	var mapOptions = {
		zoom: 17,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	var contentString = '<div id="content">'+
	    '<div id="siteNotice">'+
	    '</div>'+
	   // '<h2 id="firstHeading" class="firstHeading">Maido Mitsuharu</h2>'+
	    '<div id="bodyContent">'+
		'<div class="foto_mapa"></div>' +
	    '<p class="text-marron">Av Aviacion 5161 Higuereta<br/>' +
		'	Lima, Perú <br/>' +
		'	Teléfonos: (+511) 987-972065, (+511) 448-8546 <br/>' +
		'	Email: <a href="mailto:pedidos@wiltons.pe">pedidos@wiltons.pe</a> </p>'
	   '</div>'+
	    '</div>';

	var infowindow = new google.maps.InfoWindow({
	    content: contentString
	});


//	var image = 'img/amor-amar.png';
	var myLatLng = new google.maps.LatLng(-12.125058,-76.999407);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title:"Wiltons",
		animation: google.maps.Animation.DROP
//		icon: image
	});
  
   
	google.maps.event.addListener(beachMarker, 'click', function() {
		infowindow.open(map,beachMarker);
	});

	//google.maps.event.trigger(map, 'resize');

	var styles = [
	  {
		featureType: "all",
	    stylers: [
	      { hue: "#766452" },
		  {Weight:3.5},
	      { saturation: 0 }
	    ]
	  },{
	    featureType: "road",
	    elementType: "geometry",
	    stylers: [
	      { lightness: 90 },
	      { visibility: "simplified" }
	    ]
	  },{
	    featureType: "road",
	    elementType: "labels",
	    stylers: [
	      { visibility: "on" }
	    ]
	  }
	];

	map.setOptions({styles: styles});


}
//google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'resize', initialize);

        
    };

    app.register.controller('ContactoController', ['$scope', '$location', contactoController]);
    
});