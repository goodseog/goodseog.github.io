import Wave from "./Wave.js";
import * as Colors from "../../Colors.js";
import { ApplePoints as AP } from "../../Data.js";

export const EDGES = 6;
export const FRAMES = 130;

export default class Waves {
  constructor() {
    this.waves = [
      new Wave(AP[0][0], AP[0][1], Colors.LIGHTGREEN, 4),
      new Wave(AP[1][0], AP[1][1], Colors.LIGHTGREEN, 4),
      new Wave(AP[2][0], AP[2][1], Colors.LIGHTGREEN, 4),
      new Wave(AP[3][0], AP[3][1], Colors.LIGHTGREEN, 4),
      new Wave(AP[4][0], AP[4][1], Colors.LIGHTGREEN, 8),
      new Wave(AP[5][0], AP[5][1], Colors.YELLOW, 8),
      new Wave(AP[6][0], AP[6][1], Colors.YELLOW, 9),
      new Wave(AP[7][0], AP[7][1], Colors.ORANGE, 9),
      new Wave(AP[8][0], AP[8][1], Colors.ORANGE, 9),
      new Wave(AP[9][0], AP[9][1], Colors.RED, 8),
      new Wave(AP[10][0], AP[10][1], Colors.RED, 8),
      new Wave(AP[11][0], AP[11][1], Colors.PURPLE, 8),
      new Wave(AP[12][0], AP[12][1], Colors.PURPLE, 7),
      new Wave(AP[13][0], AP[13][1], Colors.BLUE, 6),
      new Wave(AP[14][0], AP[14][1], Colors.BLUE, 3),
      new Wave(AP[15][0], AP[15][1], Colors.BLUE, 3),
    ];
  }

  getFrames(){
    return (EDGES + 1) * FRAMES + 1
  }
  
  redraw(ctx, frame) {
    this.waves.forEach((wave) => wave.redraw(ctx, frame));
  }
}
