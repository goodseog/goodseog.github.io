import Wave from "./Wave.js";

export default class WaveGroup {
  constructor(colors) {
    this.waves = [];
    const freq = 4;
    const amp = 100;
    const w = 5;

    let count = colors.length;
    for (let i = 0; i < count; i++) {
      this.waves.push(new Wave(freq, amp, w, (Math.PI * i) / count, colors[i]));
    }
  }

  resize(width, height) {
    this.waves.forEach((wave) => wave.resize(width, height));
  }

  redraw(ctx) {
    this.waves.forEach((wave) => wave.redraw(ctx));
  }
}
