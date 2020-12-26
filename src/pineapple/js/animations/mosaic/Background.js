import Coord from "../../Coordinate.js";
import { AppleSnakeBody as ASB } from "../../Data.js";
import { addOpacity } from "../../Colors.js";
import { easeInOutSine } from "/static/js/Animation.js";

export default class Background {
  constructor(appear, stay, disappear, center, color, delay) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear;
    this.center = Coord.getPos(center);
    this.color = color;
    this.paths = ASB.map((p) => Coord.getPos(p));
    this.delay = delay;
  }

  redraw(ctx, frame) {
    if (frame < this.appear + this.stay) {
      let delay = this.stay * 0.03;
      let progress = frame / (this.appear + delay);
      ctx.moveTo(this.paths[0].x, this.paths[0].y);
      this.paths.slice(1).forEach((path) => ctx.lineTo(path.x, path.y));
      ctx.fillStyle = addOpacity(this.color, this.customEase(progress) * 0.3);
      ctx.fill();
    } else {
      let progress = (frame - this.appear - this.stay) / this.disappear;
      let x = progress - this.delay;
      let opacity = x < 0 ? 1 : Math.max(1 - (3 * x) ** 0.5, 0);
      let zoom = x < 0 ? 1 : Math.exp(-x);
      let paths = this.paths.map((path) => Coord.getZoom(path, zoom));
      ctx.moveTo(paths[0].x, paths[0].y);
      paths.slice(1).forEach((path) => ctx.lineTo(path.x, path.y));
      ctx.fillStyle = addOpacity(this.color, opacity);
      ctx.fill();
    }
  }

  customEase(x) {
    let pow = 20;
    let thres = 0.7;
    let pthres = thres ** pow;
    let ans =
      x < thres
        ? x ** pow
        : ((1 - pthres) / (1 - thres)) * (x - thres) + pthres;
    return ans;
  }
}
