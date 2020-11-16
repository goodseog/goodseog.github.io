import { vec2D } from "./vector.js";

export class Wall {
  constructor(x1, y1, x2, y2, color = "black") {
    this.type = "wall";
    this.start = new vec2D(x1, y1);
    this.end = new vec2D(x2, y2);
    this.color = color;

    var vec = this.end.subtract(this.start);
    this.a = vec.y;
    this.b = -vec.x;
    this.c = -(this.a * x1 + this.b * y1);
    this.normal = new vec2D(this.a, this.b).unit();
  }

  setPos(x1, y1, x2, y2){
    this.start = new vec2D(x1, y1);
    this.end = new vec2D(x2, y2);

    var vec = this.end.subtract(this.start);
    this.a = vec.y;
    this.b = -vec.x;
    this.c = -(this.a * x1 + this.b * y1);
    this.normal = new vec2D(this.a, this.b).unit();
  }

  move() {}

  collision(obj) {
    if (obj.type == "ball") obj.collisionWall(this);
  }

  distance(x, y) {
    return (
      Math.abs(this.a * x + this.b * y + this.c) /
      Math.sqrt(this.a ** 2 + this.b ** 2)
    );
  }

  redraw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.closePath();
  }
}
