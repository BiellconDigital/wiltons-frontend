'use strict';

define(['app'], function (app) {

    var fbLike = function () {
        return {
            restrict:'E',
            template: '<div class="fb-like" data-href="{{page}}" data-colorscheme="light" data-layout="box_count" data-action="like" data-show-faces="true" data-send="false"></div>'
        };

    };

    app.directive('fbLike', fbLike);

});