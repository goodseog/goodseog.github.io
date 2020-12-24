import { easeInOutSine } from "/static/js/Animation.js";
import Coord from "../../Coordinate.js";
import { vec2D } from "/static/js/Vector.js";

export default class RoundLine {
  constructor(
    appear,
    stay,
    disappear,
    ap0,
    dx,
    lineWidth,
    strokeStyle,
    shifting
  ) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear;
    this.p0 = Coord.getPos(ap0);
    this.p1 = Coord.getPos(ap0.map((a) => a + dx));

    let gen = 2 * Math.random() - 1;
    let height = Coord.getHeight();
    this.appearAt = this.p0
      .multiply(0.5)
      .add(this.p1.multiply(0.5))
      .add(new vec2D(1, -1).multiply((gen * height) / 25));

    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.shifting = shifting;
  }

  redraw(ctx, frame) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = this.strokeStyle;
    if (frame < this.appear) {
      let progress = easeInOutSine((frame + 0.01) / this.appear);
      let start = this.p0
        .multiply(progress)
        .add(this.appearAt.multiply(1 - progress));
      let end = this.p1
        .multiply(progress)
        .add(this.appearAt.multiply(1 - progress));
      this.drawLine(ctx, start, end, this.lineWidth * progress);
    } else if (frame - this.appear < this.stay) {
      let progress = (frame - this.appear) / this.stay;
      let totalMove = [0, 0];
      this.shifting.forEach((move, idx) => {
        let ratio = Math.min(
          1,
          Math.max(progress * this.shifting.length - idx, 0)
        );
        ratio = easeInOutSine(ratio);
        totalMove[0] += ratio * move[0];
        totalMove[1] += ratio * move[1];
      });
      totalMove = Coord.scale(totalMove);
      let start = this.p0.add(totalMove);
      let end = this.p1.add(totalMove);
      this.drawLine(ctx, start, end, this.lineWidth);
    }
  }

  drawLine(ctx, start, end, lineWidth) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = (lineWidth * Coord.getHeight()) / 600;
    ctx.moveTo(...start.toArray());
    ctx.lineTo(...end.toArray());
    ctx.stroke();
  }
}
