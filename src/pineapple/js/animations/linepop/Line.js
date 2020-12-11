import { vec2D } from "/static/js/Vector.js";
import { FRAMES } from "./LinePop.js";
import Coord from "../../Coordinate.js";

export default class Line {
  constructor(start0, start1, end0, end1, color, strokeZoom) {
    let sP0 = new vec2D(start0[0], start0[1]);
    let sP1 = new vec2D(start1[0], start1[1]);

    let eP0 = new vec2D(end0[0], end0[1]);
    let eP1 = new vec2D(end1[0], end1[1]);

    let sCenter = sP0.multiply(0.5).add(sP1.multiply(0.5));
    let eCenter = eP0.multiply(0.5).add(eP1.multiply(0.5));

    let sArm = sP0.subtract(sCenter);
    let eArm = eP0.subtract(eCenter);

    let sArmLen = sArm.length();
    let eArmLen = eArm.length();

    this.center = sCenter;
    this.arm = sArm;
    this.lengthRatio = eArmLen / sArmLen; // 1 to this.zoom
    this.vel = eCenter.subtract(sCenter).divide(FRAMES);

    this.angleVel = ((sArm.unit().y < eArm.unit().y ? +1 : -1) * sArm.angleTo(eArm)) / FRAMES;
    this.color = color;
    this.strokeZoom = strokeZoom;
  }

  redraw(ctx, frame) {
    ctx.beginPath();
    let drawCenter = this.center.add(this.vel.multiply(easeIn(frame)));
    let zoomSize = 1 + ((this.lengthRatio - 1) * easeIn(frame)) / FRAMES;
    let drawArm = this.arm.rotate(-this.angleVel * easeIn(frame)).multiply(zoomSize);
    let drawStart = drawCenter.add(drawArm);
    let drawEnd = drawCenter.subtract(drawArm);

    let s = Coord.getPos(drawStart);
    let e = Coord.getPos(drawEnd);

    ctx.moveTo(s.x, s.y);
    ctx.lineTo(e.x, e.y);
    ctx.lineCap = "round";
    if (this.strokeZoom !== undefined) {
      ctx.lineWidth = 1 + ((this.strokeZoom - 1) * easeIn(frame)) / FRAMES;
    } else {
      ctx.lineWidth = zoomSize;
    }
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

function easeIn(frame) {
  let easingLevel = 4;
  return frame ** (easingLevel + 1) / FRAMES ** easingLevel;
}
