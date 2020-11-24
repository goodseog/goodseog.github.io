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

  isEnd(availRadius) {
    let moveTime = (Date.now() - this.createTime) / 1000; // seconds
    let minRadius = this.vel * moveTime - this.lambda * (this.waveCnt + 1);
    return minRadius > availRadius;
  }

  redraw2(ctx, availRadius) {
    let getColor = (opacity) => `rgba(0, 0, 0, ${opacity})`;
    let moveTime = (Date.now() - this.createTime) / 1000; // seconds
    let radius = this.vel * moveTime;

    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, radius, 0, 2 * Math.PI);

    let gradient = ctx.createRadialGradient(
      this.center.x,
      this.center.y,
      radius,
      this.center.x,
      this.center.y,
      0
    );

    for (let i = 0; radius - i * this.lambda > 0 && i < this.waveCnt; i++) {
      let startRadius = radius - i * this.lambda;
      let start = (i * this.lambda) / radius;
      let end = ((i + 1) * this.lambda) / radius;

      if (end <= 1) {
        gradient.addColorStop(start, getColor(0.0));
        gradient.addColorStop(0.5 * (start + end), getColor(this.highOpacity));
        gradient.addColorStop(end, getColor(0, 0));
      } else if (startRadius <= 0.5 * this.lambda) {
        let endOpacity = (this.highOpacity * startRadius) / (0.5 * this.lambda);
        gradient.addColorStop(start, getColor(0.0));
        gradient.addColorStop(1.0, getColor(endOpacity));
      } else {
        let highRatio = ((1 - start) * 0.5 * this.lambda) / startRadius;
        let endOpacity = this.highOpacity * (1 - 2 * highRatio);
        gradient.addColorStop(start, getColor(0.0));
        gradient.addColorStop(start + highRatio, getColor(this.highOpacity));
        gradient.addColorStop(1, getColor(endOpacity));
      }
    }

    ctx.fillStyle = gradient;
    ctx.fill();
  }

  redraw(ctx, availRadius) {
    let wCnt = 0;
    let getColor = (opacity) => `rgba(0, 0, 0, ${opacity})`;
    let moveTime = (Date.now() - this.createTime) / 1000; // seconds

    for (let radius = this.vel * moveTime; radius > 0; radius -= this.lambda) {
      if (++wCnt > this.waveCnt) {
        break;
      }
      if (radius <= availRadius) {
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
          gradient.addColorStop(
            (1 + startRatio) / 2,
            getColor(this.highOpacity)
          );
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
      }
    }
  }
}
