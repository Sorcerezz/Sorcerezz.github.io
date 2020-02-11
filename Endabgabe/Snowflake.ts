namespace Vogelhaus_Predator {
    export class Snowflake extends Movable {

        constructor() {
            super();
            this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(50, 100);              //Zufällig eine geschwindigkeit zwischen 50 und 100 px pro sekunde
        }

        public draw(): void {
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 3, 0, 2 * Math.PI, false);

            crc2.fillStyle = "Azure";
            crc2.fill();
            crc2.lineWidth = .2;
            crc2.strokeStyle = "Azure";
            crc2.stroke();

        }
    }
}