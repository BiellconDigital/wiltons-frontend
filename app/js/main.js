var VarsApp = {
    baseUrl : '/wiltons-frontend/app',
    autor : "Biellcon Digital"
};

require.config({
    baseUrl: VarsApp.baseUrl,
    urlArgs: 'v=1.0'
});

require(
    [
        'app',
        'js/shoppingCart',
        'js/routingConfig',
        'services/routeResolver',
        'services/authService',
        'services/dataService',
        'services/userService',
        'directives/accessLevel',
        'directives/fbLike',
        'directives/fallbackSrc',
        'filters/parserDate',
        'controllers/InitController'
    ],
    function () {
        angular.bootstrap(document, ['myApp']);
    });