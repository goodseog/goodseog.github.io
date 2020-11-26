import Wall from "./Wall.js";
import Ball from "./Ball.js";
import Block from "./Block.js";
import collision from "./Collision.js";
import * as Util from "/static/js/Util.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.objs = [];
    this.rowCnt = 15;
    this.vel = 0.5;
    this.size = 5;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.initWorld();
    this.resize();
    this.initObjs();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  initWorld() {
    this.objs.push(new Wall(0, 0, 0, 0));
    this.objs.push(new Wall(0, 0, 0, 0));
    this.objs.push(new Wall(0, 0, 0, 0));
    this.objs.push(new Wall(0, 0, 0, 0));
  }

  resizeWorld() {
    this.objs[0].setPos(0, 0, 0, this.stageHeight);
    this.objs[1].setPos(0, this.stageHeight, this.stageWidth, this.stageHeight);
    this.objs[2].setPos(this.stageWidth, this.stageHeight, this.stageWidth, 0);
    this.objs[3].setPos(this.stageWidth, 0, 0, 0);
  }

  initObjs() {
    // this.objs.push(new Block(300,300, 500, 300));

    let width = this.stageWidth;
    let height = this.stageHeight;
    for (let w = 0; w < this.rowCnt; w++) {
      for (let h = 0; h < this.rowCnt; h++) {
        let angle = 2 * Math.random() * Math.PI;
        this.objs.push(
          new Ball(
            (width / this.rowCnt) * (w + 0.5),
            (height / this.rowCnt) * (h + 0.5),
            this.size,
            this.vel * Math.cos(angle),
            this.vel * Math.sin(angle),
            Util.getRandomColor()
          )
        );
      }
    }
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.resizeWorld();
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.objs.forEach((obj) => obj.move());

    for (var i = 0; i < this.objs.length - 1; i++) {
      for (var j = i + 1; j < this.objs.length; j++) {
        collision(this.objs[i], this.objs[j]);
      }
    }
    this.objs.forEach((obj) => obj.redraw(this.ctx));
  }
}

window.onload = () => {
  new App();
};
