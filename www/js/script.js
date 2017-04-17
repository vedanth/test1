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
    console.log('CHOOSE ENCV');
});

cloudHubApp.controller('apiRuntime', function($scope, $location) {
    console.log('API RUNTIME');
    $scope.chooseEnv = function(){
        $location.url('/business-group');
    }
});

cloudHubApp.controller('runtimeApp', function($scope) {
    console.log('API RUNTIME APP..');
});

cloudHubApp.controller('businessGroups', function($scope) {
    console.log('BUSINESS GROUPS..');
});

cloudHubApp.controller('APIManager', function($scope) {
    console.log('APIManager..');
});

cloudHubApp.controller('APIDetails', function($scope) {
    console.log('APIDetails..');
});