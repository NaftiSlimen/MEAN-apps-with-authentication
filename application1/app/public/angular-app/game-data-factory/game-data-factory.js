angular.module("meanGames").factory("GameDataFactory", GameDataFactory);
function GameDataFactory($http) {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        postGame:postGame,
        deleteGame:deleteGame,
        patchGame:patchGame
    };
    function getAllGames() {
        return $http.get("/api/games")
            .then(complete)
            .catch(failed);
    }
    function getOneGame(id) {
        return $http.get("/api/games/" + id)
            .then(complete)
            .catch(failed);
    }
    function postGame(game) {
        return $http.post("/api/games/", game)
            .then(complete)
            .catch(failed);
    }
    function patchGame(game,gameID) {
        return $http.patch("/api/games/"+gameID, game)
            .then(complete)
            .catch(failed);
    }
    function complete(response) {
        console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
    function deleteGame(gameID) {
        return $http.delete("/api/games/"+gameID)
            .then(complete)
            .catch(failed);
    }
    
}