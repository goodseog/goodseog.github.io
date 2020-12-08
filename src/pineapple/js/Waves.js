import Coord from "./Coordinate.js";

export default class Waves {
  constructor() {
    console.log(pointMove(32));
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
      ctx.lineWidth = 2;
      ctx.strokeStyle = color || "black";
      ctx.stroke();
    };

    // const image = new Image(150, 150);
    // image.src = "./apple.png";
    // let center = Coord.getPos(0, 0);
    // ctx.drawImage(image, center[0] - 75, center[1] - 75, 150, 150);

    line(Coord.getPos(0.0689, 0.3167), Coord.getPos(0.1267, 0.3167), "rgb(115, 185, 68)");
    line(Coord.getPos(0.0278, 0.2778), Coord.getPos(0.1222, 0.2778), "rgb(115, 185, 68)");
    line(Coord.getPos(0, 0.2389), Coord.getPos(0.1, 0.2389), "rgb(115, 185, 68)");
    line(Coord.getPos(-0.0111, 0.2), Coord.getPos(0.0611, 0.2), "rgb(115, 185, 68)");
    line(Coord.getPos(-0.2111, 0.1333), Coord.getPos(0.2167, 0.1333), "rgb(115, 185, 68)");
    line(Coord.getPos(-0.2444, 0.0889), Coord.getPos(0.2611, 0.0889), "rgb(247, 194, 22)");
    line(Coord.getPos(-0.2667, 0.0444), Coord.getPos(0.2711, 0.0444), "rgb(247, 194, 22)");
    line(Coord.getPos(-0.2744, 0), Coord.getPos(0.2744, 0), "rgb(231, 142, 36)");
    line(Coord.getPos(-0.2722, -0.0444), Coord.getPos(0.2722, -0.0444), "rgb(231, 142, 36)");
    line(Coord.getPos(-0.2656, -0.0889), Coord.getPos(0.2656, -0.0889), "rgb(204, 51, 56)");
    line(Coord.getPos(-0.2578, -0.1333), Coord.getPos(0.2611, -0.1333), "rgb(204, 51, 56)");
    line(Coord.getPos(-0.24, -0.1778), Coord.getPos(0.24, -0.1778), "rgb(144, 46, 125)");
    line(Coord.getPos(-0.2167, -0.2222), Coord.getPos(0.2167, -0.2222), "rgb(144, 46, 125)");
    line(Coord.getPos(-0.1867, -0.2667), Coord.getPos(0.1867, -0.2667), "rgb(14, 151, 211)");
    line(Coord.getPos(-0.1444, -0.3111), Coord.getPos(-0.0667, -0.3111), "rgb(14, 151, 211)");
    line(Coord.getPos(0.0778, -0.3111), Coord.getPos(0.1444, -0.3111), "rgb(14, 151, 211)");
  }
}

function pointMove(frames) {
  let curr = 0.0;
  let vels = [0.0];
  let endFrames = 6;
  while (vels.length < frames - endFrames) {
    let next = curr + (Math.random() - 0.5) * 0.1;
    if (next > 0) {
      vels.push(next);
      curr = next;
    }
  }

  for (let i = 0; i < endFrames; i++) {
    vels.push((curr * (endFrames - 1 - i)) / endFrames);
  }
  return vels;
}
