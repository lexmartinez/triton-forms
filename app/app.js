
(function () {
    'use strict';

    var _templateBase = './app';

    angular.module('triton-forms', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/views/triton.html' ,
                controller: 'tritonController',
                controllerAs: '_ctrl'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);

})();
