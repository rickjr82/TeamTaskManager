require.config({
    paths: {
        angular: '/Scripts/angular',
        underscore: '/Scripts/underscore.min',
        toastr: '/Scripts/toastr',
        breeze: '/Scripts/breeze.min',
        uibootstrap: '/Scripts/ui-bootstrap-tpls-0.6.0.min',
        smarttable: 'lib/Smart-Table.min',
        jquery: '/Scripts/jquery-1.9.1.min'
    },
    baseUrl: '/app/js',
    shim: {
        'angular': { exports: 'angular', deps:['jquery']},
        'underscore': { exports: '_' },
        'uibootstrap': { deps: ['angular'] },
        'smarttable': { deps: ['angular'] },        
        'jquery': {exports: '$'}
    }
});

require(['jquery','angular', 'app', 'toastr', 'breeze', 'controllers/controllers', 'services/services', 'underscore', 'uibootstrap', 'smarttable', 'controllers/adminController'], function ($, angular, app, toastr, breeze) {
    'use strict';
    app.value('toastr', toastr);
    app.value('breeze', breeze);
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
        $html.addClass('ng-app');
        angular.bootstrap($html, [app['name'], 'ui.bootstrap','smartTable.table']);
    });
});