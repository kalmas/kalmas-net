'use strict';
(function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var requestAnimationFrame = getAnimationFrame();
    var flakes = [];

    function snow() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < flakes.length; i++) {
            var flake = flakes[i];
            flake.y = flake.y + flake.speed;

            if (flake.y >= (canvas.height * 2)) {
                reset(flake);
            }

            context.fillStyle = 'rgba(255,255,255,' + flake.opacity + ')';
            context.beginPath();
            context.fillText('*', flake.x, flake.y);
            context.font = flake.size + 'px Sans-Serif';
            context.fill();
        }

        requestAnimationFrame(snow);
    }

    function reset(flake) {
        flake.x = xStart();
        flake.speed = speed();
        flake.y = 0;
        flake.size = textSize(),
        flake.opacity = opacity();
    }

    function init() {
        var flakeCount = 200;
        resizeCanvas();

        for (var i = 0; i < flakeCount; i++) {
            flakes.push(buildFlake());
        }

        snow();

        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 2;
    }

    function buildFlake() {
        return {
            speed: speed(),
            x: xStart(),
            y: yStart(),
            size: textSize(),
            opacity: opacity()
        };
    }

    function getAnimationFrame() {
        return  window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || (function(callback) {
                window.setTimeout(callback, 1000 / 60);
            });
    }

    function speed() {
        return (Math.random() * 1) + 0.5;
    }

    function opacity() {
        return Math.random();
    }

    function textSize() {
        return (Math.random() * 50) + 5;
    }

    function xStart() {
        return Math.floor(Math.random() * canvas.width * 2) - (canvas.height/2);
    }

    function yStart() {
        return Math.floor(Math.random() * canvas.height) - (canvas.height);
    }

    init();
})();

