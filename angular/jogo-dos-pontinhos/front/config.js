angular.module("jogo").value("config", {

    baseUrl : "http://localhost:9090",

    // Configurações do jogo
    tamPoint : 15,
    tamSpace : 50,
    row : 6,
    pointRow : 7,
    column : 6,
    pointColumn: 7,

    // Configirações canvas
    canvasWidth: 500,
    canvasHeight: 500,

    // Configuração de cor
    colorPoint: "white",
    colorSpace: "gray",
    colorPlayer1 : "white",
    colorPlayer2 : "white",
    colorPlayer1Score: "blue",
    colorPlayer2Score: "red"



});
