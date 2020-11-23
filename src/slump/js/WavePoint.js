import { vec2D } from "/static/js/Vector.js";

export default class WavePoint {
  constructor(x, y) {
    this.center = new vec2D(x, y);
    this.createTime = Date.now();
    this.vel = 200;
    this.lambda = 130;

    this.waveCnt = 10;
    this.highOpacity = 0.1;
  }

  redraw(ctx, maxRadius) {
    let wCnt = 0;
    let getColor = (opacity) => `rgba(0, 0, 0, ${opacity})`;
    let moveTime = (Date.now() - this.createTime) / 1000; // seconds

    for (let radius = this.vel * moveTime; radius > 0; radius -= this.lambda) {
      if (++wCnt > this.waveCnt) {
        break;
      }
      if (radius <= maxRadius) {
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, radius, 0, 2 * Math.PI);

        let gradient = ctx.createRadialGradient(
          this.center.x,
          this.center.y,
          0,
          this.center.x,
          this.center.y,
          radius
        );
        if (radius > this.lambda) {
          let startRatio = (radius - this.lambda) / radius;
          gradient.addColorStop(0, getColor(0.0));
          gradient.addColorStop(startRatio, getColor(0.0));
          gradient.addColorStop((1 + startRatio) / 2, getColor(this.highOpacity));
          gradient.addColorStop(1, getColor(0.0));
        } else if (radius < 0.5 * this.lambda) {
          let opacity = (this.highOpacity * radius) / (0.5 * this.lambda);
          gradient.addColorStop(0, getColor(opacity));
          gradient.addColorStop(1, getColor(0.0));
        } else {
          let highRatio = (radius - 0.5 * this.lambda) / radius;
          let opacity = this.highOpacity * (1 - 2 * highRatio);
          gradient.addColorStop(0, getColor(opacity));
          gradient.addColorStop(highRatio, getColor(this.highOpacity));
          gradient.addColorStop(1, getColor(0.0));
        }

        ctx.fillStyle = gradient;
        ctx.fill();
        // ctx.stroke();
      }
    }
  }
}
