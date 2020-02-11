"use strict";
var Vogelhaus_Predator;
(function (Vogelhaus_Predator) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        normalize() {
            let length = this.length();
            this.x /= length;
            this.y /= length;
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = Math.random() * 2 * Math.PI;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        static fromPoints(_from, _to) {
            return new Vector(_to.x - _from.x, _to.y - _from.y);
        }
    }
    Vogelhaus_Predator.Vector = Vector;
    {
        return new Vector(0, 0);
    }
})(Vogelhaus_Predator || (Vogelhaus_Predator = {}));
//# sourceMappingURL=Vector.js.map