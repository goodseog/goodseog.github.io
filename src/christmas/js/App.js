import { vec2D } from "/static/js/Vector.js";
import Tree from "./Tree.js";
import Flake from "./Flake.js";

let app;
let flakes = [];

class App {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    this.tree = new Tree(
      0,
      new vec2D(this.stageWidth / 2, this.stageHeight),
      this.stageHeight * 0.7
    );

    if (flakes.length == 0) {
      for (let i = 0; i < 100; i++) {
        flakes.push(new Flake(this.stageWidth, this.stageHeight));
      }
    }

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

    console.log(this.stageWidth, this.stageHeight, this.pixelRatio);
  }

  animate() {
    this.animId = window.requestAnimationFrame(this.animate.bind(this));
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
    flakes.forEach((flake) => flake.redraw(this.ctx, this.stageWidth, this.stageHeight));
  }
}

window.onresize = () => {
  app.onStop();
  app = new App();
};

window.onload = () => {
  app = new App();
};
