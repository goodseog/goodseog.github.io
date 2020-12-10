import Waves from "./Waves.js";
import Coord from "./Coordinate.js";
let app;
class App {
  constructor() {
    this.frame = -1;
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    this.anims = [new Waves()];
    this.animId = window.requestAnimationFrame(this.animate.bind(this));
  }

  onStop() {
    window.cancelAnimationFrame(this.animId);
  }

  resize() {
    this.stageWidth = Math.min(document.body.clientWidth, (document.body.clientHeight / 16) * 9);
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    Coord.resize(this.stageWidth, this.stageHeight);
  }

  animate() {
    this.frame++;
    this.animId = window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    let frameSum = 0;
    for (let i = 0; i < this.anims.length; i++) {
      let anim = this.anims[i];
      frameSum += anim.getFrames();
      if (this.frame <= frameSum) {
        anim.redraw(this.ctx, this.frame);
        break;
      }
    }
    if (this.frame == frameSum) {
      this.frame = -1;
    }
  }
}

window.onload = () => {
  app = new App();
};
