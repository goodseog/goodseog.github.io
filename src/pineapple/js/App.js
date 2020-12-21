import PopWaves from "./animations/waves/PopWaves.js";
import Waves from "./animations/waves/Waves.js";
import Keep from "./animations/keep/Keep.js";
import Coord from "./Coordinate.js";
import Snakes from "./animations/snake/Snakes.js";

import { vec2D } from "/static/js/Vector.js";
class App {
  constructor() {
    this.frame = -1;
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.anims = [
      //
      new Waves(6, 33),
      new PopWaves(200),
      new Snakes(200, 50, 300),
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

    let top = 0;
    if ((this.stageWidth / 9) * 16 < this.stageHeight) {
      this.stageHeight = (this.stageWidth / 9) * 16;
      top = 0.5 * (document.body.clientHeight - this.stageHeight);
    } else if ((this.stageHeight / 16) * 9 < this.stageWidth) {
      this.stageWidth = (this.stageHeight / 16) * 9;
    }

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.canvas.style.top = "" + top + "px";
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

        anim.redraw(this.ctx, this.frame - animOffset);
        break;
      }
      animOffset = animEndFrame;
    }

    if (this.frame == this.endFrame) {
      this.frame = -1;
    }
  }
}

window.onload = () => {
  new App();
};
