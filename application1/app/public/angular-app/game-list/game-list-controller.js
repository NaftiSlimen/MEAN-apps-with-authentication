angular.module("meanGames").controller("GamesController", GamesController);
function GamesController(GameDataFactory,$window,$route)  {
    const vm= this;
    vm.isSubmitted= false;
    vm.title=  "Mean  Games  App";
    GameDataFactory.getAllGames().then(function(response) {
        vm.games=  response;
    });
    vm.addGame= function() {
        console.log("----------------");
        const postData= {
        title: vm.newGameTitle,
        price: vm.newGamePrice,
        rate:  vm.newGameRating,
        year:  vm.newGameYear,
        rating:  vm.newGameRating,
        minPlayers:  vm.newGameMinPlayers,
        maxPlayers:  vm.newGameMaxPlayers,
        minAge: vm.newGameMinAge,
        designers: vm.newGameDesigner,};
        if  (vm.gameForm.$valid)  {
            GameDataFactory.postGame(postData)
                .then(function(response){
                    console.log("Game  saved");
                    $window.alert("Game added successfully!");
                    $route.reload();
                    })
                    .catch(function(error)  {
                        console.log(error);
                    });
        }else{
                    vm.isSubmitted= true;
        }
    }
    
}
