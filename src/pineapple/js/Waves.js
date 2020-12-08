import Coord from "./Coordinate.js";

export default class Waves {
  constructor() {
    this.width = undefined;
    this.height = undefined;

    this.points = [];
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  redraw(ctx) {
    let line = (start, end, color) => {
      ctx.beginPath();
      ctx.moveTo(start[0], start[1]);
      ctx.lineTo(end[0], end[1]);
      ctx.lineWidth = 3;
      ctx.strokeStyle = color || "black";
      ctx.stroke();
    };

    // const image = new Image(150, 150);
    // image.src = "./apple.png";
    // let center = Coord.getPos(0, 0);
    // ctx.drawImage(image, center[0] - 75, center[1] - 75, 150, 150);

    line(Coord.getPos(0.62, +2.85), Coord.getPos(1.14, +2.85), "rgb(115, 185, 68)");
    line(Coord.getPos(0.25, +2.5), Coord.getPos(1.1, +2.5), "rgb(115, 185, 68)");
    line(Coord.getPos(0.0, +2.15), Coord.getPos(0.9, +2.15), "rgb(115, 185, 68)");
    line(Coord.getPos(-0.1, +1.8), Coord.getPos(0.55, +1.8), "rgb(115, 185, 68)");
    line(Coord.getPos(-1.9, +1.2), Coord.getPos(+1.95, +1.2), "rgb(115, 185, 68)");

    // Yellow
    line(Coord.getPos(-2.2, +0.8), Coord.getPos(+2.35, +0.8), "rgb(247, 194, 22)");
    line(Coord.getPos(-2.4, +0.4), Coord.getPos(+2.44, +0.4), "rgb(247, 194, 22)");

    // Orange
    line(Coord.getPos(-2.47, +0.0), Coord.getPos(+2.47, +0.0), "rgb(231, 142, 36)");
    line(Coord.getPos(-2.45, -0.4), Coord.getPos(+2.45, -0.4), "rgb(231, 142, 36)");

    // Red
    line(Coord.getPos(-2.39, -0.8), Coord.getPos(+2.39, -0.8), "rgb(204, 51, 56)");
    line(Coord.getPos(-2.32, -1.2), Coord.getPos(+2.35, -1.2), "rgb(204, 51, 56)");

    // Purple
    line(Coord.getPos(-2.16, -1.6), Coord.getPos(+2.16, -1.6), "rgb(144, 46, 125)");
    line(Coord.getPos(-1.95, -2.0), Coord.getPos(+1.95, -2.0), "rgb(144, 46, 125)");

    // Blue
    line(Coord.getPos(-1.68, -2.4), Coord.getPos(+1.68, -2.4), "rgb(14, 151, 211)");
    line(Coord.getPos(-1.3, -2.8), Coord.getPos(-0.6, -2.8), "rgb(14, 151, 211)");
    line(Coord.getPos(+0.7, -2.8), Coord.getPos(+1.3, -2.8), "rgb(14, 151, 211)");
  }
}
