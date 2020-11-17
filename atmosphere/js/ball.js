import { vec2D } from "/static/libs/Vector.js";

export class Ball {
  constructor(x, y, r, vx, vy, color = "black") {
    this.type = "ball";
    this.pos = new vec2D(x, y);
    this.r = r || 1;
    this.m = 1;
    this.vel = new vec2D(vx, vy);
    this.color = color;
  }

  move() {
    this.pos = this.pos.add(this.vel);
  }

  collision(obj) {
    switch (obj.type) {
      case "wall":
        this.collisionWall(obj);
        break;
      case "ball":
        this.collisionBall(obj);
        break;
      case "block":
        obj.collision(this);
        break;
    }
  }

  collisionWall(wall) {
    var dist = wall.distance(this.pos.x, this.pos.y);
    var near = this.pos.subtract(wall.normal.multiply(dist));

    if (this.pos.subtract(wall.start).length() <= this.r ) {
      console.log("collision at start");
      var newNormS = this.pos.subtract(wall.start).unit();
      this.vel = this.vel.subtract(newNormS.multiply(2 * newNormS.dot(this.vel)));
      this.pos = this.pos.add(this.vel)
      return true;
    } else if (this.pos.subtract(wall.end).length() <= this.r ) {
      console.log("collision at end " + wall.end.x + " "  + wall.end.y);
      var newNormE = this.pos.subtract(wall.end).unit();
      this.vel = this.vel.subtract(newNormE.multiply(2 * newNormE.dot(this.vel)));
      this.pos = this.pos.add(this.vel)
      return true;
    } else if (
      dist <= this.r &&
      this.beetween(wall.start.x, near.x, wall.end.x) &&
      this.beetween(wall.start.y, near.y, wall.end.y)
    ) {
      console.log("collision at wall");
      this.vel = this.vel.subtract(
        wall.normal.multiply(2 * wall.normal.dot(this.vel))
      );
      return true;
    }
    return false;
  }

  beetween(a, x, b) {
    return (a <= x && x <= b) || (a >= x && x >= b);
  }

  // https://en.wikipedia.org/wiki/Elastic_collision
  collisionBall(that) {
    var dist = this.pos.subtract(that.pos).length();

    if (this.r + that.r - dist >= this.epsilon) {
      var v1v2 = this.vel.subtract(that.vel);
      var x1x2 = this.pos.subtract(that.pos);
      var x1x2sq = x1x2.dot(x1x2);
      var mRatio = (2 * this.m) / (this.m + that.m);
      this.vel = this.vel.subtract(
        x1x2.multiply((mRatio * v1v2.dot(x1x2)) / x1x2sq)
      );

      var v2v1 = v1v2.negative();
      var x2x1 = x1x2.negative();
      var x2x1sq = x1x2sq;
      mRatio = (2 * that.m) / (this.m + that.m);
      that.vel = that.vel.subtract(
        x2x1.multiply((mRatio * v2v1.dot(x2x1)) / x2x1sq)
      );
    }
  }

  redraw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
