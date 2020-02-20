angular.module("jogo").service("CanvasService", function () {


    this.canvas;
    this.ctx;

    this.start = function() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    this.draw = function (x, y, width, heigth, color) {
        this.start();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width ,heigth);
    };

    this.clear = function () {
        this.start();
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    this.drawImageCanvas = function (image, x, y) {
        this.start();
        this.ctx.drawImage(image, x, y);
    }

    this.drawImageRotateUpCanvas = function (image, x, y, heigth, width, angulo) {
        this.start();
        this.ctx.save();
        this.ctx.translate(x,y);
        this.ctx.rotate((-angulo) * Math.PI / 180);
        this.ctx.drawImage(image, -(heigth / 2), -(width /2));
        this.ctx.restore();

    }

    this.drawCircle = function (x, y, radius, startAngle, endAngle, anticlockwise,colorLine,colorBackground) {
        this.start();
        this.ctx.save();
        this.ctx.fillStyle = colorBackground;
        this.ctx.strokeStyle = colorLine;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();

    }

    this.drawLineBetweenTwoPoint = function (firstPointX, firstPointY, secondPointX, secondPointY, lineWidth, color) {
        this.start();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(firstPointX, firstPointY);
        this.ctx.lineTo(secondPointX, secondPointY);
        this.ctx.stroke();
        this.ctx.restore();
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    this.getWidth = function () {
        this.start();
        return this.canvas.width;
    }

    this.getHeight = function () {
        this.start();
        return this.canvas.height;
    }

    this.getCanvas = function () {
        this.start();
        return this.canvas;
    }

    this.getCtx = function () {
        this.start();
        return this.ctx;
    }

});