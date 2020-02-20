angular.module("jogo").service("GameService", function ($interval,config,GameDatabaseService,CanvasService) {


    var inGame  = true;
    var player1 = {name: "Player 1", score: 0, plays: "", icon : "face", turn: false};
    var player2 = {name: "Player 2", score: 0, plays: "", icon: "face", turn : true };
    var ctrl = this;
    var playCPUInterval;





    var playCPU = function() {

        if ( angular.isDefined(playCPUInterval)) return;

        playCPUInterval = $interval(function() {

            if(player2.name == "CPU" && !player2.turn) {

                var option = [];
                var data;
                var idPropagation;
                var numberPropagation = 1000;

                GameDatabaseService.distinctSquareMarked().success(function (result) {

                    if (result.treeMarked.length > 0) {
                        if (!result.treeMarked[0].spaceLeft) {
                            GameDatabaseService.getSpace(result.treeMarked[0].idSpaceLeft).success(function (space) {
                                ctrl.logicalGame(space);
                            });
                        }
                        if (!result.treeMarked[0].spaceRight) {

                            console.log("aqui");
                            GameDatabaseService.getSpace(result.treeMarked[0].idSpaceRight).success(function (space) {
                                ctrl.logicalGame(space);
                            });
                        }
                        if (!result.treeMarked[0].spaceUp) {
                            GameDatabaseService.getSpace(result.treeMarked[0].idSpaceUp).success(function (space) {
                                ctrl.logicalGame(space);
                            });
                        }
                        if (!result.treeMarked[0].spaceDown) {
                            GameDatabaseService.getSpace(result.treeMarked[0].idSpaceDown).success(function (space) {
                                ctrl.logicalGame(space);
                            });
                        }
                    }
                    else if (result.notMarked.length > 0 ) {

                        result.notMarked.forEach( function (element) {

                            data = GameDatabaseService.spaceCanMarked(element.idSpaceLeft).success( function (data) {
                                return data;
                            });
                            if(data) {
                                option.push(element.idSpaceLeft)
                            }

                            data = GameDatabaseService.spaceCanMarked(element.idSpaceRight).success( function (data) {
                                return data
                            });

                            if(data) {
                                option.push(element.idSpaceRight)
                            }

                            data = GameDatabaseService.spaceCanMarked(element.idSpaceDown).success( function (data) {
                                return data;
                            });

                            if(data) {
                                option.push(element.idSpaceDown)
                            }

                            data = GameDatabaseService.spaceCanMarked(element.idSpaceUp).success( function (data) {
                                return data;
                            });
                            if(data) {
                                option.push(element.idSpaceUp)
                            }
                        });

                        var numberRamdom = Math.floor((Math.random() * option.length));
                        GameDatabaseService.getSpace(option[numberRamdom]).success(function (space) {
                            ctrl.logicalGame(space);
                        });

                    }
                    else if (result.oneMarked.length > 0) {

                        result.oneMarked.forEach( function (element) {

                            data = GameDatabaseService.spaceCanMarked(element.idSpaceLeft).success( function (data) {
                                return data;
                            });
                            if(data) {
                                option.push(element.idSpaceLeft)
                            }

                            data = GameDatabaseService.spaceCanMarked(element.idSpaceRight).success( function (data) {
                                return data
                            });

                            if(data) {
                                option.push(element.idSpaceRight)
                            }

                            data = GameDatabaseService.spaceCanMarked(element.idSpaceDown).success( function (data) {
                                return data;
                            });

                            if(data) {
                                option.push(element.idSpaceDown)
                            }

                            data = GameDatabaseService.spaceCanMarked(element.idSpaceUp).success( function (data) {
                                return data;
                            });
                            if(data) {
                                option.push(element.idSpaceUp)
                            }
                        });

                        var numberRamdom = Math.floor((Math.random() * option.length));

                        GameDatabaseService.getSpace(option[numberRamdom]).success(function (space) {
                            ctrl.logicalGame(space);
                        });
                    }
                    else if (result.twoMarked.length > 0) {

                        console.log("momento da verdade");

                        // result.twoMarked.forEach( function (element) {
                        //
                        //     data = GameDatabaseService.markedPropagation(element.idSpaceLeft).success(function (data) {
                        //         return data;
                        //     });
                        //     console.log(data);
                        //     if (data < numberPropagation) {
                        //         numberPropagation = data;
                        //         idPropagation = element.idSpaceLeft;
                        //     }
                        //
                        //     data = GameDatabaseService.markedPropagation(element.idSpaceRight).success(function (data) {
                        //         return data;
                        //     });
                        //     console.log(data);
                        //     if (data < numberPropagation) {
                        //         numberPropagation = data;
                        //         idPropagation = element.idSpaceRight;
                        //     }
                        //
                        //     data = GameDatabaseService.markedPropagation(element.idSpaceDown).success(function (data) {
                        //         return data;
                        //     });
                        //     console.log(data);
                        //     if (data < numberPropagation) {
                        //         numberPropagation = data;
                        //         idPropagation = element.idSpaceDown;
                        //     }
                        //
                        //     data = GameDatabaseService.markedPropagation(element.idSpaceUp).success(function (data) {
                        //         return data;
                        //     });
                        //     console.log(data);
                        //     if (data < numberPropagation) {
                        //         numberPropagation = data;
                        //         idPropagation = element.idSpaceUp;
                        //     }
                        //
                        // });

                        // if (numberPropagation == 1000) {
                            console.log("Não deu certo peguei um numero aleatorio que tinha");
                            GameDatabaseService.getSpaces().success( function(data) {
                                data[0].forEach(function(element) {
                                    if(element.marked == false) {
                                        idPropagation = element.id;

                                    }

                                });
                                console.log(idPropagation);
                                GameDatabaseService.getSpace(idPropagation).success(function (space) {
                                    ctrl.logicalGame(space);
                                });
                            });
                            // console.log(idPropagation);
                        // }



                        //
                        // GameDatabaseService.getSpace(idPropagation).success(function (space) {
                        //     ctrl.logicalGame(space);
                        // });

                    }
                });
            }
        }, 2000);
    };

    playCPU();



    this.plays = function (x, y) {

        if((player2.name != "CPU") || (player2.turn)) {

            GameDatabaseService.getSpaces().success(function (data) {

                var space = data[0].filter(function (space) {

                    if(space.direction == 'down') {

                        if (x > space.x && x < (space.x + config.tamSpace )) {
                            if (y > space.y && y < (space.y + config.tamPoint)) {
                                return space;
                            }
                        }
                    }
                    if(space.direction == 'up') {
                        if (x > space.x && x < (space.x + config.tamPoint )) {
                            if (y > space.y && y < (space.y + config.tamSpace)) {
                                return space;
                            }
                        }
                    }
                });

                if(space.length != 0) {
                    ctrl.logicalGame(space);
                }
            });

        }
    }

    this.logicalGame = function (space) {

        if(!space[0].marked) {

            space[0].marked = true;

            GameDatabaseService.editSpace(space[0]).success( function (data) {

                if(data) {

                    var color = (player1.turn)? config.colorPlayer1 : config.colorPlayer2;
                    var player = (player1.turn)? player1.name : player2.name;
                    var colorScore = (player1.turn)? config.colorPlayer1Score : config.colorPlayer2Score;
                    var marked = false;

                    if(space[0].direction == 'down') {
                        CanvasService.draw(space[0].x, space[0].y, config.tamSpace, config.tamPoint, color);
                    }
                    if(space[0].direction == 'up') {
                        CanvasService.draw(space[0].x, space[0].y, config.tamPoint, config.tamSpace, color);
                    }

                    GameDatabaseService.getSquares().success( function (data) {

                        var squares = data[0];

                        squares.forEach(function (square) {
                            if(space[0].direction == 'down') {
                                if(space[0].id == square.idSpaceUp) {
                                    GameDatabaseService.getSpace(square.idSpaceUp).success(function (data) {
                                        var spaceUp = data[0];
                                        if(data[0].marked) {
                                            GameDatabaseService.getSpace(square.idSpaceDown).success(function (data) {
                                                if(data[0].marked) {
                                                    GameDatabaseService.getSpace(square.idSpaceLeft).success(function (data) {
                                                        if(data[0].marked) {
                                                            GameDatabaseService.getSpace(square.idSpaceRight).success(function (data) {
                                                                if(data[0].marked) {
                                                                    square.fill = true;
                                                                    square.fillBy = player;
                                                                    GameDatabaseService.editSquare(square).success(function (data) {
                                                                        if(data) {
                                                                            CanvasService.draw(spaceUp.x, spaceUp.y + config.tamPoint, config.tamSpace, config.tamSpace, colorScore);
                                                                            ctrl.marked();
                                                                        }
                                                                    })
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                if(space[0].id == square.idSpaceDown) {
                                    GameDatabaseService.getSpace(square.idSpaceUp).success(function (data) {
                                        var spaceUp = data[0];
                                        if(data[0].marked) {
                                            GameDatabaseService.getSpace(square.idSpaceDown).success(function (data) {
                                                if(data[0].marked) {
                                                    GameDatabaseService.getSpace(square.idSpaceLeft).success(function (data) {
                                                        if(data[0].marked) {
                                                            GameDatabaseService.getSpace(square.idSpaceRight).success(function (data) {
                                                                if(data[0].marked) {
                                                                    square.fill = true;
                                                                    square.fillBy = player;
                                                                    GameDatabaseService.editSquare(square).success(function (data) {
                                                                        if(data) {
                                                                            CanvasService.draw(spaceUp.x, spaceUp.y + config.tamPoint, config.tamSpace, config.tamSpace, colorScore);
                                                                            ctrl.marked();
                                                                        }
                                                                    })
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            if(space[0].direction == 'up') {
                                if(space[0].id == square.idSpaceLeft) {
                                    GameDatabaseService.getSpace(square.idSpaceUp).success(function (data) {
                                        var spaceUp = data[0];
                                        if(data[0].marked) {
                                            GameDatabaseService.getSpace(square.idSpaceDown).success(function (data) {
                                                if(data[0].marked) {
                                                    GameDatabaseService.getSpace(square.idSpaceLeft).success(function (data) {
                                                        if(data[0].marked) {
                                                            GameDatabaseService.getSpace(square.idSpaceRight).success(function (data) {
                                                                if(data[0].marked) {
                                                                    square.fill = true;
                                                                    square.fillBy = player;
                                                                    GameDatabaseService.editSquare(square).success(function (data) {
                                                                        if(data) {
                                                                            CanvasService.draw(spaceUp.x, spaceUp.y + config.tamPoint, config.tamSpace, config.tamSpace, colorScore);
                                                                            ctrl.marked();
                                                                        }
                                                                    })
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                if(space[0].id == square.idSpaceRight) {
                                    GameDatabaseService.getSpace(square.idSpaceUp).success(function (data) {
                                        var spaceUp = data[0];
                                        if(data[0].marked) {
                                            GameDatabaseService.getSpace(square.idSpaceDown).success(function (data) {
                                                if(data[0].marked) {
                                                    GameDatabaseService.getSpace(square.idSpaceLeft).success(function (data) {
                                                        if(data[0].marked) {
                                                            GameDatabaseService.getSpace(square.idSpaceRight).success(function (data) {
                                                                if(data[0].marked) {
                                                                    square.fill = true;
                                                                    square.fillBy = player;
                                                                    GameDatabaseService.editSquare(square).success(function (data) {
                                                                        if(data) {
                                                                            CanvasService.draw(spaceUp.x, spaceUp.y + config.tamPoint, config.tamSpace, config.tamSpace, colorScore);
                                                                            ctrl.marked();
                                                                        }
                                                                    })
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    });

                }
            });
            player1.turn = !player1.turn;
            player2.turn = !player2.turn;
        }


    }

    this.marked = function () {

        player1.turn = !player1.turn;
        player2.turn = !player2.turn;

        if(player1.turn) {
            player1.score = player1.score + 1;
        }
        if(player2.turn) {
            player2.score = player2.score + 1;
        }

        GameDatabaseService.allMarked().success( function (data) {
            if(data) {
                inGame = false;
            }
        });
    }

    this.getInGame = function () {
        return inGame;
    }

    this.getPlayer1 = function () {
        return player1;
    }

    this.getPlayer2 = function () {
        return player2;
    }

    this.setPlayer2 = function (player) {
        player2 = player;
    }
});