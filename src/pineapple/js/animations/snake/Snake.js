import Coord from "../../Coordinate.js";
import { vec2D } from "/static/js/Vector.js";
import * as Colors from "../../Colors.js";



export default class Snake {
  constructor(frames, start, points, lineDash, gradient) {
    this.frames = frames;
    this.start = parseInt(frames * start);
    this.points = points.map((point) => Coord.getPos(new vec2D(...point)));
    this.points = smoothing(this.points, this.frames - this.start);

    this.colors = [];
    let eachFrames = parseInt(frames / (gradient.length - 1));
    for (let i = 0; i < gradient.length - 1; i++) {
      this.colors = this.colors.concat(Colors.gradient(gradient[i], gradient[i + 1], eachFrames));
    }

    let lineDashSum = lineDash.reduce((a,b) => a + b);
    const cumsum = ((sum) => (value) => (sum += value))(0);
    lineDash = lineDash.map(cumsum).map((len) => parseInt(len / lineDashSum * frames));
    for (let i = 0; i < lineDash.length; i += 2) {
      let start = lineDash[i]
      let end = lineDash[i+1]
      for (let j = start; j < end; j++) {
        this.colors[j] = "transparent"
      }
    }
  }

  redraw(ctx, frame) {
    let currFrame = frame - this.start;
    if (currFrame >= 0) {
      this.points.slice(0, currFrame+1).forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.at.x, p.at.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = this.colors[currFrame - 1 - idx];
        ctx.fill();
      })
    }
  }
}

function smoothing(points, frames) {
  let lineDists = points.slice(1).map((p1, i) => {
    let p0 = points[i];
    return p0.subtract(p1).length();
  });
  
  const cumsum = ((sum) => (value) => (sum += value))(0);
  let lineDistCumsum = lineDists.map(cumsum);
  lineDistCumsum.unshift(-1e-10);
  let totalDist = lineDistCumsum[lineDistCumsum.length - 1];
  let stops = Array.from(new Array(frames).keys()).map(
    (idx) => totalDist * easeBoth(idx, frames - 1)
    // (idx) => totalDist * parametricBlend(idx, frames - 1)
  );

  stops = stops.map((stop) => {
    let index = lineDistCumsum.findIndex((dist) => dist >= stop) - 1;
    let ratio = (stop - lineDistCumsum[index]) / lineDists[index];
    let at = points[index].multiply(1 - ratio).add(points[index + 1].multiply(ratio));
    return { index, at };
  });
  return stops;
}

function easeIn(current, total) {}

function easeBoth(current, total) {
  let t = current / total;
  let dt = 0.1;
  let vel = 1 / (1 - dt);
  if (t < dt) {
    return (0.5 * vel * t * t) / dt;
  } else if (t < 1 - dt) {
    return 0.5 * vel * dt + vel * (t - dt);
  } else {
    return 1 - (0.5 * vel * (1 - t) * (1 - t)) / dt;
  }
}

function parametricBlend(current, total) {
  let alpha = 1.05;
  let t = current / total;
  let sqt = t ** alpha;
  let msqt = (1 - t) ** alpha;
  return sqt / (sqt + msqt);
}
