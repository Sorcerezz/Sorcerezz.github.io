namespace Vogelhaus_Predator {

    class Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    let golden: number = 0.62; //Der Goldene Schnitt
    let snowflakesAll: Snowflake[] = [];

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");         //Absicherung

        let horizon: number = crc2.canvas.height * golden;              //Der Horizont der Zeichnung liegt beim Goldenenschnitt

        /*-----------------------Zeichenfunktionen------------*/          //Der Reihenfolge von Hinten nach Vorne

        drawBackground();                   //Der Hintergrund ist der Grundstein

        drawSun({ x: 50, y: 50 });                    //Die Sonne ist hinter allem ausser dem Hintergrund  

        drawCloud({ x: 500, y: 35 }, { x: 980, y: 240 });           //Die Wolke ist vor der Sonne und lässt es schneien

        drawMountains({ x: 0, y: horizon }, 100, 200, "grey", "white");        //2. Schicht Berge - Hinten muss zu erst gezeichnet werden
        drawMountains({ x: 0, y: horizon }, 50, 125, "darkgrey", "white");        //1. Schicht Berge - Vorne muss danach gezeichnet werden 

        drawTrees({ x: 500, y: 500 }, { x: -2000, y: -50 });            //Die Bäume stehen auf dem Boden der Szenerie vor den Bergen

        drawBirdhouse({ x: 620, y: 700 });                            //Das Vogelhaus steht im Vordergrung vor allem anderen

        generateSnow();

        drawBird();

        drawBirdfood();
    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);              //Gradient wird angelegt und geht über die gesammte Höhe des Canvas
        gradient.addColorStop(0, "lightblue");           //Hellblau für den Himmel
        gradient.addColorStop(0.2, "lightblue");         //Für den Gradienten geht die größe vom 0 bis 1, ab 0.2 bis zum Goldenenschnitt für ein Verlauf
        gradient.addColorStop(golden, "white");          //Horizont - Ab hier beginnt der Boden unter den Bergen
        gradient.addColorStop(1, "white");

        crc2.fillStyle = gradient;                      //Gradient wird genutzt
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height); //er soll die Canvas Höhe/Weite komplett verwenden
    }

    function drawSun(_position: Vector): void {
        console.log("Sun");

        let r1: number = 20;            //Die Wintersonne ist nicht besonders Stark
        let r2: number = 160;           //Und verliert schnell an Wirkung

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);      //innerere Radius ist r1, äusserer Radius ist r2
        gradient.addColorStop(0, "HSL(60, 100%, 90%, 1)");          //Die Sonne ansich ist eher weiß als gelblich
        gradient.addColorStop(1, "HSL(60, 40%, 50%, 0)");           //Die Strahlung erscheint uns gelblich und wird transparent

        crc2.save();                                        //Einstellungen speichern
        crc2.translate(_position.x, _position.y);           //an die gewollte Stelle der Sonne schieben
        crc2.fillStyle = gradient;                          //mit dem Gradienten ausfüllen
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);                 //2*Pi ergibt einen ganzen Kreis
        crc2.fill();                                        //Den Kreis ausfüllen
        crc2.restore();                                     //Einstellungen zurücksetzen
    }

    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Clouds");

        let nParticles: number = 450;               //die Wolke besteht aus so vielen Partikeln
        let radiusParticle: number = 80;            //die Partikel haben den Radius
        let particle: Path2D = new Path2D();

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        gradient.addColorStop(0, "lightgrey");                      //Innen sind sie grau
        gradient.addColorStop(0.6, "Gainsboro");                    //hier beginnt ein Verlauf 
        gradient.addColorStop(1, "HSL(0, 100%, 100%, 0)");          //der Verlauf endet in Tranparenz

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {              //for Schleife - malt so viele Partikel bis die Anzahl von nParticles erreicht wurde
            console.log("Cloudpart");

            crc2.save();

            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);

            crc2.translate(x, y);
            crc2.fill(particle);

            crc2.restore();
        }

        crc2.restore();
    }

    function drawMountains(_position: Vector, _minimum: number, _maximum: number, _colorLow: string, _colorHigh: string): void {
        console.log("Mountain");

        let stepMin: number = 30;               //Die Schritte Spitze-Tal-Spitze müssen Mindestens so klein
        let stepMax: number = 100;              //und dürfen maximal so groß sein
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();                       //Starte das Zeichnen der Bergkette 
        crc2.moveTo(0, 0);                      //Beginne be 0,0 (bezoden auf die voreingestellte Position der Bergkette)
        crc2.lineTo(0, -_maximum);              //Links soll die Kette am höchstmöglichen Punkt beginnen (Minus da das Koordinatensystem nach Unten aus gerichtet ist)

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);                         //Schrittgröße Zufällig zwischen Minimum und Maximum 
            let y: number = -_minimum - Math.random() * (_maximum - _minimum);          //Höhe der nächsten Position/ des nöchsten Schritts zwischen Minimum und Maximum 

            crc2.lineTo(x, y);                                                          //Linie zu den Ausgerechenten Koordinaten
        } while (x < crc2.canvas.width);                                        //Wiederhole so lange bis die Länge des Canvas erreicht ist

        crc2.lineTo(x, 0);                           //Gehe nach dem letzten Schritt an die X-achse zurück
        crc2.closePath();                           //Schliese mit der Linie den "Kasten" Bergkette

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, - _maximum);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.2, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);
        gradient.addColorStop(1, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }


    function drawTrees(_position: Vector, _size: Vector): void {
        console.log("Trees");

        let nTrees: number = 6;

        for (let drawn: number = 0; drawn < nTrees; drawn++) {
            console.log("Tree");

            _position.x = 10 + Math.random() * 1000;
            _position.y = 500 + Math.random() * 100;

            //Baumstamm
            crc2.beginPath();
            crc2.moveTo(_position.x - 10, _position.y + 70);
            crc2.lineTo(_position.x + 10, _position.y + 70);
            crc2.lineTo(_position.x + 8, _position.y - 0);
            crc2.closePath();
            crc2.fillStyle = "saddlebrown";
            crc2.fill();


            //Baumkrone
            crc2.beginPath();
            crc2.moveTo(_position.x - 30, _position.y + 50);
            crc2.lineTo(_position.x, _position.y - 20);
            crc2.lineTo(_position.x + 30, _position.y + 50);
            crc2.closePath();
            crc2.fillStyle = "darkgreen";
            crc2.fill();

            crc2.beginPath();
            crc2.moveTo(_position.x - 30, _position.y + 25);
            crc2.lineTo(_position.x, _position.y - 20);
            crc2.lineTo(_position.x + 30, _position.y + 25);
            crc2.closePath();
            crc2.fillStyle = "darkgreen";
            crc2.fill();

        }

    }

    function drawBirdhouse(_position: Vector): void {
        console.log("Birdhouse");

        //Stamm
        crc2.beginPath();
        crc2.moveTo(_position.x - 10, _position.y + 200);
        crc2.lineTo(_position.x + 10, _position.y + 200);
        crc2.lineTo(_position.x + 10, _position.y + 0);
        crc2.lineTo(_position.x - 10, _position.y + 0);
        crc2.closePath();
        crc2.fillStyle = "rosybrown";
        crc2.fill();

        //Kasten
        crc2.beginPath();
        crc2.moveTo(_position.x - 50, _position.y - 100);
        crc2.lineTo(_position.x + 50, _position.y - 100);
        crc2.lineTo(_position.x + 50, _position.y + 0);
        crc2.lineTo(_position.x - 50, _position.y + 0);
        crc2.closePath();
        crc2.fillStyle = "pink";
        crc2.fill();

        //Dach
        crc2.beginPath();
        crc2.moveTo(_position.x - 70, _position.y - 100);
        crc2.lineTo(_position.x + 0, _position.y - 150);
        crc2.lineTo(_position.x + 70, _position.y - 100);
        crc2.closePath();
        crc2.fillStyle = "black";
        crc2.fill();

        //Eingang
        let eingangLoch: Path2D = new Path2D;

        eingangLoch.arc(_position.x + 0, _position.y - 50, 20, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill(eingangLoch);
    }

    function generateSnow(): void {
        console.log("Snowfall");

        let snowflake: Snowflake = new Snowflake();
        let nSnowflakes: number = 500;

        for (let drawn: number = 0; drawn < nSnowflakes; drawn++) {
            console.log("Snowflake");

            snowflake.position.x = Math.random() * 1000;
            snowflake.position.y = (Math.random() * 725) + 75;

            snowflake.draw();

            snowflakesAll.push(snowflake);
        }

    }

    function drawBird(_positionX: number = 400, _positionY: number = 300): void {
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
      }


    function drawBirdfood(_positionX: number = 300, _positionY: number = 600): void {
        let birdBody: Path2D = new Path2D;

        birdBody.arc(_positionX + 8, _positionY - 2, 5, 0, 2 * Math.PI);              
        crc2.fillStyle = "darkgoldenrod";
        crc2.fill(birdBody);
        
        birdBody.arc(_positionX + 0, _positionY + 0, 5, 0, 2 * Math.PI);               
        crc2.fillStyle = "darkgoldenrod";
        crc2.fill(birdBody);
      }
}