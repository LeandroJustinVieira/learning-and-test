angular.module("jogo").factory("GameDatabaseService", function($http, config) {


    var _getPoints = function () {
        return $http.get(config.baseUrl + "/points");
    };

    var _savePoint = function (point) {
        return $http.post(config.baseUrl + "/point/add", point);
    };

    var _removeAllPoints = function () {
        return $http.post(config.baseUrl + '/point/removeAll');
    }

    var _getSpace = function (id) {
        return $http.get(config.baseUrl + "/space/" + id);
    }

    var _getSpaces = function () {
        return $http.get(config.baseUrl + "/spaces");
    };

    var _saveSpace = function (space) {
        return $http.post(config.baseUrl + "/space/add", space);
    };

    var _editSpace = function (space) {
        return $http.post(config.baseUrl + "/space/edit", space);
    };

    var _removeAllSpaces = function () {
        return $http.post(config.baseUrl + '/space/removeAll');
    }

    var _getSquares = function () {
        return $http.get(config.baseUrl + "/squares");
    };

    var _saveSquare = function (square) {
        return $http.post(config.baseUrl + "/square/add", square);
    };

    var _editSquare = function (square) {
        return $http.post(config.baseUrl + "/square/edit" , square);
    };

    var _removeAllSquares = function () {
        return $http.post(config.baseUrl + '/square/removeAll');
    }

    var _allMarked = function () {
        return $http.post(config.baseUrl + '/square/allFill');
    }

    var _distinctSquareMarked = function () {
        return $http.post(config.baseUrl + "/square/marked");
    }


    var _spaceCanMarked = function (space) {
        return $http.post(config.baseUrl + "/space/canMarked", {id : space});
    }

    var _markedPropagation = function (space) {
        return $http.post(config.baseUrl + "/space/markedPropagation", {id : space});

    }

    return {
        savePoint    : _savePoint,
        getPoints    : _getPoints,
        removeAllPoints  : _removeAllPoints,
        getSpace     : _getSpace,
        saveSpace    : _saveSpace,
        getSpaces    : _getSpaces,
        editSpace    : _editSpace,
        removeAllSpaces  : _removeAllSpaces,
        saveSquare    : _saveSquare,
        getSquares    : _getSquares,
        editSquare    : _editSquare,
        removeAllSquares  : _removeAllSquares,
        allMarked : _allMarked,
        distinctSquareMarked : _distinctSquareMarked,
        spaceCanMarked : _spaceCanMarked,
        markedPropagation : _markedPropagation
    }

});
