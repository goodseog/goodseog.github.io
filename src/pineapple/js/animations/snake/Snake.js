import Coord from "../../Coordinate.js";
import { vec2D } from "/static/js/Vector.js";
import * as Colors from "../../Colors.js";

export default class Snake {
  constructor(paths, start, lineDash, gradient) {
    this.paths = paths;
    this.start = start;

    let cumsum = ((sum) => (num) => (sum += num))(0);
    this.pathLenCumsum = this.paths
      .slice(1)
      .concat(this.paths.slice(0, 1))
      .map((p, idx) => this.paths[idx].subtract(p).length())
      .map(cumsum);

    cumsum = ((sum) => (num) => (sum += num))(0);
    this.lineDash = lineDash;
    this.lineDashRange = lineDash.map(cumsum);
    this.snakeLen = this.lineDashRange[this.lineDashRange.length - 1];
    this.lineDashRange = this.lineDashRange.map((s) => s / this.snakeLen);

    this.gradient = gradient;

    this.positions = [];
    this.colors = [];
  }

  init() {
    this.positions = [];
    this.colors = [];
  }

  move(dist) {
    this.positions = this.positions.map((point) => point + dist);
    let currDist = Math.abs(this.positions[this.positions.length - 1] - this.positions[0]) || 0;
    if (this.positions.length <= 1 || currDist < this.snakeLen) {
      let newPos = this.start === 0 ? 0 : this.pathLenCumsum[this.start - 1];
      this.positions.unshift(newPos);

      let ratio = currDist / this.snakeLen;
      console.log(ratio)
      let color = Colors.getColorAt(this.gradient, ratio);
      let ldrIndex = this.lineDashRange.findIndex((ldr) => ldr > ratio);
      this.colors.unshift(ldrIndex & (1 === 1) ? "transparent" : color);
    }
  }

  redraw(ctx) {
    // console.log(this.positions)
    // this.positions.map((pos) => this.getPoint(pos));
    const pointRadius = 3.5;
    const lineWidth = 1.5;
    this.positions
      .map((pos) => this.getPoint(pos))
      .forEach((point, idx) => {
        let color = this.colors[idx];
        if (color !== "transparent") {
          ctx.beginPath();
          ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
          ctx.fillStyle = color || Colors.ORANGE;
          ctx.fill();

          if (idx == 0 || idx == this.positions.length - 1) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, pointRadius + lineWidth / 2, 0, 2 * Math.PI);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = "black";
            ctx.stroke();
          }
        }
      });
  }

  getPoint(pos) {
    let totalPathLen = this.pathLenCumsum[this.pathLenCumsum.length - 1];
    while (pos < 0) pos += totalPathLen;
    while (pos >= totalPathLen) pos -= totalPathLen;

    let sidx = this.pathLenCumsum.findIndex((cumsum) => cumsum > pos);
    let eidx = (sidx + 1) % this.paths.length;
    let ratio =
      sidx === 0
        ? pos / this.pathLenCumsum[0]
        : (pos - this.pathLenCumsum[sidx - 1]) /
          (this.pathLenCumsum[sidx] - this.pathLenCumsum[sidx - 1]);
    return this.paths[sidx].multiply(1 - ratio).add(this.paths[eidx].multiply(ratio));
  }
}
