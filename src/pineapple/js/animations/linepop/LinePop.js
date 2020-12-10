import Line from "./Line.js";
import * as Colors from "../../Colors.js";

export const FRAMES = 1300;

export default class LinePop {
  constructor() {
    this.lines = [
      new Line([0.0689, 0.3167], [0.1267, 0.3167], [3, 10], [8, 6], Colors.LIGHTGREEN),
      new Line([0.0278, 0.2778], [0.1222, 0.2778], [-2, 8], [8, -2], Colors.LIGHTGREEN),
      new Line([0, 0.2389], [0.1, 0.2389], [-6, -3], [3, -7], Colors.LIGHTGREEN),
      new Line([-0.0111, 0.2], [0.0611, 0.2], [6, -10], [8, -3], Colors.LIGHTGREEN),
      new Line([-0.2111, 0.1333], [0.2167, 0.1333], [-4, -6], [-5, +6], Colors.LIGHTGREEN),
      new Line([-0.2444, 0.0889], [0.2611, 0.0889], [6, 8], [3, -8], Colors.YELLOW),
      new Line([-0.2667, 0.0444], [0.2711, 0.0444], [-3, -6], [-8, 10], Colors.YELLOW),
      new Line([-0.2744, 0], [0.2744, 0], [-6, 0], [0, -6], Colors.ORANGE),
      new Line([-0.2722, -0.0444], [0.2722, -0.0444], [-6, 20], [10, -3], Colors.ORANGE),
      new Line([-0.2656, -0.0889], [0.2656, -0.0889], [-0.2656, -0.0889], [0.2656, -0.0889] , Colors.RED),
      new Line([-0.2578, -0.1333], [0.2611, -0.1333], [-6, -6], [2, -10], Colors.RED),
      new Line([-0.24, -0.1778], [0.24, -0.1778], [-8, -1], [2, 7], Colors.PURPLE),
      new Line([-0.2167, -0.2222], [0.2167, -0.2222], [-10, -20], [6, 0], Colors.PURPLE),
      new Line([-0.1867, -0.2667], [0.1867, -0.2667], [-1, -8], [10, 1], Colors.BLUE),
      new Line([-0.1444, -0.3111], [-0.0667, -0.3111], [-10, 0], [3, -20], Colors.BLUE), // fadeout
      new Line([0.0778, -0.3111], [0.1444, -0.3111], [-20, 30], [20, 0], Colors.BLUE), // fadeout
    ];
  }

  getFrames() {
    return FRAMES;
  }

  redraw(ctx, frame) {
    this.lines.forEach((line) => line.redraw(ctx, frame));
  }
}
