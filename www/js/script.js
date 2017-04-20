var cloudHubApp = angular.module('cloudHubApp', []);

cloudHubApp.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'pages/choose-env.html',
            controller  : 'chooseEnv'
        })

        .when('/runtime', {
            templateUrl : 'pages/api-runtime.html',
            controller  : 'apiRuntime'
        })

        .when('/runtime-app', {
            templateUrl : 'pages/runtime-app-details.html',
            controller  : 'runtimeApp'
        })

        .when('/api-manager', {
            templateUrl : 'pages/api-manager.html',
            controller  : 'APIManager'
        })

        .when('/api-details', {
            templateUrl : 'pages/api-details.html',
            controller  : 'APIDetails'
        })

        .when('/business-group', {
            templateUrl : 'pages/business-group.html',
            controller  : 'businessGroups'
        })

        .otherwise({
            redirectTo: '/'
        });
});

// create the controller and inject Angular's $scope
cloudHubApp.controller('chooseEnv', function($scope, $location) {

});

cloudHubApp.controller('apiRuntime', function($scope, $location) {
    $scope.chooseEnv = function(){
        $location.url('/');
    }
});

cloudHubApp.controller('runtimeApp', function($scope) {

});

cloudHubApp.controller('businessGroups', function($scope) {

});

cloudHubApp.controller('APIManager', function($scope) {

});

cloudHubApp.controller('APIDetails', function($scope) {

});