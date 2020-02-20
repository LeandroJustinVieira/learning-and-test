angular.module("jogo").service("GameEntitiesService", function (config, GameDatabaseService, CanvasGameService) {

    var points = new Array();
    var spaces = new Array();
    var squares = new Array();

    this.initEntities = function () {

        var firstX = firstPointX();
        var firstY = firstPointY();

        generatorEntities(firstX, firstY);
        startEntities();

    }

    firstPointX = function () {
        var x = (((config.tamPoint * config.pointColumn) + (config.column * config.tamSpace)) - config.canvasWidth);
        if(x > 0 ) {
            console.log("O tamanho da canvas não é suficiente para o tamanho dos pontos e espaço, alterar na configuração");
            return "erro";
        } else {
            return ((x * -1) + config.tamSpace) / 2;
        }
    }

    firstPointY = function () {

        var y = (((config.tamPoint * config.pointRow) + (config.row * config.tamSpace)) - config.canvasHeight);
        if(y > 0 ) {
            console.log("O tamanho da canvas não é suficiente para o tamanho dos pontos e espaço, alterar na configuração");
            return "erro";
        } else {
            return ((y * -1) + config.tamSpace) / 2;
        }
    }

    generatorEntities = function (firstX, firstY) {

        // point  = {x: null, y: null};
        // space  = {x: null, y: null, xEnd: null, yEnd : null, direction: [up, down], marked: false};
        // square = {id: null, idSpaceLeft: null, idSpaceRight: null, idSpaceUp: null, idSpaceDown: null, fill: false, fillBy: null }

        var xPoint = firstX;
        var yPoint = firstY;

        var xSpace = xPoint + config.tamPoint;
        var ySpace = yPoint;
        var spaceId = 0;

        var squareId = 0;
        var lastRowSquare = null;

        for( var i = 0; i < config.row; i++){

            for( var j = 0; j < config.column; j++) {

                points.push({x: xPoint, y: yPoint});

                if(j + 1 < config.column) {
                    spaceId ++;
                    spaces.push({id : spaceId, x: xSpace, y: ySpace ,direction: "down", marked: false});
                }
                if(i + 1 < config.row) {
                    spaceId ++;
                    spaces.push({id : spaceId, x: xSpace - config.tamPoint, y: ySpace + config.tamPoint, direction: "up", marked: false});

                    if(j + 1 < config.column) {
                        squareId ++;
                        var idSpaceRigth = spaceId + 2;

                        if (config.column - 2 == j) {
                            idSpaceRigth = spaceId + 1;
                        }

                        var idSpaceDown = ((spaceId - 1) + (config.column * 2)) -1;
                        if (j == 0 && i == 0) {
                            idSpaceDown = (i + 1) * (config.column * 2);
                        }

                        if (i + 2 == config.row) {
                            if (lastRowSquare == null) {
                                lastRowSquare = ((config.column - 1) * 2) + spaceId;
                                idSpaceDown = lastRowSquare;
                            } else {
                                lastRowSquare ++;
                                idSpaceDown = lastRowSquare;
                            }
                        }
                        squares.push({id: squareId, idSpaceLeft: spaceId, idSpaceRight: idSpaceRigth, idSpaceUp: spaceId - 1, idSpaceDown: idSpaceDown, fill: false, fillBy: null});
                    }

                }

                xPoint = xPoint + config.tamPoint + config.tamSpace;
                xSpace = xPoint + config.tamPoint;


            }
            xPoint = firstX;
            yPoint = yPoint + config.tamPoint + config.tamSpace;;

            xSpace = xPoint + config.tamPoint;
            ySpace = yPoint


        }
    }

    startEntities = function () {

        GameDatabaseService.removeAllPoints().success( function (data) {
            GameDatabaseService.removeAllSpaces().success( function (data) {
                GameDatabaseService.removeAllSquares().success( function (data) {

                    GameDatabaseService.savePoint(points).success(function (data) {
                        GameDatabaseService.saveSpace(spaces).success( function (data) {
                            GameDatabaseService.saveSquare(squares).success(function(data) {
                                CanvasGameService.initDrawEntities();
                                CanvasGameService.startListenCanvas();
                            });
                        });
                    });

                });
            });
        });

    }


});