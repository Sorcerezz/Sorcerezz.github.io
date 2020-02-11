namespace Vogelhaus_Predator {
  export class GameEngine {

    public static readonly fps: number = 30;                      //30 Bilder pro Sekunde
    public static readonly _timeslice = 1000 / GameEngine.fps / 1;            // Spielgeschwindigkeit 
    public static readonly width: number = 1000;                  // Breite vom Canvas
    public static readonly height: number = 800; // Höhe vom Canvas
    public static readonly snowballSpeed: number = 2; // SO schnell fliegt der Schneeball
    public static readonly snowballStartPosition: Vector = new Vector(GameEngine.width / 2, GameEngine.height); // Hier startet der Schneeball

    private static _instance: GameEngine;


    public drawables: Drawable[];
    public birdFood: BirdFood;
    public snowball: Snowball;

    constructor() {
      this.drawables = [];
    }
    public static instance(): GameEngine {
      if (GameEngine._instance == null) {
        GameEngine._instance = new GameEngine();
      }
      return GameEngine._instance;
    }
    getCloseBirds(): Bird[] {
      throw new Error("Method not implemented.");
    }

    public addDrawable(_drawable: Drawable) {
      this.drawables.push(_drawable);

      if (_drawable instanceof Snowball) {
        this.snowball = <Snowball>_drawable;
      }
      if (_drawable instanceof BirdFood) {
        this.birdFood = <BirdFood>_drawable;
      }
    }

    public removeDrawable(_drawable: Drawable) {
      // irgendwas mit array slice und index und dann raus nehmen

      if (_drawable instanceof Snowball) {
        this.snowball =  ;
      }

      if (_drawable instanceof BirdFood) {
        this.birdFood = ;
      }
    }

    public startAnimating(): void {
      this.renderCycle();
    }



    public update(): void {
      for (var i: number = 0; i < this.drawables.length; i++) {
        var drawable: Drawable = this.drawables[i];
        drawable.update(GameEngine._timeslice);
      }
    }

    public draw(): void {
      for (var i: number = 0; i < this.drawables.length; i++) {
        var drawable: Drawable = this.drawables[i];
        drawable.draw(GameEngine._timeslice);
      }
    }

    private renderCycle(): void {
      this.update();
      this.draw();

      window.setTimeout(function () {
        renderCycle();
      }, _timeslice);
    }
  }
}