var a = angular.module("meanGames", ["ngRoute"]).config(config);
console.log("hi");

function config($routeProvider, $locationProvider) {
    console.log("hiiii");
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html"
    })
        .when("/game", {
            templateUrl: "angular-app/game-list/games.html",
            controller: "GamesController",
            controllerAs: "vm"
        }).when("/game/:id", {
            templateUrl: "angular-app/game-display/game.html",
            controller: "GameDisplayController",
            controllerAs: "GameDisplayController"
        })
        .when("/register", {
            templateUrl: "angular-app/register/register.html ",
            controller: "registerController",
            controllerAs: "vm"
        })
        .otherwise({ redirectTo: "/" });
};



