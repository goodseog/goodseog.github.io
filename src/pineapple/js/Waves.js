import Wave from "./Wave.js";
import * as Colors from "./Colors.js";

export default class Waves {
  constructor() {
    this.waves = [
      new Wave([0.0689, 0.3167], [0.1267, 0.3167], Colors.LIGHTGREEN, 1),
      new Wave([0.0278, 0.2778], [0.1222, 0.2778], Colors.LIGHTGREEN, 1),
      new Wave([0, 0.2389], [0.1, 0.2389], Colors.LIGHTGREEN, 1),
      new Wave([-0.0111, 0.2], [0.0611, 0.2], Colors.LIGHTGREEN, 1),
      new Wave([-0.2111, 0.1333], [0.2167, 0.1333], Colors.LIGHTGREEN, 5),
      new Wave([-0.2444, 0.0889], [0.2611, 0.0889], Colors.YELLOW, 5),
      new Wave([-0.2667, 0.0444], [0.2711, 0.0444], Colors.YELLOW, 5),
      new Wave([-0.2744, 0], [0.2744, 0], Colors.ORANGE, 5),
      new Wave([-0.2722, -0.0444], [0.2722, -0.0444], Colors.ORANGE, 5),
      new Wave([-0.2656, -0.0889], [0.2656, -0.0889], Colors.RED, 5),
      new Wave([-0.2578, -0.1333], [0.2611, -0.1333], Colors.RED, 5),
      new Wave([-0.24, -0.1778], [0.24, -0.1778], Colors.PURPLE, 4),
      new Wave([-0.2167, -0.2222], [0.2167, -0.2222], Colors.PURPLE, 4),
      new Wave([-0.1867, -0.2667], [0.1867, -0.2667], Colors.BLUE, 3),
      new Wave([-0.1444, -0.3111], [-0.0667, -0.3111], Colors.BLUE, 1),
      new Wave([0.0778, -0.3111], [0.1444, -0.3111], Colors.BLUE, 1),
    ];
  }

  redraw(ctx, frame) {
    this.waves.forEach((wave) => wave.redraw(ctx, frame));
  }
}
