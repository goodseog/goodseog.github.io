import { vec2D } from "/static/js/Vector.js";
import Coord from "../../Coordinate.js";

export default class Line {
  constructor(frames, start0, start1, end0, end1, color, strokeZoom) {
    this.frames = frames;

    let sP0 = new vec2D(start0[0], start0[1]);
    let sP1 = new vec2D(start1[0], start1[1]);

    let eP0 = new vec2D(end0[0], end0[1]);
    let eP1 = new vec2D(end1[0], end1[1]);

    let sCenter = sP0.mul(0.5).add(sP1.mul(0.5));
    let eCenter = eP0.mul(0.5).add(eP1.mul(0.5));

    let sArm = sP0.sub(sCenter);
    let eArm = eP0.sub(eCenter);

    let sArmLen = sArm.length();
    let eArmLen = eArm.length();

    this.center = sCenter;
    this.arm = sArm;
    this.lengthRatio = eArmLen / sArmLen; // 1 to this.zoom
    this.vel = eCenter.sub(sCenter).div(this.frames);

    this.angleVel = ((sArm.unit().y < eArm.unit().y ? +1 : -1) * sArm.angleTo(eArm)) / this.frames;
    this.color = color;
    this.strokeZoom = strokeZoom;
  }

  redraw(ctx, frame) {
    ctx.beginPath();
    let drawCenter = this.center.add(this.vel.mul(this.easeIn(frame)));
    let zoomSize = 1 + ((this.lengthRatio - 1) * this.easeIn(frame)) / this.frames;
    let drawArm = this.arm.rotate(-this.angleVel * this.easeIn(frame)).mul(zoomSize);
    let drawStart = drawCenter.add(drawArm);
    let drawEnd = drawCenter.sub(drawArm);

    let s = Coord.getPos(drawStart);
    let e = Coord.getPos(drawEnd);

    ctx.moveTo(s.x, s.y);
    ctx.lineTo(e.x, e.y);
    ctx.lineCap = "round";
    if (this.strokeZoom !== undefined) {
      ctx.lineWidth = 1 + ((this.strokeZoom - 1) * this.easeIn(frame)) / this.frames;
    } else {
      ctx.lineWidth = zoomSize;
    }
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  easeIn(frame) {
    let easingLevel = 4;
    return frame ** (easingLevel + 1) / this.frames ** easingLevel;
  }
}
