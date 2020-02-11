namespace Vogelhaus_Predator {
  export class Bird extends Movable {

    public foodComeCloserRadius: number;
    public foodDoEatRadius: number;
    public dangerRadius: number;

    constructor() {
    super();
    this.position = new Vector(0, 0);

    this.velocity = new Vector(0, 0);
    this.velocity.random(50, 100);

      // Parameter zum steuern wie scheu / hungrig ein vogel ist
    this.foodComeCloserRadius = 400;
    this.foodDoEatRadius = 25;
    this.dangerRadius = 500;
    }

    public static getCloseBirds(): Bird[] {
      let gameEngine: GameEngine = GameEngine.instance();
      if (gameEngine.birdFood == null) {
        return [];
      }

      var result: Bird[] = [];
      for (var i: number = 0; i < gameEngine.drawables.length; i++) {
        var drawable: Drawable = gameEngine.drawables[i];
        if (drawable instanceof Bird) {
          if ((<Bird>drawable).isCloseTo(gameEngine.birdFood, 10)) {
            result.push(<Bird>drawable);
          }
        }
      }

      return result;
    }
/*
    public draw(_positionX: number = 400, _positionY: number = 300): void {
        let birdBody: Path2D = new Path2D;
  
        //Kopf
        birdBody.arc(_positionX + 10, _positionY - 25, 15, 0, 2 * Math.PI);              
        crc2.fillStyle = "black";
        crc2.fill(birdBody);
        
        //Körper
        birdBody.arc(_positionX + 0, _positionY + 0, 20, 0, 2 * Math.PI);               
        crc2.fillStyle = "black";
        crc2.fill(birdBody);

        //Schnabel
        crc2.beginPath();
        crc2.moveTo(_positionX + 20, _positionY - 15);
        crc2.lineTo(_positionX + 35, _positionY - 10);
        crc2.lineTo(_positionX + 25, _positionY - 25);
        crc2.closePath();
        crc2.fillStyle = "black";
        crc2.fill();

        //Flügel
        crc2.beginPath();
        crc2.moveTo(_positionX - 40, _positionY - 20);
        crc2.lineTo(_positionX - 20, _positionY - 40);
        crc2.lineTo(_positionX + 0, _positionY - 0);
        crc2.closePath();
        crc2.fillStyle = "black";
        crc2.fill();
    }*/

    public isCloseTo(_other: Drawable, _maxDistance: number): boolean {
      let _vec: Vector = Vector.fromPoints(this.position, _other.position);
      return _vec.length() <= _maxDistance;
    }

    public update(_timeslice: number): void {
      let isInDanger: boolean = this.isCloseToSnowball();
      let isMovingToFood: boolean = this.isCloseToBirdFood();
      let isEating: boolean = this.isEating();

      // Vektor
      if (isInDanger) {
//Berechne die Flugroute vom Schneeball weg
    }

      if (isEating && isInDanger) {                       //Der Vogel ist am Essen, will aber fliehen - also flieht er sehr langsam
        // langsam wegbewegen
      } else if (isMovingToFood && isInDanger) {          //Der Vogel wird vom Futter angezogen, will aber fliehen - also flieht er langsam
        // bisschen schneller wegbewegen
      } else if (isEating) {                              //Der Vogel ist am Essen, also bleibt er stehen
        this.velocity = Vector.identity();
      }

      super.update(_timeslice);
    }

    public isCloseToBirdFood(): boolean {
      let gameEngine: GameEngine = GameEngine.instance();
      if (gameEngine.birdFood != null) {
        return this.isCloseTo(gameEngine.birdFood, this.foodComeCloserRadius);
      }
    }

    public isEating(): boolean {
      let gameEngine: GameEngine = GameEngine.instance();
      if (gameEngine.birdFood != null) {
        return this.isCloseTo(gameEngine.birdFood, this.foodDoEatRadius);
      }
    }

    public isCloseToSnowball(): boolean {
      let gameEngine: GameEngine = GameEngine.instance();
      if (gameEngine.snowball != null) {
        return this.isCloseTo(gameEngine.snowball, this.dangerRadius);
      }
    }
  }
}