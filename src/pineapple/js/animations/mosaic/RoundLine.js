import { easeInOutSine } from "/static/js/Animation.js";
import Coord from "../../Coordinate.js";
import * as Colors from "../../Colors.js";
import { vec2D } from "/static/js/Vector.js";

export default class RoundLine {
  constructor(appear, stay, disappear, ap0, ap1, lineWidth, strokeStyle, shifting) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear;
    this.p0 = Coord.getPos(ap0);
    this.p1 = Coord.getPos(ap1) || Coord.getPos(ap0);

    let ratio = 0.3 + Math.random() * 0.6;
    this.appearAt = this.p0.multiply(ratio).add(this.p1.multiply(1 - ratio));

    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;

    this.shifting = [
      [-0.2, -0.2],
      [+0.2, +0.2],
    ];
  }

  redraw(ctx, frame) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = this.strokeStyle;
    if (frame < this.appear) {
      let progress = easeInOutSine((frame + 0.01) / this.appear);
      let start = this.p0.multiply(progress).add(this.appearAt.multiply(1 - progress));
      let end = this.p1.multiply(progress).add(this.appearAt.multiply(1 - progress));
      ctx.lineWidth = this.lineWidth * progress;
      ctx.moveTo(...start.toArray());
      ctx.lineTo(...end.toArray());
      ctx.stroke();
    } else if (frame - this.appear < this.stay) {
      let progress = (frame - this.appear) / this.stay;
      let totalMove = [0, 0];
      this.shifting.forEach((move, idx) => {
        let ratio = Math.min(1, Math.max(progress * this.shifting.length - idx, 0));
        ratio = easeInOutSine(ratio);
        totalMove[0] += ratio * move[0];
        totalMove[1] += ratio * move[1];
      });
      // console.log(totalMove)
      totalMove = Coord.scale(totalMove);

      ctx.lineWidth = this.lineWidth;
      ctx.moveTo(...this.p0.add(totalMove).toArray());
      ctx.lineTo(...this.p1.add(totalMove).toArray());
      ctx.stroke();
    }
  }
}
