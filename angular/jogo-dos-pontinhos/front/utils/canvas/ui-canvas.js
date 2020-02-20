angular.module("jogo").directive("uiCanvas", function () {
   return {
       templateUrl: "utils/canvas/template/canvas.html",
       restrict: "E",
       scope: {
           width : "=",
           height : "="
       }
   }
});