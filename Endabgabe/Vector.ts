namespace Vogelhaus_Predator {
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    
    public normalize(): void {
      let length: number = this.length();
      this.x /= length;
      this.y /= length;
    }

        random(_minLength: number, _maxLength: number): void {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = Math.random() * 2 * Math.PI;

            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
    
    public length(): number {
      return Math.sqrt( this.x * this.x + this.y * this.y );
    }
    
    public static fromPoints(_from: Vector, _to: Vector): Vector {
      return new Vector(_to.x - _from.x, _to.y - _from.y);
    }
    
    public static identity: Vector {
      return new Vector(0, 0);
    }
    
}