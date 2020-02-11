namespace Vogelhaus_Predator {
    export class Snowball extends Movable {

    public targetPosition: Vector;
  
        constructor(_targetPosition: Vector) {
      super();
      this.position = GameEngine.snowballStartPosition;
      this.targetPosition = _targetPosition;
      
      // Richtung ausrechnen
      this.velocity = Vector.fromPoints(this.position, _targetPosition);
      // Richtung normalisieren
      this.velocity.normalize();
      // Geschwindigkeit auf den Schneeball Velocity Vektor rechnen
      this.velocity.scale(GameEngine.snowballSpeed);
        }

        public draw(): void {
            // TODO zeichnen
        }
    
    public update(_timeslice: number): void {
      // Treffer prüfen 
      // Vogel und Schneeball entfernen
      // Punktzahl hochzäglen
    }
    }
}