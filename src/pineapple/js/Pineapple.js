import PopWaves from "./animations/waves/PopWaves.js";
import Waves from "./animations/waves/Waves.js";
import Keep from "./animations/keep/Keep.js";
import Coord from "./Coordinate.js";
import Snakes from "./animations/snake/Snakes.js";
import Mosaic from "./animations/mosaic/Mosaic.js";

import { vec2D } from "/static/js/Vector.js";
import Popping from "./animations/popping/Popping.js";

let app;

class Pineapple {
  constructor() {
    this.frame = -1;
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.anims = [
      //
      // new Waves(6, 33),
      // new PopWaves(600),
      // new Snakes(500, 100, 400),
      // new Mosaic(200, 400, 200),
      new Popping(400, 300),
    ];
    this.endFrame = this.anims.map((anim) => anim.getFrames()).reduce((a, b) => a + b);
    this.animId = window.requestAnimationFrame(this.animate.bind(this));
  }

  onStop() {
    window.cancelAnimationFrame(this.animId);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.top = 0;
    if ((this.stageWidth / 9) * 16 < this.stageHeight) {
      this.stageHeight = (this.stageWidth / 9) * 16;
      this.top = 0.5 * (document.body.clientHeight - this.stageHeight);
    } else if ((this.stageHeight / 16) * 9 < this.stageWidth) {
      this.stageWidth = (this.stageHeight / 16) * 9;
    }
    this.left = (document.body.clientWidth - this.stageWidth) / 2;

    let display = document.querySelector("#display");
    console.log(display);
    display.style.width = `${this.stageWidth}px`;
    display.style.height = `${this.stageHeight}px`;
    display.style.top = `${this.top}px`;
    display.style.left = `${this.left}px`;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.canvas.style.top = `0px`;
    this.canvas.style.left = `0px`;
    Coord.resize(this.stageWidth, this.stageHeight);
  }

  animate() {
    this.frame++;
    this.animId = window.requestAnimationFrame(this.animate.bind(this));

    let animOffset = 0;
    for (let i = 0; i < this.anims.length; i++) {
      let anim = this.anims[i];
      let animEndFrame = animOffset + anim.getFrames();
      if (this.frame < animEndFrame && !(anim instanceof Keep)) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

        // this.drawImage(Coord.getHeight()/ 8.44);
        anim.redraw(this.ctx, this.frame - animOffset);
        break;
      }
      animOffset = animEndFrame;
    }

    if (this.frame == this.endFrame) {
      this.frame = -1;
    }
  }

  drawImage(size) {
    let image = new Image(100, 100);
    image.src = "/static/img/apple.png";
    this.ctx.drawImage(image, this.stageWidth / 2 - size, this.stageHeight / 2 - size, size * 2, size * 2);
  }
}

window.onresize = () => {
  app.onStop();
  app = new Pineapple();
};

window.onload = () => {
  app = new Pineapple();
};
