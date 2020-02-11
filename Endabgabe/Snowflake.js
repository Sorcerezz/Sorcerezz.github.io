"use strict";
var Vogelhaus_Predator;
(function (Vogelhaus_Predator) {
    class Snowflake extends Vogelhaus_Predator.Movable {
        constructor() {
            super();
            this.position = new Vogelhaus_Predator.Vector(0, 0);
            this.velocity = new Vogelhaus_Predator.Vector(0, 0);
            this.velocity.random(50, 100); //Zufällig eine geschwindigkeit zwischen 50 und 100 px pro sekunde
        }
        draw() {
            Vogelhaus_Predator.crc2.beginPath();
            Vogelhaus_Predator.crc2.arc(this.position.x, this.position.y, 3, 0, 2 * Math.PI, false);
            Vogelhaus_Predator.crc2.fillStyle = "Azure";
            Vogelhaus_Predator.crc2.fill();
            Vogelhaus_Predator.crc2.lineWidth = .2;
            Vogelhaus_Predator.crc2.strokeStyle = "Azure";
            Vogelhaus_Predator.crc2.stroke();
        }
    }
    Vogelhaus_Predator.Snowflake = Snowflake;
})(Vogelhaus_Predator || (Vogelhaus_Predator = {}));
//# sourceMappingURL=Snowflake.js.map