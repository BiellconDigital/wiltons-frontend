var VarsApp = {
    baseUrl : '/wiltons-frontend/public/js',
    rootUrl : '/wiltons-frontend/public',
//    baseUrl : '/js',
    libUrl : '../lib',
    autor : "Biellcon Digital"
};

//
//require.config({
//
//	baseUrl: VarsApp.baseUrl,
//
//	paths: {
//		angular: VarsApp.libUrl +'/angular/angular',
//		angularRoute: VarsApp.libUrl +'/angular-route/angular-route',
//		angularMocks: VarsApp.libUrl +'/angular-mocks/angular-mocks',
//		angularSocket : VarsApp.libUrl + '/angular-socket-io/socket',
//		text: VarsApp.libUrl +'/requirejs-text/text',
//		jquery: VarsApp.libUrl +'/jquery/dist/jquery.min',
////		templateMain : '../../js/templateMain',
//		bootstrap : VarsApp.libUrl +'/bootstrap/dist/js/bootstrap.min',
////		socketio : VarsApp.libUrl +'/socket.io-client/dist/socket.io',
//		ngStorage : VarsApp.libUrl + '/ngstorage/ngStorage.min',
//		uiRouter : VarsApp.libUrl + '/angular-ui-router/release/angular-ui-router.min',
//		InitController : 'controllers/InitController',
//		angularAnimate: VarsApp.libUrl +'/angular-animate/angular-animate.min',
//		angularStrap : VarsApp.libUrl +'/angular-strap/dist/angular-strap.min',
//		angularStrapTpl : VarsApp.libUrl +'/angular-strap/dist/angular-strap.tpl.min',
////		angularWizard : VarsApp.libUrl + '/angular-wizard/dist/angular-wizard',
//		ngSanitize : VarsApp.libUrl + '/angular-sanitize/angular-sanitize',
//		ngTouch : VarsApp.libUrl + '/angular-touch/angular-touch.min',
//		lodash : VarsApp.libUrl + '/lodash/dist/lodash.min'
////		jqueryUI: VarsApp.libUrl+ '/jquery-ui/ui/jquery-ui',
////		fullCalendar : VarsApp.libUrl+ '/fullcalendar/fullcalendar.min',
////		angularAccordionTpls : VarsApp.libUrl+ '../../js/libs/ui-bootstrap-tpls.min'
//	},	
//	shim: {
//		'angular' : {'exports' : 'angular'},
//		'angularRoute': ['angular'],
//		'angularMocks': {
//			deps:['angular'],
//			'exports':'angular.mock'
//		},
////		'socketio': {
////                    exports: 'io'
////                },
//		'jquery': {'exports' : 'jquery'},	
////		'templateMain' :{ deps:['bootstrap','jquery']},
//		'bootstrap': { deps:['jquery']},
//		'angularSocket' : ['angular'],
//		'ngStorage' : { deps:['angular']},
//		'uiRouter' : { deps:['angular']},
//		'services/routeResolver' : { deps:['angular']},
//		'InitController' : ['app'],
//		'angularStrap' : ['angular'],
//		'angularStrapTpl' : ['angular','angularStrap'],
////		'angularWizard' : ['angular','lodash'],
//		'angularAnimate' : ['angular'],
//		'ngSanitize' : { deps:['angular']},
//		'ngTouch' : { deps:['angular']}
////		'jqueryUI' : ['jquery'],
////		'angularAccordionTpls'  : ['angular']
//	},
//	priority: [
//		"jquery","angular"
//	]
//});
//
////http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
//window.name = "NG_DEFER_BOOTSTRAP!";
//
//require( [
//	'angular',
//	'jquery',
////	'templateMain',
//	'lodash',
//        'services/routeResolver',
//	'uiRouter',
//	'app',
//        'conf/routing',
//
//	'angularRoute',
//	'InitController',
//	'angularAnimate',
//	'angularStrapTpl',
//    
//        'class/shoppingCart',
//        'services/authService',
//        'services/dataService',
//        'services/userService',
//        'directives/accessLevel',
//        'filters/parserDate'
////	'utils/cookieRestManager',
////	'angularWizard',
////	'jqueryUI',
////	'angularAccordionTpls'
//], function(angular,jquery, bootstrap, routeResolver,app) {
//	'use strict';
//	var $html = angular.element(document.getElementsByTagName('html')[0]);
//	angular.element().ready(function() {
//		angular.bootstrap(document, ['myApp']);
//	});
//});
//


require.config({
    baseUrl: VarsApp.baseUrl,
//    urlArgs: 'v=1.0',
    paths: {
        angular: VarsApp.libUrl +'/angular/angular',
        jquery: VarsApp.libUrl +'/jquery/dist/jquery.min',
        angularRoute: VarsApp.libUrl +'/angular-route/angular-route',
        angularMocks: VarsApp.libUrl +'/angular-mocks/angular-mocks',
        ngStorage : VarsApp.libUrl + '/ngstorage/ngStorage.min',
        uiRouter : VarsApp.libUrl + '/angular-ui-router/release/angular-ui-router.min',
        ngSanitize : VarsApp.libUrl + '/angular-sanitize/angular-sanitize',
        ngTouch : VarsApp.libUrl + '/angular-touch/angular-touch.min',
        angularAnimate: VarsApp.libUrl +'/angular-animate/angular-animate.min',
        angularStrap : VarsApp.libUrl +'/angular-strap/dist/angular-strap.min',
        angularStrapTpl : VarsApp.libUrl +'/angular-strap/dist/angular-strap.tpl.min',
        InitController : 'controllers/InitController',
        Backstretch : 'jquery.backstretch.min'
    }
    ,shim: {
            'jquery': {'exports' : 'jquery'},	
            'angular' : {'exports' : 'angular'},
            'angularRoute': ['angular'],
            'angularMocks': {
                    deps:['angular'],
                    'exports':'angular.mock'
            },
            'ngStorage' : { deps:['angular']},
            'uiRouter' : { deps:['angular']},
            'ngSanitize' : { deps:['angular']},
            'ngTouch' : { deps:['angular']},
            'angularStrap' : ['angular'],
            'angularStrapTpl' : ['angular','angularStrap'],
            'angularAnimate' : ['angular'],
            'services/routeResolver' : { deps:['angular']},
            'InitController' : ['app'],
            'Backstretch':{ deps:['jquery']}
        }
    ,priority: [
            "jquery","angular"
    ]
});

window.name = "NG_DEFER_BOOTSTRAP!";

require(
    [
        'angular',
        'jquery',
        'angularRoute',
        'angularMocks',
        'ngStorage',
        'uiRouter',
        'app',
        'conf/routing',
        'ngSanitize',
        'ngTouch',
	'angularAnimate',
	'angularStrapTpl',
        'class/shoppingCart',
        'services/authService',
        'services/dataService',
        'services/userService',
        'directives/accessLevel',
        'filters/parserDate',
//	'utils/cookieRestManager',
        'Backstretch',
        'InitController'
    ],
    function (angular, routeResolver, app) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
    });
    
