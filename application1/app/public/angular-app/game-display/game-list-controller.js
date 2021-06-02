angular.module("meanGames").controller("GameDisplayController", GameDisplayController);


function GameDisplayController(GameDataFactory, $routeParams,$window,$route) {
    const vm = this; 
    const id = $routeParams.id;
    GameDataFactory.getOneGame(id).then(function (response) {
        vm.game = response
    });
    vm.deleteGameController=function(gameID){
        return GameDataFactory.deleteGame(gameID)
        .then(function(response){
            console.log("Game  deleted");
            $window.alert("Game deleted successfully!");
            $route.reload();
            $window.location.href ="http://localhost:5000/#/game/";
            })
            .catch(function(error)  {
                console.log(error);
            });

    }
    vm.updateGame= function(gameID) {
        console.log("trying to edit");
        console.log(vm.updategameForm.$valid);
        const postData= {
        price: vm.newGamePrice,
        minPlayers:  vm.newGameMinPlayers,
        maxPlayers:  vm.newGameMaxPlayers,
        minAge: vm.newGameMinAge,
        publisher: {name:vm.newGameDesigner}};
        console.log("+++++++++++++++++++");
        console.log(postData.price);
        console.log(postData.minPlayers);
        console.log(postData.maxPlayers);
        console.log(postData.minAge);
        console.log(postData.publisher);
        if  (true)  {
            GameDataFactory.patchGame(postData,gameID)
                .then(function(response){
                    console.log("Game  edited");
                    $window.alert("Game edited successfully!");
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