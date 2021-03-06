import Wall from "./Wall.js";

export default class Block {
  constructor(x, y, width, height, color = "black") {
    this.type = "block";
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 1;
    this.height = height || 1;
    this.walls = [];
    this.walls.push(new Wall(x, y, x + width, y));
    this.walls.push(new Wall(x + width, y, x + width, y + height));
    this.walls.push(new Wall(x + width, y + height, x, y + height));
    this.walls.push(new Wall(x, y + height, x, y));
    this.color = color;
  }

  move() {}

  redraw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
