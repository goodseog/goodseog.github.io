import Line from "./Line.js";
import * as Colors from "../../Colors.js";
import { ApplePoints as AP } from "../../Data.js";

export const FRAMES = 1300;
const EPS = 1e-08;

export default class LinePop {
  constructor() {
    this.lines = [
      new Line(AP[0][0], AP[0][1], [3, 10], [8, 6], Colors.LIGHTGREEN),
      new Line(AP[1][0], AP[1][1], [-2, 8], [8, -2], Colors.LIGHTGREEN),
      new Line(AP[2][0], AP[2][1], [-6, -3], [3, -7], Colors.LIGHTGREEN),
      new Line(AP[3][0], AP[3][1], [6, -10], [8, -3], Colors.LIGHTGREEN),
      new Line(AP[4][0], AP[4][1], [-4, -6], [-5, +6], Colors.LIGHTGREEN),
      new Line(AP[5][0], AP[5][1], [6, 8], [3, -8], Colors.YELLOW),
      new Line(AP[6][0], AP[6][1], [-3, -6], [-8, 10], Colors.YELLOW),
      new Line(AP[7][0], AP[7][1], [-10, 0], [0, -10], Colors.ORANGE, 70),
      new Line(AP[8][0], AP[8][1], [-6, 20], [10, -3], Colors.ORANGE),
      new Line(AP[9][0], AP[9][1], AP[4][1].map(x => x - EPS), AP[4][1], Colors.RED, 15),
      new Line(AP[10][0], AP[10][1], [-6, -6], [2, -10], Colors.RED),
      new Line(AP[11][0], AP[11][1], [-8, -1], [2, 7], Colors.PURPLE),
      new Line(AP[12][0], AP[12][1], [-10, -20], [6, 0], Colors.PURPLE),
      new Line(AP[13][0], AP[13][1], [-1, -8], [10, 1], Colors.BLUE),
      new Line(AP[14][0], AP[14][1], [-10, 0], [3, -20], Colors.BLUE),
      new Line(AP[15][0], AP[15][1], [-3, 40], [10, -5], Colors.BLUE),
    ];
  }

  getFrames() {
    return FRAMES;
  }

  redraw(ctx, frame) {
    this.lines.forEach((line) => line.redraw(ctx, frame));
  }
}
