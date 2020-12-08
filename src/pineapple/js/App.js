import Waves from "./Waves.js";
import Coord from "./Coordinate.js";
let app;

class App {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.waves = new Waves();
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.animId = window.requestAnimationFrame(this.animate.bind(this));
  }

  onStop() {
    window.cancelAnimationFrame(this.animId);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    Coord.resize(this.stageWidth * this.pixelRatio, this.stageHeight * this.pixelRatio);
  }

  animate() {
    this.animId = window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.waves.redraw(this.ctx);
  }
}

window.onload = () => {
  app = new App();
};
