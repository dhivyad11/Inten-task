var app = angular.module('countryApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "main.html",
      controller: "MainController"
    })
    .when("/country/:name", {
      templateUrl: "details.html",
      controller: "DetailsController"
    })
    .otherwise({ redirectTo: "/" });
});

app.controller('MainController', function($scope, $http, $location) {
  // Fetch JSON data
  $http.get('data.json').then(function(response) {
    $scope.countries = response.data;
  });

  // Define regions for the dropdown filter
  $scope.regions = ["Asia", "Africa", "America", "Europe", "Oceania"];

  // Navigate to country details page
  $scope.viewCountry = function(countryName) {
    $location.path("/country/" + countryName);
  };

  // Initialize search filters
  $scope.search = {
    name: '',
    region: ''
  };
});

app.controller('DetailsController', function($scope, $routeParams, $http) {
  var countryName = $routeParams.name;

  // Fetch JSON data and find the selected country
  $http.get('data.json').then(function(response) {
    $scope.country = response.data.find(country => country.name === countryName);
  });
});
