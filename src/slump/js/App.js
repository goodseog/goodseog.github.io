import { vec2D } from "/static/js/Vector.js";

class App {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.wavePoints = [];

    window.addEventListener("resize", this.resize.bind(this), false);
    window.addEventListener("click", this.click.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  click(evt) {
    console.log(evt.clientX, evt.clientY);
    this.wavePoints.push({
      pos: { x: evt.clientX, y: evt.clientY },
    });
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  }
}

window.onload = () => {
  new App();
};
