namespace Vogelhaus_Predator {
  export class BirdFood extends Drawable {

    public amount: number;

    constructor(_position: Vector, _amount: number) {
      super(_position);
      this.amount = _amount;
    }

    public draw(_positionX: number = 300, _positionY: number = 600): void {
      let birdBody: Path2D = new Path2D;

      birdBody.arc(_positionX + 8, _positionY - 2, 5, 0, 2 * Math.PI);              
      crc2.fillStyle = "darkgoldenrod";
      crc2.fill(birdBody);
      
      birdBody.arc(_positionX + 0, _positionY + 0, 5, 0, 2 * Math.PI);               
      crc2.fillStyle = "darkgoldenrod";
      crc2.fill(birdBody);
    }

    public update(_timeslice: number): void {
      let gameEngine: GameEngine = GameEngine.instance();
      let closeBirds: Bird[] = gameEngine.getCloseBirds();
      this.amount -= closeBirds.length;

      if (this.amount <= 0) {
        // Futter leer
        // Selber aus der Objektliste entfernen
      }
    }
  }
}