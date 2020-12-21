import * as Colors from "../../Colors.js";
import Coord from "../../Coordinate.js";

const eps = 1;
const pointRadius = 3.5;
const lineWidth = 1.5;
export default class Snake {
  constructor(paths, start, lineDash, gradient, endStyle) {
    this.paths = paths;
    this.start = start;
    this.endStyle = endStyle;

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

  move(dist, isEndding) {
    
    this.positions = this.positions.map((point) => point + dist);
    if (!isEndding && this.positions.length <= this.snakeLen) {
      let newPos = this.start === 0 ? 0 : this.pathLenCumsum[this.start - 1];
      this.positions.unshift(newPos);

      let ratio = this.positions.length / this.snakeLen;
      let ldrIndex = this.lineDashRange.findIndex((ldr) => ldr > ratio);
      let color = Colors.getColorAt(this.gradient, ratio);
      let newColor = (ldrIndex > 0 && ldrIndex & 1) === 1 ? "transparent" : color;
      this.colors.unshift(newColor);
    }

    if (isEndding) {
      if (this.endStyle === "pop") {
        this.positions.pop();
        this.colors.pop();
      } else if (this.endStyle === "shift") {
        this.positions.shift();
        this.colors.shift();
      }
    }
  }

  redraw(ctx, zoom) {
    // console.log(this.positions)
    // this.positions.map((pos) => this.getPoint(pos));
    zoom = zoom || 1.0;
    let center = Coord.getPos([0, 0]);
    let points = this.positions
      .map((pos) => this.getPoint(pos))
      .map((pos) => pos.subtract(center).multiply(zoom).add(center));
    this.drawPoints(ctx, points, zoom);
  }

  drawPoints(ctx, points, zoom) {
    points.forEach((p, idx) => {
      let color = this.colors[idx];
      if (idx == points.length - 1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, pointRadius * zoom, 0, 2 * Math.PI);
        ctx.fillStyle = color || Colors.ORANGE;
        ctx.fill();

        let args = [p.x, p.y, pointRadius * zoom + lineWidth / 2, 0, 2 * Math.PI];
        this.drawArc(ctx, args, zoom);
      } else if (!(idx & 1) && color !== "transparent") {
        if (idx == 0 || this.colors[idx - 1] == "transparent") {
          let args = [p.x, p.y, pointRadius * zoom + lineWidth / 2, 0, 2 * Math.PI];
          this.drawArc(ctx, args, zoom);
        } else {
          let prev = points[idx - 1];
          let angle = p.subtract(prev).toAngles();
          let args = [
            p.x,
            p.y,
            pointRadius * zoom + lineWidth / 2,
            angle - Math.PI / 2,
            angle + Math.PI / 2,
          ];
          this.drawArc(ctx, args, zoom);
        }

        if (idx < points.length - 1) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(points[idx + 1].x, points[idx + 1].y);
          ctx.lineWidth = 2 * pointRadius * zoom;
          ctx.lineCap = "round";
          ctx.strokeStyle = color || Colors.ORANGE;
          ctx.stroke();
        }
      }
    });
  }

  drawArc(ctx, args, zoom) {
    ctx.beginPath();
    ctx.arc(...args);
    ctx.lineWidth = lineWidth * zoom;
    ctx.strokeStyle = "black";
    ctx.stroke();
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
