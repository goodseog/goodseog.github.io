import Line from "./Line.js";
import * as Colors from "../../Colors.js";
import { ApplePoints as AP } from "../../Data.js";

export default class PopWaves {
  constructor(frames) {
    this.frames = frames;
    this.lines = [
      new Line(frames, AP[0][0], AP[0][1], [3, 10], [8, 6], Colors.LIGHTGREEN),
      new Line(frames, AP[1][0], AP[1][1], [-2, 8], [8, -2], Colors.LIGHTGREEN),
      new Line(frames, AP[2][0], AP[2][1], [-6, -3], [3, -7], Colors.LIGHTGREEN),
      new Line(frames, AP[3][0], AP[3][1], [6, -10], [8, -3], Colors.LIGHTGREEN),
      new Line(frames, AP[4][0], AP[4][1], [-4, -6], [-5, +6], Colors.LIGHTGREEN),
      new Line(frames, AP[5][0], AP[5][1], [6, 8], [3, -8], Colors.YELLOW),
      new Line(frames, AP[6][0], AP[6][1], [-3, -6], [-8, 10], Colors.YELLOW),
      new Line(frames, AP[7][0], AP[7][1], doppelganger(AP[4][1]), AP[4][1], Colors.ORANGE, 7),
      new Line(frames, AP[8][0], AP[8][1], [-6, 20], [10, -3], Colors.ORANGE),
      new Line(frames, AP[9][0], AP[9][1], [-10, 0], [0, -10], Colors.RED, 70),
      new Line(frames, AP[10][0], AP[10][1], [-6, -6], [2, -10], Colors.RED),
      new Line(frames, AP[11][0], AP[11][1], [-8, -1], [2, 7], Colors.PURPLE),
      new Line(frames, AP[12][0], AP[12][1], [-10, -20], [6, 0], Colors.PURPLE),
      new Line(frames, AP[13][0], AP[13][1], [-1, -8], [10, 1], Colors.BLUE),
      new Line(frames, AP[14][0], AP[14][1], [-10, 0], [3, -20], Colors.BLUE),
      new Line(frames, AP[15][0], AP[15][1], [-3, 40], [10, -5], Colors.BLUE),
    ];
  }

  getFrames() {
    return this.frames;
  }

  redraw(ctx, frame) {
    this.lines.forEach((line) => line.redraw(ctx, frame));
  }
}

const EPS = 1e-6;
function doppelganger(p){
  return p.map((x) => x - EPS);
}