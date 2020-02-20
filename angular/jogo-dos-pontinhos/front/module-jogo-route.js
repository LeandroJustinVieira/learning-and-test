angular.module("jogo").config(function ($routeProvider) {

    //index
    $routeProvider.when("/", {
        templateUrl: "views/main/main.html",
        controller: "mainController"
    });
    $routeProvider.otherwise({ redirectTo: "/"})

});