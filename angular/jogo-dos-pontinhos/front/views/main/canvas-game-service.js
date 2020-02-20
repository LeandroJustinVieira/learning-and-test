angular.module("jogo").service("CanvasGameService", function (config, GameDatabaseService, CanvasService, GameService) {

    var points;
    var spaces;

    this.initDrawEntities = function () {

        GameDatabaseService.getPoints().success(function (data) {

            console.log(data);

            points = data[0];
            points.forEach(function (item) {
               CanvasService.draw(item.x, item.y, config.tamPoint, config.tamPoint, config.colorPoint);
            });
        });

        GameDatabaseService.getSpaces().success(function (data) {
            spaces = data[0];
            spaces.forEach(function (item) {
                if (item.direction == "down") {
                    CanvasService.draw(item.x, item.y, config.tamSpace, config.tamPoint, config.colorSpace);
                }
                if (item.direction == "up") {
                    CanvasService.draw(item.x, item.y, config.tamPoint, config.tamSpace, config.colorSpace);
                }
            });
        });
    }

    this.startListenCanvas = function () {

        CanvasService.getCanvas().addEventListener('mouseup', function(evt) {
            var rect = CanvasService.getCanvas().getBoundingClientRect();
            var x = evt.clientX - rect.left;
            var y = evt.clientY - rect.top;
            GameService.plays(x, y);
        }, false);


    }



});