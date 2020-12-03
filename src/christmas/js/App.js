import { vec2D } from "/static/js/Vector.js";
import Tree from "./Tree.js";
import Flake from "./Flake.js";
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    this.tree = new Tree(
      0,
      new vec2D(this.stageWidth / 2, this.stageHeight),
      Math.max(800, this.stageHeight * 0.7)
    );

    this.flakes = [];
    for (let i = 0; i < 200; i++) {
      this.flakes.push(new Flake(this.stageWidth, this.stageHeight));
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    console.log(this.stageWidth, this.stageHeight, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    let stackHeight = 20;
    let grd = this.ctx.createLinearGradient(0, this.stageHeight, 0, this.stageHeight - stackHeight);
    grd.addColorStop(0, "white");
    grd.addColorStop(0.6, "white");
    grd.addColorStop(1, "black");
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, this.stageHeight - stackHeight, this.stageWidth, this.stageHeight);

    this.tree.redraw(this.ctx);
    this.flakes.forEach((flake) => flake.redraw(this.ctx, this.stageWidth, this.stageHeight));
  }
}

window.onload = () => {
  new App();
};
