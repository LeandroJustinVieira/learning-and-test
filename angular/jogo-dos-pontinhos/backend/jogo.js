var express = require('express');
var app = express();

console.log(express);
console.log(app);

console.log(__dirname);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());


var points = new Array();
var spaces = new Array();
var squares = new Array();

app.listen(process.env.PORT || 9090);

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



// rules space

app.get('/spaces', function(req, res) {
    res.json(spaces);
});

app.get('/space/:id', function (req, res) {
    var id = req.params.id;
    res.json(spaces[0].filter( function (space) {
        if (space.id == id) return space;
    }));
});

app.post('/space/add', function(req, res) {
    spaces.push(req.body);
    res.json(true);
});

app.post('/space/removeAll', function (req, res) {
    spaces = [];
    return res.json(true);
});


app.post('/space/edit', function (req, res) {
    var id = req.body.id;
    for(var i = 0; i < spaces[0].length; i++) {
        if(spaces[0][i].id == id) {
            spaces[0].splice(i,1, req.body);
            return res.json(true);
        }
    }
    return res.json(false);
});

// rules squares

app.get('/squares', function(req, res) {
    res.json(squares);
});

app.get('/square/:id', function (req, res) {
    var id = req.params.id;
    res.json(squares[0].filter( function (square) {
        if (square.id == id) return square;
    }));
});

app.post('/square/add', function(req, res) {
    squares.push(req.body);
    res.json(true);
});

app.post('/square/removeAll', function (req, res) {
    squares = [];
    return res.json(true);
});

app.post('/square/allFill', function (req, res) {
    for(var i = 0; i < squares[0].length; i++) {
        if(!squares[0][i].fill) {
            return res.json(false);
        }
    }
    return res.json(true);
});


app.post('/square/edit', function (req, res) {
    var id = req.body.id;
    for(var i = 0; i < squares[0].length; i++) {
        if(squares[0][i].id == id) {
            squares[0].splice(i,1, req.body);
            return res.json(true);
        }
    }
    return res.json(false);
});

// rules points

app.get('/points', function(req, res) {
    res.json(points);
});

app.get('/point/:id', function (req, res) {
    var id = req.params.id;
    res.json(points.filter( function (point) {
        if (point.id == id) return point;
    }));
});

app.post('/point/add', function(req, res) {
    points.push(req.body);
    res.json(true);
});

app.post('/point/removeAll', function (req, res) {
    points = [];
    return res.json(true);
});


app.post('/square/marked', function (req, res) {

    var _notMarked  = [];
    var _oneMarked  = [];
    var _twoMarked  = [];
    var _treeMarked = [];

    squares[0].forEach(function(square) {

        var contSquareResult = 0;
        var squareResult = {id: null, spaceLeft: false, spaceRight: false, spaceUp: false, spaceDown: false, idSpaceLeft: null, idSpaceRight: null, idSpaceUp: null, idSpaceDown: null};

        squareResult.id = square.id;

        var data = spaces[0].filter( function (space) { if (space.id == square.idSpaceLeft) return space; });

        squareResult.idSpaceLeft = data[0].id;
        if(data[0].marked) {
            squareResult.spaceLeft = true;
            contSquareResult = contSquareResult + 1;
        }

        var data = spaces[0].filter( function (space) { if (space.id == square.idSpaceRight) return space; });

        squareResult.idSpaceRight = data[0].id;
        if(data[0].marked) {
            squareResult.spaceRight = true;
            contSquareResult = contSquareResult + 1;
        }

        var data = spaces[0].filter( function (space) { if (space.id == square.idSpaceUp) return space; });

        squareResult.idSpaceUp = data[0].id;
        if(data[0].marked) {
            squareResult.spaceUp = true;
            contSquareResult = contSquareResult + 1;
        }

        var data = spaces[0].filter( function (space) { if (space.id == square.idSpaceDown) return space; });

        squareResult.idSpaceDown = data[0].id;
        if(data[0].marked) {
            squareResult.spaceDown = true;
            contSquareResult = contSquareResult + 1;
        }

        if(contSquareResult == 0) {
            _notMarked.push(squareResult);
        }
        if(contSquareResult == 1) {
            _oneMarked.push(squareResult);
        }
        if(contSquareResult == 2) {
            _twoMarked.push(squareResult);
        }
        if(contSquareResult == 3) {
            _treeMarked.push(squareResult);
        }
    });
    return res.json({notMarked : _notMarked, oneMarked : _oneMarked, twoMarked : _twoMarked, treeMarked : _treeMarked});
});

app.post('/space/markedPropagation', function (req, res) {
    var space = req.body.id;
    var aux;
    var checking = true;
    var numberOfPropagation = 0;

    console.log("--------------------------------");
    console.log("start");
    console.log(spaces);

    for(var i = 0; i < spaces[0].length; i++) {
        if(spaces[0][i].id == space) {
            spaces[0][i].marked = "propagation";
        }
    }

    while(checking) {

        checking = false;

        squares[0].forEach(function (square) {

            console.log(square);
            console.log(space);

            if (square.idSpaceDown == space) {
                var cont = 0;
                var idMissing = 0;
                var left = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceLeft) return space.marked;
                });
                var right = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceRight) return space.marked;
                });
                var down = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceDown) return space.marked;
                });
                var up = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceUp) return space.marked;
                });

                if (left != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceLeft
                }
                if (right != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceRight
                }
                if (down != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceDown
                }
                if (up != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceUp
                }

                console.log( "cont : " + cont);

                if (cont == 3) {

                    for (var i = 0; i < spaces[0].length; i++) {
                        if (spaces[0][i].id == idMissing) {
                            spaces[0][i].marked = "propagation";
                        }
                    }
                    checking = true;
                    numberOfPropagation++;
                }
            }
            if (square.idSpaceUp == space) {

                var cont = 0;
                var idMissing = 0;
                var left = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceLeft) return space.marked;
                });
                var right = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceRight) return space.marked;
                });
                var down = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceDown) return space.marked;
                });
                var up = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceUp) return space.marked;
                });

                if (left != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceLeft
                }
                if (right != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceRight
                }
                if (down != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceDown
                }
                if (up != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceUp
                }

                console.log( "cont : " + cont);

                if (cont == 3) {

                    for (var i = 0; i < spaces[0].length; i++) {
                        if (spaces[0][i].id == idMissing) {
                            spaces[0][i].marked = "propagation";
                        }
                    }
                    checking = true;
                    numberOfPropagation++;
                }
            }



            if (square.idSpaceLeft == space) {

                var cont = 0;
                var idMissing = 0;
                var left = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceLeft) return space.marked;
                });
                var right = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceRight) return space.marked;
                });
                var down = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceDown) return space.marked;
                });
                var up = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceUp) return space.marked;
                });

                if (left != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceLeft
                }
                if (right != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceRight
                }
                if (down != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceDown
                }
                if (up != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceUp
                }

                console.log( "cont : " + cont);

                if (cont == 3) {

                    for (var i = 0; i < spaces[0].length; i++) {
                        if (spaces[0][i].id == idMissing) {
                            spaces[0][i].marked = "propagation";
                        }
                    }
                    checking = true;
                    numberOfPropagation++;
                }

            }
            if (square.idSpaceRight == space) {

                var cont = 0;
                var idMissing = 0;
                var left = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceLeft) return space.marked;
                });
                var right = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceRight) return space.marked;
                });
                var down = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceDown) return space.marked;
                });
                var up = spaces[0].filter(function (space) {
                    if (space.id == square.idSpaceUp) return space.marked;
                });

                if (left != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceLeft
                }
                if (right != false) {

                    cont++
                } else {
                    idMissing = square.idSpaceRight
                }
                if (down != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceDown
                }
                if (up != false) {
                    cont++
                } else {
                    idMissing = square.idSpaceUp
                }


                console.log( "cont : " + cont);


                if (cont == 3) {

                    for (var i = 0; i < spaces[0].length; i++) {
                        if (spaces[0][i].id == idMissing) {
                            spaces[0][i].marked = "propagation";
                        }
                    }
                    checking = true;
                    numberOfPropagation++;
                }
            }

        });
    }

    console.log("depois");
    console.log(spaces);

    for(var i = 0; i < spaces[0].length; i++) {
        if(spaces[0][i].marked == "propagation") {
            spaces[0][i].marked = false;
        }
    }

    console.log("arrumado");
    console.log(spaces);

    console.log("Numero de propagação : " +numberOfPropagation);
    res.json(numberOfPropagation);

});

app.post('/space/canMarked', function (req, res) {
    var space = req.body.id;
    var result = true;

    squares[0].forEach(function (square) {
        if(space.position == 'down') {
            if(square.idSpaceDown == space.id) {
                var cont = 0;
                var left  = spaces[0].filter( function (space) { if (space.id == square.idSpaceLeft) return space.marked; });
                var right = spaces[0].filter( function (space) { if (space.id == square.idSpaceRight) return space.marked; });
                var down  = spaces[0].filter( function (space) { if (space.id == square.idSpaceDown) return space.marked; });
                var up    = spaces[0].filter( function (space) { if (space.id == square.idSpaceUp) return space.marked; });

                if(left) {cont++}
                if(right) {cont++}
                if(down) {cont++}
                if(up) {cont++}

                if(cont >= 2) {
                    result = false;
                }
            }
            if(square.idSpaceUp == space.id) {

                var cont = 0;
                var left  = spaces[0].filter( function (space) { if (space.id == square.idSpaceLeft) return space.marked; });
                var right = spaces[0].filter( function (space) { if (space.id == square.idSpaceRight) return space.marked; });
                var down  = spaces[0].filter( function (space) { if (space.id == square.idSpaceDown) return space.marked; });
                var up    = spaces[0].filter( function (space) { if (space.id == square.idSpaceUp) return space.marked; });

                if(left) {cont++}
                if(right) {cont++}
                if(down) {cont++}
                if(up) {cont++}

                if(cont >= 2) {
                    result = false;
                }
            }
        }
        if(space.position == 'up') {
            if(square.idSpaceDown == space.id) {

                var cont = 0;
                var left  = spaces[0].filter( function (space) { if (space.id == square.idSpaceLeft) return space.marked; });
                var right = spaces[0].filter( function (space) { if (space.id == square.idSpaceRight) return space.marked; });
                var down  = spaces[0].filter( function (space) { if (space.id == square.idSpaceDown) return space.marked; });
                var up    = spaces[0].filter( function (space) { if (space.id == square.idSpaceUp) return space.marked; });

                if(left) {cont++}
                if(right) {cont++}
                if(down) {cont++}
                if(up) {cont++}

                if(cont >= 2) {
                    result = false;
                }

            }
            if(square.idSpaceUp == space.id) {

                var cont = 0;
                var left  = spaces[0].filter( function (space) { if (space.id == square.idSpaceLeft) return space.marked; });
                var right = spaces[0].filter( function (space) { if (space.id == square.idSpaceRight) return space.marked; });
                var down  = spaces[0].filter( function (space) { if (space.id == square.idSpaceDown) return space.marked; });
                var up    = spaces[0].filter( function (space) { if (space.id == square.idSpaceUp) return space.marked; });

                if(left) {cont++}
                if(right) {cont++}
                if(down) {cont++}
                if(up) {cont++}

                if(cont >= 2) {
                    result = false;
                }
            }
        }
    });
    res.json(result);

});