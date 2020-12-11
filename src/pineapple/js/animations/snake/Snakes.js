import Coord from "../../Coordinate.js";
import { vec2D } from "/static/js/Vector.js";
import { ApplePoints as AP } from "../../Data.js";
import Snake from "./Snake.js";

export const POINTS = 10;
export const FRAME_PER_POINT = 300;

export default class Snakes {
  constructor() {
    this.snakes = [
      new Snake([
        AP[4][1],
        // AP[5][1],
        // AP[6][1],
        // AP[7][1],
        // AP[9][1],
        // AP[10][1],
        // AP[11][1],
        // AP[12][1],
        // AP[13][1],
        // AP[15][1],
        // AP[15][0],
        // AP[14][1],
        // AP[14][0],
        // AP[13][0],
        // AP[12][0],
        // AP[11][0],
        // AP[10][0],
        // AP[9][0],
        // AP[8][0],
        // AP[7][0],
        // AP[6][0],
        // AP[5][0],
        // AP[4][0],
      ]),
    ];
  }

  getFrames() {
    return POINTS * FRAME_PER_POINT;
  }

  redraw(ctx, frame) {
    this.snakes.forEach((snake) => snake.redraw(ctx, frame));
  }
}
