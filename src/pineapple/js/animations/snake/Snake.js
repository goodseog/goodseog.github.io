import Coord from "../../Coordinate.js";
import { vec2D } from "/static/js/Vector.js";
import * as Colors from "../../Colors.js";

export default class Snake {
  constructor(frames, start, points, length, gradient) {
    this.start = frames * start;
    this.points = points.map((point) => Coord.getPos(new vec2D(...point)))
    smoothing(this.points, frames * (1 - start));
    this.length = length;
    this.front = 0;
  }

  redraw(ctx, frame) {
    if (frame >= this.start) {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineWidth = 10;

      ctx.moveTo(...this.points[0].toArray());
      this.points.forEach((point) => {
        ctx.lineTo(...point.toArray());
      });

      ctx.stroke();
    }
  }
}

function smoothing(points, frames) {
  console.log(points, frames)
  let lineDists = points.slice(1).map((p1, i) => {
    let p0 = points[i];
    return p0.subtract(p1).length();
  });
  const cumsum = (sum => value => sum += value)(0);
  let lineDistCumsum = lineDists.map(cumsum)
  lineDistCumsum.unshift(-1e-10)
  let totalDist = lineDistCumsum[lineDistCumsum.length-1];
  let stops = Array.from(new Array(frames).keys()).map(
    (idx) => totalDist * parametricBlend(idx, frames-1)
  );
    
  stops = stops.map((stop) => {
    let pointIdx = lineDistCumsum.findIndex((dist) => dist >= stop);
    console.log(stop, pointIdx, lineDistCumsum[pointIdx])
    return {
      index: pointIdx,
      at: stop - lineDistCumsum[pointIdx],
    }
  })
  console.log(lineDistCumsum, stops)
}

function parametricBlend(current, total) {
  let alpha = 2.0
  let t = current / total;
  let sqt = t ** alpha;
  let msqt = (1-t) ** alpha;
  return sqt / (sqt + msqt);
}