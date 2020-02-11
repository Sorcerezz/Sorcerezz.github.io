"use strict";
var Vogelhaus_Predator;
(function (Vogelhaus_Predator) {
    class BirdFood extends Vogelhaus_Predator.Drawable {
        constructor(_position, _amount) {
            super(_position);
            this.amount = _amount;
        }
        /*
            public draw(_positionX: number = 300, _positionY: number = 600): void {
              let birdBody: Path2D = new Path2D;
        
              birdBody.arc(_positionX + 8, _positionY - 2, 5, 0, 2 * Math.PI);
              crc2.fillStyle = "darkgoldenrod";
              crc2.fill(birdBody);
              
              birdBody.arc(_positionX + 0, _positionY + 0, 5, 0, 2 * Math.PI);
              crc2.fillStyle = "darkgoldenrod";
              crc2.fill(birdBody);
            }*/
        update(_timeslice) {
            let gameEngine = Vogelhaus_Predator.GameEngine.instance();
            let closeBirds = gameEngine.getCloseBirds();
            this.amount -= closeBirds.length;
            if (this.amount <= 0) {
                // Futter leer
                // Selber aus der Objektliste entfernen
            }
        }
    }
    Vogelhaus_Predator.BirdFood = BirdFood;
})(Vogelhaus_Predator || (Vogelhaus_Predator = {}));
//# sourceMappingURL=BirdFood.js.map