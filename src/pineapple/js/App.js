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
      // new Waves(6, 33),
      // new PopWaves(200),
      new Snakes(200),
      // new PopSnakes(1000),
    ];
    this.endFrame = this.anims.map((anim) => anim.getFrames()).reduce((a, b) => a + b);
    this.animId = window.requestAnimationFrame(this.animate.bind(this));
  }

  onStop() {
    window.cancelAnimationFrame(this.animId);
  }

  resize() {
    this.stageWidth = Math.min(document.body.clientWidth, (document.body.clientHeight / 16) * 9);
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
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

        // Background image
        // let center = Coord.getPos(new vec2D(0, 0))
        // let image = new Image()
        // image.src = "/src/pineapple/apple.png"
        // this.ctx.drawImage(image, center.x - 90, center.y - 90, 180, 180);

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
