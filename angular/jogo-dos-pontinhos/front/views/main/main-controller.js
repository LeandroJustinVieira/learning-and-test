angular.module("jogo").controller("mainController", function ($scope, $interval, config, GameService, GameEntitiesService) {


    var updatePlayers;
    var inGame;


    $scope.final = "";

    $scope.player1 = GameService.getPlayer1();
    $scope.player2 = GameService.getPlayer2();

    $scope.canvas  = {width: config.canvasWidth, height: config.canvasHeight}

    $scope.versusAnotherPlayer = function () {
        GameService.setPlayer2({name: "Player 2", score: $scope.player2.score, plays: $scope.player2.plays, icon: "face", turn : $scope.player2.turn });
    }

    $scope.versusMachine = function () {
        GameService.setPlayer2({name: "CPU", score: $scope.player2.score, plays: $scope.player2.plays, icon: "adb", turn : $scope.player2.turn });
    }

    $scope.restart = function () {
        $scope.player1.score = 0;
        $scope.player2.score = 0;

    }

    var updatePlayer = function() {

        if ( angular.isDefined(updatePlayers) ) return;

        updatePlayers = $interval(function() {
            $scope.player1 = GameService.getPlayer1();
            $scope.player2 = GameService.getPlayer2();
            inGame  = GameService.getInGame();
            if(!inGame) {
                var winner = ($scope.player1 < $scope.player2)? $scope.player2.name : $scope.player1.name;

                console.log("player 1:" + $scope.player1.score);
                console.log("player 2:" + $scope.player2.score);
                $scope.final = "FIM DE JOGO O VENCEDOR FOI " + winner;
            }
        }, 1000);
    };

    updatePlayer();

    GameEntitiesService.initEntities();



});