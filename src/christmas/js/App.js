import { vec2D } from "/static/js/Vector.js";
import Tree from "./Tree.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.trees = [
      new Tree(0, new vec2D(100, 400), 400),
      // new Tree(1000, new vec2D(220, 500), 200),
      // new Tree(2000, new vec2D(340, 500), 100),
    ];

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
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
    this.trees.forEach((tree) => tree.redraw(this.ctx));
  }
}

window.onload = () => {
  new App();
};
