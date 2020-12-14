import Coordinate from "../../Coordinate.js";
import { AppleSnakes as AS, AppleSnakesLeaf as ASL } from "../../Data.js";
import Snake from "./Snake.js";

export default class Snakes {
  constructor(frames) {
    this.frames = frames;
    this.snakes = [
      //
      new Snake(AS), 
      new Snake(ASL.lower),
      new Snake(ASL.upper),
    ];
  }

  getFrames() {
    return this.frames;
  }

  redraw(ctx, frame) {
    this.snakes.forEach((snake) => snake.redraw(ctx, frame));
  }
}
