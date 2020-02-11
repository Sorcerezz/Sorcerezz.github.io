"use strict";
var Vogelhaus_Predator;
(function (Vogelhaus_Predator) {
    class Vector {
    }
    window.addEventListener("load", handleLoad);
    let golden = 0.62; //Der Goldene Schnitt
    let snowflakesAll = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Vogelhaus_Predator.crc2 = canvas.getContext("2d"); //Absicherung
        let horizon = Vogelhaus_Predator.crc2.canvas.height * golden; //Der Horizont der Zeichnung liegt beim Goldenenschnitt
        /*-----------------------Zeichenfunktionen------------*/ //Der Reihenfolge von Hinten nach Vorne
        drawBackground(); //Der Hintergrund ist der Grundstein
        drawSun({ x: 50, y: 50 }); //Die Sonne ist hinter allem ausser dem Hintergrund  
        drawCloud({ x: 500, y: 35 }, { x: 980, y: 240 }); //Die Wolke ist vor der Sonne und lässt es schneien
        drawMountains({ x: 0, y: horizon }, 100, 200, "grey", "white"); //2. Schicht Berge - Hinten muss zu erst gezeichnet werden
        drawMountains({ x: 0, y: horizon }, 50, 125, "darkgrey", "white"); //1. Schicht Berge - Vorne muss danach gezeichnet werden 
        drawTrees({ x: 500, y: 500 }, { x: -2000, y: -50 }); //Die Bäume stehen auf dem Boden der Szenerie vor den Bergen
        drawBirdhouse({ x: 620, y: 700 }); //Das Vogelhaus steht im Vordergrung vor allem anderen
        generateSnow();
        drawBird();
        drawBirdfood();
    }
    function drawBackground() {
        console.log("Background");
        let gradient = Vogelhaus_Predator.crc2.createLinearGradient(0, 0, 0, Vogelhaus_Predator.crc2.canvas.height); //Gradient wird angelegt und geht über die gesammte Höhe des Canvas
        gradient.addColorStop(0, "lightblue"); //Hellblau für den Himmel
        gradient.addColorStop(0.2, "lightblue"); //Für den Gradienten geht die größe vom 0 bis 1, ab 0.2 bis zum Goldenenschnitt für ein Verlauf
        gradient.addColorStop(golden, "white"); //Horizont - Ab hier beginnt der Boden unter den Bergen
        gradient.addColorStop(1, "white");
        Vogelhaus_Predator.crc2.fillStyle = gradient; //Gradient wird genutzt
        Vogelhaus_Predator.crc2.fillRect(0, 0, Vogelhaus_Predator.crc2.canvas.width, Vogelhaus_Predator.crc2.canvas.height); //er soll die Canvas Höhe/Weite komplett verwenden
    }
    function drawSun(_position) {
        console.log("Sun");
        let r1 = 20; //Die Wintersonne ist nicht besonders Stark
        let r2 = 160; //Und verliert schnell an Wirkung
        let gradient = Vogelhaus_Predator.crc2.createRadialGradient(0, 0, r1, 0, 0, r2); //innerere Radius ist r1, äusserer Radius ist r2
        gradient.addColorStop(0, "HSL(60, 100%, 90%, 1)"); //Die Sonne ansich ist eher weiß als gelblich
        gradient.addColorStop(1, "HSL(60, 40%, 50%, 0)"); //Die Strahlung erscheint uns gelblich und wird transparent
        Vogelhaus_Predator.crc2.save(); //Einstellungen speichern
        Vogelhaus_Predator.crc2.translate(_position.x, _position.y); //an die gewollte Stelle der Sonne schieben
        Vogelhaus_Predator.crc2.fillStyle = gradient; //mit dem Gradienten ausfüllen
        Vogelhaus_Predator.crc2.arc(0, 0, r2, 0, 2 * Math.PI); //2*Pi ergibt einen ganzen Kreis
        Vogelhaus_Predator.crc2.fill(); //Den Kreis ausfüllen
        Vogelhaus_Predator.crc2.restore(); //Einstellungen zurücksetzen
    }
    function drawCloud(_position, _size) {
        console.log("Clouds");
        let nParticles = 450; //die Wolke besteht aus so vielen Partikeln
        let radiusParticle = 80; //die Partikel haben den Radius
        let particle = new Path2D();
        let gradient = Vogelhaus_Predator.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        gradient.addColorStop(0, "lightgrey"); //Innen sind sie grau
        gradient.addColorStop(0.6, "Gainsboro"); //hier beginnt ein Verlauf 
        gradient.addColorStop(1, "HSL(0, 100%, 100%, 0)"); //der Verlauf endet in Tranparenz
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        Vogelhaus_Predator.crc2.save();
        Vogelhaus_Predator.crc2.translate(_position.x, _position.y);
        Vogelhaus_Predator.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) { //for Schleife - malt so viele Partikel bis die Anzahl von nParticles erreicht wurde
            console.log("Cloudpart");
            Vogelhaus_Predator.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            Vogelhaus_Predator.crc2.translate(x, y);
            Vogelhaus_Predator.crc2.fill(particle);
            Vogelhaus_Predator.crc2.restore();
        }
        Vogelhaus_Predator.crc2.restore();
    }
    function drawMountains(_position, _minimum, _maximum, _colorLow, _colorHigh) {
        console.log("Mountain");
        let stepMin = 30; //Die Schritte Spitze-Tal-Spitze müssen Mindestens so klein
        let stepMax = 100; //und dürfen maximal so groß sein
        let x = 0;
        Vogelhaus_Predator.crc2.save();
        Vogelhaus_Predator.crc2.translate(_position.x, _position.y);
        Vogelhaus_Predator.crc2.beginPath(); //Starte das Zeichnen der Bergkette 
        Vogelhaus_Predator.crc2.moveTo(0, 0); //Beginne be 0,0 (bezoden auf die voreingestellte Position der Bergkette)
        Vogelhaus_Predator.crc2.lineTo(0, -_maximum); //Links soll die Kette am höchstmöglichen Punkt beginnen (Minus da das Koordinatensystem nach Unten aus gerichtet ist)
        do {
            x += stepMin + Math.random() * (stepMax - stepMin); //Schrittgröße Zufällig zwischen Minimum und Maximum 
            let y = -_minimum - Math.random() * (_maximum - _minimum); //Höhe der nächsten Position/ des nöchsten Schritts zwischen Minimum und Maximum 
            Vogelhaus_Predator.crc2.lineTo(x, y); //Linie zu den Ausgerechenten Koordinaten
        } while (x < Vogelhaus_Predator.crc2.canvas.width); //Wiederhole so lange bis die Länge des Canvas erreicht ist
        Vogelhaus_Predator.crc2.lineTo(x, 0); //Gehe nach dem letzten Schritt an die X-achse zurück
        Vogelhaus_Predator.crc2.closePath(); //Schliese mit der Linie den "Kasten" Bergkette
        let gradient = Vogelhaus_Predator.crc2.createLinearGradient(0, 0, 0, -_maximum);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.2, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);
        gradient.addColorStop(1, _colorHigh);
        Vogelhaus_Predator.crc2.fillStyle = gradient;
        Vogelhaus_Predator.crc2.fill();
        Vogelhaus_Predator.crc2.restore();
    }
    function drawTrees(_position, _size) {
        console.log("Trees");
        let nTrees = 6;
        for (let drawn = 0; drawn < nTrees; drawn++) {
            console.log("Tree");
            _position.x = 10 + Math.random() * 1000;
            _position.y = 500 + Math.random() * 100;
            //Baumstamm
            Vogelhaus_Predator.crc2.beginPath();
            Vogelhaus_Predator.crc2.moveTo(_position.x - 10, _position.y + 70);
            Vogelhaus_Predator.crc2.lineTo(_position.x + 10, _position.y + 70);
            Vogelhaus_Predator.crc2.lineTo(_position.x + 8, _position.y - 0);
            Vogelhaus_Predator.crc2.closePath();
            Vogelhaus_Predator.crc2.fillStyle = "saddlebrown";
            Vogelhaus_Predator.crc2.fill();
            //Baumkrone
            Vogelhaus_Predator.crc2.beginPath();
            Vogelhaus_Predator.crc2.moveTo(_position.x - 30, _position.y + 50);
            Vogelhaus_Predator.crc2.lineTo(_position.x, _position.y - 20);
            Vogelhaus_Predator.crc2.lineTo(_position.x + 30, _position.y + 50);
            Vogelhaus_Predator.crc2.closePath();
            Vogelhaus_Predator.crc2.fillStyle = "darkgreen";
            Vogelhaus_Predator.crc2.fill();
            Vogelhaus_Predator.crc2.beginPath();
            Vogelhaus_Predator.crc2.moveTo(_position.x - 30, _position.y + 25);
            Vogelhaus_Predator.crc2.lineTo(_position.x, _position.y - 20);
            Vogelhaus_Predator.crc2.lineTo(_position.x + 30, _position.y + 25);
            Vogelhaus_Predator.crc2.closePath();
            Vogelhaus_Predator.crc2.fillStyle = "darkgreen";
            Vogelhaus_Predator.crc2.fill();
        }
    }
    function drawBirdhouse(_position) {
        console.log("Birdhouse");
        //Stamm
        Vogelhaus_Predator.crc2.beginPath();
        Vogelhaus_Predator.crc2.moveTo(_position.x - 10, _position.y + 200);
        Vogelhaus_Predator.crc2.lineTo(_position.x + 10, _position.y + 200);
        Vogelhaus_Predator.crc2.lineTo(_position.x + 10, _position.y + 0);
        Vogelhaus_Predator.crc2.lineTo(_position.x - 10, _position.y + 0);
        Vogelhaus_Predator.crc2.closePath();
        Vogelhaus_Predator.crc2.fillStyle = "rosybrown";
        Vogelhaus_Predator.crc2.fill();
        //Kasten
        Vogelhaus_Predator.crc2.beginPath();
        Vogelhaus_Predator.crc2.moveTo(_position.x - 50, _position.y - 100);
        Vogelhaus_Predator.crc2.lineTo(_position.x + 50, _position.y - 100);
        Vogelhaus_Predator.crc2.lineTo(_position.x + 50, _position.y + 0);
        Vogelhaus_Predator.crc2.lineTo(_position.x - 50, _position.y + 0);
        Vogelhaus_Predator.crc2.closePath();
        Vogelhaus_Predator.crc2.fillStyle = "pink";
        Vogelhaus_Predator.crc2.fill();
        //Dach
        Vogelhaus_Predator.crc2.beginPath();
        Vogelhaus_Predator.crc2.moveTo(_position.x - 70, _position.y - 100);
        Vogelhaus_Predator.crc2.lineTo(_position.x + 0, _position.y - 150);
        Vogelhaus_Predator.crc2.lineTo(_position.x + 70, _position.y - 100);
        Vogelhaus_Predator.crc2.closePath();
        Vogelhaus_Predator.crc2.fillStyle = "black";
        Vogelhaus_Predator.crc2.fill();
        //Eingang
        let eingangLoch = new Path2D;
        eingangLoch.arc(_position.x + 0, _position.y - 50, 20, 0, 2 * Math.PI);
        Vogelhaus_Predator.crc2.fillStyle = "black";
        Vogelhaus_Predator.crc2.fill(eingangLoch);
    }
    function generateSnow() {
        console.log("Snowfall");
        let snowflake = new Vogelhaus_Predator.Snowflake();
        let nSnowflakes = 500;
        for (let drawn = 0; drawn < nSnowflakes; drawn++) {
            console.log("Snowflake");
            snowflake.position.x = Math.random() * 1000;
            snowflake.position.y = (Math.random() * 725) + 75;
            snowflake.draw();
            snowflakesAll.push(snowflake);
        }
    }
    function drawBird(_positionX = 400, _positionY = 300) {
        let birdBody = new Path2D;
        //Kopf
        birdBody.arc(_positionX + 10, _positionY - 25, 15, 0, 2 * Math.PI);
        Vogelhaus_Predator.crc2.fillStyle = "black";
        Vogelhaus_Predator.crc2.fill(birdBody);
        //Körper
        birdBody.arc(_positionX + 0, _positionY + 0, 20, 0, 2 * Math.PI);
        Vogelhaus_Predator.crc2.fillStyle = "black";
        Vogelhaus_Predator.crc2.fill(birdBody);
        //Schnabel
        Vogelhaus_Predator.crc2.beginPath();
        Vogelhaus_Predator.crc2.moveTo(_positionX + 20, _positionY - 15);
        Vogelhaus_Predator.crc2.lineTo(_positionX + 35, _positionY - 10);
        Vogelhaus_Predator.crc2.lineTo(_positionX + 25, _positionY - 25);
        Vogelhaus_Predator.crc2.closePath();
        Vogelhaus_Predator.crc2.fillStyle = "black";
        Vogelhaus_Predator.crc2.fill();
        //Flügel
        Vogelhaus_Predator.crc2.beginPath();
        Vogelhaus_Predator.crc2.moveTo(_positionX - 40, _positionY - 20);
        Vogelhaus_Predator.crc2.lineTo(_positionX - 20, _positionY - 40);
        Vogelhaus_Predator.crc2.lineTo(_positionX + 0, _positionY - 0);
        Vogelhaus_Predator.crc2.closePath();
        Vogelhaus_Predator.crc2.fillStyle = "black";
        Vogelhaus_Predator.crc2.fill();
    }
    function drawBirdfood(_positionX = 300, _positionY = 600) {
        let birdBody = new Path2D;
        birdBody.arc(_positionX + 8, _positionY - 2, 5, 0, 2 * Math.PI);
        Vogelhaus_Predator.crc2.fillStyle = "darkgoldenrod";
        Vogelhaus_Predator.crc2.fill(birdBody);
        birdBody.arc(_positionX + 0, _positionY + 0, 5, 0, 2 * Math.PI);
        Vogelhaus_Predator.crc2.fillStyle = "darkgoldenrod";
        Vogelhaus_Predator.crc2.fill(birdBody);
    }
})(Vogelhaus_Predator || (Vogelhaus_Predator = {}));
//# sourceMappingURL=Main_Hintergrund.js.map