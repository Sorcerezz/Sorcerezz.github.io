"use strict";
var Vogelhaus_Predator;
(function (Vogelhaus_Predator) {
    class Snowball extends Vogelhaus_Predator.Movable {
        constructor(_targetPosition) {
            super();
            this.position = Vogelhaus_Predator.GameEngine.snowballStartPosition;
            this.targetPosition = _targetPosition;
            // Richtung ausrechnen
            this.velocity = Vogelhaus_Predator.Vector.fromPoints(this.position, _targetPosition);
            // Richtung normalisieren
            this.velocity.normalize();
            // Geschwindigkeit auf den Schneeball Velocity Vektor rechnen
            this.velocity.scale(Vogelhaus_Predator.GameEngine.snowballSpeed);
        }
        draw() {
            // TODO zeichnen
        }
        update(_timeslice) {
            // Treffer prüfen 
            // Vogel und Schneeball entfernen
            // Punktzahl hochzäglen
        }
    }
    Vogelhaus_Predator.Snowball = Snowball;
})(Vogelhaus_Predator || (Vogelhaus_Predator = {}));
//# sourceMappingURL=Snowball.js.map