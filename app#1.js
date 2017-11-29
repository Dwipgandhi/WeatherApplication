// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
});

//SERVICES
weatherApp.service ("mycityService",function () {
   this.city = "New York, NY";
});

// CONTROLLERS
weatherApp.controller('homeController', function($scope , mycityService) {

    $scope.city = mycityService.city;

    $scope.$watch("city",function () {
        mycityService.city = $scope.city;
    });
});

weatherApp.controller('forecastController', function($scope , mycityService , $resource ) {

    $scope.city = mycityService.city;
    $scope.weatherAPI = $resource("http://samples.openweathermap.org/data/2.5/forecast/daily",
                        { callback: "JSON CALLBACK"} , { get: { method : "JSONP"}} );
    $scope.weatherResult = $scope.weatherAPI.get( { q : $scope.city , cnt : 2});

});