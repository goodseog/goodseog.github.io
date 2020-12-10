import LinePop from "./animations/linepop/LinePop.js";
import Waves from "./animations/waves/Waves.js";
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

    this.anims = [
      new Waves(), 
      new LinePop()
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

    let animOffset = 0;
    for (let i = 0; i < this.anims.length; i++) {
      let anim = this.anims[i];
      let animEndFrame = animOffset + anim.getFrames();
      if (this.frame <= animEndFrame) {
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
  app = new App();
};
