"use strict";
var Vogelhaus_Predator;
(function (Vogelhaus_Predator) {
    class GameEngine {
        constructor() {
            this.drawables = [];
        }
        addDrawable(_drawable) {
            this.drawables.push(_drawable);
            if (_drawable instanceof Vogelhaus_Predator.Snowball) {
                this.snowball = _drawable;
            }
            if (_drawable instanceof Vogelhaus_Predator.BirdFood) {
                this.birdFood = _drawable;
            }
        }
        removeDrawable(_drawable) {
            // irgendwas mit array slice und index und dann raus nehmen
            if (_drawable instanceof Vogelhaus_Predator.Snowball) {
                this.snowball = null;
            }
            if (_drawable instanceof Vogelhaus_Predator.BirdFood) {
                this.birdFood = null;
            }
        }
        startAnimating() {
            this.renderCycle();
        }
        update() {
            for (var i = 0; i < this.drawables.length; i++) {
                var drawable = this.drawables[i];
                drawable.update(GameEngine.timeslice);
            }
        }
        draw() {
            for (var i = 0; i < this.drawables.length; i++) {
                var drawable = this.drawables[i];
                drawable.draw(GameEngine.timeslice);
            }
        }
        static instance() {
            if (_instance == null) {
                _instance = new GameEngine();
            }
            return _instance;
        }
        renderCycle() {
            this.update();
            this.draw();
            window.setTimeout(function () {
                renderCycle();
            }, timeslice);
        }
    }
    GameEngine.fps = 30; //30 Bilder pro Sekunde
    GameEngine.timeslice = 1000 / fps / 1; // Spielgeschwindigkeit 
    GameEngine.width = 1000; // Breite vom Canvas
    GameEngine.height = 800; // Höhe vom Canvas
    GameEngine.snowballSpeed = 2; // SO schnell fliegt der Schneeball
    GameEngine.snowballStartPosition = new Vogelhaus_Predator.Vector(width / 2, height); // Hier startet der Schneeball
    Vogelhaus_Predator.GameEngine = GameEngine;
})(Vogelhaus_Predator || (Vogelhaus_Predator = {}));
//# sourceMappingURL=GameEngine.js.map