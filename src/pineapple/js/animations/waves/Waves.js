import Wave from "./Wave.js";
import * as Colors from "../../Colors.js";
import { ApplePoints as AP } from "../../Data.js";

export default class Waves {
  constructor(edges, framesPerEdge) {
    this.edges = edges;
    this.framesPerEdge = framesPerEdge;
    this.waves = [
      new Wave(edges, framesPerEdge, AP[0][0], AP[0][1], Colors.LIGHTGREEN, 4),
      new Wave(edges, framesPerEdge, AP[1][0], AP[1][1], Colors.LIGHTGREEN, 4),
      new Wave(edges, framesPerEdge, AP[2][0], AP[2][1], Colors.LIGHTGREEN, 4),
      new Wave(edges, framesPerEdge, AP[3][0], AP[3][1], Colors.LIGHTGREEN, 4),
      new Wave(edges, framesPerEdge, AP[4][0], AP[4][1], Colors.LIGHTGREEN, 8),
      new Wave(edges, framesPerEdge, AP[5][0], AP[5][1], Colors.YELLOW, 8),
      new Wave(edges, framesPerEdge, AP[6][0], AP[6][1], Colors.YELLOW, 9),
      new Wave(edges, framesPerEdge, AP[7][0], AP[7][1], Colors.ORANGE, 9),
      new Wave(edges, framesPerEdge, AP[8][0], AP[8][1], Colors.ORANGE, 9),
      new Wave(edges, framesPerEdge, AP[9][0], AP[9][1], Colors.RED, 8),
      new Wave(edges, framesPerEdge, AP[10][0], AP[10][1], Colors.RED, 8),
      new Wave(edges, framesPerEdge, AP[11][0], AP[11][1], Colors.PURPLE, 8),
      new Wave(edges, framesPerEdge, AP[12][0], AP[12][1], Colors.PURPLE, 7),
      new Wave(edges, framesPerEdge, AP[13][0], AP[13][1], Colors.BLUE, 6),
      new Wave(edges, framesPerEdge, AP[14][0], AP[14][1], Colors.BLUE, 3),
      new Wave(edges, framesPerEdge, AP[15][0], AP[15][1], Colors.BLUE, 3),
    ];
  }

  getFrames() {
    return (this.edges + 1) * this.framesPerEdge + 1;
  }

  redraw(ctx, frame) {
    this.waves.forEach((wave) => wave.redraw(ctx, frame));
  }
}
