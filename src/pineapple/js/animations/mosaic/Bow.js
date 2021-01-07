import { easeInOutSine } from "/static/js/Animation.js";
import Coord from "../../Coordinate.js";
import * as Colors from "../../Colors.js";

export default class Bow {
  constructor(
    appear,
    stay,
    disappear,
    ap0,
    dx,
    lineWidth,
    strokeStyle,
    shifting,
    upper = true
  ) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear;

    this.p0 = Coord.getPos(ap0);
    this.p1 = Coord.getPos(ap0.map((a) => a + dx));

    let ratio = 0.3 + Math.random() * 0.6;
    this.appearAt = this.p0.mul(ratio).add(this.p1.mul(1 - ratio));

    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;

    this.shifting = shifting;

    this.upper = upper;
  }

  redraw(ctx, frame) {
    if (frame < this.appear) {
      let progress = easeInOutSine((frame + 0.01) / this.appear);
      let start = this.p0
        .mul(progress)
        .add(this.appearAt.mul(1 - progress));
      let end = this.p1
        .mul(progress)
        .add(this.appearAt.mul(1 - progress));
      this.drawArcs(ctx, start, end, this.lineWidth * progress);
    } else if (frame - this.appear < this.stay) {
      let progress = (frame - this.appear) / this.stay;
      let totalMove = this.getTotalMove(progress);
      let start = this.p0.add(totalMove);
      let end = this.p1.add(totalMove);
      this.drawArcs(ctx, start, end, this.lineWidth);
    } else {
      let progress = (frame - this.appear - this.stay) / this.disappear;
      let totalMove = this.getTotalMove(1.0);
      let start = this.p0.add(totalMove);
      let end = this.p1.add(totalMove);
      let opacity = 1 - progress;
      let lineWidth = this.lineWidth * (1 - progress);
      start = start
        .mul(1 - progress)
        .add(this.appearAt.mul(progress));
      end = end.mul(1 - progress).add(this.appearAt.mul(progress));
      this.drawArcs(ctx, start, end, lineWidth, frame, opacity);
    }
  }

  getTotalMove(progress) {
    let totalMove = [0, 0];
    this.shifting.forEach((move, idx) => {
      let ratio = Math.min(
        1,
        Math.max(progress * this.shifting.length - idx, 0)
      );
      ratio = easeInOutSine(ratio);
      totalMove[0] += ratio * move;
      totalMove[1] += ratio * move;
    });
    totalMove = Coord.scale(totalMove);
    return totalMove;
  }

  drawArcs(ctx, start, end, lineWidth, opacity = 1.0) {
    let ratios = [0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
    if (!this.upper) {
      ratios = ratios.map((ratio) => Math.abs(ratio - 0.5) + 0.5);
    }

    ratios.forEach((ratio) => {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.strokeStyle = Colors.addOpacity(this.strokeStyle, opacity);
      ctx.lineWidth = (lineWidth * Coord.getHeight()) / 600;
      ctx.moveTo(...start.toArray());

      ctx.quadraticCurveTo(
        (1 - ratio) * start.x + ratio * end.x,
        ratio * start.y + (1 - ratio) * end.y,
        end.x,
        end.y
      );
      ctx.stroke();
    });
  }
}
