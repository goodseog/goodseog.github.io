import WavePoint from "./WavePoint.js";
class App {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.wavePoints = [];

    window.addEventListener("resize", this.resize.bind(this), false);
    window.addEventListener("click", this.click.bind(this), false);
    window.addEventListener("touch", this.touch.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  touch(evt) {
    this.wavePoints.push(
      new WavePoint(evt.touches[0].clientX, evt.touches[0].clientY)
    );
  }

  click(evt) {
    this.wavePoints.push(new WavePoint(evt.clientX, evt.clientY));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.maxRadius = Math.sqrt(this.stageWidth ** 2 + this.stageHeight ** 2);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.wavePoints = this.wavePoints.filter(
      (wavePoint) => !wavePoint.isEnd(this.maxRadius)
    );
    this.wavePoints.forEach((wavePoint) =>
      wavePoint.redraw2(this.ctx, this.maxRadius)
    );

    this.ctx.font = "30px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(
      "Click for liquid wave",
      this.stageWidth / 2,
      this.stageHeight / 2
    );
  }
}

window.onload = () => {
  new App();
};
