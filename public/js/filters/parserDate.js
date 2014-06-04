'use strict';

define(['app'], function (app) {
    
    var parserDate = function ($filter) {
        return function (dateString, format) {
            if (!format || !dateString) return dateString;
//            console.log(dateString);
            var fecha =  Date.parse(dateString);
            var fechaF = $filter('date')(fecha, format);
//            console.log(fechaF);
            return fechaF;
        };
    };

    app.filter('parserDate', ['$filter', parserDate]);

});