"use strict";
var Vogelhaus_Predator;
(function (Vogelhaus_Predator) {
    class Movable extends Vogelhaus_Predator.Drawable {
        constructor(_position, _velocity) {
            super(_position);
            this.velocity = _velocity;
        }
        move(_timeslice) {
            this.position.x += this.velocity.x * _timeslice;
            this.position.y += this.velocity.y * _timeslice;
        }
    }
    Vogelhaus_Predator.Movable = Movable;
})(Vogelhaus_Predator || (Vogelhaus_Predator = {}));
//# sourceMappingURL=Movable.js.map