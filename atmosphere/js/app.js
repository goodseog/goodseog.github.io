import { Wall } from "./wall.js";
import { Ball } from "./ball.js";
import { Block } from "./block.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.objs = [];

    window.addEventListener("resize", this.resize.bind(this), false);
    this.initObjs();
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  initObjs() {
    this.objs.push(new Wall(0, 0, 0, this.stageHeight));
    this.objs.push(new Wall(0, this.stageHeight, this.stageWidth, this.stageHeight));
    this.objs.push(new Wall(this.stageWidth, this.stageHeight, this.stageWidth, 0));
    this.objs.push(new Wall(this.stageWidth, 0, 0, 0));
    this.objs.push(new Block(300,300, 500, 300));
    this.objs.push(new Ball(30, 30, 30, 5, 5));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.objs[0].setPos(0, 0, 0, this.stageHeight);
    this.objs[1].setPos(0, this.stageHeight, this.stageWidth, this.stageHeight);
    this.objs[2].setPos(this.stageWidth, this.stageHeight, this.stageWidth, 0);
    this.objs[3].setPos(this.stageWidth, 0, 0, 0);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.objs.forEach((obj) => obj.move());
    for (var i = 0; i < this.objs.length - 1; i++) {
      for (var j = i + 1; j < this.objs.length; j++) {
        this.objs[i].collision(this.objs[j]);
      }
    }
    this.objs.forEach((obj) => obj.redraw(this.ctx));
  }
}

window.onload = () => {
  new App();
};
