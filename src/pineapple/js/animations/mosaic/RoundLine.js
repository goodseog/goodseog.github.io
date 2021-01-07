import { easeInOutSine } from "/static/js/Animation.js";
import Coord from "../../Coordinate.js";
import { vec2D } from "/static/js/Vector.js";
import * as Colors from "../../Colors.js";

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
      .mul(0.5)
      .add(this.p1.mul(0.5))
      .add(new vec2D(1, -1).mul((gen * height) / 25));

    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.shifting = shifting;
    this.anim = Math.random() < 1 / 2 ? "fadeout" : "zoomout";
    this.popDir = vec2D.random();
    this.popZoom = 1.01;

    if (this.strokeStyle === Colors.ORANGE) {
      this.grd0 = this.p0.mul(2).add(this.p1.mul(-1));
      this.grd1 = this.p0.mul(-1).add(this.p1.mul(2));
      this.stop = (Math.random() + 1) / 3;
    }
  }

  redraw(ctx, frame) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = this.strokeStyle;
    if (frame < this.appear) {
      let progress = easeInOutSine((frame + 0.01) / this.appear);
      let start = this.p0
        .mul(progress)
        .add(this.appearAt.mul(1 - progress));
      let end = this.p1
        .mul(progress)
        .add(this.appearAt.mul(1 - progress));
      this.drawLine(ctx, start, end, this.lineWidth * progress, frame);
    } else if (frame - this.appear < this.stay) {
      let progress = (frame - this.appear) / this.stay;
      let totalMove = this.getTotalMove(progress);
      let start = this.p0.add(totalMove);
      let end = this.p1.add(totalMove);
      this.drawLine(ctx, start, end, this.lineWidth, frame);
    } else {
      let progress = (frame - this.appear - this.stay) / this.disappear;
      let totalMove = this.getTotalMove(1.0);
      let start = this.p0.add(totalMove);
      let end = this.p1.add(totalMove);

      let opacity, lineWidth;
      switch (this.anim) {
        case "fadeout":
          opacity = 1 - progress ** 0.3;
          lineWidth = this.lineWidth;
          break;
        case "zoomout":
          opacity = 1;
          lineWidth = this.lineWidth * (1 - progress);
          start = start
            .mul(1 - progress)
            .add(this.appearAt.mul(progress));
          end = end
            .mul(1 - progress)
            .add(this.appearAt.mul(progress));
          break;
      }
      this.drawLine(ctx, start, end, lineWidth, frame, opacity);
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

  drawLine(ctx, start, end, lineWidth, frame, opacity = 1.0) {
    ctx.beginPath();
    ctx.lineCap = "round";
    if (this.strokeStyle === Colors.ORANGE) {
      let stopMove = (0.1 * frame) / (this.appear + this.stay + this.disappear);
      let stop = this.stop + stopMove;
      let grd = ctx.createLinearGradient(
        this.grd0.x,
        this.grd0.y,
        this.grd1.x,
        this.grd1.y
      );
      grd.addColorStop(0.0, Colors.addOpacity(Colors.YELLOW, opacity));
      grd.addColorStop(stop, Colors.addOpacity(Colors.ORANGERED, opacity));
      grd.addColorStop(1.0, Colors.addOpacity(Colors.YELLOW, opacity));
      ctx.strokeStyle = grd;
    } else {
      ctx.strokeStyle = Colors.addOpacity(this.strokeStyle, opacity);
    }
    ctx.lineWidth = (lineWidth * Coord.getHeight()) / 600;
    ctx.moveTo(...start.toArray());
    ctx.lineTo(...end.toArray());
    ctx.stroke();
  }
}
