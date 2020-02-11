namespace Vogelhaus_Predator {
    export class Movable extends Drawable {
        public velocity: Vector;

        constructor(_position: Vector, _velocity: Vector) {
      super(_position);
      this.velocity = _velocity;
        }
    
    public move(_timeslice: number): void {
      this.position.x += this.velocity.x * _timeslice;
      this.position.y += this.velocity.y * _timeslice;
    }
    }
}