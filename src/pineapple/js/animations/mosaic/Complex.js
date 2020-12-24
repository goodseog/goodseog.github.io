import Coord from "../../Coordinate.js";
import { easeInOutSine, easeInPower } from "/static/js/Animation.js";
import { vec2D } from "/static/js/Vector.js";

export default class Complex {
  constructor(appear, stay, disappear, position, size, color) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear;
    this.position = Coord.getPos(position);
    this.size = Coord.scale([0, size]).length();
    this.color = color;
  }

  redraw(ctx, frame) {
    if (frame < this.appear) {
      let progress = (frame + 1e-10) / this.appear;
      let curSize = this.size * easeInOutSine(progress);
      let grd = this.getGradient(ctx, progress);
      this.drawComplexObj(ctx, curSize, grd);
    } else if (frame < this.appear + this.stay) {
      this.drawComplexObj(ctx, this.size, this.color);
    }
  }

  getGradient(ctx, progress) {
    const trans = "transparent";

    let s = this.position.add(new vec2D(-this.size, +this.size));
    let e = this.position.add(new vec2D(+this.size, -this.size));
    let grd = ctx.createLinearGradient(s.x, s.y, e.x, e.y);

    let pow = 3;
    let colorStart = 1.0 - easeInPower(progress, pow);
    let colorEnd = colorStart + easeInPower(1-colorStart, pow);

    grd.addColorStop(0.0, trans);
    grd.addColorStop(Math.max(0, colorStart - 0.3), trans);
    grd.addColorStop(colorStart, this.color);
    grd.addColorStop(colorEnd, this.color);
    grd.addColorStop(Math.min(1, colorEnd + 0.2), trans);
    grd.addColorStop(1, trans);
    return grd;
  }

  drawComplexObj(ctx, size, fillStyle) {
    let p = this.position.add(new vec2D(-size * 0.75, +size * 0.05));
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(...p.toArray());
    p = this.drawLine(ctx, p, size, +0.7);
    p = this.drawArcc(ctx, p, size, +0.07, false);
    p = this.drawLine(ctx, p, size, -0.05);
    p = this.drawArcc(ctx, p, size, +0.03, true);
    p = this.drawLine(ctx, p, size, +0.2);
    p = this.drawArcc(ctx, p, size, +0.1, false);
    p = this.drawLine(ctx, p, size, -0.1);
    p = this.drawArcc(ctx, p, size, +0.03, true);
    p = this.drawLine(ctx, p, size, +0.23);
    p = this.drawArcc(ctx, p, size, +0.04, false);
    p = this.drawLine(ctx, p, size, -0.06);
    p = this.drawArcc(ctx, p, size, +0.06, true);
    p = this.drawLine(ctx, p, size, +0.08);
    p = this.drawArcc(ctx, p, size, +0.06, false);
    p = this.drawLine(ctx, p, size, -0.2);
    p = this.drawArcc(ctx, p, size, +0.03, true);
    p = this.drawLine(ctx, p, size, +0.16);
    p = this.drawArcc(ctx, p, size, +0.08, false);
    p = this.drawLine(ctx, p, size, -0.4);
    p = this.drawArcc(ctx, p, size, +0.04, true);
    p = this.drawLine(ctx, p, size, +0.1);
    p = this.drawArcc(ctx, p, size, +0.08, false);
    p = this.drawLine(ctx, p, size, -0.14);
    p = this.drawArcc(ctx, p, size, +0.04, true);
    p = this.drawLine(ctx, p, size, +0.14);
    p = this.drawArcc(ctx, p, size, +0.08, false);
    p = this.drawLine(ctx, p, size, -0.48);
    p = this.drawArcc(ctx, p, size, -0.12, false);
    p = this.drawLine(ctx, p, size, +0.06);
    p = this.drawArcc(ctx, p, size, -0.03, true);
    p = this.drawLine(ctx, p, size, -0.2);
    p = this.drawArcc(ctx, p, size, -0.08, false);
    p = this.drawLine(ctx, p, size, +0.06);
    p = this.drawArcc(ctx, p, size, -0.04, true);
    p = this.drawLine(ctx, p, size, -0.2);
    p = this.drawArcc(ctx, p, size, -0.08, false);
    p = this.drawLine(ctx, p, size, +0.04);
    p = this.drawArcc(ctx, p, size, -0.03, true);
    p = this.drawLine(ctx, p, size, -0.03);
    p = this.drawArcc(ctx, p, size, -0.06, false);
    p = this.drawLine(ctx, p, size, +0.1);
    p = this.drawArcc(ctx, p, size, -0.04, true);
    p = this.drawLine(ctx, p, size, -0.06);
    p = this.drawArcc(ctx, p, size, -0.1, false);
    p = this.drawLine(ctx, p, size, +0.2);
    p = this.drawArcc(ctx, p, size, -0.05, true);
    p = this.drawLine(ctx, p, size, -0.12);
    p = this.drawArcc(ctx, p, size, -0.11, false);
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  drawLine(ctx, p, size, ratio) {
    let dx = size * ratio;
    p = p.add(new vec2D(dx, -dx));
    ctx.lineTo(...p.toArray());
    return p;
  }

  drawArcc(ctx, p, size, ratio, anticlockwise) {
    let dx = size * ratio;
    let down = dx >= 0;
    let move = new vec2D(dx, dx);
    let center = p.add(move.multiply(0.5));
    let startAngle = down ? Math.PI * 1.25 : Math.PI * 0.25;
    let endAngle = down ? Math.PI * 0.25 : Math.PI * 1.25;
    p = p.add(move);
    ctx.arc(
      center.x,
      center.y,
      move.length() / 2,
      startAngle,
      endAngle,
      anticlockwise
    );
    return p;
  }
}
